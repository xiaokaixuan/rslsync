'use strict';

const common = require('./common');


const Cloudflare = module.exports = function (config) {
	this.domain = config.domain;
	this.interval_ms = config.interval_ms;
	this.auth_email = config.auth_email;
	this.auth_key = config.auth_key;
	this.zone_id = config.zone_id;
};

Cloudflare.prototype.getRecordAsync = async function () {
	const headers = {
		'Content-Type': 'application/json',
		'X-Auth-Email': this.auth_email, 'X-Auth-Key': this.auth_key
	};
	const data = await common.httpsGetAsync(`https://api.cloudflare.com/client/v4/zones/${this.zone_id}/dns_records`, headers);
	var records = [];
	try { records = JSON.parse(data).result || []; } catch (e) {
		console.warn('[%s][Cloudflare][WARN]Get record error: %s', common.getTimeString(), data);
	}
	return records.find(it => it.name == this.domain);
};

Cloudflare.prototype.createRecordAsync = async function (myIP) {
	const headers = {
		'Content-Type': 'application/json',
		'X-Auth-Email': this.auth_email, 'X-Auth-Key': this.auth_key
	};
	const postData = {
		'content': myIP, 'name': this.domain,
		'proxied': false, 'type': 'A',
		'comment': 'DDNS', 'ttl': 600
	};
	var record = await common.httpsPostAsync(`https://api.cloudflare.com/client/v4/zones/${this.zone_id}/dns_records`, postData, headers);
	try {
		record = JSON.parse(record);
		if (record.result) record = record.result;
	} catch (e) { }
	return record;
};

Cloudflare.prototype.modifyRecordAsync = async function (record, myIP) {
	const headers = {
		'Content-Type': 'application/json',
		'X-Auth-Email': this.auth_email, 'X-Auth-Key': this.auth_key
	};
	const postData = {
		'content': myIP, 'name': this.domain,
		'proxied': false, 'type': 'A',
		'comment': 'DDNS', 'ttl': 600
	};
	var record = await common.httpsPatchAsync(`https://api.cloudflare.com/client/v4/zones/${this.zone_id}/dns_records/${record.id}`, postData, headers);
	try {
		record = JSON.parse(record).result;
		if (record.result) record = record.result;
	} catch (e) { }
	return record;
};

Cloudflare.prototype.runAsync = async function () {
	const myIP = await common.getIPAsync();
	if (!myIP) {
		console.warn('[%s][Cloudflare][WARN]MyIP: Not Found, Waiting Retry...', common.getTimeString());
		setTimeout(this.runAsync.bind(this), this.interval_ms >> 1);
		return;
	}
	var record = await this.getRecordAsync();
	if (!record) {
		record = await this.createRecordAsync(myIP);
		console.debug('[%s][Cloudflare][DEBUG]Create: %O', common.getTimeString(), record);
	} else if (record.content != myIP) {
		record = await this.modifyRecordAsync(record, myIP);
		console.debug('[%s][Cloudflare][DEBUG]Update: %O', common.getTimeString(), record);
	}
	return setTimeout(this.runAsync.bind(this), this.interval_ms);
};

