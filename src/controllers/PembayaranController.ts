import { Request, Response } from "express";

import Participant from "../db/models/Participant";
import Pembayaran from "../db/models/Pembayaran";
import Helper from "../helpers/Helper";

const Create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { participantId, eventId } = req.body;

        const data = await Pembayaran.findOne({
            where: {
                eventId: Number(eventId),
                participantId
            }
        });

        if (!data) {
            const data = await Pembayaran.create({
                eventId: Number(eventId),
                participantId,
                has_paid: true
            });
            return res.status(201).send(Helper.ResponseData(201, "Created", null, data));
        }

        data.has_paid = !data.has_paid;
        data.save()
        return res.status(201).send(Helper.ResponseData(201, "updated", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const Remove = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { participantId, eventId } = req.body;
        console.log("participatn, evnt >>>>>>>>>>>>", participantId, eventId);

        const data = await Pembayaran.findOne({
            where: {
                eventId: Number(eventId),
                participantId
            }
        });

        if (!data) {
            return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
        }
        data.has_paid = false;

        await data.save();

        return res.status(201).send(Helper.ResponseData(201, "updated", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const View = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { eventId } = req.query;
        const data = await Pembayaran.findAll({
            where: { eventId: Number(eventId) },
            include:
                [
                    {
                        model: Participant,
                        attributes: ['name'],
                        right: true
                    }
                ]
        });

        return res.status(201).send(Helper.ResponseData(201, "OK", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const ViewPaid = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { eventId, arisanId } = req.query;
        const participants = await Participant.findAll({
            where: { arisanId: Number(arisanId) },
            raw: true
        })

        console.log('participants >>>>>>>>>>>>>>>>>>>', participants);

        const pembayaran = await Pembayaran.findAll({
            where: { eventId: Number(eventId) },
            include:
                [
                    {
                        model: Participant,
                        attributes: ['name'],
                        right: true
                    }
                ]
        });

        const data = participants.map((participant) => {
            const pembayaranData = pembayaran.find((item) => item.participantId === participant.id);
            const hasPaid = pembayaranData?.has_paid
            return { ...participant, has_paid: hasPaid }
        })

        return res.status(201).send(Helper.ResponseData(201, "OK", null, data));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};


export default { Create, View, ViewPaid, Remove };