import winston from "winston";

// Create a custom logger
const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Format logs as JSON
  ),
  transports: [
    // Write logs to a file
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// If not in production, log to the console as well

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(), // Format logs as simple text
  })
);

export default logger;