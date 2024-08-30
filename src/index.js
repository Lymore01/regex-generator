const classifyInput = require("../src/services/nlpServices");
const regexService = require("../src/services/regexServices");

classifyInput(process.argv)
  .then(async (data) => {
    try {
      let generatedRegex = await regexService.generate(data.input, data.output);
      console.log(data.output);
      console.log(`Generated regex: ${generatedRegex}`);
    } catch (error) {
      console.error("Error generating regex:", error);
    }
  })
  .catch((error) => console.error("Error classifying input:", error));
