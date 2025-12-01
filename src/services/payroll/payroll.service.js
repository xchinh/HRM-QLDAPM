"use strict";

const { NotFoundError, BadRequestError } = require("../../core/error.response");
const { STATUS_ATTENDANCE, STATUS_PAYROLL } = require("../../enums");
const AttendanceRepository = require("../../repositories/attendance.repository");
const EmployeeRepository = require("../../repositories/employee.repository");
const CompanyRepository = require("../../repositories/company.repository");
const PayrollRepository = require("../../repositories/payroll.repository");
const UserRepository = require("../../repositories/user.repository");
const employee = require("../../models/Employee.model");

class PayrollService {
    static async calculateActualWorkingDays(employeeId, month, year) {
        const { data } = await AttendanceRepository.findAll(month, year, {
            queries: {
                employeeId,
            },
        });

        let actualDays = 0;
        data.forEach((att) => {
            switch (att.status) {
                case STATUS_ATTENDANCE.PRESENT:
                case STATUS_ATTENDANCE.LATE:
                    actualDays += 1;
                    break;
                case STATUS_ATTENDANCE.LEAVE:
                case STATUS_ATTENDANCE.ABSENT:
                    actualDays += 0;
                    break;
                default:
                    actualDays += 1;
            }
        });

        return actualDays;
    }

    static calculatePersonalIncomeTax(taxableIncome) {
        if (taxableIncome <= 0) return 0;

        let tax = 0;

        if (taxableIncome <= 5000000) {
            tax = taxableIncome * 0.05;
        } else if (taxableIncome <= 10000000) {
            tax = 5000000 * 0.05 + (taxableIncome - 5000000) * 0.1;
        } else if (taxableIncome <= 18000000) {
            tax =
                5000000 * 0.05 +
                5000000 * 0.1 +
                (taxableIncome - 10000000) * 0.15;
        } else if (taxableIncome <= 32000000) {
            tax =
                5000000 * 0.05 +
                5000000 * 0.1 +
                8000000 * 0.15 +
                (taxableIncome - 18000000) * 0.2;
        } else {
            tax =
                5000000 * 0.05 +
                5000000 * 0.1 +
                8000000 * 0.15 +
                14000000 * 0.2 +
                (taxableIncome - 32000000) * 0.25;
        }

        return Math.round(tax);
    }

    static calculateEmployeePayroll = async (employeeId, { month, year }) => {
        const employee = await EmployeeRepository.findById({ id: employeeId });
        if (!employee) {
            throw new NotFoundError("Employee not found");
        }

        const settings = await CompanyRepository.findOne({
            queries: { isActive: true },
        });
        if (!settings) {
            throw new NotFoundError("Company settings not found");
        }

        const actualWorkingDays = await this.calculateActualWorkingDays(
            employeeId,
            month,
            year
        );

        const baseSalary = parseFloat(employee.base_salary);
        const standardWorkingDays = settings.standard_working_days;
        const salaryByDays =
            (baseSalary / standardWorkingDays) * actualWorkingDays;

        const allowance = parseFloat(employee.allowance) || 0;
        const bonus = parseFloat(employee.bonus) || 0;
        const otherDeductions = parseFloat(employee.deduction) || 0;

        const grossSalary = salaryByDays + allowance + bonus;

        const insuranceBase = salaryByDays + allowance;
        const socialInsurance = Math.round(
            insuranceBase * parseFloat(settings.social_insurance_rate)
        );
        const healthInsurance = Math.round(
            insuranceBase * parseFloat(settings.health_insurance_rate)
        );
        const unemploymentInsurance = Math.round(
            insuranceBase * parseFloat(settings.unemployment_insurance_rate)
        );
        const totalInsurance =
            socialInsurance + healthInsurance + unemploymentInsurance;

        const taxExemption = parseFloat(settings.tax_exemption);
        const taxableIncome = Math.max(
            0,
            insuranceBase - totalInsurance - taxExemption
        );
        const personalIncomeTax =
            this.calculatePersonalIncomeTax(taxableIncome);

        const totalDeductions =
            totalInsurance + personalIncomeTax + otherDeductions;
        const netSalary = grossSalary - totalDeductions;

        const payrollData = {
            employeeId,
            month,
            year,
            base_salary: baseSalary,
            allowance,
            bonus,
            standard_working_days: standardWorkingDays,
            actual_working_days: actualWorkingDays,
            salary_by_days: Math.round(salaryByDays),
            social_insurance: socialInsurance,
            health_insurance: healthInsurance,
            unemployment_insurance: unemploymentInsurance,
            total_insurance: totalInsurance,
            taxable_income: taxableIncome,
            personal_income_tax: personalIncomeTax,
            other_deductions: otherDeductions,
            gross_salary: Math.round(grossSalary),
            total_deductions: totalDeductions,
            net_salary: Math.round(netSalary),
            status: STATUS_PAYROLL.CALCULATED,
        };

        const [payroll, created] = await PayrollRepository.findOrCreate({
            queries: {
                employee_id: employeeId,
                month,
                year,
            },
            defaults: payrollData,
        });

        if (!created) {
            await payroll.update(payrollData);
        }

        return { data: payroll };
    };

    static calculateAllPayroll = async ({ month, year }) => {
        const employees = await EmployeeRepository.findAllEmployee();

        const results = [];
        for (const employee of employees) {
            try {
                const { payroll } = await this.calculateEmployeePayroll(
                    employee.id,
                    { month, year }
                );
                results.push({
                    success: true,
                    employeeId: employee.id,
                    employeeName: employee.fullName,
                    payroll,
                });
            } catch (error) {
                results.push({
                    success: false,
                    employeeId: employee.id,
                    employeeName: employee.fullName,
                    error: error.message,
                });
            }
        }

        return results;
    };

    static getPayrollByMonth = async ({ month, year }) => {
        const payrolls = await PayrollRepository.findAll(month, year);

        return { data: payrolls };
    };

    static getEmployeePayroll = async (employeeId, userId, { month, year }) => {
        const user = await UserRepository.findByIdWithEmployee(userId);
        if (parseInt(employeeId) !== user.employee.id) {
            throw new BadRequestError("EmployeeId not match userId");
        }
        const payroll = await PayrollRepository.findOne({
            queries: {
                employeeId,
                month,
                year,
            },
        });

        return { data: payroll };
    };
}

module.exports = PayrollService;
