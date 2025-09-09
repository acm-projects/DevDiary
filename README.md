 <h1 align="center">˖°.✧📓Dev Diary 📓✧˖°.</h1>

<p align="center">
  <img src="https://i.pinimg.com/736x/cc/10/21/cc10211f4f4ea0674de5a5b82a219ea0.jpg" width="600">
</p>

<p align="center">A personal markdown based logging platform built for developers to document bugs, errors, and set up processes across their coding projects. It allows the developer to keep track of technical challenges faced while coding in an organized, personalized manner accompanied by an AI integrated assistant. With a centralized memory bank and a chatbot that helps guide you through documentation, possible error fixes, and relevant tools, creating personal projects becomes a little less daunting (especially for new developers) while also making the process more reflective and focused on learning along the way.</p>

<h1 align="center"> ⚙️ MVP Features ⚙️ </h1>

<div>
 <h4> Markdown Documentation </h5>
  <li>Error Title</li>
  <li>Error Message</li>
  <li>Code Snippits</li>
  <li>Personal Notes and Resources</li>
 
 <h4> AI Assistant </h5>
  <li>Explains and contextualizes errors</li>
  <li>Links possible youtube tutorials or stackoverflow pages that could be related</li>
  <li>Provides terminal command hints or any other hints towards fixing the error but promotes learning over simply revealing the answer</li>
  
 <h4>Error Tagging and Searching System</h5>
  <li>By language type</li>
  <li>By error type</li>
  <li>By framework tools</li>
  <li>By system/OS or environment</li>
  <li>By error status</li>
  
 <h4>User Authentication</h5>
  <li>Sign up</li>
  <li>Logine</li>
  <li>Password Recovery</li>

<h1 align="center"> 🎯 Stretch Goals 🎯 </h1>

<div>
 <h4>Team Mode and Collaborative Logging</h5>
  <li>Inviting teammates to contribute to the same project's error logs and set up docs</li>
  <li>Assigning logs to team members to fix or follow up</li>
  <li>Comment threads under logs for collaboration</li>

 <h4>Github Integration</h4>
  <li>Syncing markdown set up docs to project's readme or docs folder</li>

  <h4>Package Dependencies Tracker</h4>
   <li>Identifies any deprecated dependencies and gives an overview of recent updates for the developer to keep track of</li>
 
  <h4>Error Frequency or Analytics Dashboard</h4>
   <li>Personal statistics for each developer that reveals the most popular types of errors encountered</li>
</div> 

<h4>Keep Track of Keyboard Shortcuts</h4>
   <li>Store that shortcuts that the developer frequently uses in case they forget</li>
</div> 


<h1 align="center">⋆˚.⋆ 💻 Tech Stack 💻 ⋆˚.⋆</h1>

<h3>Wireframing: Figma</h3>
<ul>
    <li>Collaborative design tool for creating the app’s UI</li>
    <li>Allows clear visualization of app’s components, page navigation with prototyping, and planning user flow</li>
</ul>

<h3>IDE: VSCode</h3>
<ul>
    <a href="https://code.visualstudio.com/download" target="_blank">VSCode Installation</a>
</ul>

<h3>Version Control: Git</h3>
<ul>
    <li><a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank">Git Installation</a></li>
</ul>

<h2>MERN Techstack: </h2>

<h4>Frontend: React </h4>
<ul>
    <li><a href="https://react.dev/" target="_blank">React Native Documentation</a></li>
</ul>

<h4>Backend: Node JS and Express</h4>
<ul>
    <li><a href="https://nodejs.org/en" target="_blank">Node JS Installation</a></li>
    <li><a href="https://github.com/nvm-sh/nvm" target="_blank">Install NVM</a></li>
</ul>

<h4>Programming Language: Typescript</h4>

<h4>Database: MongoDB</h4>
<ul>
    <li><a href="https://www.mongodb.com/try/download/community" target="_blank">MongoDB Download</a></li>
</ul>

---

# 🎯 Stretch Goals 🎯

### 1) Team Mode & Collaborative Logging
- Invite teammates to contribute to the same project’s error logs and setup docs  
- Assign logs to team members to fix or follow up  
- Comment threads under logs for collaboration  

### 2) GitHub Integration
- Sync markdown setup docs to a project’s README or `/docs` folder  
- View related logs per branch or commit  

### 3) Package Dependencies Tracker
- Detect deprecated/outdated dependencies  
- Summarize recent package updates for visibility  

### 4) Error Frequency & Analytics Dashboard
- Personal stats (most common error types, frameworks, files)  
- Use trends to surface learning resources or tutorials proactively  

### 5) Keyboard Shortcuts Tracker
- Save frequently used IDE and OS shortcuts for quick recall


---

# 💻 Tech Stack 💻

### Wireframing: Figma
- Collaborative UI/UX design and prototyping  
- Visualize components, flows, and interactions

