import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect.js";
import Participant from "./Participant.js";

interface EventAttributes {
    id?: number,
    date?: string | null,
    location?: string | null,
    arisanId?: number | null,
    is_active?: boolean | null,
    winnerParticipantId?: number | null,
    organizer?: string | null

    createdAt?: Date,
    updatedAt?: Date
}

export interface EventInput extends Optional<EventAttributes, 'id'> { }
export interface EventOutput extends Required<EventAttributes> { }

class Event extends Model<EventAttributes, EventInput> implements EventAttributes {
    public id!: number;
    public date!: string;
    public location!: string;
    public arisanId!: number;
    public is_active!: boolean;
    public winnerParticipantId!: number;
    public organizer!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Event.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    organizer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    arisanId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    winnerParticipantId: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});

// Event.belongsTo(Participant, {foreignKey: "winnerParticipantId"})
export default Event;