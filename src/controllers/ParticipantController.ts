import { Request, Response } from "express";

import Participant from "../db/models/Participant";
import Helper from "../helpers/Helper";
import Arisan from "../db/models/Arisan";

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

        const data = await Participant.findAll({include: Arisan});

        return res.status(201).send(Helper.ResponseData(201, "OK", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};


export default { Create, View};