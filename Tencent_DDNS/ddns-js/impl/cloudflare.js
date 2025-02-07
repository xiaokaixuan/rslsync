'use strict';

const request = require('../lib/request'), logger = require('../lib/logger');


const Cloudflare = module.exports = function (config) {
    this.domain = config.domain;
    this.interval_ms = config.interval_ms;
    this.token = config.token;
    this.zone_id = config.zone_id;
};

Cloudflare.prototype.getRecordAsync = async function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
    };
    const data = await request.httpsGetAsync(`https://api.cloudflare.com/client/v4/zones/${this.zone_id}/dns_records`, headers);
    var records = [];
    try { records = JSON.parse(data).result || []; } catch {
        logger.error('[Cloudflare]Get record error: %s', data);
    }
    return records.find(it => it.name == this.domain);
};

Cloudflare.prototype.createRecordAsync = async function (myIP) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
    };
    const postData = {
        'content': myIP, 'name': this.domain,
        'proxied': false, 'type': 'A',
        'comment': 'DDNS', 'ttl': 600
    };
    var record = await request.httpsPostAsync(`https://api.cloudflare.com/client/v4/zones/${this.zone_id}/dns_records`, postData, headers);
    try {
        record = JSON.parse(record);
        if (record.result) record = record.result;
    } catch { }
    return record;
};

Cloudflare.prototype.modifyRecordAsync = async function (record, myIP) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
    };
    const postData = {
        'content': myIP, 'name': this.domain,
        'proxied': false, 'type': 'A',
        'comment': 'DDNS', 'ttl': 600
    };
    var record = await request.httpsPatchAsync(`https://api.cloudflare.com/client/v4/zones/${this.zone_id}/dns_records/${record.id}`, postData, headers);
    try {
        record = JSON.parse(record).result;
        if (record.result) record = record.result;
    } catch { }
    return record;
};

Cloudflare.prototype.runAsync = async function () {
    const myIP = await request.getIPAsync();
    if (!myIP) {
        logger.warn('[Cloudflare]MyIP: Not Found, Waiting Retry...');
        setTimeout(this.runAsync.bind(this), this.interval_ms >> 1);
        return;
    }
    var record = await this.getRecordAsync();
    if (!record) {
        record = await this.createRecordAsync(myIP);
        logger.debug('[Cloudflare]Create: %O', record);
    } else if (record.content != myIP) {
        record = await this.modifyRecordAsync(record, myIP);
        logger.debug('[Cloudflare]Update: %O', record);
    }
    return setTimeout(this.runAsync.bind(this), this.interval_ms);
};

