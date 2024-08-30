const natural = require("natural");
const FileService = require("../services/fileServices");
const path = require("path");

class BayesClassifier {
  constructor() {
    if (BayesClassifier.instance) {
      return BayesClassifier.instance;
    }
    this.classifier = new natural.BayesClassifier();
    this.fileService = new FileService();
    this.filePath = path
      .join(__dirname, "../..", "public", "train.txt")
      .replace(/\\/g, "/");
    this.trainComplete = false;
    this.trainClassifier();
    BayesClassifier.instance = this;
  }
  async trainClassifier() {
    try {
      const lines = await this.fileService.read(this.filePath);
      for (const line of lines) {
        if (line.includes("@")) {
          this.classifier.addDocument(line, "Email Address");
        } else if (line.match(/^\+?[0-9\s-]+$/)) {
          this.classifier.addDocument(line, "Phone Number");
        } else if (
          line.match(/^\d{4}-\d{2}-\d{2}$/) ||
          line.match(/^\d{2}\/\d{2}\/\d{4}$/) ||
          line.match(/^\d{2}-[A-Za-z]{3}-\d{4}$/)
        ) {
          this.classifier.addDocument(line, "Date");
        } else if (line.match(/^https?:\/\//) || line.match(/^www\./)) {
          this.classifier.addDocument(line, "URL");
        } else if (line.includes(",")) {
          this.classifier.addDocument(line, "Address");
        } else {
          this.classifier.addDocument(line, "Name");
        }
      }
      this.classifier.train();
      this.trainCompleted = true;
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }
  static getInstance() {
    if (!BayesClassifier.instance) {
      BayesClassifier.instance = new BayesClassifier();
    }
    return BayesClassifier.instance;
  }

  async ensureTrained() {
    while (!this.trainCompleted) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}

async function classifyInput(input) {
  const bayesClassifier = BayesClassifier.getInstance();
  await bayesClassifier.ensureTrained();

  const classifier = bayesClassifier.classifier;
  return {
    input: input,
    output: classifier.classify(input),
  };
}

module.exports = classifyInput;
