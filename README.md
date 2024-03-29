# Hermes-chat-v3-FE

## Description

#### Hermes-chat-v3-FE is a frontend real-time messaging app available at: [https://hermes-chat.bogdanmilivojevic.com/](https://hermes-chat.bogdanmilivojevic.com/)

## Resources used

- [Nextj.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Socket.io](https://socket.io/)
- [Sass](https://sass-lang.com/)

## Features

- Websocket enables real-time messaging
- Websocket together with Redis enables display of online status for users
- Image, video and document sharing between users
- Friend request must be accepted before conversation is initialiased
- CI-CD pipeline which makes test passing a requirement for a successful merge
- Tests are made with jest

## Installation

#### Installed docker engine on your machine is a prerequisite

#### Since this project's docker network uses Hermes-BE network, first start BE project available at: https://github.com/BogdanMilivojevic/Hermes-chat-v3-BE

- **Clone the repository**

```
git clone https://github.com/BogdanMilivojevic/Hermes-chat-v3-FE.git
```

- **Create .env file following the .env.example**

- **Build docker image and run container**

```
docker compose up --build
```

## Screens UI

**Live messaging**

![Live messaging](/public/ws-conversation.gif)

**Live online status**

![Live online status](/public/ws-online-status.gif)

**Send friend request**

![Send friend request](/public/add-friend.png)

**Accept friend request**

![Accept friend request](/public/accept-friend.png)

**Video in a conversation**

![Video in a conversation](/public/covnersation-video.png)

**Conversations**

![Conversations](/public/conversations.png)
