import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, test } from 'vitest';

import { exportLogsZip } from './logExport';

const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

const makeTempRoot = (): string => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lobster-log-export-'));
  tempRoots.push(root);
  return root;
};

describe('exportLogsZip', () => {
  test('keeps optional missing logs out of required missing entries', async () => {
    const root = makeTempRoot();
    const mainLog = path.join(root, 'main.log');
    const zipPath = path.join(root, 'logs.zip');
    fs.writeFileSync(mainLog, 'main log', 'utf8');

    const result = await exportLogsZip({
      outputPath: zipPath,
      entries: [
        { archiveName: 'main.log', filePath: mainLog },
        { archiveName: 'install-timing.log', filePath: path.join(root, 'install-timing.log'), optional: true },
      ],
    });

    expect(result.missingEntries).toEqual([]);
    expect(result.optionalMissingEntries).toEqual(['install-timing.log']);
    expect(fs.statSync(zipPath).size).toBeGreaterThan(0);
  });

  test('reports required missing logs as partial export entries', async () => {
    const root = makeTempRoot();
    const zipPath = path.join(root, 'logs.zip');

    const result = await exportLogsZip({
      outputPath: zipPath,
      entries: [
        { archiveName: 'main.log', filePath: path.join(root, 'main.log') },
      ],
    });

    expect(result.missingEntries).toEqual(['main.log']);
    expect(result.optionalMissingEntries).toEqual([]);
    expect(fs.statSync(zipPath).size).toBeGreaterThan(0);
  });
});
