import * as core from "@actions/core";
import * as bundleNumber from "./bundleNumber";

function run(): void {
  try {
    const path: string = core.getInput("path");
    const newNumber = core.getInput("new-number");
    const autoIncrement = core.getInput("auto-increment");

    let nextNumber;
    if (autoIncrement !== "true") {
      if (newNumber === undefined) {
        throw new Error(
          "Unless you specify true for auto-increment, new-number must be specified!"
        );
      }
      nextNumber = newNumber;
    } else {
      nextNumber = bundleNumber.get(path);
    }
    core.info(`Update to ${nextNumber}`);
    bundleNumber.update(path, nextNumber);

    core.setOutput("dest-number", newNumber);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
