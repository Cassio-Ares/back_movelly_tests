module.exports = {
    clearMocks: true,
    testEnvironment: 'node',
    preset: 'ts-jest',
    testMatch: ['<rootDir>/src/**/tests/*.int-spec.ts'],
    globalSetup: '<rootDir>/globalSetup.int.ts',
    maxWorkers: 1 
}