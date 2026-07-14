# Wyze Bundle Builder

A responsive security system bundle builder built with **React**, **Vite**, and **Zustand**. Users can configure a custom home security system through a step-by-step accordion interface while a live review panel updates selections, quantities, and pricing in real time.

---

# Tech Stack

- React 19
- Vite
- Zustand (State Management)
- CSS
- Tailwind CSS
- Local Storage
- Generate React CLI

---

# Getting Started

## Prerequisites

- Node.js (v18 or later)
- npm

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd wyze-bundle-builder
npm install
```

## Run the Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

## Production Build

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# Project Structure

- `src/data/products.json`
  - Stores all products, plans, colors, and pricing.
  - The application is completely data-driven, so products can be added or modified without changing component logic.

- `src/store/bundleStore.js`
  - Centralized Zustand store managing:
    - selected products
    - quantities
    - active accordion step
    - totals
    - review panel state

- `src/components`
  - Reusable UI components for the bundle builder.

---

# Features

- Multi-step accordion bundle builder
- Product quantity controls
- Product color selection
- Live review panel
- Real-time pricing updates
- Persistent selections using Local Storage
- Responsive design for desktop and mobile
- Highlight selected products
- Data-driven architecture using JSON

---

# Design Decisions

- **Zustand** was chosen instead of React Context to simplify shared state management, eliminate prop drilling, and reduce unnecessary re-renders.

- Product information is stored in **products.json** instead of hardcoding it inside components, making the application easier to maintain and extend.

- Local Storage is used to persist the user's bundle so returning users can continue where they left off.

- Components were generated using **Generate React CLI** to keep the project structure consistent and speed up development.

---

# Tradeoffs

- Product data is loaded from a local JSON file instead of an API to keep the project simple and focused on the UI and state management.

- Styling uses a combination of CSS and Tailwind CSS. A single styling approach could improve long-term consistency, but both were used where each was most convenient.

- Checkout functionality is represented as a placeholder since the primary focus is the bundle-building experience.

---

# Future Improvements

- Connect products to a backend API.
- Add unit and integration tests.
- Improve accessibility (ARIA attributes and keyboard navigation).
- Add animations between bundle-building steps.
- Implement a real checkout flow.
- Add product search and filtering.

---

# Notes

The application builds and runs successfully from a clean clone using:

```bash
npm install
npm run dev
```

No additional configuration or environment variables are required.
