
import degit from "degit";
import ora from "ora";
import chalk from "chalk";
import { REPO_BASE } from "../constants.js";

export async function cloneTemplate(language, targetDir) {
  const langSuffix = language === "JavaScript" ? "js" : "ts";
  const repoFolder = `tailwind-shadcn-${langSuffix}`;
  const repo = `${REPO_BASE}/${repoFolder}`;

  const emitter = degit(repo, { force: true, verbose: true });
  
  console.log();
  const spinner = ora("Creating your Fast React app...").start();

  try {
    await emitter.clone(targetDir);
    spinner.succeed(chalk.green("Project created successfully!"));
  } catch (err) {
    spinner.fail(chalk.red("Failed to create project."));
    throw err;
  }
}
