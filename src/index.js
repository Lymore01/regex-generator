const FileService = require("../src/services/fileServices");

class GenerateRegex {
  generate(file) {
    const data = new FileService().read(file);
    return data;
    // pass the data to the ai models
  }
}

new GenerateRegex().generate("hello")
