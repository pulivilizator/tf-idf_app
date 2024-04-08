import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import {RootStoreContext} from "./stores/RootStoreContext";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {RootStore} from "./stores/rootStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <RootStoreContext.Provider value={new RootStore()}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RootStoreContext.Provider>
  </React.StrictMode>,
);
