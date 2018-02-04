var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

const createEchoTableQuery = 'CREATE TABLE IF NOT EXISTS echos(token VARCHAR(40) NOT NULL, sentence VARCHAR(40) NOT NULL, PRIMARY KEY ( token ))';

module.exports = {
    makeConnection:function(){
        connection.connect();
    },
    addEcho: function (key, value) {
        const insertEchoQuery = `INSERT INTO echos (token, sentence) ON DUPLICATE KEY UPDATE VALUES ('${key}', '${value}')`;
        
        // connection.connect();
        connection.query(createEchoTableQuery, function (err, result) {

        });

        connection.query(insertEchoQuery, function (err, result) {
            if (err) console.error(err);
            console.log(`insert ${key} ${value}`);
        });

    },
    deleteEcho: function (key) {
        const deleteEchoQuery = `DELETE FROM customers WHERE token = '${key}'`;
        connection.query(deleteEchoQuery, function (err, result) {

        });
    },
    selectEchos: function (callback) {
        const selectEchosQuery = 'SELECT * FROM echos';
        connection.query(createEchoTableQuery, function (err, result) {

        });
        connection.query(selectEchosQuery, function (err, result, fields) {
            var echoMap = new Map();
            Object.keys(result).forEach(function (key) {
                var row = result[key];
                var sentence = row.sentence;
                var token = row.token;
                console.log(`${token} ${sentence}`);
                echoMap.set(token, sentence);
            });
            if(typeof callback === 'function') {
                callback(echoMap);
            }
        });

    }


}

