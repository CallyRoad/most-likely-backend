import {pathsToModuleNameMapper} from "ts-jest";
import {compilerOptions} from "./tsconfig.json"


export default {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: ['**/*.test.ts'],
    verbose: true,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
};
