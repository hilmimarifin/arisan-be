import { Request, Response } from "express";

import Word from "../db/models/Word.js";
import Helper from "../helpers/Helper.js";

const Create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { sentence, arisanId } = req.body;


        const word = await Word.create({
            sentence, arisanId
        });

        return res.status(201).send(Helper.ResponseData(201, "Created", null, word));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};


const View = async (req: Request, res: Response): Promise<Response> => {
    const { arisanId } = req.query;

    try {
        const data = await Word.findAll({ where: { arisanId: Number(arisanId) } });

        return res.status(201).send(Helper.ResponseData(201, "OK", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const Delete = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { wordId } = req.body;

        const word = await Word.findOne({
            where: {
                id: Number(wordId),
            }
        });

        if (!word) {
            return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
        }


        await word.destroy();

        return res.status(200).send(Helper.ResponseData(200, "Deleted", null, null));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }

}


export default { Create, View, Delete };