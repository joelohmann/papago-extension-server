const fs = require('fs');
const connection = require('./mysql.js');

async function uploadLogs() {
  console.log("Starting log upload...");

  connection.connect(err => {              
    if (err) {                                  
      throw new Error('error when connecting to db: ' + err);
    }                                     
  });

  try {
    await Promise.all([
      // Update combined log
      new Promise((resolve, reject) => {      
        fs.readFile('./logs/combined.log', 'utf-8', (err, data) => {
          if (err) return reject(err);
  
          let logs = data.split(/[\r\n]+/);
          if (logs.length == 1 && !logs[0]) return resolve();
  
          let sql = "INSERT INTO combined_log (Time, Level, Message) VALUES ";
          
          logs.forEach((log, i) => {
            if (log.length > 0) {
              let obj = JSON.parse(log);
  
              sql += `('${obj.timestamp}', '${obj.level}', '${obj.message}')`;
              if (i !== logs.length - 2) {
                sql += ', ';
              }
            }
          });
  
          connection.query(sql, (err, result) => {
            if (err) return reject(err);
  
            resolve(result);
          });
        })
      }),
      // Update error log
      new Promise((resolve, reject) => {
        fs.readFile('./logs/error.log', 'utf-8', (err, data) => {
          if (err) return reject(err);
  
          let logs = data.split(/[\r\n]+/);
          if (logs.length == 1 && !logs[0]) return resolve();
  
          let sql = "INSERT INTO error_log (Time, Message) VALUES ";
  
          logs.forEach((log, i) => {
            if (log.length > 0) {
              let obj = JSON.parse(log);
  
              sql += `('${obj.timestamp}', '${obj.message}')`;
              if (i !== logs.length - 2) {
                sql += ', ';
              }
            }
          });
  
          connection.query(sql, (err, result) => {
            if (err) return reject(err);
  
            resolve(result);
          });
        })
      })
    ]);

    console.log("Logs successfully uploaded.");
    connection.end();
  } catch (err) {
    console.log("Error: " + err);
    connection.end();
  }
}

module.exports = uploadLogs;
