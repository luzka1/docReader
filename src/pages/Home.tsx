import { InitialForm } from "@/components/Forms/InitialForm";
import { motion } from "motion/react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row-reverse gap-4 overflow-auto">
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
              Aqui você verá os valores das comissões de todos os dentistas
              cadastrados!
            </p>
          </div>

          <InitialForm />
        </div>
      </motion.div>

      <div className="h-full md:h-full w-full md:w-1/2 bg-cdp-blue rounded-3xl">
        <img
          className="h-full w-full rounded-3xl object-contain xl:object-fill"
          src={logo}
          alt="Logo da clínica dentista do povo"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1, ease: "easeInOut" }}
        className="z-20 fixed bottom-5 right-5"
      >
        <Button className="rounded-full shadow-lg flex items-center justify-center bg-yellow-300 w-12 h-12 text-cdp-blue">
          <a href="/add">
            <p>ADM</p>
          </a>
        </Button>
      </motion.div>
    </div>
  );
}

export { Home };
