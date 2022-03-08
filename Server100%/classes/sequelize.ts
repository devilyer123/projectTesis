import { Sequelize } from "sequelize/dist";

const database = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'ProjectTesis',
    username: 'postgres',
    password: 'rolo123'
});

export default database;