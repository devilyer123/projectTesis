import { Request, Response } from "express";
import SegCredito from "../models/segcredito.model";

export default class SegCreditController {
    createCredit = async (req: Request, res: Response) => {
        const { tipoPago, montoCred, estadoCred, cliId } = req.body;
        try {
            let credit = await SegCredito.findOne({
                where: {
                    cliId: cliId
                }
            });
            if (credit) {
                res.json(credit);
                //res.json({ok: false, message: "Este usario ya tiene deudas", credit});
            } else {
                let newCredit = await SegCredito.create({
                    tipoPago: tipoPago,
                    montoCred: montoCred,
                    estadoCred: estadoCred,
                    cliId: cliId
                }, {
                    fields: [ 'tipoPago', 'montoCred', 'estadoCred', 'cliId' ]
                });
                return res.json({
                    ok: true,
                    message: 'Nuevo credito registrado'
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error inesperado',
                dataUsers: {}
            });
        }
        
    }

    getCredits = async (req: Request, res: Response) => {
        try {
            const credits = await SegCredito.findAll({
                attributes: [ 'idsegcre', 'cliId', 'tipoPago', 'montoCred', 'estadoCred' ],
                order: [
                    ['idsegcre', 'ASC' /*'DESC'*/]
                ]
            });
            res.json({credits});
        } catch (e) {
            console.log(e);
        }
    }

    getOneCredit = async (req: Request, res: Response) => {
        const { id } = req.params;        
        const credit = await SegCredito.findOne({
            where: { idsegcre: id },
            attributes: [ 'idsegcre', 'cliId', 'tipoPago', 'montoCred', 'estadoCred' ]
        });
        res.json(credit);
    }

    deleteCredit = async (req: Request, res: Response) => {
        const { id } = req.params;
        await SegCredito.destroy({
            where: {
                idsegcre: id
            }
        });
        res.json({message: 'Credito eliminado satisfactoriamente'});
    }

    updateCredit = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { cliId, tipoPago, montoCred, estadoCred } = req.body;

        const credit =  await SegCredito.findOne({
            attributes: [ 'cliId', 'tipoPago', 'montoCred', 'estadoCred', 'idsegcre' ],
            where: { idsegcre: id }
        });
        
        const updatedCredit = await SegCredito.update({
            tipoPago: tipoPago,
            montoCred: montoCred,
            estadoCred: estadoCred,
            cliId: cliId
        }, {
            where: {idsegcre: id}
        });

        res.json({
            message: 'Orden Actualizada',
            updatedCredit
        })

    }

    getCreditByClient = async (req: Request, res: Response) => {
        const { cliId } = req.params;
        const credits = await SegCredito.findOne({
            //attributes: [ 'idsegcre', 'cliId', 'tipoPago', 'montoCred', 'estadoCred' ],
            where: { cliId }
        });
        res.json(credits);
    }
}