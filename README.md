# Decision Dashboard 🚀

A responsive decision-making application built with **React, TypeScript, and Tailwind CSS** that helps users compare multiple options using weighted criteria and automatically identify the best alternative.

## ✨ Features

- Fetch initial decision data from a mock REST API.
- API response validation using Zod.
- Data fetching and caching with TanStack Query.
- Edit decision titles.
- Add, edit, and remove options.
- Add, edit, and remove criteria.
- Configure criterion weights.
- Support benefit and cost criteria.
- Dynamic score comparison table.
- Automatic weighted score calculation.
- Automatic ranking of options.
- Highlight the recommended option.
- Reset to Original functionality.
- Input validation and error handling.
- Responsive user interface.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development and build tool |
| Tailwind CSS | Styling |
| TanStack Query | Data fetching and caching |
| Axios | HTTP requests |
| Zod | API response validation |
| JSON Server | Mock REST API |
| Lucide React | Icons |

## 📂 Project Structure

```text
decision-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── OptionManager.tsx
│   │   ├── CriteriaManager.tsx
│   │   ├── ScoreTable.tsx
│   │   └── ResultsPanel.tsx
│   ├── hooks/
│   │   └── useDecision.ts
│   ├── providers/
│   │   └── QueryProvider.tsx
│   ├── schemas/
│   │   └── decisionSchema.ts
│   ├── services/
│   │   └── decisionApi.ts
│   ├── types/
│   │   └── decision.ts
│   ├── utils/
│   │   ├── calculateScore.ts
│   │   └── syncScores.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── db.json
├── package.json
├── vite.config.ts
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/ritesh01-hub/decision-dashboard.git
```

### 2. Navigate to the project directory

```bash
cd decision-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the mock API server

```bash
npm run server
```

The mock API runs at:

`http://localhost:3000`

Decision endpoint:

`http://localhost:3000/decisions/decision-1`

### 5. Start the development server

Open another terminal:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 📊 Scoring Methodology

The application uses weighted criteria to evaluate different options.

**Benefit Criteria:** Higher values receive better normalized scores.

**Cost Criteria:** Lower values receive better normalized scores.

The application normalizes criterion values and applies their respective weights to calculate the final score.

Options are automatically ranked from highest to lowest.

## 🔄 Data Management

- Initial decision data is fetched from the mock API.
- API responses are validated using Zod.
- User changes are maintained in local application state.
- The API remains read-only.
- Reset to Original restores the initially fetched decision.

## 🏗️ Production Build

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 👨‍💻 Author

**Ritesh Tiwari**

Frontend Developer | React.js | TypeScript | JavaScript

GitHub: [@ritesh01-hub](https://github.com/ritesh01-hub)

---

⭐ If you find this project useful, consider giving the repository a star.