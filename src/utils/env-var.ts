import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import path from 'path';

const configPath = path.resolve(__dirname, '..', '..', `.env.${process.env.NODE_ENV ?? 'local'}`);

expand(config({ path: configPath }));

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = +(process.env.PORT ?? 3000);
export const SESSION_SECRET = process.env.SESSION_SECRET ?? 'default_secret';
export const NODE_ENV = process.env.NODE_ENV ?? 'local';
export const LOGGING_MODE = process.env.LOGGING_MODE ?? 'silly';
export const LOGGING_LINE_TRACE: string[] = process.env.LOGGING_LINE_TRACE?.split(',') ?? ['error'];
export const LOG_DIR_PATH = path.resolve(__dirname, '../..', 'logs');
