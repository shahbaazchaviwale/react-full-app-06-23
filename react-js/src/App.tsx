import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components";

function App() {
  return (
    <div className="min-h-full">
      <Suspense>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
