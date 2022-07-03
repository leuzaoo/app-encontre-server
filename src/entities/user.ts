import { Column, Entity } from "typeorm";
import { BaseModel } from "@/entities/base";

@Entity()
export class User extends BaseModel {
  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
