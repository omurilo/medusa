import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm"
import { ulid } from "ulid"
import { DbAwareColumn } from "../utils/db-aware-column"
import { UserRoles } from "./user"

@Entity()
export class Invite {
  @PrimaryColumn()
  id: string

  @Column()
  user_email: string

  @Column({type:'enum', enum: UserRoles, nullable: true, default: UserRoles.MEMBER})
  role: UserRoles

  @Column({ default: false })
  accepted: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at: Date

  @DbAwareColumn({ type: "jsonb", nullable: true })
  metadata: any

  @BeforeInsert()
  private beforeInsert() {
    if (this.id) return
    const id = ulid()
    this.id = `invite_${id}`
  }
}