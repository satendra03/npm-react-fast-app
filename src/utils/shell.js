
import { execa } from "execa";
import ora from "ora";
import chalk from "chalk";
import open from "open";
import readline from "readline";

export async function installDependencies() {
  console.log(chalk.cyan("\nInstalling dependencies...\n"));
  const installSpinner = ora("Running npm install...").start();
  try {
    await execa("npm", ["install"], { stdio: "inherit" });
    installSpinner.succeed("Dependencies installed.");
  } catch (e) {
    installSpinner.fail("Failed to install dependencies.");
    throw e;
  }
}

export async function startDevServer(cwd) {
  // Start dev server and listen to its stdout
  const devProcess = execa("npm", ["run", "dev"], {
    cwd: cwd,
    stdout: "pipe",
    stderr: "inherit",
  });

  // Read stdout line by line
  const rl = readline.createInterface({
    input: devProcess.stdout,
  });

  let opened = false;
  rl.on("line", (line) => {
    console.log(line); // mirror the dev output to CLI

    // Detect and open the local server URL
    const match = line.match(/http:\/\/localhost:\d+/);
    if (match && !opened) {
      open(match[0]);
      opened = true;
    }
  });

  // Wait for the dev process to exit
  await devProcess;
}
