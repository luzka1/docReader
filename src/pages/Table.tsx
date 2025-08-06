import { GetReceived } from "@/lib/getReceived";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Table() {
  const [data, setData] = useState<any[]>([]);

  const location = useLocation();

  const { r, p } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetReceived(r);
        setData(result);
      } catch (err) {
        console.error("Erro ao obter os dados:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-12 flex flex-col gap-12 overflow-y-auto">
      <div>
        <h1 className="title">
          Valores arrecadados na primeira quinzena de agosto de 2025
        </h1>
        <p className="paragraph">
          Todos os valores arrecadados do período selecionado conforme a
          solicitação.
        </p>
      </div>

      <div className="flex flex-col items-center xl:grid xl:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-sm h-60 rounded-4xl border shadow-md p-6"
          >
            <div className="h-full w-full flex justify-between flex-col">
              <h2 className="font-bold text-lg">{item.fornecedor}</h2>

              <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-col w-1/2">
                  <p className="text-sm text-gray-500">Valor Recebido</p>
                  <p className="text-lg font-semibold">{item.valor}</p>
                </div>
                {/* <div className="flex flex-col w-1/2">
                    <p className="text-sm text-gray-500">Comissão a pagar</p>
                    <p className="text-lg font-semibold">R$ 1.000,00</p>
                  </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Table };
