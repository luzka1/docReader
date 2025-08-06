import React, { createContext, useState } from "react";
import Parse from "parse";

interface IResult {
  test: any;
}

interface IResultContext {
  fetchAppConfig: (game_id: string | null) => Promise<void>;
  data: IResult;
  loading: boolean;
  configError: boolean;
  setConfigError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameConfigContext = createContext<IResultContext>(
  {} as IResultContext
);

export const GameConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<IResult>({} as IResult);
  const [loading, setLoading] = useState<boolean>(false);
  const [configError, setConfigError] = useState<boolean>(false);

  const fetchAppConfig = async (game_id: string | null) => {
    setLoading(true);

    // Simulação de carregamento
    await new Promise((resolve) => setTimeout(resolve, 1450));
    try {
      const result = await Parse.Cloud.run("getConfig", { game_id });

      console.log(result);

      if (result) {
        setData(result);
      } else {
        setConfigError(true);
      }
    } catch (error) {
      setConfigError(true);
      console.error("Erro ao buscar a configuracao do app:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameConfigContext.Provider
      value={{
        fetchAppConfig,
        data,
        loading,
        configError,
        setConfigError,
      }}
    >
      {children}
    </GameConfigContext.Provider>
  );
};