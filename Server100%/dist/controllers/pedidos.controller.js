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
const pedido_model_1 = __importDefault(require("../models/pedido.model"));
class OrderController {
    constructor() {
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { cantSolic, montoTotal, nomPro, cliId } = req.body;
            let newOrder = yield pedido_model_1.default.create({
                cantSolic: cantSolic,
                montoTotal: montoTotal,
                nomPro: nomPro,
                cliId: cliId
            }, {
                fields: ['cantSolic', 'montoTotal', 'nomPro', 'cliId']
            });
            res.json({ message: 'Nuevo pedido registrado' });
        });
        this.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield pedido_model_1.default.findAll({
                    attributes: ['idped', 'cliId', 'nomPro', 'cantSolic', 'montoTotal'],
                    order: [
                        ['idped', 'ASC' /*'DESC'*/]
                    ]
                });
                res.json({ orders });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield pedido_model_1.default.findOne({
                where: { idped: id },
                attributes: ['idped', 'cliId', 'nomPro', 'cantSolic', 'montoTotal']
            });
            res.json(order);
        });
        this.deleteOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield pedido_model_1.default.destroy({
                where: {
                    idped: id
                }
            });
            res.json({ message: 'Pedido eliminado satisfactoriamente' });
        });
        this.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { cliId, nomPro, cantSolic, montoTotal } = req.body;
            const order = yield pedido_model_1.default.findOne({
                attributes: ['cantSolic', 'montoTotal', 'cliId', 'nomPro', 'idped'],
                where: { idped: id }
            });
            const updatedOrder = yield pedido_model_1.default.update({
                cantSolic: cantSolic,
                montoTotal: montoTotal,
                nomPro: nomPro,
                cliId: cliId
            }, {
                where: { idped: id }
            });
            res.json({
                message: 'Orden Actualizada',
                updatedOrder
            });
        });
        this.getOrderByClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { cliId } = req.params;
            const orders = yield pedido_model_1.default.findAll({
                attributes: ['idped', 'cliId', 'nomPro', 'cantSolic', 'montoTotal'],
                where: { cliId }
            });
            res.json({
                dataOrders: orders
            });
        });
    }
}
exports.default = OrderController;
//# sourceMappingURL=pedidos.controller.js.map