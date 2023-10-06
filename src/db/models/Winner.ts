import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Participant from "./Participant";
import Event from "./Event";

interface WinnerAttributes {
    id?: number,
    participantId?: number | null,
    eventId?: number | null,
    createdAt?: Date,
    updatedAt?: Date
}

export interface WinnerInput extends Optional<WinnerAttributes, 'id'> { }
export interface WinnerOutput extends Required<WinnerAttributes> { }

class Winner extends Model<WinnerAttributes, WinnerInput> implements WinnerAttributes {
    public id!: number;
    public participantId!: number;
    public eventId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Winner.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    participantId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    eventId: {
      type: DataTypes.NUMBER,
      allowNull: true
  },
   
}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});

Winner.hasOne(Participant);
Winner.hasOne(Event);

export default Winner;