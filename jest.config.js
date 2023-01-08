module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],
  testRegex: '(./components/*/.*(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jest-environment-jsdom'
};