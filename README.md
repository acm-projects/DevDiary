# ˖°.✧📓 Dev Diary 📓✧˖°

## ✨ Summary  
Dev Diary is a personal markdown-based logging platform built for developers to document bugs, errors, and setup processes across coding projects. It helps you keep track of technical challenges in an organized, personalized way, paired with an AI assistant. With a centralized memory bank and a chatbot that guides you through documentation, error fixes, and helpful tools, creating personal projects feels a little less overwhelming (especially for new developers) while also making the process more reflective and focused on learning.  

---

## ⚙️ Minimum Viable Product (MVP)  

### 1. Markdown Documentation  
- Error title  
- Error message  
- Code snippets  
- How the error was fixed  
- Personal notes  
- Links/resources (GitHub repo, YouTube, Stack Overflow)  
- Setup docs for environments, package installs, and commands  
- Syntax/reference notes when learning a new language or framework  

### 2. AI Assistant  
- Explains error messages in context with common solutions  
- Suggests YouTube tutorials or Stack Overflow posts  
- Offers debugging strategies & terminal command hints  
- Can generate markdown logs or setup docs based on a brief description (great for beginners on a new stack)  

### 3. Error Tagging & Search  
- By language (Python, Java, C++, SQL, etc.)  
- By error type (syntax, runtime, permission, import)  
- By framework/tool (React, Django, Tailwind CSS, etc.)  
- By system/OS (Windows, macOS, Linux)  
- By error status (unresolved, resolved, in-progress)  
- Custom tags by user  
- Full-text search across projects and docs  

### 4. User Authentication  
- Sign up  
- Login  
- Password recovery  

---

## 🗓️ Milestones  

**Week 1**  
- Finalize tech stack, MVPs, and stretch goals  
- Assign roles (frontend, backend, full-stack)  
- Download necessary software  
- Frontend: wireframing on Figma  
- Backend: practice auth flows & review tutorials  

**Week 2**  
- Frontend: finish wireframes, build login/signup pages  
- Backend: complete authentication and connect with frontend  

**Week 3**  
- Frontend: code routing, finish main pages (login, signup, home, create log)  
- Backend: save terminal output to MongoDB, begin chatbot functionality  

**Week 4**  
- Backend: connect chatbot with markdown docs for error feedback  
- Frontend: polish UI (fonts, colors, markdown editor)  

**Week 5**  
- Backend: chatbot can generate new markdown docs on prompt  
- Frontend: begin prepping presentation & script  

**Week 6**  
- Backend: buffer week for integration issues  
- Frontend: finish all pages  

**Week 7**  
- Tackle stretch goals if time permits  
- Frontend: finalize presentation & script  

**Week 8**  
- Practice presentation  

**Week 9**  
- Polish presentation and gather feedback  

---

## 🎯 Stretch Goals  

- **Team Mode** → invite teammates, assign logs, comment threads  
- **GitHub Integration** → sync setup docs to repo, view logs by branch/commit  
- **Dependencies Tracker** → flag deprecated packages and recent updates  
- **Analytics Dashboard** → personal error stats and trends  
- **Keyboard Shortcuts Tracker** → save frequently used IDE/system shortcuts  

---

## 💻 Tech Stack  

- **Wireframing:** Figma (collaborative UI/UX prototyping)  
- **IDE:** VSCode  
- **Version Control:** Git  
- **Language:** TypeScript (frontend + backend)  
- **Frontend:** React + Tailwind CSS  
  - React → component-based UI library  
  - Tailwind → prebuilt utility classes for fast styling  
- **Backend:** Node.js + Express  
  - Node.js → runtime environment  
  - Express → routing, APIs, request handling  
- **Database:** MongoDB (JSON-like storage for logs/tags/docs)  

---

## 🤖 AI Integration  

- Gemini API  
- OpenAI API  

### Useful APIs  
- Stack Overflow API  
- GitHub REST API  
- Dev.to API  
- npm Registry API (for package versioning/deprecations)  
- Piston API (test code snippets in browser)  

---

## ⚙️ Software to Install  

