import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';

/**
 * Module for note management functionality.
 * @class
 * @description Provides the notes feature set including note creation,
 * retrieval, and vector search capabilities. This module encapsulates
 * all note-related functionality and dependencies.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  exports: [TypeOrmModule],
})
export class NotesModule {}
