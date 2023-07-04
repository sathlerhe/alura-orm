import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { People } from './People'
import { SchoolClass } from './SchoolClass'

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  status: string

  @ManyToOne(() => People, (people) => people.id)
  student: number

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.id)
  school_class: number
}
