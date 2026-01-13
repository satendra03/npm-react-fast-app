
import chalk from "chalk";
import boxen from "boxen";
import { CREDITS } from "../constants.js";

export function printIntro() {
  console.log();
  console.log(
    chalk.greenBright(CREDITS.intro.message, chalk.italic(CREDITS.intro.highlight))
  );
  console.log(chalk.dim(CREDITS.intro.desc));
  console.log();
}

export function printOutro() {
  console.clear();
  console.log(chalk.greenBright(CREDITS.outro.success));
  console.log(chalk.cyan(CREDITS.outro.happy));

  const creditText =
    chalk.greenBright(CREDITS.outro.createdBy) +
    "\n" +
    chalk.cyan("🔗  GitHub: ") +
    chalk.underline.blue(CREDITS.outro.githubLink);

  console.log();
  console.log(
    boxen(creditText, {
      padding: 1,
      borderColor: "cyan",
      borderStyle: "round",
      align: "center",
    })
  );
  console.log();
}