### IDE: VSCode
- Extensions for formatting, linting, and Markdown preview

### MERN Stack
**Language:** TypeScript (frontend & backend)  

**Frontend:** React + Tailwind CSS  
- React: component-based UI  
- Tailwind CSS: utility-first styling with rapid iteration

**Backend:** Node.js + Express  
- Node.js: JS runtime  
- Express: routing, HTTP handlers, and APIs

**Database:** MongoDB  
- JSON-like storage; great for logs, tags, and user content


---

# 🤖 AI Integration 🤖

### Model APIs
- **Gemini API**  
- **OpenAI API**

### Developer APIs (Nice to have)
- **Stack Overflow** (search/Q&A)  
- **GitHub REST API** (issues, commits, PRs → link to logs)  
- **Dev.to API** (articles/resources)  
- **npm Registry API** (package versions & deprecations)  
- **Piston API** (execute code snippets in browser)


---

# ⚙️ Software to Install ⚙️

- **VSCode:** https://code.visualstudio.com/download  
- **Git:** https://git-scm.com/book/en/v2/Getting-Started-Installing-Git  
  - Guide: https://rogerdudler.github.io/git-guide/  
- **Node.js:** https://nodejs.org/en  
  - **NVM (optional):** https://github.com/nvm-sh/nvm  
- **MongoDB:** https://www.mongodb.com/try/download/community  
- **Postman (API testing):** https://www.postman.com/downloads/


---

# 🚧 Roadblocks 🚧

### Uploading Terminal Output to MongoDB
- Plan A: Node.js CLI to capture output and POST to backend  
- Plan B: Save output to `.txt` and upload via UI/endpoint

### Log Schema & Classification
- Keep fields precise and structured for faster AI context parse  
- Enforce formatting & size constraints at ingestion

### Managing Large Inputs in MongoDB
- Some fields ~1MB limits → pre-filter or chunk logs  
- Consider GridFS / S3 for long logs and link by ID


---

# 🌱 Inspiration 🌱

We ran into recurring Ngrok issues during ACM. Fixes lived across Stack Overflow, docs, and chats. Our mentor’s tip: **document every error**. Personal notes in OneNote/Notion worked at first, but became cluttered and hard to search.  
**Dev Diary** centralizes developer-focused logs with tagging, AI guidance, and searchable markdown so you can learn once and reuse forever.


---

# ⚔️ Competition ⚔️

**Sentry** — great for production crash monitoring, not personal learning logs  
**Stack Overflow** — broad Q&A; not personalized or project-scoped  
**Notion** — general notes; lacks dev-centric tagging/search for errors  
**DevDocs** — excellent docs browser; no logging or analysis  
**GeeksforGeeks** — generalized tutorials; no personal environment context


---

# 📚 Other Resources / Guides 📚

### Save Terminal Output
- https://www.youtube.com/watch?v=bo-NjxlB9pE  
- https://www.youtube.com/watch?v=K5uUU5cSiaQ

### Error Handling (React)
- https://www.youtube.com/watch?v=DTBta08fXGU

### Node.js & CLI
- Create a CLI: https://www.youtube.com/watch?v=GupmEQFkDJM  
- Read command-line args: https://www.youtube.com/watch?v=5D7elTp0-xM

### React & Tailwind
- Basic Notes App: https://www.youtube.com/watch?v=8KB3DHI-QbM  
- Tailwind CSS: https://www.youtube.com/watch?v=6biMWgD6_JY&t=1390s


---

# 📓 Documentation 📓

- React: https://react.dev/  
- Tailwind: https://tailwindcss.com/docs  
- MongoDB: https://www.mongodb.com/docs/


---

# 🎥 Tutorials 🎥

- Gemini AI Blog + Dashboard: https://www.youtube.com/watch?v=tUnGudIBBjQ  
- Markdown Editor (React): https://www.youtube.com/watch?v=tYa0WMR0TGU  
- Dashboard UI (React): https://www.youtube.com/watch?v=wYpCWwD1oz0  
- MERN Chatbot (Gemini): https://www.youtube.com/watch?v=5fiXEGdEK10  
- MERN Chatbot (OpenAI): https://www.youtube.com/watch?v=PX_YOfEdhRg  
- MERN Blogging Site: https://www.youtube.com/watch?v=J7BGuuuvDDk&list=PLqm86YkewF6QbR7QwqYWcAbl70Zhv0JUE  
- Learn MERN (FreeCodeCamp): https://www.youtube.com/watch?v=F9gB5b4jgOI  
- Learn MERN (Net Ninja): https://www.youtube.com/watch?v=98BzS5Oz5E4&t=2s  
- Intro to APIs: https://www.youtube.com/watch?v=WXsD0ZgxjRw  
- REST APIs: https://www.youtube.com/watch?v=-0exw-9YJBo
