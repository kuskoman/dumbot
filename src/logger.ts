import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "debug",
  transports: [new transports.Console({ format: format.cli() })],
});
export default logger;
