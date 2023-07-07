import {
  Column,
  Entity,
  JoinColumn,
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

  @Column({ name: 'professorId' })
  professorId: number

  @Column({ name: 'levelId' })
  levelId: number

  @ManyToOne(() => People, (people) => people.id)
  @JoinColumn({ name: 'professorId' })
  professor: number

  @ManyToOne(() => Level, (level) => level.id)
  @JoinColumn({ name: 'levelId' })
  level: number

  @OneToMany(() => Enrollment, (enrollment) => enrollment.id)
  enrollments: number[]
}
