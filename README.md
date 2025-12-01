# Human Resource Management System (HRM-QLDAPM)

Hệ thống quản lý nhân sự được xây dựng bằng Node.js, Express.js và PostgreSQL với các tính năng quản lý nhân viên, chấm công, nghỉ phép và tính lương.

## 🚀 Tính năng chính

### 🔐 Xác thực và phân quyền
- **Đăng nhập/Đăng xuất** với JWT Authentication
- **Phân quyền theo vai trò**: Admin, HR, Manager, Employee
- **Refresh Token** để duy trì phiên đăng nhập
- **Middleware bảo mật** với header `x-client-id`

### 👥 Quản lý nhân viên
- **CRUD nhân viên**: Tạo, xem, cập nhật thông tin nhân viên
- **Quản lý trạng thái**: Kích hoạt/vô hiệu hóa nhân viên
- **Phân quyền linh hoạt**: Gán role theo vị trí công việc
- **Tích hợp thông tin lương**: Lương cơ bản, phụ cấp, thưởng, khấu trừ

### ⏰ Hệ thống chấm công
- **Ghi nhận chấm công** theo ngày với check-in/check-out
- **Trạng thái đa dạng**: Present, Late, Absent, Half-day
- **Báo cáo chấm công** theo nhân viên và thời gian
- **Quản lý bởi Admin/HR/Manager**

### 📋 Quản lý nghỉ phép
- **Tạo đơn xin nghỉ** với thời gian và lý do
- **Quy trình duyệt**: Pending → Approved/Rejected
- **Phân quyền duyệt** cho Admin/HR/Manager
- **Lịch sử đơn nghỉ phép** của từng nhân viên

### 💰 Hệ thống tính lương
- **Tính lương tự động** theo công thức:
  ```
  Lương thực nhận = (Lương cơ bản ÷ Số ngày công chuẩn) × Số ngày làm thực tế 
                   + Phụ cấp + Thưởng - BHXH - BHYT - BHTN - Thuế TNCN - Khấu trừ khác
  ```
- **Cài đặt linh hoạt**: Số ngày công chuẩn, tỷ lệ bảo hiểm, giảm trừ thuế
- **Báo cáo bảng lương** theo tháng/năm
- **Tính toán bảo hiểm và thuế** tự động theo quy định

### 📚 API Documentation
- **Swagger UI** tự động tạo từ JSDoc
- **Phân loại theo module**: Authentication, Employees, Leave, Attendance, Payroll
- **Test API trực tiếp** với giao diện thân thiện

## 🛠️ Công nghệ sử dụng

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **Sequelize** - ORM cho PostgreSQL
- **JWT** - JSON Web Token cho authentication
- **Bcrypt** - Hash password
- **Swagger** - API documentation
- **CORS** - Cross-origin resource sharing

### Database
- **PostgreSQL** - Cơ sở dữ liệu chính
- **Docker** - Container hóa database

### Development Tools
- **Nodemon** - Auto restart server
- **Morgan** - HTTP request logger
- **Helmet** - Security middleware
- **Compression** - Gzip compression

## 📋 Yêu cầu hệ thống

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **Docker** & **Docker Compose**
- **PostgreSQL** (hoặc chạy qua Docker)

## 🚀 Cài đặt và chạy dự án

### 1. Clone repository
```bash
git clone https://github.com/xchinh/HRM-QLDAPM.git
cd HRM-QLDAPM
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình environment
Tạo file `.env` trong thư mục root:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=HRM
DB_USER=postgres
DB_PASS=password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# Server
PORT=8080
NODE_ENV=development

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 4. Khởi động database với Docker
```bash
# Start PostgreSQL container với sample data
docker-compose up -d

