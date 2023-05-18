import { createLogger, format, transports } from "winston";
import * as util from "util";

function transform(info, opts) {
  const args = info[Symbol.for("splat")];
  if (args) {
    info.message = util.format(info.message, ...args);
  }
  return info;
}

function utilFormatter() {
  return { transform };
}

export const logger = createLogger({
  level: "silly",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    utilFormatter(), // <-- this is what changed
    format.colorize(),
    format.printf(
      ({ level, message, label, timestamp }) =>
        `${timestamp} ${label || "-"} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.File({
      filename: "test.log",
      options: { flags: "w" },
    }),
    new transports.Console(),
  ],
});
