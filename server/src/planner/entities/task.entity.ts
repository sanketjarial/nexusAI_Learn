import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plan } from './plan.entity';

/**
 * Entity representing a task within a learning plan.
 * @class
 * @description Tasks are individual items within a plan that track specific learning objectives or activities.
 * Each task has a title, due date, and completion status, and is associated with a specific plan.
 */
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'plan_id' })
  planId: string;

  @ManyToOne(() => Plan, (plan) => plan.tasks)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'timestamptz', name: 'due_date', nullable: true })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
  completed: boolean;
}

