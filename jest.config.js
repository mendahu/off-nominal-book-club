module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "db/queries/**/*.js",
    "db/*.js",
    "lib/**/*.js",
    "pages/**/*.{js,jsx}",
    "knexfile.js"
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  }, 
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
}