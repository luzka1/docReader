import { motion } from "motion/react";

interface Props {
  fornecedor: string;
  pagar?: string;
  pago?: string;
  total?: number;
}

export const PriceCard = ({ fornecedor, pagar, pago, total }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type:"spring", duration: 1, ease: "easeInOut" }}
      className="w-full h-60 rounded-4xl border shadow-lg p-6 bg-white"
    >
      <div className="h-full w-full flex justify-between flex-col">
        <h2 className="font-bold text-md md:text-lg">{fornecedor}</h2>

        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col w-1/2">
            <p className="text-sm text-gray-500">Valor a pagar</p>
            <p className="text-lg font-semibold">{pagar ? pagar : "R$0,00"}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-sm text-gray-500">Valor pago</p>
            <p className="text-lg font-semibold">{pago ? pago : "R$0,00"}</p>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-semibold">
            {total
              ? `${total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`
              : "R$0,00"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
