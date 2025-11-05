import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1699999999999 implements MigrationInterface {
  name = 'InitialSchema1699999999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable vector extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text,
        email text UNIQUE NOT NULL,
        password_hash text NOT NULL,
        created_at timestamptz DEFAULT now()
      );
    `);

    // Create notes table
    await queryRunner.query(`
      CREATE TABLE notes (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title text,
        body text,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now(),
        embedding vector(1536)
      );
    `);

    // Create conversations table
    await queryRunner.query(`
      CREATE TABLE conversations (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title text,
        created_at timestamptz DEFAULT now()
      );
    `);

    // Create messages table
    await queryRunner.query(`
      CREATE TABLE messages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
        sender text NOT NULL,
        content text,
        meta jsonb,
        created_at timestamptz DEFAULT now()
      );
    `);

    // Create plans table
    await queryRunner.query(`
      CREATE TABLE plans (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title text,
        metadata jsonb,
        created_at timestamptz DEFAULT now()
      );
    `);

    // Create tasks table
    await queryRunner.query(`
      CREATE TABLE tasks (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        plan_id uuid NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
        title text,
        due_date timestamptz,
        completed boolean DEFAULT false
      );
    `);

    // Create indexes for better performance
    await queryRunner.query(`CREATE INDEX idx_notes_user_id ON notes(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_conversations_user_id ON conversations(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);`);
    await queryRunner.query(`CREATE INDEX idx_plans_user_id ON plans(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_tasks_plan_id ON tasks(plan_id);`);
    
    // Vector similarity search index for notes embeddings
    await queryRunner.query(`CREATE INDEX ON notes USING ivfflat (embedding vector_cosine_ops);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE IF EXISTS tasks CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS plans CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS messages CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS conversations CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS notes CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS users CASCADE;`);
    
    // Drop vector extension
    await queryRunner.query(`DROP EXTENSION IF EXISTS vector CASCADE;`);
  }
}

