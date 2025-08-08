import Papa from "papaparse";

export const GetReceived = async (
  received: string
): Promise<{ fornecedor: string; valor: string }[]> => {
  const url = `https://docs.google.com/spreadsheets/d/${received}/gviz/tq?tqx=out:csv&gid=1368580946`;

  try {
    const response = await fetch(url);

    const csvText = await response.text();

    const lines = csvText.split("\n");

    const headerIndex = lines.findIndex(
      (line) => line.includes("Fornecedor") && line.includes("Vencimento")
    );

    const validCsv = lines.slice(headerIndex).join("\n");

    return new Promise((resolve, reject) => {
      Papa.parse(validCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => {
          const rawData = results.data;

          const keys = Object.keys(rawData[0] || {});
          const fornecedorKey = keys.find((key) => key.includes("Fornecedor"));
          const valorKey = keys.find(
            (key) => key.includes("Pago") || key.includes("A Pagar")
          );

          if (!fornecedorKey || !valorKey) {
            reject(
              new Error("Colunas 'fornecedor' ou 'valor' não encontradas.")
            );
            return;
          }

          const filtered = rawData
            .map((row: any) => ({
              fornecedor: row[fornecedorKey],
              valor: row[valorKey],
            }))
            .filter((item: any) => item.fornecedor);

          const filteredData = filtered.filter((value: any) => {
            const fornecedor = value.fornecedor.toUpperCase().trim();

            const isDoctor = /\b(DR|DRA|PROT|PROTETICO|PROTÉTICO)\.?\b/.test(
              fornecedor
            );

            const isIncluded = fornecedor.includes("TOTAL");

            return isDoctor && isIncluded;
          });

          resolve(filteredData);
        },
        error: (err: any) => {
          reject(err);
        },
      });
    });
  } catch (err) {
    console.error("Erro ao buscar ou processar CSV:", err);
    throw err;
  }
};
