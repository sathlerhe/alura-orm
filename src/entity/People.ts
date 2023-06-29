import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  role: 'student' | 'professor'
}
