'use strict';


module.exports.error = function (...args) {
    const prefixString = `\x1b[31m[${getTimeString()}][ERROR]\x1b[0m`;
    args[0] = prefixString + args[0];
    console.error(...args);
};

module.exports.debug = function (...args) {
    const prefixString = `\x1b[32m[${getTimeString()}][DEBUG]\x1b[0m`;
    args[0] = prefixString + args[0];
    console.debug(...args);
};

module.exports.warn = function (...args) {
    const prefixString = `\x1b[33m[${getTimeString()}][WARN]\x1b[0m`;
    args[0] = prefixString + args[0];
    console.warn(...args);
};

function getTimeString() {
    var date = new Date(), len = date.getTime();
    const offset = date.getTimezoneOffset() * 60000;
    const utcTime = len + offset;
    date = new Date(utcTime + 3600000 * 8);

    var format = 'yyyy-MM-dd hh:mm:ss';
    const o = {
        'M+': date.getMonth() + 1,                   // month
        'd+': date.getDate(),                        // day
        'h+': date.getHours(),                       // hour
        'm+': date.getMinutes(),                     // minute
        's+': date.getSeconds(),                     // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        'S': date.getMilliseconds()                  // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
};