# Kiểm tra logs
docker-compose logs db
```

### 5. Chạy ứng dụng
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 6. Truy cập ứng dụng
- **API Server**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api-docs
- **Database**: localhost:5432

## 📊 Cơ sở dữ liệu

### Sơ đồ ERD chính
```
User (1) ←→ (1) Employee
Employee (1) ←→ (n) Attendance
Employee (1) ←→ (n) LeaveRequest
Employee (1) ←→ (n) Payroll
Department (1) ←→ (n) Employee
CompanySettings (Global Config)
```

### Dữ liệu mẫu có sẵn
- **10 tài khoản** với các role khác nhau
- **5 phòng ban**: IT, HR, Finance, Marketing, Operations
- **Dữ liệu chấm công** tháng 11/2025
- **Đơn nghỉ phép** mẫu với các trạng thái
- **Bảng lương** mẫu tháng 10/2025
- **Cài đặt công ty** với thông số Việt Nam

### Tài khoản mặc định
| Username | Password | Role | Description |
|----------|----------|------|-------------|
| admin | password | ADMIN | Quản trị viên hệ thống |
| hr.manager | password | HR, MANAGER | Quản lý nhân sự |
| it.manager | password | MANAGER | Quản lý IT |
| john.doe | password | EMPLOYEE | Nhân viên phát triển |

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Đăng nhập
- `POST /api/v1/auth/refresh-token` - Làm mới token
- `POST /api/v1/auth/logout` - Đăng xuất

### Employee Management
- `GET /api/v1/employees` - Danh sách nhân viên
- `GET /api/v1/employee/:id` - Chi tiết nhân viên
- `POST /api/v1/employee` - Tạo nhân viên mới
- `PATCH /api/v1/employee/:id` - Cập nhật nhân viên
- `PATCH /api/v1/employee/disable/:id` - Vô hiệu hóa
- `PATCH /api/v1/employee/enable/:id` - Kích hoạt

### Attendance Management
- `GET /api/v1/attendances` - Tất cả bản ghi chấm công
- `GET /api/v1/attendance/:id` - Chấm công theo nhân viên
- `POST /api/v1/attendance/:id` - Tạo bản ghi chấm công

### Leave Management
- `GET /api/v1/leaves` - Tất cả đơn nghỉ phép
- `GET /api/v1/leave/:id` - Đơn nghỉ theo nhân viên
- `POST /api/v1/leave/:id` - Tạo đơn nghỉ phép
- `DELETE /api/v1/leave/:id` - Xóa đơn nghỉ
- `PATCH /api/v1/leave/:id/approve` - Duyệt đơn
- `PATCH /api/v1/leave/:id/reject` - Từ chối đơn

### Payroll Management
- `POST /api/v1/payroll/calculate/:id` - Tính lương nhân viên
- `POST /api/v1/payroll/calculate-all` - Tính lương tất cả
- `GET /api/v1/payrolls` - Bảng lương theo tháng
- `GET /api/v1/payroll/:id` - Bảng lương nhân viên

## 🔒 Bảo mật

### Authentication & Authorization
- **JWT Token** với thời gian hết hạn
- **Refresh Token** để gia hạn phiên
- **Role-based Access Control** (RBAC)
- **Header validation** với `x-client-id`

### Security Middleware
- **Helmet** - Bảo vệ HTTP headers
- **CORS** - Kiểm soát cross-origin requests
- **Bcrypt** - Hash password với salt
- **Input validation** - Kiểm tra dữ liệu đầu vào

### Database Security
- **Sequelize ORM** - Ngăn chặn SQL injection
- **Environment variables** - Bảo vệ thông tin nhạy cảm
- **Connection pooling** - Tối ưu kết nối database

## 🧪 Testing

### Kiểm tra API với Swagger
1. Truy cập http://localhost:8080/api-docs
2. Click **Authorize** và nhập JWT token
3. Test các endpoint trực tiếp

### Manual Testing
```bash
# Đăng nhập để lấy token
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# Sử dụng token để gọi API
curl -X GET http://localhost:8080/api/v1/employees \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "x-client-id: 1"
```

## 📁 Cấu trúc thư mục

```
HRM-QLDAPM/
├── src/
│   ├── auth/                 # Authentication utilities
│   ├── configs/             # Configuration files
│   │   ├── cors.config.js
│   │   ├── db.config.js
│   │   ├── jwt.config.js
│   │   └── swagger.config.js
│   ├── controllers/         # Route controllers
│   ├── core/               # Core response classes
│   ├── db/                 # Database initialization
│   ├── enums/              # Enumerations
│   ├── helpers/            # Helper functions
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # Sequelize models
│   ├── repositories/       # Data access layer
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
├── docker-compose.yaml     # Docker services
├── sample_data.sql        # Sample database data
├── package.json
└── server.js              # Entry point
```

## 📈 Tính năng nâng cao

### Tính lương thông minh
- **Tự động tính ngày công** từ dữ liệu chấm công
- **Bảo hiểm theo quy định VN**: BHXH (8%), BHYT (1.5%), BHTN (1%)
- **Thuế TNCN bậc thang** theo thang thuế Việt Nam
- **Cài đặt linh hoạt** cho từng công ty

### Báo cáo và thống kê
- **Dashboard chấm công** theo nhân viên/tháng
- **Báo cáo nghỉ phép** với trạng thái duyệt
- **Bảng lương tổng hợp** theo phòng ban
- **Export data** (có thể mở rộng)

### Tích hợp và mở rộng
- **API RESTful** chuẩn
- **Microservices ready** architecture
- **Database migration** với Sequelize
- **Docker containerization**

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📞 Liên hệ

- **Developer**: xchinh
- **Email**: [your-email@domain.com]
- **GitHub**: [@xchinh](https://github.com/xchinh)

## 📄 License

Dự án này được phát hành dưới [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Express.js** community for excellent framework
- **Sequelize** team for powerful ORM
- **PostgreSQL** for robust database
- **Swagger** for API documentation tools

---

⭐ **Nếu project hữu ích, hãy star repository để ủng hộ!** ⭐