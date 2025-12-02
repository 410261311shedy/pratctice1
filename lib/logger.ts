import pino from "pino";

//pino pretty have  issue working with edge runtime when used with NextAuth
const isEdge = process.env.Next_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
   level: process.env.LOG_LEVEL || "info",
   transport:
      !isEdge && !isProduction
         ? {
              //make output from Node.js logger to human readable
              target: "pino-pretty",
              options: {
                 colorize: true,
                 ignore: "pid,hostname",
                 translateTime: "SYS:standard",
              },
           }
         : undefined,
   formatters: {
      level: (label) => ({ level: label.toLowerCase() }),
   },
   timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
