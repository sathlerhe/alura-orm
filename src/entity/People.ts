import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}
