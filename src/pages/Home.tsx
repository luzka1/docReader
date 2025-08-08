import { InitialForm } from "@/components/Forms/InitialForm";
import { motion } from "motion/react";
import logo from "@/assets/logo.png";

function Home() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row-reverse">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1, ease: "easeInOut" }}
        className="h-full w-full md:w-1/2 flex justify-center"
      >
        <div className="flex flex-col justify-center items-center gap-4 md:gap-12 h-full w-5/6">
          <div className="flex flex-col text-center">
            <h1 className="text-lg font-bold md:text-2xl text-title">
              Bem-vindo ao Controle de de Comissões
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Aqui você verá os valores das comissões de todos os
              dentistas cadastrados!
            </p>
          </div>

          <InitialForm />
        </div>
      </motion.div>

      <div className="h-2/3 md:h-full w-full md:w-1/2 bg-cdp-blue rounded-3xl">
        <img className="h-full w-full rounded-3xl object-contain xl:object-fill" src={logo} alt="Logo da clínica dentista do povo" />
      </div>
    </div>
  );
}

export { Home };
