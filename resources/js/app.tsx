import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

declare module "@inertiajs/react" {
  interface PageProps {
    auth: {
      user: Record<string | symbol, unknown> | null;
    };
  }
}

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <>
        <Toaster position="top-center" richColors />
        <App {...props} />
      </>,
    );
  },
  progress: {
    color: "#4B5563",
  },
});
