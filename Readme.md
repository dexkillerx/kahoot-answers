# Kahoot Bot

A Kahoot bot that can automatically find and answer quiz questions. This bot is built with Node.js and uses the `kahoot.js-latest` and `discord.js` libraries.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

To install this project, follow the steps below:

1. Clone the repository:

    ```bash
    git clone https://github.com/dexkillerx/kahoot-answers.git
    cd kahoot-anwers
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Or download the module

    ```bash
    npm i kahoot-answers
    ```

## Configuration

Before using the bot, make sure to configure the necessary information:

1. Create a configuration file or adjust the parameters directly in the code to specify the `QuizID`, `pinCode`, and `botUsername`.

## Usage

You can use the Kahoot bot with the provided functions in the module. Here are some examples of how to use it:

### Initialization

```javascript
const { Kahoot } = require('kahoot-answers');

// Create an instance of the Kahoot bot
const kahootBot = new Kahoot({
    QuizID: 'your_quiz_id',
    pinCode: 'your_pin_code',
    botUsername: 'BotName'
});
```

## Retrieving Answers

To retrieve the answers from a quiz:

```javascript
kahootBot.returnAnswers().then(answers => {
    console.log(answers);
});
```

## Joining and Playing a Game

To join a Kahoot game and automatically answer the questions:

```javascript
interaction = // interaction = discord interaction (slash commands)
kahootBot.joinGame('your_pin_code', 'BotName', interaction);
```

## Joining a Game with a Delay Between Answers

To join a Kahoot game and automatically answer the questions with a specified delay:

```javascript
interaction = // interaction = discord interaction (slash commands)
kahootBot.joinGameWithTimeout('your_pin_code', 'BotName', interaction, { timeout: 5 });
```

## Features

- **Join a Kahoot Game:** The bot can join a game using the PIN code and a specified username.
- **Retrieve Answers:** The bot can extract the correct answers from a Kahoot quiz.
- **Automatic Answering:** The bot can automatically answer the quiz questions.
- **Answer with Delay:** The bot can automatically answer the quiz questions with a specified delay.
