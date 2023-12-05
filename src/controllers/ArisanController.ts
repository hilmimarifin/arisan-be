import { Request, Response } from "express";

import Arisan from "../db/models/Arisan";
import Helper from "../helpers/Helper";
import Participant from "../db/models/Participant";
import Event from "../db/models/Event";
import Word from "../db/models/Word";

const Create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, cost } = req.body;


        const arisan = await Arisan.create({
            name, cost,
            is_active: true
        });

        return res.status(201).send(Helper.ResponseData(201, "Created", null, arisan));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const Detail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { arisanId } = req.query;
        const data = await Arisan.findOne({
            where: { id: Number(arisanId) },
            include: [
                {
                    model: Participant,
                    required: false,
                    attributes: ['name', 'id']
                },
                {
                    model: Event,
                    attributes: ['location', 'date', 'id', "createdAt", "winnerParticipantId", "organizer"],
                    include: [{
                        model: Participant,
                        required: false,
                        attributes: ['name', 'id']
                    },],
                    required: false,
                    where: {
                        is_active: true
                    },
                    order: [["createdAt", "DESC"]]
                },
                {
                    model: Word,
                    required: false,
                    attributes: ['sentence', 'id']
                },
            ]
        });

        return res.status(201).send(Helper.ResponseData(201, "OK", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const View = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = await Arisan.findAll({ where: { is_active: true } });

        return res.status(201).send(Helper.ResponseData(201, "OK", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const Delete = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { arisanId } = req.body;
        console.log("arisanID", arisanId);

        const arisan = await Arisan.findOne({
            where: {
                id: Number(arisanId),
            }
        });

        if (!arisan) {
            return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
        }

        arisan.is_active = false;

        await arisan.save();

        return res.status(200).send(Helper.ResponseData(200, "Deleted", null, null));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }

};


export default { Create, Detail, View, Delete };