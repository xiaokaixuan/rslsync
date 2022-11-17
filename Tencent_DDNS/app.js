'use strict';

const https = require('https');
const url = require('url');

const DOMAIN = process.env.DOMAIN || 'home.go-back.win';
const SLEEP_TIME = parseInt(process.env.SLEEP_TIME) || 600000;
const LOGIN_TOKEN = process.env.LOGIN_TOKEN || '328129,a8471a019745cb5c298bc4bd6a41daaa';


const httpsPostAsync = function (urlString, postJSON) {
	var postData = postJSON;
	if (typeof postJSON != 'string') {
		postData = JSON.stringify(postJSON);
	}
	return new Promise(resolve => {
		const options = url.parse(urlString);
		options.method = 'POST';
		options.headers = {
			'User-Agent': 'curl/7.49.1',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		};
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

const httpsGetAsync = function (urlString) {
	const options = url.parse(urlString);
	options.headers = {
		'User-Agent': 'curl/7.49.1'
	};
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

const GET_IP_APIS = {
	'https://www.taobao.com/help/getip.php': /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
	'https://v6r.ipip.net/?format=callback': /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
	'https://ifconfig.co': /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
};

const getIPAsync = async function () {
	for (const api_url in GET_IP_APIS) {
		const regexp_ip = GET_IP_APIS[api_url];
		const data = (await httpsGetAsync(api_url)).trim();
		const result = data.match(regexp_ip);
		if (result) return result[0];
	}
};

const getRecordsAsync = async function () {
	const dot_pos = DOMAIN.indexOf('.');
	const domain = DOMAIN.substring(dot_pos + 1), sub_domain = DOMAIN.substring(0, dot_pos);

	const postData = `login_token=${LOGIN_TOKEN}&format=json&domain=${domain}&sub_domain=${sub_domain}`;
	const data = await httpsPostAsync('https://dnsapi.cn/Record.List', postData);

	var records = [];
	try { records = JSON.parse(data).records || []; } catch (e) { }
	return records;
};

const createRecordAsync = async function (myIP) {
	const dot_pos = DOMAIN.indexOf('.');
	const domain = DOMAIN.substring(dot_pos + 1), sub_domain = DOMAIN.substring(0, dot_pos);

	const postData = `login_token=${LOGIN_TOKEN}&format=json&domain=${domain}&sub_domain=${sub_domain}&record_type=A&record_line_id=0&value=${myIP}`;
	const data = await httpsPostAsync('https://dnsapi.cn/Record.Create', postData);
	var record = null;
	try { record = JSON.parse(data).record; } catch (e) { }
	return record;
};

const modifyRecordAsync = async function (record, myIP) {
	const dot_pos = DOMAIN.indexOf('.');
	const domain = DOMAIN.substring(dot_pos + 1), sub_domain = DOMAIN.substring(0, dot_pos);

	const postData = `login_token=${LOGIN_TOKEN}&format=json&domain=${domain}&sub_domain=${sub_domain}&record_id=${record.id}&record_line_id=0&value=${myIP}`;
	const data = await httpsPostAsync('https://dnsapi.cn/Record.Ddns', postData);
	record = null;
	try { record = JSON.parse(data).record; } catch (e) { }
	return record;
};

const IS_LOOP = process.argv[2] == 'loop';

(async function mainLoop() {
	const myIP = await getIPAsync();
	if (!myIP) {
		if (IS_LOOP) {
			console.warn('[WARN]MyIP: Not Found, Waiting Retry...');
			setTimeout(mainLoop, SLEEP_TIME >> 1);
		}
		return;
	}
	const records = await getRecordsAsync();
	if (!records[0]) {
		const record = await createRecordAsync(myIP);
		console.info('[INFO]Create:', record);
	} else if (records[0].value != myIP) {
		const record = await modifyRecordAsync(records[0], myIP);
		console.info('[INFO]Modify:', record);
	}
	if (IS_LOOP) return setTimeout(mainLoop, SLEEP_TIME);
})();