- [VSCode](https://code.visualstudio.com/download)  
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) → [Quick Guide](https://rogerdudler.github.io/git-guide/)  
- [Node.js](https://nodejs.org/en) → (optional: [NVM](https://github.com/nvm-sh/nvm))  
- [MongoDB](https://www.mongodb.com/try/download/community)  
- [Postman](https://www.postman.com/downloads/)  

---

## 🚧 Roadblocks  

- **Uploading terminal logs to MongoDB** → likely biggest hurdle (Plan A: Node.js CLI, Plan B: `.txt` upload)  
- **Log Schema** → needs to be structured for fast AI parsing  
- **Large Input Management** → MongoDB’s ~1MB field limit, may need filtering/chunking  

---

## 🌱 Inspiration  

Last semester during ACM, my team kept running into the same recurring issue with Ngrok. Every time, we’d have to dig through Stack Overflow posts, external docs, or ask chatgpt for the right terminal commands to fix it. Our industry mentor gave us a helpful tip that she uses on the job: document every error we encounter in a Google Doc or notes app so we can refer back to it if it happens again.

Since then, I’ve been in the habit of jotting down error fixes and environment setup instructions in OneNote for my personal projects. When I switched from Java to Python for LeetCode, I also used Notion to keep track of syntax differences and helpful patterns. But over time, my notes became really cluttered and hard to navigate. That got me thinking: what if there were a more centralized, organized platform where developers could store these logs and revisit them easily, with a clean, user friendly interface?


---

## ⚔️ Competition  

- **Sentry** → error tracking for production apps, not personal learning logs  
- **Stack Overflow** → huge Q&A base but not personal/project-specific  
- **Notion** → general note app, not optimized for error tagging/search  
- **DevDocs** → good for reading docs, not logging/analysis  
- **GeeksforGeeks** → tutorials only, no personalized logs or AI fixes  

---

## 📚 Other Resources / Guides  

**Terminal Output**  
- [Video 1](https://www.youtube.com/watch?v=bo-NjxlB9pE)  
- [Video 2](https://www.youtube.com/watch?v=K5uUU5cSiaQ)  

**Error Handling (React)**  
- [Crash Course](https://www.youtube.com/watch?v=DTBta08fXGU)  

**Node.js & CLI**  
- [Building a CLI](https://www.youtube.com/watch?v=GupmEQFkDJM)  
- [Reading command-line args](https://www.youtube.com/watch?v=5D7elTp0-xM)  

**React & Tailwind**  
- [Basic Notes App](https://www.youtube.com/watch?v=8KB3DHI-QbM)  
- [Tailwind CSS Overview](https://www.youtube.com/watch?v=6biMWgD6_JY&t=1390s)  

---

## 📓 Documentation  

- [React Docs](https://react.dev/)  
- [Tailwind Docs](https://tailwindcss.com/docs)  
- [MongoDB Docs](https://www.mongodb.com/docs/)  

---

## 🎥 Tutorials  

- [Gemini AI Blog + Dashboard](https://www.youtube.com/watch?v=tUnGudIBBjQ)  
- [Markdown Editor in React](https://www.youtube.com/watch?v=tYa0WMR0TGU)  
- [React Dashboard UI](https://www.youtube.com/watch?v=wYpCWwD1oz0)  
- [MERN Chatbot (Gemini)](https://www.youtube.com/watch?v=5fiXEGdEK10)  
- [MERN Chatbot (OpenAI)](https://www.youtube.com/watch?v=PX_YOfEdhRg)  
- [MERN Blogging Website](https://www.youtube.com/watch?v=J7BGuuuvDDk&list=PLqm86YkewF6QbR7QwqYWcAbl70Zhv0JUE)  
- [Learn MERN (FreeCodeCamp)](https://www.youtube.com/watch?v=F9gB5b4jgOI)  
- [Learn MERN (Net Ninja)](https://www.youtube.com/watch?v=98BzS5Oz5E4&t=2s)  
- [Intro to APIs](https://www.youtube.com/watch?v=WXsD0ZgxjRw)  
- [REST APIs](https://www.youtube.com/watch?v=-0exw-9YJBo)  

# 👥 Meet the Team 

### ⭐ Project Manager
- **Tamanna Khurana**

### ⭐ Industry Mentor
- **Suraj Khosla**

### 🪼 Team Members
- **Tyler Le**  
- **Jonathan Lewis**  
- **Zoë Bryant**  
- **Phuc Trinh**  
- **Maryam Al-Naami**


