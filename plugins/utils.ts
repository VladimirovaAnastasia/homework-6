const fg = require('fast-glob');
import { writeFile } from 'fs/promises';

export const getAllFilesFromDir = async () => {
    return await fg(['src/**'], { ignore: ['*/index.html'], absolute: true });
};

export const findUnusedFiles = (initialFiles: string[], usedFiles: string[]) => {
    return initialFiles.filter((file: string) => !usedFiles.includes(file));
};

export const writeFileUnusedFiles = async (filePath: string, unusedFiles: string[]) => {
    await writeFile(filePath, JSON.stringify(unusedFiles, null, 4));
};
