module.exports = {
    bail: false,
    // testURL: 'http://localhost',
    modulePaths: ['<rootDir>/src/'],
    setupFiles: ['<rootDir>/__test__/setup.js'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testRegex: '.*\\.test\\.js$',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/index.js',
        '!src/(api|components|containers|hocs|reducers|regions|selectors|utils)/index.js',
        '!src/(actions|dicts|enums|links|styles|urls)/**'
    ],
    coverageDirectory: '__coverage__',
    coverageThreshold: {
        // global: {
        //     branches: 50,
        //     functions: 50,
        //     lines: 50,
        //     statements: 50
        // },
        // 'src/components/**/*.js': {
        //     branches: 10,
        //     statements: 10,
        //     functions: 10
        // },
        // 'src/(utils)/**/*.js': {
        //     branches: 100,
        //     statements: 100,
        //     functions: 100
        // }
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
    transform: {
        '^.+\\.js$': 'babel-jest'
    }
};
