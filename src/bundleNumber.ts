import * as childProcess from "child_process";

export const get = (infoPlistFile: string): string =>
  childProcess
    .spawnSync(
      `/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${infoPlistFile}"`,
      {
        cwd: `${process.cwd()}`,
        stdio: ["ignore", "inherit", "inherit"],
        env: { ...process.env },
        shell: "zsh",
      }
    )
    .stdout.toString();

export const update = (bundleNumber: string, infoPlistFile: string): void => {
  childProcess.execSync(
    `/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${bundleNumber}" "${infoPlistFile}"`,
    {
      cwd: `${process.cwd()}`,
      stdio: ["ignore", "inherit", "inherit"],
      env: { ...process.env },
      shell: "zsh",
    }
  );
};
