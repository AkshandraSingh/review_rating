const {createLogger , transports , format} = require('winston')
require('winston-mongodb')

const logger = createLogger({
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.Console({
            level: "error",
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename: 'logs/log_info.log',
            level: "info",
            maxsize: 5242880,
            format: format.combine(format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),format.json())
        }),
        new transports.MongoDB({
            db: process.env.URL,
            level: "info",
            options: {
                useUnifedTopology: true,
            },
            collection: 'logData',
            format: format.combine(format.timestamp(),format.json())
        })
    ]
})

module.exports = logger