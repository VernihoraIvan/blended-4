const fs = require("fs/promises");
const path = require("path");
const dataValidator = require("./helpers/dataValidator.js");
const checkExtenstion = require("./helpers/checkExtention.js");

async function createFile(req, res) {
  const validatedData = dataValidator(req.body);

  if (validatedData.error) {
    res.status(400).json({ message: "invalid data" });

    return;
  }

  // console.log(checkExtenstion(req.body));
  if (!checkExtenstion(req.body.fileName).isPresent) {
    res.status(400).json({ message: "extention is absent" });

    return;
  }

  const filePath = path.join(__dirname, "./files", req.body.fileName);
  try {
    await fs.writeFile(filePath, req.body.content, "utf-8");
    res.status(201).json({ message: "file created" });
  } catch (error) {
    res.status(500).json({ message: "serverside failure" });
  }
}

async function getFiles(req, res) {
  const folderPath = path.join(__dirname, "files");
  const dataPath = await fs.readdir(folderPath);

  if (!dataPath.length) {
    res.status(404).json({ message: "files not found" });
    return;
  }
  res.json(dataPath);
}

async function getInfo(req, res) {
  const folderPath = path.join(__dirname, "files");
  const folderData = await fs.readdir(folderPath);

  if (!folderData.includes(req.params.fileName)) {
    res.status(404).json({ message: "file not found" });
    return;
  }

  const filePath = path.join(__dirname, "files", req.params.fileName);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const ext = path.extname(req.params.fileName);
  const fixedExt = ext.slice(1);
  const name = path.basename(req.params.fileName, `${ext}`);

  res.json({ name, fixedExt, fileContent });
}

module.exports = {
  createFile,
  getFiles,
  getInfo,
};
