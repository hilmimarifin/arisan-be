import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Participant from "./Participant";
import Event from "./Event";
import Word from "./Word";

interface ArisanAttributes {
    id?: number,
    name?: string | null,
    is_active?: boolean | null,
    cost?: number | null,

    createdAt?: Date,
    updatedAt?: Date
}

export interface ArisanInput extends Optional<ArisanAttributes, 'id'> { }
export interface ArisanOutput extends Required<ArisanAttributes> { }

class Arisan extends Model<ArisanAttributes, ArisanInput> implements ArisanAttributes {
    public id!: number;
    public name!: string;
    public is_active!: boolean;
    public cost!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Arisan.init({
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
    cost: {
        type: DataTypes.BIGINT,
        allowNull: true
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
  },
   
}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});

Arisan.hasMany(Participant, {foreignKey: "arisanId"})
Arisan.hasMany(Event, {foreignKey: "arisanId"})
Arisan.hasMany(Word, {foreignKey: "arisanId"})

export default Arisan;