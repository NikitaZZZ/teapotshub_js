// Libraries for working with Telegram and Firebase Database 
const firebaseConfig = require('./firebaseConfig')
const TelegramBot = require('node-telegram-bot-api')
const firebase = require('firebase/app')
const db = require('firebase/database')

// Exporting arrays for the bot  
const arrays = require('./arraysForBots')

// Initialize firebase app
const app = firebase.initializeApp(firebaseConfig)
// Initialize firebase database
const database = db.getDatabase()

// Bot token
const token = '5054966774:AAFgIAY83vsUfw7FdCRiZot1bWnVscxNrWs'

// Initialize the bot
const bot = new TelegramBot(token, {polling: true})

// motivation img for command 'why'
let motivation_img = "https://utilit86.ru/wp-content/uploads/2019/07/3-2.jpg"    

// url of picture schedule
let url_schedule = "img/schedule.png";

// Response from the bot on command '/start'
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, 
        `Привет! Я бот, который помогает людям понять: 
            1. Зачем им убирать и сортировать мусор. 
            2. Как сортировать мусор 
            3. Когда сортировать мусор`)

    bot.sendMessage(chatId, 
        `Напишите, что вам надо:
            1. "Как?" - Как сортировать мусор? 
            2. "Зачем?" - Зачем сортировать мусор?
            3. "Когда?" - Когда сортировать мусор?`)
})

function why(chatId) {
    bot.sendPhoto(chatId, motivation_img)
    bot.sendMessage(chatId, arrays.motivational_phrases[Math.floor(Math.random() * arrays.motivational_phrases.length)])
}

function when(chatId) {
    bot.sendPhoto(chatId, url_schedule)
}

function how(chatId) {
    bot.sendMessage(chatId, "Как сортировать мусор?")
    bot.sendMessage(chatId, `
    Можно (Упаковка с маркировкой):
        1. PET, PETE
        2. HDPE, LDPE, PE
        3. PP
    `)

    bot.sendMessage(chatId, `
    Нельзя:
        1. Упаковка тетра-пак
        2. Тюбики от зубной пасты и крема (многослойная упаковка)
        3. Упаковка от майонеза, кутчепа (с крышечкой)
        4. Блестящая упаковка от кофе, чая (многослойная)
        5. Упаковка от чипсов
        6. Упаковка с маркировкой C/PAP, C/LDPE, C/ALU или цифровой код от 80 до 94
        7. Упаковка с маркировкой P5 или 6: белые баночки от йогуртов, молока, сметаны, лотки от яиц
        8. Одноразовая посуда
        9. Пенопласт
        10. Канцелярские принадлежности
        11. Зубные щетки
        12. Памперсы
        13. Электронные и электрические приборы
    `)
}

// command 'why' (motivational phrases and img)
bot.onText(/\/why/, (msg) => why(msg.chat.id) )
bot.onText(/\/when/, (msg) => when(msg.chat.id) )
bot.onText(/\/how/, (msg) => how(msg.chat.id) )

bot.on('message', (msg) => {
    if (msg.text.toLowerCase() == 'когда?' || msg.text.toLowerCase() == 'когда')
        when(msg.chat.id)
    else if (msg.text.toLowerCase() == 'зачем?' || msg.text.toLowerCase() == 'зачем')
        why(msg.chat.id)
    else if (msg.text.toLowerCase() == 'как?' || msg.text.toLowerCase() == 'как')
        how(msg.chat.id)
})