"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const segcredito_model_1 = __importDefault(require("../models/segcredito.model"));
class SegCreditController {
    constructor() {
        this.createCredit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { tipoPago, montoCred, estadoCred, cliId } = req.body;
            try {
                let credit = yield segcredito_model_1.default.findOne({
                    where: {
                        cliId: cliId
                    }
                });
                if (credit) {
                    res.json(credit);
                    //res.json({ok: false, message: "Este usario ya tiene deudas", credit});
                }
                else {
                    let newCredit = yield segcredito_model_1.default.create({
                        tipoPago: tipoPago,
                        montoCred: montoCred,
                        estadoCred: estadoCred,
                        cliId: cliId
                    }, {
                        fields: ['tipoPago', 'montoCred', 'estadoCred', 'cliId']
                    });
                    return res.json({
                        ok: true,
                        message: 'Nuevo credito registrado'
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    ok: false,
                    message: 'Ha ocurrido un error inesperado',
                    dataUsers: {}
                });
            }
        });
        this.getCredits = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const credits = yield segcredito_model_1.default.findAll({
                    attributes: ['idsegcre', 'cliId', 'tipoPago', 'montoCred', 'estadoCred'],
                    order: [
                        ['idsegcre', 'ASC' /*'DESC'*/]
                    ]
                });
                res.json({ credits });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneCredit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const credit = yield segcredito_model_1.default.findOne({
                where: { idsegcre: id },
                attributes: ['idsegcre', 'cliId', 'tipoPago', 'montoCred', 'estadoCred']
            });
            res.json(credit);
        });
        this.deleteCredit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield segcredito_model_1.default.destroy({
                where: {
                    idsegcre: id
                }
            });
            res.json({ message: 'Credito eliminado satisfactoriamente' });
        });
        this.updateCredit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { cliId, tipoPago, montoCred, estadoCred } = req.body;
            const credit = yield segcredito_model_1.default.findOne({
                attributes: ['cliId', 'tipoPago', 'montoCred', 'estadoCred', 'idsegcre'],
                where: { idsegcre: id }
            });
            const updatedCredit = yield segcredito_model_1.default.update({
                tipoPago: tipoPago,
                montoCred: montoCred,
                estadoCred: estadoCred,
                cliId: cliId
            }, {
                where: { idsegcre: id }
            });
            res.json({
                message: 'Orden Actualizada',
                updatedCredit
            });
        });
        this.getCreditByClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { cliId } = req.params;
            const credits = yield segcredito_model_1.default.findOne({
                //attributes: [ 'idsegcre', 'cliId', 'tipoPago', 'montoCred', 'estadoCred' ],
                where: { cliId }
            });
            res.json(credits);
        });
    }
}
exports.default = SegCreditController;
//# sourceMappingURL=segcreditos.controller.js.map