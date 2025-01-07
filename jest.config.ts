import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Указывает Jest использовать ts-jest
    testEnvironment: 'jsdom', // Устанавливает окружение
    moduleFileExtensions: ['ts', 'js'], // Расширения файлов
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Преобразование TypeScript файлов
    },
};

export default config;