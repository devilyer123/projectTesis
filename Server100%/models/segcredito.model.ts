import Sequelize from 'sequelize';
import database from '../classes/sequelize';

const SegCredito = database.define('segCreditos', {
    idsegcre: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    tipoPago: {
        type: Sequelize.STRING
    },
    montoCred: {
        type: Sequelize.INTEGER
    },
    estadoCred: {
        type: Sequelize.STRING
    },
    cliId: {
        type: Sequelize.INTEGER
    }
})

export default SegCredito;