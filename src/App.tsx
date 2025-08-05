import { BrowserRouter } from "react-router-dom";
import { Rotas } from "@/routes";

function App() {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-2/3 h-[800px] rounded-[80px] shadow-lg bg-stone-100 flex gap-4 p-4">
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
