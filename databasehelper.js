var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

// connection.connect();

// connection.query('SELECT key AS solution', function (err, rows, fields) {
//     if (err) throw err;

//     console.log('The solution is: ', rows[0].solution);
// });

// connection.end();
var createEchoTableQuery = 'CREATE TABLE IF NOT EXISTS echos(token VARCHAR(40) NOT NULL, sentence VARCHAR(40) NOT NULL, PRIMARY KEY ( token ))';

module.exports = {
    addEcho: function (key, value) {
        
        // connection.connect();
        connection.query(createEchoTableQuery, function (err, result){

        });

        connection.query(`INSERT INTO echos ${key}, ${value}`, function (err, result) {
            if (err) console.error(err);
            console.log(`insert ${key} ${value}`);
        });

        // connection.end();
    },
    selectEchos:function(){
        var echoMap = new Map();
        connection.connect();
        connection.query(createEchoTableQuery, function (err, result){

        });
        connection.query('SELECT * FROM echos', function(err, result, fields){
            console.log(result);
        });

        return echoMap;
    }
}

