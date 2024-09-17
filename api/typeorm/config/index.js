"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: ['typeorm/migrations/*.js'],
    entities: ['dist/*/entities/*.entity.js'],
});
exports.default = AppDataSource;
//# sourceMappingURL=index.js.map
