# Regex Classification Service

This project provides a service that classifies text input into various categories using Natural Language Processing (NLP) and generates corresponding regular expressions using a Regex Service.

## Features

- **Text Classification**: Automatically classifies text input such as emails, phone numbers, URLs, dates, etc.
- **Regex Generation**: Generates matching regular expressions for the classified input type.

## How It Works

1. The input is passed through a classifier that categorizes it based on the content (e.g., email, phone number).
2. The classified input is then passed to a regex service, which generates a corresponding regular expression.

## Setup

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Install dependencies:

    ```bash
    npm install natural 
    ```

## Usage

Run the main script with the desired input:

```bash
node index.js "input-text-here"
```

## Example

```bash
node index.js kelly@gmail.com
```

## Sample Output

```bash
Classified as: Email Address
Generated regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/
```
