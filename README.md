# CareCircle - Maternity Support Chat

## Overview

CareCircle is a free and open-source maternity support chat application designed to assist pregnant women with their queries and provide support. The application features a chat interface where users can interact with support agents and an AI-based chatbot to get timely assistance.

### Context

Expecting mothers have a bewildering but mission-critical experience before them. Infant mortality is still one of the leading causes of unnecessary deaths worldwide. While “Obstetricians” are the licensed doctors who oversee the maternity journey, there are actually many professionals that must collaborate and communicate about and with an expecting mother.

### Challenge

Design and/or prototype a mobile application and/or text message thread manager that enables thoughtful support, discussion, and case management around an expecting mother that can be used in “low resource environments”.

### Features

Some key features of the CareCircle app consist of:

- **Real-time Chat**: Connect with support agents in real-time to get immediate assistance.
- **Pregnancy Tracking**: Track pregnancy progress and milestones with personalized updates.
- **User Profiles**: Maintain detailed user profiles to provide personalized support.
- **Interaction History**: Keep a record of all interactions to ensure continuity and context in support sessions.
- **Analytics**: Monitor chat metrics, response times, and user satisfaction to improve service quality.

## Technologies

This is the technology stack we used to build CareCircle website:

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

1. **Tejasri Addanki** - Helped set up the project structure and worked on the Figma design, contributing to the project's initial setup and planning.

1. **Ananya Kamboj** - Ananya is 3rd year student of Bachelor of Software Engineer in Thompson Rivers University and ramping currently on AI, ML, LLM and NextJs. I have contributed in upgrading the webapp to use Shadcn UI.

## Phase 2
This is our plan for future enhancements and development of CareCircle:

- Incorporate models like **MedImageInsight** and **MedImageParse** from the **Azure AI Model Catalog** to enable patients to upload various types of medical media for quick analysis, enhancing their overall experience. These models are designed to help licensed medical professionals easily **interpret complex medical media**, such as lab reports or X-rays, even if they fall outside their area of specialization to allow for more accurate and efficient support.

- Develop an AI chatbot leveraging **Retrieval-Augmented Generation (RAG)** to help medical professionals **quickly access relevant information from their database**, such as patient details, streamlining conversations and improving efficiency. The purpose of this chatbot is to **reduce the time spent manually searching for information**.

- Implement **real-time message translation** to support a broader range of languages to make the app **accessible** to users worldwide. This feature will enable patients in countries with limited medical staff to communicate effectively with medical professionals from other regions.

- Utilize web scraping to collect different forms of information on pregnancy and maternity to **expand the database** which medical professionals can use to push recommendations. Automating this process of collecting and organizing information will allow the app to **offer medical professionals comprehensive and up-to-date resources** to draw upon when providing personalized recommendations to patients.

- Add a **community groups feature** where mothers can connect with each other to **build a supportive and inclusive network** for sharing experiences, advice, and resources tailored to their maternity journey.

- Implement **stronger cybersecurity measures** to safeguard user data by using **encryption algorithms** like AES, Signal Protocol, and libsodium for data at rest and during communication; securing databases with **Transparent Data Encryption (TDE)**; conducting **regular audits**; and continuously testing for vulnerabilities such as **SQL injections, XSS, and misconfigurations**.

## Data Privacy and Security Measures

- The app has **multi-factor authentication (MFA)** to prevent unauthorized users from accessing app data easily. This is implemented at the login/sign-up and reset password stages.

- It ensures compliance with legal **data privacy standards** such as **HIPAA** and **GDPR**. When signing up, users agree to a clear “Terms & Conditions” agreement outlining their rights, where their data is stored, who can access it, and how it can be removed from the system.


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
