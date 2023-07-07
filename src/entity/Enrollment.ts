import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { People } from './People'
import { SchoolClass } from './SchoolClass'

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  status: string

  @Column({ name: 'school_class_id' })
  school_class_id: string

  @ManyToOne(() => People, (people) => people.id)
  student: number

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.id)
  @JoinColumn({ name: 'school_class_id' })
  school_class: number
}
