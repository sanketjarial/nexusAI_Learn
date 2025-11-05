import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

/**
 * Module for authentication functionality.
 * @class
 * @description Provides the authentication feature set including user authentication,
 * authorization, and security-related operations. This module encapsulates all
 * authentication-related functionality and dependencies.
 */
@Module({
    controllers: [AuthController],
})
export class AuthModule {}
