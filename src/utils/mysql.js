const mysql = require('mysql');

var db_config = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
}

function handleDisconnect() {
  // Recreate connection
  connection = mysql.createConnection(db_config);

  // Try reconnecting again if there is an error
  connection.connect(err => {              
    if (err) {                                  
      logger.error('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                     
  });                                     
             
  // Handle 'connection lost' error (reconnect)
  connection.on('error', err => {
    logger.error('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                 
    }
  });
}

module.exports = handleDisconnect;
