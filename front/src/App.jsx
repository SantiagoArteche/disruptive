import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route element={<Main />} path="/" />
          <Route element={<Login />} path="/login" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
