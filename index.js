#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import fs from "fs";
import { exec } from "child_process";
import { chdir } from "process";

// Define the version and description
program
	.version("1.0.0")
	.description("A simple CLI with Chalk and Commander.js");

// Define a command with options
program
	.command("hi")
	.description("Greet someone")
	.action((options) => {
		const name = options.name || "Stranger";
		console.log(chalk.green(`Hello, ${name}!`));
	});

program
	.command("init")
	.description("Clones the omindui repo into a temporary folder .temp")
	.action(async () => {
    let flag = false
		if (fs.existsSync(".temp")) {
      flag = true
			console.log(chalk.cyan("Updating the UI Components"));
			fs.rmSync(".temp", { recursive: true, force: true });
		}

		await fs.mkdir(".temp", (err) => {
			if (err) {
				console.log(err);
				return;
			}

			// ? get inside temp folder and load the UI components
			chdir(".temp");
			const gitCloneCommand =
				"git clone https://github.com/devhiteshk/omindui.git";

			exec(gitCloneCommand, (error, stdout, stderr) => {
				if (error) {
					console.error(
						chalk.redBright(`Error executing command: ${gitCloneCommand}`)
					);
					console.error(chalk.red(stderr));
				} else {
					console.log(chalk.gray(stdout));
					console.log(
						`${!flag ? chalk.greenBright("UI Components loaded successfully."):chalk.cyan("UI Componets Updated Successfully")}`)
					
          flag = true
				}
			});
		});

		// ? go back to root directory
		process.cwd();
	});

program
	.command("del")
	.description("Delete the temp folder")
	.action(() => {
		process.cwd();
		fs.rmSync(".temp", { recursive: true, force: true });

		console.log(chalk.redBright("temp deleted successfully."));
	});

program
	.command("import button")
	

// Parse the command-line arguments
program.parse(process.argv);
