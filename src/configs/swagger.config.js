const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HRM API',
      version: '1.0.0',
      description: 'Human Resource Management System API Documentation',
    },
    servers: [
      { url: 'http://localhost:8080/api/v1', description: 'Development' }
    ],
    tags: [
      { name: 'Authentication', description: 'Authentication endpoints' },
      { name: 'Employees', description: 'Employee management endpoints' },
      { name: 'Leave', description: 'Leave request management endpoints' },
      { name: 'Attendance', description: 'Attendance management endpoints' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      parameters: {
        ClientId: {
          name: 'x-client-id',
          in: 'header',
          required: true,
          schema: { type: 'string' },
          description: 'Client identifier'
        }
      },
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Success' },
            status: { type: 'integer', example: 200 },
            metadata: { type: 'object' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            code: { type: 'integer', example: 400 },
            message: { type: 'string', example: 'Bad Request' }
          }
        },
        Employee: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            fullName: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            birthday: { type: 'string', format: 'date', example: '1990-01-01' },
            hired_at: { type: 'string', format: 'date', example: '2023-01-15' },
            position_name: { type: 'string', example: 'Senior Developer' },
            department_id: { type: 'integer', example: 2 },
            base_salary: { type: 'number', example: 75000 },
            isActive: { type: 'boolean', example: true }
          }
        },
        CreateEmployee: {
          type: 'object',
          required: ['fullName', 'email', 'department_id', 'position_name', 'base_salary'],
          properties: {
            fullName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            birthday: { type: 'string', format: 'date' },
            hired_at: { type: 'string', format: 'date' },
            department_id: { type: 'integer' },
            position_name: { type: 'string' },
            base_salary: { type: 'number', minimum: 1 }
          }
        },
        Leave: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            employeeId: { type: 'integer', example: 123 },
            start_date: { type: 'string', format: 'date', example: '2025-11-01' },
            end_date: { type: 'string', format: 'date', example: '2025-11-05' },
            reason: { type: 'string', example: 'Family vacation' },
            status: { type: 'string', enum: ['001','002','003'], example: '001' },
            approved_by: { type: 'integer', nullable: true, example: null }
          }
        },
        CreateLeave: {
          type: 'object',
          required: ['start_date', 'end_date'],
          properties: {
            start_date: { type: 'string', format: 'date' },
            end_date: { type: 'string', format: 'date' },
            reason: { type: 'string' }
          }
        },
        Attendance: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            employeeId: { type: 'integer', example: 123 },
            date: { type: 'string', format: 'date', example: '2025-10-28' },
            checkIn: { type: 'string', format: 'time', example: '08:00:00' },
            checkOut: { type: 'string', format: 'time', example: '17:00:00' },
            status: { type: 'string', enum: ['present','absent','late','half-day'], example: 'present' },
            workHours: { type: 'number', example: 8 }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: [
    './src/routes/**/*.js'
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;