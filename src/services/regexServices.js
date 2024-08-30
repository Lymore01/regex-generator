const classifyInput = require("../services/nlpServices");
const regexSamples = require("../utils/regex");

class RegexService {
  constructor() {
    this.regex = regexSamples;
  }
  async generate(input, type) {
    if (this.regex.has(type)) {
      let regex = this.regex.get(type);
      return this.#checkModelCorrectness(regex, input);
    } else {
      return `Could not find regex equivalent for ${type}`;
    }
  }

  #checkModelCorrectness(regex, input) {
    return new Promise((resolve, reject) => {
      if (regex.test(input)) {
        return resolve(regex);
      }
      const valuesFromMap = [...this.regex.values()];
      for (const value of valuesFromMap) {
        if (value === regex) continue;

        if (value.test(input)) {
          return resolve(value);
        }
      }

      reject("Incorrect");
    });
  }
}

const val = new RegexService();

classifyInput("2-4-2024")
  .then(async (data) => {
    try {
      let generatedRegex = await val.generate(data.input, data.output);
      console.log(data.output);
      console.log(`Generated regex: ${generatedRegex}`);
    } catch (error) {
      console.error("Error generating regex:", error);
    }
  })
  .catch((error) => console.error("Error classifying input:", error));
