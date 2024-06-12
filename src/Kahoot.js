const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { MessageEmbed } = require('discord.js');
let Kahoot2 = require('kahoot.js-latest');

class Kahoot {
    constructor({ QuizID: QuizID, pinCode: pinCode, botUsername: botUsername }) {
        this.QuizID = QuizID;
        this.pinCode = pinCode;
        this.bot = botUsername;
    }

    async returnAnswers() {
        const url = 'https://kahoot.it/rest/kahoots/' + this.QuizID;
    
        if (this.QuizID !== "") {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Wrong QuizID or Private!');
                };
                const data = await response.json();
                const result = this.parseQuestions(data.questions);
                return {
                    result: result.result,
                    answersList: result.answersList,
                    nombre: data.questions.length,
                };
            } catch (error) {
                console.log(error);
                return '';
            };
        } else {
            console.log('QuizID is empty !');
            return '';
        };
    };

    parseQuestions(questionsJson) {
        let result = '';
        let answer = [];
        questionsJson.forEach(function (question) {
            result += `Question: ${question.question}\n`;

            if (['quiz', 'multiple_select_quiz'].includes(question.type)) {

                question.choices.forEach((choice, index) => {
                    const choiceNumber = question.choices.findIndex(choice => choice.correct === true) + 1;
                    result += `Choices: ${index + 1} ${choice.answer} `;
                    if (index + 1 === choiceNumber) {
                        answer.push(choiceNumber)
                    }
                    result += `\n`;
                });

                const correctAnswer = question.choices.find(choice => choice.correct === true).answer;
                result += `Answers: ${correctAnswer}\n\n`;
            } else if (question.type === 'open_ended') {
                question.choices.forEach((choice, index) => {
                    result += `**Choix ${index + 1}:** ${choice.answer}\n`;
                });
                result += `Answers: (Open answers)\n\n`;
            }
        });
        return { result: result, answersList: answer }
    }

    joinGame(pin, name, interaction) {
        let x = interaction;
        let numberAnswers = 0;
        const KahootAnswers = new Kahoot();
        const Kahootv2 = new Kahoot2();

        Kahootv2.join(pin, name)

        Kahootv2.on("QuestionStart", async question => {
        KahootAnswers.setQuizID(this.QuizID);
        let a = await KahootAnswers.returnAnswers();
        let answer = a.answersList[numberAnswers];
        let finalAnswer = Number(answer) - 1;
        question.answer(finalAnswer);
        numberAnswers = numberAnswers + 1;
        if(numberAnswers == a.answersList.length) {
           let embed = new MessageEmbed()
            .setTitle('Kahoot | Game Completed')
            .setDescription(`I answered the **${a.number}** questions! ✅`)
            .setColor('GREEN')
            .setFooter({
                text: 'Kahoot Bot by Neiky (neiky.)'
            })
            .setTimestamp()
            await x.followUp({
                embeds: [embed]
            });
            return;
        };
    });

        Kahootv2.on("Joined", () => {
            interaction.reply(`I joined Kahoot game with \`${name}\` username.`);
        });
    };

    joinGameWithTimeout(pin, name, interaction, { timeout: time }) {
        let x = interaction;
        let numberAnswers = 0;
        const KahootAnswers = new Kahoot();
        const Kahootv2 = new Kahoot2();

        Kahootv2.join(pin, name)

        Kahootv2.on("QuestionStart", async question => {
        KahootAnswers.setQuizID(this.QuizID);
        let a = await KahootAnswers.returnAnswers();
        let answer = a.answersList[numberAnswers];
        let finalAnswer = Number(answer) - 1;
        setTimeout(async() => {
            question.answer(finalAnswer);
            numberAnswers = numberAnswers + 1;
            if(numberAnswers == a.answersList.length) {
                let embed = new MessageEmbed()
                .setTitle('Kahoot | Game Completed')
                .setDescription(`I answered the **${a.number}** questions! ✅`)
                .setColor('GREEN')
                .setFooter({
                    text: 'Kahoot Bot by Neiky (neiky.)'
                })
                .setTimestamp()
                await x.followUp({
                    embeds: [embed]
                });
                return;
            };
        }, time * 1000)
    });

        Kahootv2.on("Joined", () => {
            interaction.reply(`I joined Kahoot game with \`${name}\` username.`);
        });
    };
}


module.exports = { Kahoot };