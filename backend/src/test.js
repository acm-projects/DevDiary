#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import figlet from "figlet";
import clipboard from "clipboardy";
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  PastedText: String,
  id: Number,
});

const logs = mongoose.model("Log", logSchema);

// get pastedText into the text area and pull user id
async function main() {
  try {
    await mongoose.connect("url", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const PastedText = await clipboard.read();

    if (PastedText) {
      console.log(chalk.green("Content from clipboard:"));
      console.log(PastedText);
      const Log = new logs({
        PastedText: PastedText,
        id: 1,
      });
      await Log.save()
        .then(() => console.log("Posted to Database"))
        .catch((error) => console.error("Error during post:", error));
    } else {
      console.log(chalk.yellow("Your clipboard is empty!"));
    }
  } catch (error) {
    console.error(chalk.red("Could not connect to Mongo Database:"), error);
  }
}

/*
 const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: password,
                }),
*/
program.version("1.0.0").description("My Node CLI");

program.action(() => {
  main();
  /* inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: ["Option 1", "Option 2", "Option 3"],
      },
    ])
    .then((result) => {
      const spinner = ora(`Doing ${result.choice}...`).start(); // Start the spinner

      setTimeout(() => {
        spinner.succeed(chalk.green("Done!"));
      }, 3000);
    }); */
});

program.parse(process.argv);
