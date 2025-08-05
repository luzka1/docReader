import { Route, Routes } from "react-router-dom";
import { Home, Table, Error } from "@/pages";

export const Rotas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Table />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
