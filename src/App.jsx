import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
import Album from "./pages/Album/Album";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavBar />
          <div className="App container mx-auto py-8 max-w-7xl">
            <Routes>
              <Route element={<Private />}>
                <Route index element={<Home />} />
                <Route path="album/:label" element={<Album />} />
              </Route>
              <Route index element={<Home />} />
              <Route path="album/:label" element={<Album />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
