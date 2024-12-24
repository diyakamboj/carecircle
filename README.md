![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn-ui](https://img.shields.io/badge/Shadcn--ui-000000?style=for-the-badge&logo=shadcn&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=white)
![Nuqs](https://img.shields.io/badge/Nuqs-000000?style=for-the-badge&logo=nuqs&logoColor=white)
![Tanstack Tables](https://img.shields.io/badge/Tanstack_Tables-000000?style=for-the-badge&logo=tanstack&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-000000?style=for-the-badge&logo=reacthookform&logoColor=white)
![kbar](https://img.shields.io/badge/kbar-000000?style=for-the-badge&logo=kbar&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-000000?style=for-the-badge&logo=prettier&logoColor=white)

# CareCircle - Maternity Support Chat

## Overview

CareCircle is a free and open-source maternity support chat application designed to assist pregnant women with their queries and provide support. The application features a chat interface where users can interact with support agents and an AI-based chatbot to get timely assistance.

### Context

Expecting mothers have a bewildering but mission-critical experience before them. Infant mortality is still one of the leading causes of unnecessary deaths worldwide. While “Obstetricians” are the licensed doctors who oversee the maternity journey, there are actually many professionals that must collaborate and communicate about and with an expecting mother.

### Challenge

Design and/or prototype a mobile application and/or text message thread manager that enables thoughtful support, discussion, and case management around an expecting mother that can be used in “low resource environments”.

### Ideas

- **Web-based Admin View**: A web-based admin view that shows aggregate text messages and group text conversations around a team that supports an expecting mother.
- **Mobile Application**: A mobile application, similar to WhatsApp or Telegram, that is optimized for those around the world who cannot afford expensive mobile lines or data plans.
- **Data Privacy and Security**: Like any other healthcare application with legal guidelines on data privacy and security, either have a plan to address them or -- even better -- build it into the application!

### Features

The CareCircle application includes:

- **Real-time Chat**: Connect with support agents in real-time to get immediate assistance.
- **AI Chatbot**: Access an AI-powered chatbot for quick answers to frequently asked questions.
- **Pregnancy Tracking**: Track pregnancy progress and milestones with personalized updates.
- **User Profiles**: Maintain detailed user profiles to provide personalized support.
- **Interaction History**: Keep a record of all interactions to ensure continuity and context in support sessions.
- **Analytics**: Monitor chat metrics, response times, and user satisfaction to improve service quality.

## Technologies

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- Search params state manager - [Nuqs](https://nuqs.47ng.com/)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Real-time Communication - [Socket.io](https://socket.io)

## Contributors

1. **Diya Kamboj** - Set up the overall project structure and created the Figma design to establish a strong foundation for the project. 

1. **Tejasri** - Helped set up the project structure and worked on the Figma design, contributing to the project's initial setup and planning.

1. **Ananya Kamboj** - Ananya is 3rd year student of Bachelor of Software Engineer in Thompson Rivers University and ramping currently on AI, ML, LLM and NextJs. I have contributed in upgrading the webapp to use Shadcn UI.

## Phase - 2
- aa
- aa

## Pages
Here is page structure of CareCircle app.

```plaintext
.
├── app
│   ├── (auth)
│   │   ├── _components
│   │   │   ├── user-auth-form.tsx
│   │   │   └── sigin-view.tsx
│   │   └── (signin)
│   │       └── page.tsx
│   ├── dashboard
│   │   ├── _components
│   │   │   ├── overview.tsx
│   │   │   └── recent-sales.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── components
│   ├── date-range-picker.tsx
│   ├── icons.tsx
│   ├── layout
│   │   ├── app-sidebar.tsx
│   │   └── page-container.tsx
│   └── ui (shadcn ui components)
│       ├── button.tsx
│       ├── card.tsx
│       └── tabs.tsx
├── constants
│   └── index.ts
├── context
│   └── auth-context.js
├── firebase
│   ├── config.ts
│   └── firebase.ts
├── hooks
│   └── useAuth.ts
├── lib
│   └── utils.ts
├── types
│   └── index.ts
├── styles
│   └── globals.css
├── .env
├── README.md
└── package.json
```

### Explanation

1. **Project Structure**: Added a `Project Structure` section that outlines the directory structure of the project. This helps users understand the organization of the project files and directories.
2. **Technologies Section**: Kept the technologies section with badges as it is.
