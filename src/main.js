
import path from "path";
import { printIntro, printOutro } from "./utils/logger.js";
import { getProjectName, getLanguage } from "./utils/prompts.js";
import { cloneTemplate } from "./utils/git.js";
import { installDependencies, startDevServer } from "./utils/shell.js";
import chalk from "chalk";

export async function run() {
  console.log("Running... the lastest version #2");
  const args = process.argv.slice(2);
  let projectNameArg = null;
  let langArg = null;

  // Parse CLI args
  args.forEach((arg) => {
    if (arg === "--js") langArg = "--js";
    else if (arg === "--ts") langArg = "--ts";
    else if (!arg.startsWith("--")) projectNameArg = arg;
  });

  printIntro();

  try {
    const projectName = await getProjectName(projectNameArg);
    const targetDir = projectName === "." ? "." : path.join(process.cwd(), projectName);
    
    // Check if target directory is empty or safe to overwrite? 
    // The previous implementation didn't explicitly check, but degit handles non-empty dirs with force: true?
    // Actually degit throws if not empty unless force is used. The previous code used { force: true }.
    
    const language = await getLanguage(langArg);

    await cloneTemplate(language, targetDir);

    // Install dependencies
    if (projectName !== ".") {
      process.chdir(projectName);
    }

    await installDependencies();

    printOutro();

    const projectPath = process.cwd();
    await startDevServer(projectPath);

  } catch (error) {
    console.error(chalk.red("\nAn unexpected error occurred:"));
    console.error(error);
    process.exit(1);
  }
}
