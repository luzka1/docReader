import { AddForm } from "@/components/Forms/AddForm";
import { motion } from "motion/react";

function Add() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1, ease: "easeInOut" }}
        className="h-full w-1/2 flex justify-center"
      >
        <div className="flex flex-col justify-center items-center gap-12 h-full w-5/6">
          <div className="flex flex-col text-center">
            <h1 className="title">Adicione novas planilhas</h1>
            <p className="paragraph">
              Adicione todos os Id de planilhas que contém valores pagos e a pagar dos dentistas!
            </p>
          </div>

          <AddForm />
        </div>
      </motion.div>

      <div className="h-full w-1/2 bg-cdp-blue rounded-3xl" />
    </>
  );
}

export { Add };
