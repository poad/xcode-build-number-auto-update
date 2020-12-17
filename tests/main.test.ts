import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

describe('Tests for main', () => {
  const SOURCE_INFO_PLIST_FILE = './test-project/XcodeBundleNumber/XcodeBundleNumber/Info.plist';

  const tmp = fs.mkdtempSync('test', { encoding: "utf8" });
  const INFO_PLIST_FILE = `${tmp}/Info.plist`;

  beforeEach(() => {
      fs.copyFileSync(SOURCE_INFO_PLIST_FILE, INFO_PLIST_FILE);
  });

  afterAll(() => {
      fs.rmdirSync(tmp, { recursive: true});
  });


  test('', () => {
    process.env['INPUT_PATH'] = SOURCE_INFO_PLIST_FILE;
    process.env['INPUT_NEW-NUMBER'] = '10';
    const np = process.execPath;
    const ip = path.join(__dirname, '..', 'bin', 'cli.js');
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    };
    console.log(cp.execFileSync(np, [ip], options).toString())

  });
});