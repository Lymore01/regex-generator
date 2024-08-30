const fs = require("fs");
const readline = require("readline");
const { Readable } = require("stream");
const path = require("path");

class FileService {
  #stream = null;
  constructor() {
    if (FileService.instance) {
      return FileService.instance;
    }

    FileService.instance = this;
  }

  async #isArgPath(arg) {
    return new Promise((resolve, reject) => {
      fs.stat(arg, (err, stat) => {
        if (err) {
          if (typeof arg === "string") {
            this.#stream = Readable.from([arg]);
            resolve();
          } else {
            reject("Invalid argument provided");
          }
        } else if (stat.isFile()) {
          this.#stream = fs.createReadStream(arg, "utf8");
          resolve();
        } else if (stat.isDirectory()) {
          reject("Please provide a valid file path, not a directory");
        } else {
          reject("Unsupported argument type");
        }
      });
    });
  }

  async read(arg) {
    return new Promise((resolve, reject) => {
      this.#isArgPath(arg)
        .then(() => {
          if (!this.#stream) throw new Error("Stream could not be initialized");

          const lines = [];
          const rl = readline.createInterface({
            input: this.#stream,
            crlfDelay: Infinity,
          });

          rl.on("line", (line) => {
            lines.push(line);
          });

          rl.on("close", () => {
            resolve(lines);
          });

          rl.on("error", (error) => {
            reject(error);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = FileService;
