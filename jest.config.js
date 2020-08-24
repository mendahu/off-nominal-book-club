module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'db/queries/**/*.{js,ts}',
    'db/*.{js,ts}',
    'lib/**/*.{js,ts}',
    'pages/**/*.{js,jsx,ts,tsx}',
    'knexfile.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
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
  globals: {
    BASEURL: 'https://books.offnominal.space',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
