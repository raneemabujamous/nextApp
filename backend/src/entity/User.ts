import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne
} from "typeorm"
@Entity("user")//entity عباره عن decoreter و user الي جوا عباره عن الاسم
export class User {
  @PrimaryGeneratedColumn()
  user_id: number
  @Column()
  first_name: string
  @Column()
  last_name: string
  @Column({ unique: true })
  email: string
  @Column({ unique: true, length: 20 })
  phone_number: string
  @Column({ nullable: true })
  image: string
  @Column()
  salt: string
  @Column()
  hash: string
  @CreateDateColumn()
  created_at: Date
  @UpdateDateColumn()
  updated_at: Date

}

