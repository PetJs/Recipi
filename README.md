# 🥗 Recipi - A Modern Recipe Web App

[Live Demo 🚀](https://recipi-puce.vercel.app/)

Recipi is a visually appealing and user-friendly recipe web application built with **React**, **TypeScript**, and **React Query**, powered by the **Spoonacular API**. Users can explore detailed recipes, including nutritional information, ingredients, and preparation steps — all wrapped in a sleek UI.

## 🔧 Tech Stack

- **React** (with TypeScript) — frontend framework
- **React Query** — data fetching, caching, and state synchronization
- **Zustand** — state management for shared state (e.g., selected recipe)
- **Tailwind CSS** — utility-first CSS framework for styling
- **Spoonacular API** — recipe and food data source
- **Vite** — blazing fast frontend build tool
- **Vercel** — deployment platform

## 📦 Features

- 📋 Browse recipe details (title, summary, ingredients, instructions)
- 🧑‍🍳 View nutrition facts like amount and daily percentage
- ⏱ See prep time and dish type
- 🖼 Rich images and SVG icons for aesthetics
- 🔎 Dynamic routing and interaction using Zustand
- ⚡ Optimized loading with React Query and `enabled` flags
- 📬 Newsletter call-to-action section with image overlays

## 🔌 API Reference

This project uses the [Spoonacular API](https://spoonacular.com/food-api) to fetch;
> ⚠️ Make sure to configure your API key and handle request limits if extending the project.


## 📥 Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/PetJs/recipi.git
cd recipi

# Install dependencies
npm install

# Run the development server
npm run dev


