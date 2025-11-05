import { Controller } from '@nestjs/common';

/**
 * Controller handling note-related HTTP requests.
 * @class
 * @description Provides endpoints for managing user notes, including creation, retrieval,
 * updating, and deletion of notes. This controller will integrate with vector search
 * capabilities for semantic note retrieval.
 */
@Controller('notes')
export class NotesController {}
