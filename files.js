const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");
const { write, writeFile } = require("fs");

const createFile = async (fileName, content) => {
  const file = { fileName, content };
  const validatedData = dataValidator(file);
  if (validatedData.error) {
    console.log(
      chalk.red(
        `please specify ${validatedData.error.details[0].path} parametr`
      )
    );
    return;
  }
  if (!checkExtention(fileName).isPresent) {
    console.log(
      chalk.red(
        `sorry, this application doesn't support '${
          checkExtention(fileName).extention
        }' extention `
      )
    );
    return;
  }
  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green("file was created succesfully"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createFile };
// sorry, this application doesnt support
