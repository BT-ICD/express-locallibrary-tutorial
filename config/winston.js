/***
 * Learning References:
 * https://www.youtube.com/watch?v=m2q1Cevl_qw
 * https://github.com/hiteshchoudhary/youtube-winston
 * https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
 * https://github.com/productioncoder/node-winston-logging
 * https://www.youtube.com/watch?v=A5YiqaQbsyI
 */

var appRoot = require('app-root-path');
var winston = require('winston');
require('winston-daily-rotate-file');
var transport = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  // zippedArchive: true,
  // maxSize: '20m',
  // maxFiles: '14d'
});

const { timestamp, combine, errors, json } = winston.format;
// define the custom settings for each transport (file, console)
var options = {
  file: {
    level: 'debug',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  
};

var transport = new winston.transports.DailyRotateFile({
  filename: `${appRoot}/logs/%DATE%.log` ,//'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});
// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
  format: winston.format.combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    transport
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;