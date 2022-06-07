import * as fs from 'fs';
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path';
import {
  describe, beforeEach, afterAll, expect, test,
} from '@jest/globals';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Update Bundle Number action', () => {
  const SOURCE_INFO_PLIST_FILE = './test-project/XcodeBundleNumber/XcodeBundleNumber/Info.plist';

  const tmp = fs.mkdtempSync('test', { encoding: "utf8" });
  const INFO_PLIST_FILE = `${tmp}/Info.plist`;

  beforeEach(() => {
    fs.copyFileSync(SOURCE_INFO_PLIST_FILE, INFO_PLIST_FILE);
  });

  afterAll(() => {
    fs.rmdirSync(tmp, { recursive: true });
  });

  test('should current bundleNumber is 5.', (): void => {
    process.env['INPUT_PATH'] = INFO_PLIST_FILE
    process.env['INPUT_NEW-NUMBER'] = '5'
    const np = process.execPath
    const ip = path.join(dirname, '..', 'dist', 'main.js')
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    }
    cp.execFileSync(np, [ip], options).toString()
  });


});
