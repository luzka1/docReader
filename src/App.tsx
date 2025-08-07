import { BrowserRouter } from "react-router-dom";
import { Rotas } from "@/routes";

function App() {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-full max-w-[90vw] md:w-4/5 h-[800px] rounded-4xl shadow-lg bg-stone-100 flex gap-4 p-4">
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
