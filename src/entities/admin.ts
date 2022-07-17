import { Column, Entity } from "typeorm";
import { BaseModel } from "@/entities/base";

@Entity()
export class Admin extends BaseModel {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
