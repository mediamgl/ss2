import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
});

export const log = {
  info: (msg: string, data?: object) => logger.info(data, msg),
  warn: (msg: string, data?: object) => logger.warn(data, msg),
  error: (msg: string, error?: Error, data?: object) => {
    logger.error(
      {
        err: {
          message: error?.message,
          stack: error?.stack,
          ...data,
        },
      },
      msg
    );
  },
  debug: (msg: string, data?: object) => logger.debug(data, msg),
};

export default logger;