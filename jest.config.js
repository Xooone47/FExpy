module.exports = {
    bail: false,
    // testURL: 'http://localhost',
    modulePaths: ["<rootDir>/src/"],
    setupFiles: ['<rootDir>/__test__/setup.js'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
    },
    testPathIgnorePatterns: ['/node_modules/'],
    testRegex: '.*\\.test\\.js$',
    collectCoverage: true,
    collectCoverageFrom: ['src/components/**/*.{js}'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50
        },
        // './src/components/**/*.js': {
        //     branches: 40,
        //     statements: 40
        // },
        // './src/reducers/**/*.js': {
        //     statements: 90,
        // },
        // './src/api/very-important-module.js': {
        //     branches: 100,
        //     functions: 100,
        //     lines: 100,
        //     statements: 100
        // }
    },
    coverageReporters: ['text'],
    transform: {
        '^.+\\.js$': 'babel-jest'
    }
};
