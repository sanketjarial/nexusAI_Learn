import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

/**
 * Module for user management functionality.
 * @class
 * @description Provides the user management feature set including profile management,
 * user data operations, and user-related business logic. This module encapsulates
 * all user-related functionality and dependencies.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
