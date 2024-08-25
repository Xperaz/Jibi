const { ConfigService } = require('@nestjs/config');
const { getPostgresConfig } = require('./src/modules/config/dbConfig');

const configService = new ConfigService();
module.exports = getPostgresConfig(configService);
