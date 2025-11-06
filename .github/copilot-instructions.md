# 🧠 GitHub Copilot Instructions

**Project:** PrepWise an AI-powered Interview System designed for 4th students of NORM (Frontend)
**Author:** Alvin
**Tech Stack:** React (Vite) + TypeScript + React Query + Zustand + Zod + Axios + Tailwind CSS + Lucide React
**Architecture:** Modular (feature-based structure)

---

## 🎯 Project Context

This is the **frontend** of an **PrepWise an AI-powered Interview System designed for 4th students of NORMI** designed to help students practice mock interviews and receive AI-generated feedback.

The system supports **two user roles**:

### 👩‍🎓 Student

- Can register and request verification from the admin.
- Practice interviews across multiple modes (Basic, Behavioral, Expert).
- View interview feedback, progress, and performance analytics.

### 🧑‍💼 Admin

- Can verify or reject student registration requests.
- Access a centralized **admin dashboard** with system insights.
- Manage interview question configurations and settings.
- Generate and export reports summarizing student results and performance.

This frontend is built for seamless interaction between both user types, focusing on **clarity, responsiveness, and maintainability**, while ensuring **AI-driven features** integrate smoothly into the user interface.

---

## 🧩 Coding Conventions

### 📁 Folder and File Naming

- Folders → `kebab-case`
- React components → `PascalCase`
- Non-React utility files → `camelCase`
- Avoid long file names. Keep concise and descriptive.

### 🧱 Code Style

- Use **TypeScript** strictly with explicit types where possible.
- Use **functional components** and **arrow functions** only.
- Use **const** by default; **let** only when reassignment is needed.
- Keep functions **short, reusable, and single-responsibility**.
- Use **async/await** for asynchronous logic (never `.then()` chaining).
- Avoid unnecessary abstractions—clarity first.

### ✨ Linting and Formatting

- Respect **ESLint** and **Prettier** configurations.
- Maintain **consistent spacing, semicolons, and quotes**.
- Use double quotes for JSX attributes and single quotes for TS/JS code (unless ESLint says otherwise).

---

## 🧠 React Guidelines

- Always use **function components** with the `.tsx` extension.
- Apply **Zustand** for local or global state management.
- Use **React Query** for server state (fetching, caching, mutations).
- Validate forms and responses with **Zod**.
- Prefer **custom hooks** for encapsulating logic.
- Follow the **Separation of Concerns (SoC)** principle.
- Avoid prop drilling; use context or Zustand when necessary.
- Components should handle **only one logical responsibility**.

---

## 🛰️ API and Data Handling

- All network requests should use **Axios** instances.
- Handle all API calls with **try/catch** and **error boundaries**.
- Use **React Query** for data fetching, mutation, and caching.
- Keep **API functions** inside a dedicated `/api` or `/services` module.

---

## 🎨 Styling and UI

- Use **Tailwind CSS** for all styling.
- Prefer **utility-first** classes with proper responsive design.
- Avoid inline styles unless absolutely necessary.
- Use **Lucide React** icons for all UI icons.
- Components should maintain accessibility (a11y) and semantic HTML.

---

## 🧱 Code Generation Rules for Copilot

Copilot should:

- Prioritize **readability**, **performance**, and **best practices**.
- Suggest **well-typed**, **self-documenting** code.
- Automatically infer types when safe, otherwise use explicit typing.
- Avoid generating large monolithic components.
- Provide **concise, purposeful variable names**.
- Prefer **composition over inheritance**.
- Skip auto-commenting unless contextually useful (no boilerplate comments).

---
