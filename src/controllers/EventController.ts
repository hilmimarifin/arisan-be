import { Request, Response } from "express";

import Participant from "../db/models/Participant";
import Helper from "../helpers/Helper";
import Arisan from "../db/models/Arisan";
import Event from "../db/models/Event";
import Pembayaran from "../db/models/Pembayaran";

const Create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { date, location, is_active, arisanId, organizer } = req.body;

        const data = await Event.create({
            date, location, is_active, arisanId, organizer
        });

        return res.status(201).send(Helper.ResponseData(201, "Created", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const View = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { arisanId } = req.query;
        const data = await Event.findAll({ where: { arisanId: Number(arisanId) } });

        return res.status(201).send(Helper.ResponseData(201, "OK", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const Detail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { eventId, arisanId } = req.query;
        const arisan = await Arisan.findOne({ where: { id: Number(arisanId) }, raw: true })
        const { count } = await Pembayaran.findAndCountAll({ where: { eventId: Number(eventId), has_paid: true } })

        const resp = await Event.findOne({
            where: { id: Number(eventId) },
            raw: true,
            include: [
                {
                    model: Participant,
                    attributes: ['name']
                },
            ]
        });

        const { winnerParticipantId, ...data } = resp as any;
        data.winner = data['Participant.name']
        if (arisan?.cost !== undefined) {
            data.total_paid = arisan?.cost * count
        }
        delete data['Participant.name'];

        return res.status(201).send(Helper.ResponseData(201, "OK", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const SetWinner = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { winnerParticipantId, eventId } = req.body;

        const event = await Event.findOne({
            where: {
                id: Number(eventId),
            }
        });

        if (!event) {
            return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
        }

        event.winnerParticipantId = winnerParticipantId;

        await event.save();

        return res.status(200).send(Helper.ResponseData(200, "Updated", null, null));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }

};

const Delete = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { eventId } = req.body;

        const event = await Event.findOne({
            where: {
                id: Number(eventId),
            }
        });

        if (!event) {
            return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
        }

        event.is_active = false;

        await event.save();

        return res.status(200).send(Helper.ResponseData(200, "Deleted", null, null));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }

};


export default { Create, View, Detail, SetWinner, Delete };