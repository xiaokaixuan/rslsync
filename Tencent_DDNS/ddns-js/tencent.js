'use strict';

const common = require('./common');


const Tencent = module.exports = function (config) {
	this.domain = config.domain;
	this.interval_ms = config.interval_ms;
	this.token = config.token;
};

Tencent.prototype.getRecordAsync = async function () {
	const dot_pos = this.domain.indexOf('.');
	const main_domain = this.domain.substring(dot_pos + 1), sub_domain = this.domain.substring(0, dot_pos);

	const postData = `login_token=${this.token}&format=json&domain=${main_domain}&sub_domain=${sub_domain}`;
	const data = await common.httpsPostAsync('https://dnsapi.cn/Record.List', postData);
	var records = [];
	try { records = JSON.parse(data).records || []; } catch (e) {
		console.warn('[%s][Tencent][WARN]Get record error: %s', common.getTimeString(), data);
	}
	return records[0];
};

Tencent.prototype.createRecordAsync = async function (myIP) {
	const dot_pos =  this.domain.indexOf('.');
	const main_domain =  this.domain.substring(dot_pos + 1), sub_domain =  this.domain.substring(0, dot_pos);

	const postData = `login_token=${this.token}&format=json&domain=${main_domain}&sub_domain=${sub_domain}&record_type=A&record_line_id=0&value=${myIP}`;
	var record = await common.httpsPostAsync('https://dnsapi.cn/Record.Create', postData);
	try {
		record = JSON.parse(record);
		if (record.record) record = record.record;
	} catch (e) { }
	return record;
};

Tencent.prototype.modifyRecordAsync = async function (record, myIP) {
	const dot_pos = this.domain.indexOf('.');
	const main_domain = this.domain.substring(dot_pos + 1), sub_domain = this.domain.substring(0, dot_pos);

	const postData = `login_token=${this.token}&format=json&domain=${main_domain}&sub_domain=${sub_domain}&record_id=${record.id}&record_line_id=0&value=${myIP}`;
	record = await common.httpsPostAsync('https://dnsapi.cn/Record.Ddns', postData);
	try {
		record = JSON.parse(record);
		if (record.record) record = record.record;
	} catch (e) { }
	return record;
};

Tencent.prototype.runAsync = async function () {
	const myIP = await common.getIPAsync();
	if (!myIP) {
		console.warn('[%s][Tencent][WARN]MyIP: Not Found, Waiting Retry...', common.getTimeString());
		setTimeout(this.runAsync.bind(this), this.interval_ms >> 1);
		return;
	}
	var record = await this.getRecordAsync();
	if (!record) {
		record = await this.createRecordAsync(myIP);
		console.debug('[%s][Tencent][DEBUG]Create: %O', common.getTimeString(), record);
	} else if (record.value != myIP) {
		record = await this.modifyRecordAsync(record, myIP);
		console.debug('[%s][Tencent][DEBUG]Update: %O', common.getTimeString(), record);
	}
	return setTimeout(this.runAsync.bind(this), this.interval_ms);
};

