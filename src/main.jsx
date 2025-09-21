import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./Context/ProductsContext.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ProductsProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ProductsProvider>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);
