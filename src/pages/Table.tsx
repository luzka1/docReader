import Papa from "papaparse";
import { useEffect, useState } from "react";

type TableData = { fornecedor: string; valor: string };

function Table() {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    const url =
      "https://docs.google.com/spreadsheets/d/1T5OKSCPCBdz39vvSS4ZwykuFn50IuqyB/gviz/tq?tqx=out:csv&gid=1368580946";

    fetch(url)
      .then((response) => response.text())
      .then((csvText) => {
        const lines = csvText.split("\n");

        const headerIndex = lines.findIndex(
          (line) => line.includes("Fornecedor") && line.includes("Vencimento")
        );

        const validCsv = lines.slice(headerIndex).join("\n");

        Papa.parse(validCsv, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            const rawData = results.data;

            console.log(rawData);

            const keys = Object.keys(rawData[0]);
            const fornecedorKey = keys.find((key) =>
              key.toLowerCase().includes("fornecedor")
            );
            const valorKey = keys.find(
              (key) =>
                key.toLowerCase().includes("original") ||
                key.toLowerCase().includes("valor")
            );

            if (!fornecedorKey || !valorKey) {
              console.error("Colunas 'fornecedor' ou 'valor' não encontradas.");
              return;
            }

            const filtered = rawData
              .map((row: any) => ({
                fornecedor: row[fornecedorKey],
                valor: row[valorKey],
              }))
              .filter((item: any) => item.fornecedor);

            setData(filtered);
          },
          error: (err: any) => {
            console.error("Erro ao fazer parse:", err);
          },
        });
      });
  }, []);

  const filter = ["REGISTROS", "Correios", "GERAL"];

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
        {data
          .filter((value) => value.fornecedor.includes("TOTAL") && !value.fornecedor.includes(filter[0]))
          .map((item, index) => (
            <div
              key={index}
              className="w-sm h-60 rounded-4xl border shadow-md p-6"
            >
              <div className="h-full w-full flex justify-between flex-col">
                <h2 className="font-bold text-lg">{item.fornecedor}</h2>

                <div className="flex flex-row gap-2 justify-between">
                  <div className="flex flex-col w-1/2">
                    <p className="text-sm text-gray-500">Valor original</p>
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
