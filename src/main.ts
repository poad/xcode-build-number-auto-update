// eslint-disable-next-line @typescript-eslint/no-var-requires
const core = require("@actions/core");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bundleNumber = require("./bundleNumber");

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
      const currentNumber = +bundleNumber.get(path);
      nextNumber = `${currentNumber + 1}`;
    }
    core.info(`Update to ${nextNumber}`);
    bundleNumber.update(path, nextNumber);

    core.setOutput("dest-number", newNumber);
  } catch (error) {
    core.setFailed(
      error instanceof Error ? error.message : JSON.stringify(error)
    );
  }
}

run();
