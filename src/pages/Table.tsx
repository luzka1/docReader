// ============== HOOKS ==============
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// ============== UI ==============
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PriceCard } from "@/components/ui/priceCard";
import { LoaderCircle, Plus, PlusCircle } from "lucide-react";
// ============== FUNCTIONS ==============
import { combineValuesByName } from "@/functions/combineValuesByName";
import { GetReceived } from "@/functions/getReceived";
import { getMonthByNumber } from "@/functions/getMonthByNumber";
import { getClinicByNumber } from "@/functions/getClinicByNumber";
import { useWindowSize } from "@/functions/getWindowSize";
import { motion } from "motion/react";

function Table() {
  const location = useLocation();

  const { r, p, m, c } = location.state || {};

  const [data, setData] = useState<any[]>([]);
  const [initialData, setInitialData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const mes = m ? getMonthByNumber(parseInt(m)) : 0;
  const clinica = c ? getClinicByNumber(parseInt(c)) : 0;
  const { width } = useWindowSize();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const resultR = await GetReceived(r);
        const resultP = await GetReceived(p);

        const combined = await combineValuesByName(resultR, resultP);
        setData(combined);
        setInitialData(combined);
      } catch (err) {
        console.error("Erro ao obter os dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const refreshTotal = () => {
      const geralTotal = data.reduce((acc, item) => acc + (item.total || 0), 0);

      setTotal(geralTotal);
    };

    refreshTotal();
  }, [data]);

  function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const searchByName = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const query = removeAccents(search.trim().toLowerCase());

      if (query) {
        const filtered = initialData.filter((item) =>
          removeAccents(item.fornecedor.toLowerCase()).includes(query)
        );

        setData(filtered);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-12 flex flex-col overflow-y-auto w-full h-full">
      <div className="w-full flex flex-col gap-4 justify-between">
        <div>
          <h1 className="text-title font-bold text-lg md:text-2xl">
            {clinica} - {mes}
          </h1>
          <p className="text-sm md:text-md">Total de pagamentos do período</p>
        </div>
        {width >= 1024 ? (
          <div>
            <Button>
              <a href="/">Nova consulta</a>
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1, ease: "easeInOut" }}
            className="z-20 fixed bottom-5 right-5"
          >
            <Button className="rounded-full shadow-lg flex items-center justify-center bg-yellow-300 w-12 h-12 text-cdp-blue">
              <a href="/"><Plus /></a>
            </Button>
          </motion.div>
        )}
      </div>
      <div className="w-full flex flex-col gap-8 md:gap-2 py-4">
        <form className="flex gap-2" onSubmit={(e) => searchByName(e)}>
          <Input
            className="w-sm placeholder:text-sm md:placeholder:text-base"
            placeholder="Pesquise um dentista (Ex: Marcos)"
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);

              if (value.trim() === "") {
                setData(initialData);
              }
            }}
          />
          <Button type="submit">Buscar</Button>
        </form>
        <div className="w-full flex flex-col justify-end items-end">
          <h2 className="text-md">Total arrecadado: </h2>
          <p className="text-2xl font-semibold">
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-row gap-2">
            <LoaderCircle className="animate-spin text-cdp-blue" />
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      ) : data.length <= 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          Nenhum registro encontrado!
        </div>
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-[repeat(auto-fit,minmax(384px,1fr))] gap-8">
          {data
            .sort((a, b) => b.fornecedor.localeCompare(a.fornecedor))
            .map((item, index) => (
              <PriceCard
                key={index}
                fornecedor={item.fornecedor}
                pagar={item.pagar}
                pago={item.pago}
                total={item.total}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export { Table };
