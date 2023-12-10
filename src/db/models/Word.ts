import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect.js";
import Participant from "./Participant.js";
import Event from "./Event.js";

interface WordAttributes {
    id?: number,
    sentence?: string | null,
    arisanId?: number | null,

    createdAt?: Date,
    updatedAt?: Date
}

export interface WordInput extends Optional<WordAttributes, 'id'> { }
export interface WordOutput extends Required<WordAttributes> { }

class Word extends Model<WordAttributes, WordInput> implements WordAttributes {
    public id!: number;
    public sentence!: string;
    public arisanId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Word.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sentence: {
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

export default Word;