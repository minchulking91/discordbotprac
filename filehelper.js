var fs = require('fs');
var echoFile = './echoDictionary.json'

module.exports = {
    readEchoDictionary: function (callback) {
        fs.readFile(echoFile, 'utf-8',function(error, data){
            if(error != null){
                console.error(error);
            }else{
                var json = JSON.parse(data);
                var map = objToStrMap(json);
                callback(map);
            }
        });
    },
    writeEchoDictionary: function (obj, callback) {
        var jsonObj = strMapToObj(obj);
        var jsonString = JSON.stringify(jsonObj);
        console.log(jsonString);
        fs.writeFile(echoFile, jsonString, 'utf-8', function(error){
            callback(error);
        });
    }
}

function strMapToObj(strMap) {
    const obj = Object.create(null);
    for (const [k,v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj[k] = v;
    }
    return obj;
}

function objToStrMap(obj) {
    const strMap = new Map();
    for (const k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
