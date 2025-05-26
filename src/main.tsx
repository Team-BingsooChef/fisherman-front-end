import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://aadc799b8cfb33c8d76fe2b0abb2e7c6@o4509388525207552.ingest.us.sentry.io/4509388526059520",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")!).render(<App />);
