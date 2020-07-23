module.exports.limitLength = function (item, charLength) {
        if (item.length > charLength) {
            var output = item.substring(0, charLength) + "..."
        } else {
            output = item;
        }
        return output
    }