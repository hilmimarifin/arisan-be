import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect.js";
import Submenu from "./Submenu.js";

interface MasterMenuAttributes {
  id?: number,
  name?: string | null,
  icon?: string | null,
  ordering?: number | null,
  isActive?: boolean | null,

  createdAt?: Date,
  updatedAt? : Date
}

export interface MasterMenuInput extends Optional<MasterMenuAttributes, 'id'>{ }
export interface MasterMenuOutput extends Required<MasterMenuAttributes>{ }

class MasterMenu extends Model<MasterMenuAttributes, MasterMenuInput> implements MasterMenuAttributes {
  public id!: number;
  public name!: string;
  public icon!: string;
  public ordering!: number;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

MasterMenu.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  icon: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  ordering: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  isActive: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

MasterMenu.hasMany(Submenu);

export default MasterMenu;