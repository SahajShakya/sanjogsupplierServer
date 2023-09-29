import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, AllowNull, DeletedAt, BelongsTo } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "resetPasswords",
})
export class ResetPassword extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token!: string;


  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiredAt!: Date;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt!: Date;
}