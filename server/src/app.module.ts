import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PlannerModule } from './planner/planner.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ChatModule, PlannerModule, NotesModule, UsersModule, AuthModule]
})
export class AppModule {}
