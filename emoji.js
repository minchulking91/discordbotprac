module.exports = {
    check: function (content) {
        return content.startsWith('!emoji');
    },
    execute: function (content) {
        var regex = /^!emoji (.*)\n?$/g;
        var result = regex.exec(content);
        if(result != null){
            var emojiString = result[1]; //hi
            var newString = emojiString.replace(/\s/i, ':regional_indicator_$1:');
            console.log(newString);
            return newString;
        }
    }
}