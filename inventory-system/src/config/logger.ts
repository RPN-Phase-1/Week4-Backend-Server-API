import winston from 'winston';
import Config from './config';

const isdevelopment = Config.env === 'development';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: isdevelopment ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format[isdevelopment ? 'colorize' : 'uncolorize'](),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [new winston.transports.Console({ stderrLevels: ['error'] })],
});

export default logger;
