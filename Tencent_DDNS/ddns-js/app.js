'use strict';

const configs = require("./configs");
const common = require('./common');

(function main() {
	if (!configs || configs.length <= 0) {
		console.debug('[%s][Main][Debug]Please edit configs: %s', common.getTimeString(), require.resolve('./configs'));
		return;
	}
	for (const config of configs) {
		const Class = require('./' + config.type);
		new Class(config).runAsync();
	}
})();

