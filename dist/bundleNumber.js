import * as childProcess from "child_process";
import * as fs from "fs";
export const get = (infoPlistFile) => {
    if (!fs.statSync(infoPlistFile).isFile()) {
        throw new Error(`${infoPlistFile} is not a file!`);
    }
    return childProcess
        .spawnSync(`/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${infoPlistFile}"`, {
        cwd: `${process.cwd()}`,
        stdio: ["pipe", "pipe", "pipe"],
        env: { ...process.env },
        shell: "zsh",
    })
        .stdout.toString("utf-8")
        .trim();
};
export const update = (infoPlistFile, bundleNumber) => {
    if (!fs.statSync(infoPlistFile).isFile()) {
        throw new Error(`${infoPlistFile} is not a file!`);
    }
    childProcess.execSync(`/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${bundleNumber}" "${infoPlistFile}"`, {
        cwd: `${process.cwd()}`,
        stdio: ["ignore", "inherit", "inherit"],
        env: { ...process.env },
        shell: "zsh",
    });
};
