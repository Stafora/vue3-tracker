import type { Config } from 'jest';
import { resolve } from 'path';

const ROOT_DIR = resolve(__dirname, '..'); // Корень проекта
const SRC_DIR = resolve(ROOT_DIR, 'src'); // Код проекта
const TESTS_DIR = resolve(ROOT_DIR, 'tests'); // Тесты

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: ROOT_DIR, // Корень проекта
  roots: [SRC_DIR, TESTS_DIR], // Где искать тесты
  moduleNameMapper: {
    '^@/tests/(.*)$': resolve(TESTS_DIR, '$1'), // Алиас для тестов
    '^@/(.*)$': resolve(SRC_DIR, '$1'), // Алиас для кода проекта
  },
};

export default config;
