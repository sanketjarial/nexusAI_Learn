import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerController } from './planner.controller';
import { Plan } from './entities/plan.entity';
import { Task } from './entities/task.entity';

/**
 * Module for planning functionality.
 * @class
 * @description Provides the planning feature set including study plan creation,
 * task management, and progress tracking. This module encapsulates all
 * planning-related functionality and dependencies.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Plan, Task])],
  controllers: [PlannerController],
  exports: [TypeOrmModule],
})
export class PlannerModule {}
