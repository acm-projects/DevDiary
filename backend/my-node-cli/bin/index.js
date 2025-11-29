#!/usr/bin/env node

import { program } from "commander";
import clipboard from "clipboardy";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import figlet from "figlet";
import mongoose from "mongoose";
import fs from "fs/promises";
import os from "os";
import path from "path";
import dotenv from 'dotenv';
import { constants } from "buffer";
dotenv.config();

//import { generateTags } from "../../backend/src/models/AutoTagger";
const configPath = path.join(os.homedir(), ".devdiary-config.txt");
const CLISchema = new mongoose.Schema({
  PastedText: String,
  project_id: String, // Storing ID as a string is often simpler
  cli_flag: Boolean,
  title: String,
  tags: [String],
  summary: String,
  explanation: String,
});



const commands = ["add", "set"];
const logs = mongoose.model("Log", CLISchema);
let projectID;
let LogName;
let tag = [];
await mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// get pastedText into the text area and pull user id

async function getID() {
  try {
    // Read the file's contents as a string
    const projectId = await fs.readFile(configPath, "utf8");
    // Trim whitespace and return the ID
    return projectId.trim();
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    console.error(chalk.red("Error reading config file:"), error);
    return null;
  }
}

async function add() {
  
  const PastedText = await clipboard.read();
  if (PastedText) {
    console.log(chalk.green("Content from clipboard:"));
    console.log(PastedText);
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Input Your Log Name:",
          default: "Untitled",
        },
      ]);
      LogName = answers.title;
      projectID = await getID();
      const Log = new logs({
        title: LogName,
        PastedText,
        tags: tag,
        cli_flag: true,
        project_id: projectID ? projectID : "",
        summary: "",
        explanation: "",
      });
      await Log.save();
      //const savedLog = await Log.save();
      /*  res.status(201).json(savedLog); */
      console.log(chalk.green("Done!"));
    } catch (error) {
      console.error("Error creating log:", error);
      /*  res.status(500).json({ message: "Internal Server Error" }); */
    }
  } else {
    console.log(chalk.yellow("Your clipboard is empty!"));
  }
}

async function addWithContext(info) {
  const PastedText = await clipboard.read();
  if (PastedText) {
    console.log(chalk.green("Content from clipboard:"));
    console.log(PastedText);
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Input Your Log Name:",
          default: "Untitled",
        },
      ]);
      LogName = answers.title;

      projectID = await getID();
      const Log = new logs({
        title: LogName,
        PastedText,
        tags: tag,
        cli_flag: true,
        project_id: projectID ? projectID : "",
        summary: info,
        explanation: "",
      });
      await Log.save();
      //const savedLog = await Log.save();
      /*  res.status(201).json(savedLog); */
      console.log(chalk.green("Done!"));
    } catch (error) {
      console.error("Error creating log:", error);
      /*  res.status(500).json({ message: "Internal Server Error" }); */
    }
  } else {
    console.log(chalk.yellow("Your clipboard is empty!"));
  }
}
// devdiary add --context
async function set(proj_id) {
  if (mongoose.Types.ObjectId.isValid(proj_id)) {
    try {
      await fs.writeFile(configPath, proj_id);
      console.log(chalk.green("Project ID Set!"));
    } catch (error) {
      console.error(chalk.red("Failed to save configuration:"), error);
    }
  }
}

async function main() {
  const PastedText = await clipboard.read();
  if (commands.indexOf(args[2]) == -1) {
    errorLog("invalid command passed");
  }

  switch (args[2]) {
    case "add":

    case "set":
    // project_id
  }
}

program.version("1.0.0").description("My Node CLI");
program.option("-add, add").option("-set, set");

// this is testing the new structure
program
  .command("add")
  .description("take information from clipboard and save them to database")
  .option("-c, --context <info>", "default")
  .option("--document")
  .option("--debug")
  .action(async (options) => {
    if (options.document) {
      tag.push("document");
    }
    if (options.debug) {
      tag.push("debug");
    }
    console.log(options.context);
    if (options.context) {
      await addWithContext(options.context);
      console.log(tag);
      tag = [];
    } else {
      await add();
      console.log(tag);
      tag = [];
    }
  });

program
  .command("set <project_id>")
  .option("-set")
  .description("set the project id for logs")
  .action((project_id) => {
    set(project_id);
  });
/* program.action(() => {
  main();
});
 */
program.parse(process.argv);