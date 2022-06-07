import * as bundleNumber from "../src/bundleNumber";
import * as fs from 'fs';
import {
    describe, beforeEach, afterAll, expect, test,
} from '@jest/globals';
import { fail } from "assert";

describe('Update Bundle Number', () => {
    const SOURCE_INFO_PLIST_FILE = './test-project/XcodeBundleNumber/XcodeBundleNumber/Info.plist';

    const tmp = fs.mkdtempSync('test', { encoding: "utf8" });
    const INFO_PLIST_FILE = `${tmp}/Info.plist`;

    beforeEach(() => {
        fs.copyFileSync(SOURCE_INFO_PLIST_FILE, INFO_PLIST_FILE);
    });

    afterAll(() => {
        fs.rmdirSync(tmp, { recursive: true});
    });

    test('should current bundleNumber is 1.', (): void => {
        const actual = bundleNumber.get(INFO_PLIST_FILE);
        expect(actual).toBe('1');
    });

    test('should bundleNumber is 3 after update.', (): void => {
        expect(bundleNumber.get(INFO_PLIST_FILE)).toBe('1');
        bundleNumber.update(INFO_PLIST_FILE, '3');
        expect(bundleNumber.get(INFO_PLIST_FILE)).toBe('3');
    });

    test('should error to get.', (): void => {
        fs.unlinkSync(INFO_PLIST_FILE);
        try {
            bundleNumber.get(INFO_PLIST_FILE);
            fail();
        } catch (error) {
            // ok
        }
    });

    test('should error to update.', (): void => {
        fs.unlinkSync(INFO_PLIST_FILE);
        try {
            bundleNumber.update(INFO_PLIST_FILE, '10');
            fail();
        } catch (error) {
            // ok
        }
    });


});
