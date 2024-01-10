import winston from "winston";
import { customLevelsOptions } from "./customLevelsOptions.js";
import envConfig from "../config/env.config.js";

const loggerDev = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple(),
      ),
    }),
  ],
});

const loggerProd = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: "src/errors.log",
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = envConfig.MODE === "dev" ? loggerDev : loggerProd;
  next();
};
