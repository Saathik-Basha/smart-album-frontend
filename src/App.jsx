import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImagesList } from "./components/ImagesList/ImagesList";
import { Uploader } from "./components/Uploader/Uploader";
import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";

import Album from "./pages/Album/Album";


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <BrowserRouter>
                <NavBar />
                <div className="App container mx-auto py-8 max-w-7xl">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="album/:label" element={<Album />} />
                    </Routes>
                </div>
            </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
