import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { People } from './People'
import { Level } from './Level'
import { Enrollment } from './Enrollment'

@Entity()
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  initial_date: Date

  @ManyToOne(() => People, (people) => people.id)
  professor: number

  @ManyToOne(() => Level, (level) => level.id)
  level: number

  @OneToMany(() => Enrollment, (enrollment) => enrollment.id)
  enrollments: number[]
}
