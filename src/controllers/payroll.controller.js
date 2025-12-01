"use strict";

const PayrollService = require("../services/payroll/payroll.service");
const { OK } = require("../core/success.response");

class PayrollController {
    // Tính lương cho 1 nhân viên
    static calculateEmployee = async (req, res) => {
        new OK({
            message: "Calculate employee payroll successful",
            metadata: await PayrollService.calculateEmployeePayroll(
                req.params.id,
                req.body
            ),
        }).send(res);
    };

    // Tính lương cho tất cả nhân viên
    static calculateAll = async (req, res) => {
        const results = await PayrollService.calculateAllPayroll(req.body);

        new OK({
            message: "Calculate all payrolls successful",
            metadata: {
                data: results,
                summary: {
                    total: results.length,
                    success: results.filter((r) => r.success).length,
                    failed: results.filter((r) => !r.success).length,
                },
            },
        }).send(res);
    };

    // Lấy bảng lương theo tháng
    static getByMonth = async (req, res) => {
        new OK({
            message: "Get payrolls by month successful",
            metadata: await PayrollService.getPayrollByMonth(req.query),
        }).send(res);
    };

    // Lấy bảng lương của 1 nhân viên
    static getEmployee = async (req, res) => {
        new OK({
            message: "Get employee payroll successful",
            metadata: await PayrollService.getEmployeePayroll(
                req.params.id,
                req.user.userId,
                req.query
            ),
        }).send(res);
    };
}

module.exports = PayrollController;
