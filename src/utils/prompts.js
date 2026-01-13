
import enquirer from "enquirer";
import chalk from "chalk";
import { DEFAULT_PROJECT_NAME } from "../constants.js";

const { prompt } = enquirer;

export async function getProjectName(arg) {
  console.log();
  if (arg) return arg;

  const response = await prompt({
    type: "input",
    name: "projectName",
    message: chalk.cyan("Project name?\n", chalk.gray.italic("use '.' for current folder:\n")),
    initial: DEFAULT_PROJECT_NAME,
  });

  console.log();
  return response.projectName;
}

export async function getLanguage(arg) {
  console.log();
  if (arg === "--js") return "JavaScript";
  if (arg === "--ts") return "TypeScript";

  const response = await prompt({
    type: "select",
    name: "language",
    message: chalk.cyan("Choose your language:"),
    choices: [
      {
        name: "JavaScript",
        message: chalk.yellow("JavaScript"),
        value: "JavaScript",
      },
      {
        name: "TypeScript",
        message: chalk.blue("TypeScript"),
        value: "TypeScript",
      },
    ],
  });

  console.log();
  return response.language;
}
