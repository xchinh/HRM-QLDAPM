-- ==================================================
-- SAMPLE DATA FOR HRM SYSTEM
-- ==================================================

-- 1. Company Settings (Cài đặt công ty)
INSERT INTO "CompanySettings" (
    standard_working_days,
    social_insurance_rate,
    health_insurance_rate,
    unemployment_insurance_rate,
    tax_exemption,
    "isActive",
    "createdAt",
    "updatedAt"
) VALUES (
    26,           -- 26 ngày công/tháng
    0.08,         -- BHXH 8%
    0.015,        -- BHYT 1.5%
    0.01,         -- BHTN 1%
    11000000,     -- Giảm trừ thuế 11 triệu
    true,
    NOW(),
    NOW()
);

-- 2. Departments (Phòng ban)
INSERT INTO "Department" (name, description, "createdAt", "updatedAt") VALUES
('IT Department', 'Information Technology', NOW(), NOW()),
('HR Department', 'Human Resources', NOW(), NOW()),
('Finance Department', 'Finance and Accounting', NOW(), NOW()),
('Marketing Department', 'Marketing and Sales', NOW(), NOW()),
('Operations Department', 'Operations Management', NOW(), NOW());

-- 3. Users (Tài khoản đăng nhập)
INSERT INTO "User" (username, password, role, "createdAt", "updatedAt") VALUES
-- Admin
('admin@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
 ARRAY['0001', '0002', '0003']::"enum_User_role"[], NOW(), NOW()),

-- HR Manager
('hr.manager@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
 ARRAY['0002']::"enum_User_role"[], NOW(), NOW()),

-- IT Manager
('it.manager@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
 ARRAY['0002']::"enum_User_role"[], NOW(), NOW()),

