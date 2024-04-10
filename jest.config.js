module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/controllers/*.ts'
    ],
    coverageDirectory:'coverage',
    testEnvironment: 'node',
    coverageReporters: [
        "text-summary",
        "lcov"
    ], 

    preset: 'ts-jest',
    testMatch: ['<rootDir>/src/tests/*.spec.ts']
}