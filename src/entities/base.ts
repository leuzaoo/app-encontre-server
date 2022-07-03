import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