-- Regular Employees
('john.doe@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 ARRAY['0004']::"enum_User_role"[], NOW(), NOW()),
('jane.smith@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 ARRAY['0004']::"enum_User_role"[], NOW(), NOW()),
('mike.johnson@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 ARRAY['0004']::"enum_User_role"[], NOW(), NOW()),
('sarah.wilson@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 ARRAY['0004']::"enum_User_role"[], NOW(), NOW()),
('david.brown@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 ARRAY['0004']::"enum_User_role"[], NOW(), NOW()),
('lisa.davis@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 ARRAY['0003']::"enum_User_role"[], NOW(), NOW()),
('robert.taylor@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 ARRAY['0003']::"enum_User_role"[], NOW(), NOW());



-- 4. Employees (Nhân viên)
INSERT INTO "Employee" (
    "fullName",
    email,
    birthday,
    hired_at,
    department_id,
    position_name,
    base_salary,
    allowance,
    bonus,
    deduction,
    "isActive",
    "userId",
    "createdAt",
    "updatedAt"
) VALUES
-- Admin
('Administrator', 'admin@company.com', '1985-01-15', '2020-01-01', 2, 'System Administrator', 50000000, 5000000, 10000000, 0, true, 1, NOW(), NOW()),
-- HR Manager  
('Alice Johnson', 'alice.johnson@company.com', '1988-03-20', '2021-02-01', 2, 'HR Manager', 35000000, 3000000, 5000000, 0, true, 2, NOW(), NOW()),
-- IT Manager
('Tom Wilson', 'tom.wilson@company.com', '1987-07-10', '2021-03-15', 1, 'IT Manager', 40000000, 4000000, 6000000, 0, true, 3, NOW(), NOW()),
-- Senior Developer
('John Doe', 'john.doe@company.com', '1990-05-12', '2022-01-10', 1, 'Senior Developer', 30000000, 2500000, 3000000, 0, true, 4, NOW(), NOW()),
-- Frontend Developer  
('Jane Smith', 'jane.smith@company.com', '1992-08-25', '2022-06-01', 1, 'Frontend Developer', 25000000, 2000000, 2000000, 0, true, 5, NOW(), NOW()),
-- Backend Developer
('Mike Johnson', 'mike.johnson@company.com', '1991-11-08', '2022-03-20', 1, 'Backend Developer', 28000000, 2200000, 2500000, 0, true, 6, NOW(), NOW()),
-- Marketing Executive
('Sarah Wilson', 'sarah.wilson@company.com', '1993-02-14', '2022-09-05', 4, 'Marketing Executive', 22000000, 1800000, 1500000, 0, true, 7, NOW(), NOW()),
-- Finance Analyst
('David Brown', 'david.brown@company.com', '1989-12-03', '2021-11-10', 3, 'Finance Analyst', 26000000, 2100000, 2000000, 0, true, 8, NOW(), NOW()),
-- HR Specialist
('Lisa Davis', 'lisa.davis@company.com', '1990-09-18', '2022-04-12', 2, 'HR Specialist', 24000000, 1900000, 1800000, 0, true, 9, NOW(), NOW()),
-- Operations Officer
('Robert Taylor', 'robert.taylor@company.com', '1994-06-30', '2023-01-08', 5, 'Operations Officer', 23000000, 1700000, 1600000, 0, true, 10, NOW(), NOW());

-- 5. Attendance Data (Dữ liệu chấm công tháng 11/2025)
INSERT INTO "Attendance" (
    "employeeId",
    date,
    check_in,
    check_out,
    status,
    description,
    "createdAt",
    "updatedAt"
) VALUES
-- Employee ID 4 (John Doe) - Tháng 11/2025
(4, '2025-11-01', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-04', '08:15:00', '17:30:00', '007', 'Traffic jam', NOW(), NOW()),
(4, '2025-11-05', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-06', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-07', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-08', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-11', '08:00:00', '12:00:00', '006', 'Personal leave afternoon', NOW(), NOW()),
(4, '2025-11-12', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-13', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-14', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-15', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-18', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-19', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-20', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-21', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-22', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-25', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-26', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-27', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-28', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(4, '2025-11-29', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),

-- Employee ID 5 (Jane Smith) - Tháng 11/2025  
(5, '2025-11-01', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-04', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-05', '08:10:00', '17:30:00', '007', 'Bus delay', NOW(), NOW()),
(5, '2025-11-06', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-07', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-08', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-11', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-12', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-13', NULL, NULL, '005', 'Sick leave', NOW(), NOW()),
(5, '2025-11-14', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-15', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-18', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-19', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-20', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-21', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-22', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-25', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-26', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-27', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-28', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(5, '2025-11-29', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),

-- Employee ID 6 (Mike Johnson) - Tháng 11/2025
(6, '2025-11-01', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-04', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-05', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-06', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-07', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-08', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-11', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-12', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-13', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-14', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-15', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-18', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-19', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-20', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-21', '08:25:00', '17:30:00', '007', 'Car trouble', NOW(), NOW()),
(6, '2025-11-22', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-25', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-26', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-27', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-28', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW()),
(6, '2025-11-29', '08:00:00', '17:30:00', '004', NULL, NOW(), NOW());


-- 6. Leave Requests (Đơn xin nghỉ)
INSERT INTO "Leave_Request" (
    "employeeId",
    start_date,
    end_date,
    reason,
    status,
    approved_by,
    "createdAt",
    "updatedAt"
) VALUES
-- Đơn đã được duyệt
(4, '2025-12-23', '2025-12-27', 'Christmas holiday with family', '002', 3, NOW(), NOW()),
(5, '2025-11-13', '2025-11-13', 'Medical appointment', '002', 2, NOW(), NOW()),
(6, '2025-12-30', '2026-01-02', 'New Year vacation', '002', 3, NOW(), NOW()),
-- Đơn đang chờ duyệt
(7, '2025-12-15', '2025-12-16', 'Personal matters', '001', NULL, NOW(), NOW()),
(8, '2025-12-20', '2025-12-22', 'Wedding ceremony', '001', NULL, NOW(), NOW()),
-- Đơn bị từ chối
(9, '2025-11-25', '2025-11-26', 'Short vacation', '003', 2, NOW(), NOW());

-- 7. Sample Payroll Data (Bảng lương mẫu tháng 10/2025)
INSERT INTO "Payroll" (
    "employee_id",
    month,
    year,
    base_salary,
    allowance,
    bonus,
    standard_working_days,
    actual_working_days,
    salary_by_days,
    social_insurance,
    health_insurance,
    unemployment_insurance,
    total_insurance,
    taxable_income,
    personal_income_tax,
    other_deductions,
    gross_salary,
    total_deductions,
    net_salary,
    status,
    notes,
    "createdAt",
    "updatedAt"
) VALUES
-- John Doe - October 2025 (Full month, CALCULATED)
(4, 10, 2025, 30000000, 2500000, 3000000, 26, 26.0, 30000000, 2600000, 487500, 325000, 3412500, 17587500, 1379375, 0, 35500000, 4791875, 30708125, '0006', 'Full attendance', NOW(), NOW()),

-- Jane Smith - October 2025 (25 days, CALCULATED)
(5, 10, 2025, 25000000, 2000000, 2000000, 26, 25.0, 24038462, 2003847, 390577, 260385, 2654809, 13383653, 919183, 0, 28038462, 3573992, 24464470, '0006', '1 day absent', NOW(), NOW()),

-- Mike Johnson - October 2025 (Full month, CALCULATED)
(6, 10, 2025, 28000000, 2200000, 2500000, 26, 26.0, 28000000, 2416000, 453000, 302000, 3171000, 14829000, 1241450, 0, 32700000, 4412450, 28287550, '0006', 'Full attendance', NOW(), NOW()),

-- David Brown - November 2025 (Draft - chưa tính lương)
(7, 11, 2025, 26000000, 2000000, 0, 26, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 28000000, 0, 0, '0005', 'Pending attendance data', NOW(), NOW()),

-- Emma Wilson - November 2025 (Calculated)
(8, 11, 2025, 32000000, 3000000, 2500000, 26, 25.5, 31461538, 2729238, 511846, 341077, 3582161, 18340599, 1430379, 0, 37500000, 5012540, 32487460, '0006', 'Half-day leave', NOW(), NOW()),

-- Olivia Davis - November 2025 (Approved)
(9, 11, 2025, 29000000, 2500000, 2000000, 26, 26.0, 29000000, 2508500, 469000, 312000, 3289500, 15910500, 1272840, 0, 33500000, 4562340, 28937660, '0007', 'Approved by manager', NOW(), NOW());

-- ==================================================
-- VERIFICATION QUERIES (Optional - for testing)
-- ==================================================

-- Check all data
-- SELECT 'Users' as table_name, COUNT(*) as count FROM "User"
-- UNION ALL
-- SELECT 'Employees', COUNT(*) FROM "Employee"
-- UNION ALL  
-- SELECT 'Departments', COUNT(*) FROM "Department"
-- UNION ALL
-- SELECT 'CompanySettings', COUNT(*) FROM "CompanySettings"
-- UNION ALL
-- SELECT 'Attendance Records', COUNT(*) FROM "Attendance"
-- UNION ALL
-- SELECT 'Leave Requests', COUNT(*) FROM "LeaveRequest"
-- UNION ALL
-- SELECT 'Payroll Records', COUNT(*) FROM "Payroll";

-- Check attendance summary for November 2025
-- SELECT 
--     e."fullName",
--     COUNT(*) as total_records,
--     SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present_days,
--     SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) as late_days,
--     SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) as absent_days,
--     SUM(CASE WHEN a.status = 'half_day' THEN 0.5 ELSE 1 END) as actual_working_days
-- FROM "Employee" e
-- JOIN "Attendance" a ON e.id = a."employeeId"
-- WHERE a.date >= '2025-11-01' AND a.date <= '2025-11-30'
-- GROUP BY e.id, e."fullName"
-- ORDER BY e."fullName";