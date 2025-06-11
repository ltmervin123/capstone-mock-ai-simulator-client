# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# 📁 Project Structure

📦 capstone-mock-ai-simulator-client
├── public/ # Static assets (favicon, images)
├── src/
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Reusable UI components (Button, Card, etc.)
│ ├── layouts/ # Shared layout components (Header, Footer, etc.)
│ ├── pages/ # Page-level components (Home, About, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Reusable utility functions
│ ├── constants/ # Constants like enums, text
│ ├── services/ # API calls, service layers
│ ├── contexts/ # React context files (AuthContext, ThemeContext)
│ ├── App.jsx # Root component
│ ├── main.jsx # Vite's entry point
│ └── index.css # TailwindCSS entry styles
├── .vscode/ # VSCode workspace settings (optional)
├── .editorconfig # Editor formatting rules
├── .prettierrc # Prettier config
├── .eslintrc.cjs # ESLint config
├── vite.config.js # Vite config
├── tailwind.config.js # Tailwind config
└── README.md

## 🧾 Naming Conventions

To ensure consistency and maintainability across the project, follow these conventions:

### 📂 Folder & File Naming

| Type                | Convention              | Example                        |
| ------------------- | ----------------------- | ------------------------------ |
| **Folders**         | `kebab-case`            | `components/`, `assets/`       |
| **React Files**     | `PascalCase.jsx`        | `HomePage.jsx`, `Navbar.jsx`   |
| **Non-React Files** | `camelCase.js`          | `fetchData.js`, `formUtils.js` |
| **Stylesheets**     | `kebab-case.css`        | `main.css`, `button-style.css` |
| **Config Files**    | `dotfiles` or lowercase | `.env`, `vite.config.js`       |

🧪 Run Linting & Formatting

- npx eslint src --ext js,jsx
- npx prettier --write .
