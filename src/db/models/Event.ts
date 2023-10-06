import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface EventAttributes {
    id?: number,
    date?: string | null,
    location?: string | null,
    is_active?: boolean | null,

    createdAt?: Date,
    updatedAt?: Date
}

export interface EventInput extends Optional<EventAttributes, 'id'> { }
export interface EventOutput extends Required<EventAttributes> { }

class Event extends Model<EventAttributes, EventInput> implements EventAttributes {
    public id!: number;
    public date!: string;
    public location!: string;
    public is_active!: boolean;


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
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});

export default Event;