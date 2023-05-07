const CHAT_COMMANDS = {
    HELP: '/help',
    CLEAR: '/clear',
    COLOR: '/color',
    SHADOW: '/shadow',
    STATE: '/state',
    LANGUAGE: '/language',
};

const CHAT_LANGUAGE_FILES = {
    EN: 'chatbot-en.json',
    PT: 'chatbot-pt.json',
};

const form = document.getElementsByClassName('input-container')[0];
const messagesContainer = document.getElementsByClassName('messages-container')[0];

let selectedLanguage = CHAT_LANGUAGE_FILES.EN;
let chatbotData;

async function fetchChatbotData(language) {
    const response = await fetch(`/src/data/${language}`);
    const data = await response.json();
    chatbotData = data;
}

function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function answerWithMood(mood) {
    document.dispatchEvent(new CustomEvent('robotstatechange', { detail: { state: mood } }));

    if (mood === 'angry') {
        left.style.setProperty('--eye-color', 'red');
        right.style.setProperty('--eye-color', 'red');
        mouth.style.setProperty('--mouth-color', 'red');
    }
        

    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('robotstatechange', { detail: { state: 'neutral' } }));
        
        if (mood === 'angry') {
            left.style.removeProperty('--eye-color');
            right.style.removeProperty('--eye-color');
            mouth.style.removeProperty('--mouth-color');
        }
    }, 2500);
}

function handleMessage(message) {
    // Check if the message is a greeting
    if (chatbotData.greetings.includes(message)) {
        return getRandomItemFromArray(chatbotData.greetings);
    }

    // Check if the message is a goodbye
    if (chatbotData.goodbyes.includes(message)) {
        return getRandomItemFromArray(chatbotData.goodbyes);
    }

    // Check if the message is a question
    for (let i = 0; i < chatbotData.questions.length; i++) {
        const question = chatbotData.questions[i];
        if (message.includes(question.question)) {
            answerWithMood(question.mood);
            return question.answer;
        }
    }

    // If we don't recognize the message, send a fallback response
    return chatbotData.fallback;
}


function commandsHandler(command) {
    const commandName = command.split(' ')[0];
    const commandValue = command.split(' ')[1];

    switch (commandName) {
        case CHAT_COMMANDS.HELP:
            messagesContainer.innerHTML += `
                <li class="message">
                    <div class="message-content">
                        <p class="message-content-text">kambô: Available commands:</p>
                        <p class="message-content-text">/help - list of available commands</p>
                        <p class="message-content-text">/clear - clear chat</p>
                        <p class="message-content-text">/color - change face color</p>
                        <p class="message-content-text">/shadow - change face shadow color</p>
                        <p class="message-content-text">/state - show chat state</p>
                        <p class="message-content-text">/language - change chat language</p>
                    </div>
                </li> 
            `;
            break;
        case CHAT_COMMANDS.CLEAR:
            messagesContainer.innerHTML = '';
            break;
        case CHAT_COMMANDS.COLOR:
            document.body.style.setProperty('--eye-color', `${commandValue}`);
            document.body.style.setProperty('--eye-color', `${commandValue}`);
            document.body.style.setProperty('--mouth-color', `${commandValue}`);

            messagesContainer.innerHTML += `
                <li class="message">
                    <div class="message-content">
                        <p class="message-content-text">kambô: Chat color changed to ${commandValue}</p>
                    </div>
                </li>
            `
            break;
        case CHAT_COMMANDS.STATE:
            document.dispatchEvent(new CustomEvent('robotstatechange', { detail: { state: commandValue } }));

            messagesContainer.innerHTML += `
                <li class="message">
                    <div class="message-content">
                        <p class="message-content-text">kambô: state changed to: ${commandValue}</p>
                    </div>
                </li> 
            `;
            break;
        case CHAT_COMMANDS.SHADOW:
            left.style.setProperty('--eye-shadow-color', `${commandValue}`);
            right.style.setProperty('--eye-shadow-color', `${commandValue}`);
            mouth.style.setProperty('--mouth-shadow-color', `${commandValue}`);

            messagesContainer.innerHTML += `
                <li class="message">
                    <div class="message-content">
                        <p class="message-content-text">kambô: Chat shadow color changed to ${commandValue}</p>
                    </div>
                </li>
            `;
        case CHAT_COMMANDS.LANGUAGE:
            selectedLanguage = CHAT_LANGUAGE_FILES[commandValue.toUpperCase()];
            fetchChatbotData(selectedLanguage);

            messagesContainer.innerHTML += `
                <li class="message">
                    <div class="message-content">
                        <p class="message-content-text">kambô: Chat language changed to ${commandValue}</p>
                    </div>
                </li>
            `;
        default:
            break;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target[0].value;

    if (message.startsWith('/')) {
        commandsHandler(message);
    }
    else {
        messagesContainer.innerHTML += `
        <li class="message">
            <div class="message-content">
                <p class="message-content-text">user: ${e.target[0].value}</p>
            </div>
        </li> 
        `;

        const response = handleMessage(e.target[0].value);

        messagesContainer.innerHTML += `
        <li class="message">
            <div class="message-content">
                <p class="message-content-text">kambô: ${response}</p>
            </div>
        </li> 
        `;
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    e.target.reset();
});

fetchChatbotData(selectedLanguage);