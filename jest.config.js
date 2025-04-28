module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
  },
  transformIgnorePatterns: ['/node_modules/'],
};
