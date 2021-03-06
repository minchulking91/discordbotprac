module.exports = {
    check: function (content) {
        return content.startsWith('!emoji');
    },
    execute: function (content) {
        var regex = /^!emoji (.*)\n?$/g;
        var result = regex.exec(content);
        if(result != null){
            var emojiString = result[1]; //hi
            var newString = emojiString.replace(/[a-z]/ig, ':regional_indicator_$&:');
            console.log(newString);
            return newString;
        }
    }
}