import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Event from "./Event";
import Participant from "./Participant";

interface PembayaranAttributes {
    id?: number,
    eventId?: number | null,
    participantId?: number | null,
    has_paid?: boolean | null,

    createdAt?: Date,
    updatedAt?: Date
}

export interface PembayaranInput extends Optional<PembayaranAttributes, 'id'> { }
export interface PembayaranOutput extends Required<PembayaranAttributes> { }

class Pembayaran extends Model<PembayaranAttributes, PembayaranInput> implements PembayaranAttributes {
    public id!: number;
    public eventId!: number;
    public participantId!: number;
    public has_paid!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Pembayaran.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    participantId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    has_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }

}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});

Pembayaran.hasOne(Event);
Pembayaran.hasMany(Participant);

export default Pembayaran;