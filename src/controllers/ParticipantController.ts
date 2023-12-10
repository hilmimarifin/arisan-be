import { Request, Response } from "express";

import Participant from "../db/models/Participant.js";
import Helper from "../helpers/Helper.js";
import Arisan from "../db/models/Arisan.js";
import Event from "../db/models/Event.js";

const Create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, arisanId } = req.body;


        const data = await Participant.create({
            name,
            arisanId
        });

        return res.status(201).send(Helper.ResponseData(201, "Created", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const View = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { arisanId } = req.query;
        const resp = await Participant.findAll({
            where: { arisanId: Number(arisanId) },
            raw: true,
            include:
                [
                    {
                        model: Event,
                        attributes: ['location'],
                    },
                ]
        });
        const data = resp as any
        const updatedData = data.map((item: any) => {
            const { "Event.location": eventLocation, ...rest } = item;
            return { ...rest, winLocation: eventLocation };
          });

        return res.status(201).send(Helper.ResponseData(201, "OK", null, updatedData));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};


export default { Create, View };