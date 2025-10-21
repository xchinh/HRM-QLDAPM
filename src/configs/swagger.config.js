const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HRM API Documentation",
            version: "1.0.0",
            description: "API Documentation for HRM project",
        },
        servers: [
            {
                url: "http://localhost:8080/api/v1",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/routes/*.js", "./src/routes/**/*.js"],
};

module.exports = swaggerOptions;
