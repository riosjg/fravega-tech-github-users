# Frávega Tech GitHub Users

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/riosjg/fravega-tech-github-users
cd fravega-tech-github-users
```

### 2. Install dependencies

```bash
npm install
```

## Run the app locally

### 1. Start the development server

```bash
npm run dev
```

### 2. Open your browser at http://localhost:3000

# Development decisions

## Folder structure

Even though it's a small project, went for an structure that's organized by responsability so it's scalable and readable.

`src/services/` for GitHub REST client code.

`src/hooks/` for custom React hooks.

`src/context/` for the contexts.

`src/components/` for reusable UI components.

## Data Fetching

As suggested in the requeriments, went for React Query and used the `useInfiniteQuery` utility to handle pagination and infinite scroll.

## Virtualization

After research between `react-virtualized` and `react-window` and analyzing the requeriments for this app, went for react-window along with `react-window-infinite-loader` and `react-virtualized-auto-sizer` given that react-virtualized has many other utilies that weren't needed, hence adding innecessary bundle size.

## Styling

Also as suggested, used styled-components for theming and component-scoped styles. Faced FOUC (flashes of unstyled content) during development , so I set up a StyledComponentsRegistry with useServerInsertedHTML in the layout.

## Favorites Context & Persistence

Decided to implement a shared context to handle everything related the favorites users given that both views needs that data, and allowed me to centralize the logic in one place. Storing said data in a React state triggers a re-render on the components consuming it without having to listen a `storage` event or make regular checks to the local storage with a `setInterval`.
As a last pro to mention, it was simpler to test all the logic inside a single file, without having to mock the storage on each implementation.

## See the deployed app here:
https://fravega-tech-github-users.vercel.app/
