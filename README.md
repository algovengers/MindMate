# MindMate
## A mental health chat assistant

#### Deploy Link : [MindMate](https://mind-mate-wellness.vercel.app/)
#### Youtube Link : [MindMate Youtube Explanation](https://www.youtube.com/watch?v=fUD5HcZhtQI)

#### Our project MindMate got **1st Position** 😀 in it 👇️
#### Devfolio Link : [MindMate Hackathon Project Link](https://devfolio.co/projects/mind-mate-a-mental-health-chat-assistant-1b96)


Mindmate is a mental health **AI** powered chat assistant that guides and helps you to improve your mental health.
Mindmate website provides a user-friendly UI to learn about mental health.

## Features

- AI chat assistant to take guidance about mental health.
- Analyse your mental health over a period of time.
- Get an Indication about your mental health condition with a graphical visualization.
- Editor's compiled articles to read and educate about mental health problems.
- Get emails from time to time with suggestions to improve your mental health.



## Tech

#### System Design
MindMate application runs on 4 server
- Frontend
- Backend
- WebSocket Server
- Email Server
![des](https://github.com/algovengers/MindMate/assets/126336384/bc6c71c9-017f-49c9-9770-ee10164fe88b)

#### Tech stack
- Frontend
  - React JS
  - Tailwind
- Backend
  - Node Js
  - Express Js
  - Gemini (Gen AI)
  - Web Sockets
  - Node Mailer
- Tools
  - Vercel
  - Render
  - Mongo DB
  - Firebase
 
## How to Setup Locally?
### Firebase Setup
  1. Setup a new Firebase project
  2. Add a Web App
  3. Go to Authentication -> Sign-in Method
  4. Enable Email/Password, Gmail as Provider
  5. Go to the Project Settings of Web App and get your ```firebaseConfig``` object
  6. Create ```.env``` in Frontend folder and add ```firebaseConfig``` as per ```.env.sample``` file
  7. In the service accounts section, Generate ```new private key``` (json object).
  6. Create ```.env``` in Backend folder and add ```new private key``` as per ```.env.sample``` file
  8. Fill rest ```.env``` as per ```.env.sample``` files
### Gemini Setup
  - Get your Gemini (by Google) ```API_KEY``` from (https://ai.google.dev) and put in Backend ```.env``` as per ```.env.sample```
### MongoDB Setup
  - Create a MongoDB Atlas (https://www.mongodb.com) account and get your ```URI``` and put in Backend ```.env``` as per ```.env.sample```
### Create Connection amongst Servers
  - Put Url for Websocketserver in Backend .env (ex- ```WEBSOCKET_SERVER=ws://localhost:8802```)
  - Put Url for Backend and Websocketserver in Frontend .env (ex- ```REACT_APP_API_LINK=http://localhost:8800``` and ```REACT_APP_WS_LINK=ws://localhost:8802```)
### Scripts to Install and Run
  1. Need to have ```Node.js``` installed
  2. Go to the Backend, Frontend, Websockerserver folder seperately and run for each ```npm install```
  3. Run Backend by, ```npm run dev``` or ```npm start```
  4. Run Frontend by, ```npm start```
  5. Run Websocketserver by, ```node index.js```
  
    
## Website Preview

#### HomePage 
![83dae728-5f7f-48c7-b2f4-0dccaacfec55](https://github.com/algovengers/MindMate/assets/126336384/c7810ff6-73e2-4b17-bbd3-1f5c3761febf)
#### Login
![5e8cb463-c116-4eff-bc96-7a52eb0a1a72](https://github.com/algovengers/MindMate/assets/126336384/e3413eee-e202-4462-b0e1-2b9243924944)
#### Analysis
![a6145724-1519-4073-9b43-17f308494b68](https://github.com/algovengers/MindMate/assets/126336384/c92c881f-7c9d-453b-8121-706f6c926ec4)
![cbdb3501-5a2c-4c2e-ae05-bf25973aa334](https://github.com/algovengers/MindMate/assets/126336384/92cd5ece-79e3-4245-b91e-4d87defaa397)
#### AI Chat
![1538b7b1-41b3-4734-b74b-0092750f47df](https://github.com/algovengers/MindMate/assets/126336384/a2653f47-045b-41ce-951e-da36286240fc)



