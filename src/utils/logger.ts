import config from '@/config/env';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = config.logger.level || 'info';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};


winston.addColors(colors); 

const format = winston.format.combine(
  winston.format.timestamp({ format: 'ISO8601' }),  
  winston.format.errors({ stack: true }),  
  config.app.env === 'development' 
    ? winston.format.colorize({ all: true })
    : winston.format.uncolorize(),
  winston.format.printf((info) => {
    const message = [info.timestamp, info.level, info.message];
    if (info.stack) message.push(`\n${info.stack}`);
    return message.join(' ');
  }),
);

const transports = [
  new winston.transports.Console({
    handleExceptions: true,
    handleRejections: true,
  }),
  new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d',
    format: winston.format.json(),
  }),
  new DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '7d',
    format: winston.format.json(),
  }),
];


const logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
  exitOnError: false, 
});


export const httpLoggerStream = {
  write: (message: string) => logger.http(message.trim()),
};

export default logger;