'use strict';

const configs = require("./configs"), logger = require('./lib//logger');

(function main() {
    if (!configs || configs.length <= 0) {
        logger.warn('[Main]Please edit configs: %s', require.resolve('./configs'));
        return;
    }
    for (const config of configs) {
        const Class = require('./impl/' + config.type);
        new Class(config).runAsync();
    }
})();

