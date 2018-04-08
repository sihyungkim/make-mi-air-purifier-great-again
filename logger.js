const fs = require('fs');
const path = require('path');

const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const tsFormat = () => (new Date()).toLocaleTimeString();
const logDir = path.join(__dirname,'log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize : true,
            level: 'debug'
        }),

        new (winstonDaily)({
            level: 'debug',
            filename: `${logDir}/%DATE%.log`,
            timestamp: tsFormat,
            datePattern: 'YYYY-MM-DD-HH',
            maxFiles: '2d'
        })
    ]
});

module.exports = logger;

