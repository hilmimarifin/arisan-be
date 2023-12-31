import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect.js";
import Event from "./Event.js";

interface ParticipantAttributes {
    id?: number,
    name?: string | null,
    arisanId?: number | null,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ParticipantInput extends Optional<ParticipantAttributes, 'id'> { }
export interface ParticipantOutput extends Required<ParticipantAttributes> { }

class Participant extends Model<ParticipantAttributes, ParticipantInput> implements ParticipantAttributes {
    public id!: number;
    public name!: string;
    public arisanId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Participant.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    arisanId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },


}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});
Participant.hasOne(Event, { foreignKey: "winnerParticipantId" })
Event.belongsTo(Participant, {foreignKey: "winnerParticipantId"})
// Participant.hasMany(Pembayaran, {foreignKey: "participantId"})
export default Participant;