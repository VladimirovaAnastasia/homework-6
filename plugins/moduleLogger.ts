import path from 'path';
import { Compiler } from 'webpack';
import { findUnusedFiles, getAllFilesFromDir, writeFileUnusedFiles } from './utils';

type Options = {
    outputFile?: string;
}

class ModuleLogger {
    static defaultOptions = {
        outputFile: path.join(__dirname, '../unused'),
    };
    usedFiles: string[];
    options: Options;

    constructor(options?: Options) {
        this.usedFiles = [];
        this.options = {...ModuleLogger.defaultOptions, ...options};
    }

    getUsedFiles = (normalModuleFactory: any) => {
        normalModuleFactory.hooks.module.tap('ModuleLogger', (_module: any, createData: any) => {
            console.log(createData.resource);
            this.usedFiles.push(createData.resource.replace(/\\/g, '/'));
            return _module;
        });
    };

    reportUnusedFiles = async (stats: any, done: () => void) => {
        const {outputFile} = this.options;

        const initialFiles = await getAllFilesFromDir();
        const unusedFiles = findUnusedFiles(initialFiles, this.usedFiles);

        await writeFileUnusedFiles(outputFile, unusedFiles);

        done();
    };

    apply(compiler: Compiler): void {
        compiler.hooks.normalModuleFactory.tap('ModuleLogger', this.getUsedFiles);
        compiler.hooks.done.tapAsync('ModuleLogger', this.reportUnusedFiles);
    }
}

export default ModuleLogger;
