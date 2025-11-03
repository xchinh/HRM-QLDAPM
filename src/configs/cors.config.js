'use strict';

const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const ORIGIN_REGEX = process.env.CORS_ORIGIN_REGEX
  ? new RegExp(process.env.CORS_ORIGIN_REGEX)
  : null;

module.exports = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // allow Swagger UI, curl, Postman
    const ok =
      ALLOWED_ORIGINS.includes(origin) ||
      (ORIGIN_REGEX && ORIGIN_REGEX.test(origin));
    return ok ? callback(null, true) : callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-id'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  maxAge: 86400, // cache preflight 24h
  optionsSuccessStatus: 204
};