# OctoFit Tracker frontend

The presentation tier is a React 19 app built with Vite. Install dependencies and start the development server with:

```sh
npm install
npm run dev
```

## API URL configuration

In Codespaces, `VITE_CODESPACE_NAME` must be defined with the Codespace name. Add it to `octofit-tracker/frontend/.env.local` so Vite can reach the API at `https://<codespace-name>-8000.app.github.dev`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart Vite after changing environment variables. When `VITE_CODESPACE_NAME` is not set, the frontend uses `http://localhost:8000`.
