import { createLogger, transports, format } from "winston";
import config from "./config";

const logger = createLogger({
  level: "debug",
  transports: [new transports.Console({ format: format.cli() })],
});

if (config.logToFile) {
  const filename = `log/${+new Date()}.log`;
  logger.add(new transports.File({ filename, format: format.simple() }));
}

export default logger;
