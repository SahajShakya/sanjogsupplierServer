import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from "sequelize-typescript";
import { UserDetails } from "./userdetails";

@Table({
  timestamps: true,
  tableName: "users",
})
export class Users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  verified!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  verificationToken!: string;


  //Associations
  @HasOne(() => UserDetails )
  userdetails!: UserDetails;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
