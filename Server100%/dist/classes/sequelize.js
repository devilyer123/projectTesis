"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("sequelize/dist");
const database = new dist_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'ProjectTesis',
    username: 'postgres',
    password: 'rolo123'
});
exports.default = database;
//# sourceMappingURL=sequelize.js.map