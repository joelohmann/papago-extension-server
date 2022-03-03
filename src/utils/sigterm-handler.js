const fs = require('fs').promises;

const handleDisconnect = require('./mysql.js');
const logger = require('./logger.js');

var connection;
handleDisconnect();

async function uploadFiles() {
  // // Connect to database
  // connection.connect(err => {
  //   if (err) {
  //     console.log(err);
  //     logger.error(err);
  //   }

  //   console.log("Worked");
  // });

  // try {
  //   // TODO: Add .split to this to remove a line
  //   let combined = await fs.readFile('./logs/combined.log', 'utf-8');

  //   let sql = `INSERT INTO 'combined log' (Level, Time, Message) VALUES `;

  //   let logs = combined.split(/[\r\n]+/);
  //   logs.forEach(log => {
  //     if (log.length > 0) {
  //       let obj = JSON.parse(log);
  //       sql += `('${obj.level}', '${obj.timestamp}', '${obj.message}'), `;
  //     }
  //   });

  //   // if (sql.slice(-2) === ', ') sql = sql.substring(0, sql.length - 2);

  //   console.log('SQL: ', sql);

  //   connection.query(sql, (err, result) => {
  //     if (err) logger.error(err);
  //   });

  // } catch (err) {
  //   logger.error(err);
  // }

  await Promise.all([
    // Update combined log
    new Promise((resolve, reject) => {
      console.log("Starting");
      
      fs.readFile('./logs/combined.log', 'utf-8', (err, data) => {
        if (err) reject(err);

        let sql = `INSERT INTO 'combined log' (Level, Time, Message) VALUES `;

        let logs = data.split(/[\r\n]+/);
        logs.forEach(log => {
          if (log.length > 0) {
            let obj = JSON.parse(log);
            sql += `('${obj.level}', '${obj.timestamp}', '${obj.message}'), `;
          }
        });

        // if (sql.slice(-2) === ', ') sql = sql.substring(0, sql.length - 2);
        console.log('SQL: ', sql);

        connection.query(sql, (err, result) => {
          if (err) reject(err);

          resolve(result);
        });
      })
    }),
    // Update error log
    new Promise((resolve, reject) => {
      fs.readFile('./logs/error.log', 'utf-8', (err, data) => {
        if (err) reject(err);

        let sql = `INSERT INTO 'error log' (Time, Message) VALUES `;

        let logs = data.split(/[\r\n]+/);
        logs.forEach(log => {
          if (log.length > 0) {
            let obj = JSON.parse(log);
            sql += `('${obj.level}', '${obj.timestamp}', '${obj.message}'), `;
          }
        });

        // if (sql.slice(-2) === ', ') sql = sql.substring(0, sql.length - 2);
        console.log('SQL: ', sql);

        connection.query(sql, (err, result) => {
          if (err) reject(err);

          resolve();
        });
      })
    })
  ]);

  connection.end();
}

function sigtermHandler(signal) {
  uploadFiles()
  .then(() => {
    // Pass along kill signal
    process.kill(process.pid, signal)
  })
}

module.exports = sigtermHandler;
