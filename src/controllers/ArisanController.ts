import { Request, Response } from "express";

import Arisan from "../db/models/Arisan";
import Helper from "../helpers/Helper";

const Create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name } = req.body;


        const arisan = await Arisan.create({
            name,
            is_active: true
        });

        return res.status(201).send(Helper.ResponseData(201, "Created", null, arisan));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};


export default { Create};