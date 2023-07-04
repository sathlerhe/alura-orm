import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { SchoolClass } from './SchoolClass'
import { Enrollment } from './Enrollment'

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  active: boolean

  @Column()
  email: string

  @Column()
  role: 'student' | 'professor'

  @OneToMany(() => SchoolClass, (schoolclass) => schoolclass.id)
  school_classes: number[]

  @OneToMany(() => Enrollment, (enrollment) => enrollment.id)
  enrollments: number[]
}
