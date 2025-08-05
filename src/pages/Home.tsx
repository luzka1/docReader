import { InitialForm } from "@/components/Forms/InitialForm";

function Home() {
  return (
    <>
      <div className="h-full w-1/2 flex justify-center">
        <div className="flex flex-col justify-center items-center gap-12 h-full w-5/6">
          <div className="flex flex-col text-center">
            <h1 className="title">Bem-vindo ao *INSIRA O NOME AQUI*</h1>
            <p className="paragraph">
              Aqui você terá o controle dos valores das comissões de cada
              dentista!
            </p>
          </div>

          <InitialForm />
        </div>
      </div>

      <div className="h-full w-1/2 bg-cdp-blue rounded-[70px]" />
    </>
  );
}

export { Home };
