import { Route, Routes } from "react-router-dom";
import { Home, Table, Add, Error } from "@/pages";

export const Rotas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Table />} />
        <Route path="/add" element={<Add />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
