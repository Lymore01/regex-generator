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

const regexService = new RegexService();

module.exports = regexService;


