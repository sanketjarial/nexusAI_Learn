import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerController } from './planner.controller';
import { Plan } from './entities/plan.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Task])],
  controllers: [PlannerController],
  exports: [TypeOrmModule],
})
export class PlannerModule {}
