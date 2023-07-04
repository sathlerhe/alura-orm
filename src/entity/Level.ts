import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { SchoolClass } from './SchoolClass'

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  level_description: 'basic' | 'medium' | 'advanced'

  @OneToMany(() => SchoolClass, (schoolClass) => schoolClass.id)
  school_classes: number[]
}
