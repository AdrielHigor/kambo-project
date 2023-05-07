# Kambô Chatbot

Kambô is a simple chatbot built with HTML, CSS, and JavaScript. It uses the Fetch API to retrieve chatbot data in JSON format, and responds to user input with pre-defined answers. The chatbot also responds to certain commands that allow users to customize the chat window, change the chatbot's mood, and switch between different languages.

## Features

- Responds to user input with pre-defined answers
- Supports multiple languages
- Allows users to customize the chat window with commands
- Changes the chatbot's mood based on the content of the user's message
- Written in HTML, CSS, and JavaScript

## Getting Started

1. Clone the repository to your local machine using the following command: ```git clone https://github.com/yourusername/kambo-chatbot.git```


2. Open the `index.html` file in your web browser to launch the chatbot.

3. Enter a message in the chat window and press "Send" to see the chatbot's response.

4. Try entering commands like `/help` or `/color` to see how they work.

## Customizing the Chat Window

The Kambô chatbot supports several commands that allow you to customize the appearance of the chat window. Here are some examples:

- `/color red` - Changes the color of the chatbot's face to red
- `/shadow blue` - Changes the color of the chatbot's shadow to blue
- `/clear` - Clears the chat window
- `/state happy` - Changes the chatbot's mood to happy

## Changing the Language

The Kambô chatbot also supports multiple languages. Here's how to switch between them:

1. Open the `index.js` file in your text editor.

2. Locate the `CHAT_LANGUAGE_FILES` object at the top of the file. 

3. Modify the object to include the language file(s) you want to use:

``` 
const CHAT_LANGUAGE_FILES = {
    EN: 'chatbot-en.json',
    PT: 'chatbot-pt.json',
    ES: 'chatbot-es.json',
};
```


4. Save the changes to `index.js` and refresh the page in your web browser to see the new language in action.

## Credits

- Adriel Higor
