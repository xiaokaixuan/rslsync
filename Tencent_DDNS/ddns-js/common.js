'use strict';

const https = require('https'), url = require('url');

module.exports = exports = {};

const httpsPostAsync = exports.httpsPostAsync = function (urlString, postJSON, headers) {
	var postData = postJSON;
	if (typeof postJSON != 'string') {
		postData = JSON.stringify(postJSON);
	}
	return new Promise(resolve => {
		const options = url.parse(urlString);
		options.rejectUnauthorized = false;
		options.method = 'POST';
		options.headers = {
			'User-Agent': 'curl/7.49.1',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		};
		if (headers) Object.assign(options.headers, headers);
		const req = https.request(options, res => {
			res.setEncoding('utf8');
			var data = '';
			res.on('data', d => data += d);
			res.on('end', () => resolve(data));
		});
		req.on('error', () => resolve(''));
		req.setTimeout(60000, () => resolve(''));
		req.write(postData);
		req.end();
	});
};

const httpsGetAsync = exports.httpsGetAsync = function (urlString, headers) {
	const options = url.parse(urlString);
	options.rejectUnauthorized = false;
	options.headers = {
		'User-Agent': 'curl/7.49.1'
	};
	if (headers) Object.assign(options.headers, headers);
	return new Promise(resolve => {
		return https.get(options, (res) => {
			res.setEncoding('utf8');
			var data = '';
			res.on('data', d => data += d);
			res.on('end', () => resolve(data));
		}).on('error', () => resolve(''))
			.setTimeout(60000, () => resolve(''));
	});
};

const httpsPatchAsync = exports.httpsPatchAsync = function (urlString, postJSON, headers) {
	var postData = postJSON;
	if (typeof postJSON != 'string') {
		postData = JSON.stringify(postJSON);
	}
	return new Promise(resolve => {
		const options = url.parse(urlString);
		options.rejectUnauthorized = false;
		options.method = 'PATCH';
		options.headers = {
			'User-Agent': 'curl/7.49.1',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		};
		if (headers) Object.assign(options.headers, headers);
		const req = https.request(options, res => {
			res.setEncoding('utf8');
			var data = '';
			res.on('data', d => data += d);
			res.on('end', () => resolve(data));
		});
		req.on('error', () => resolve(''));
		req.setTimeout(60000, () => resolve(''));
		req.write(postData);
		req.end();
	});
};

const GET_IP_APIS = exports.GET_IP_APIS = {
	'https://www.taobao.com/help/getip.php': /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
	'https://v6r.ipip.net/?format=callback': /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
	'https://ifconfig.co': /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
	'https://ifconfig.me': /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
};

const getIPAsync = exports.getIPAsync = async function () {
	for (const api_url in GET_IP_APIS) {
		const regexp_ip = GET_IP_APIS[api_url];
		const data = (await httpsGetAsync(api_url)).trim();
		const result = data.match(regexp_ip);
		if (result) return result[0];
	}
};

const getTimeString = exports.getTimeString = function () {
    var date = new Date(), len = date.getTime();
    const offset = date.getTimezoneOffset() * 60000;
    const utcTime = len + offset;
    date = new Date(utcTime + 3600000 * 8);

    var format = 'yyyy-MM-dd hh:mm:ss';
    const o = {
      'M+': date.getMonth() + 1, 	// month
      'd+': date.getDate(), 		// day
      'h+': date.getHours(), 		// hour
      'm+': date.getMinutes(), 		// minute
      's+': date.getSeconds(), 		// second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
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

