import React, { createContext, useState } from "react";
import Parse from "parse";

type Clinica = { id_clinic: number; clinic_name: string };
type Form = { id_form_received: string; id_form_paid: string };

interface IResultContext {
  getClinics: () => Promise<void>;
  getFormsById: (id_month: number, id_clinic: number) => Promise<Form | null>;
  clinics: Clinica[];
  forms: Form;
  loading: boolean;
  configError: boolean;
  setConfigError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResultContext = createContext<IResultContext>(
  {} as IResultContext
);

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [clinics, setClinics] = useState<Clinica[]>([]);
  const [forms, setForms] = useState<Form>({} as Form);
  const [loading, setLoading] = useState<boolean>(false);
  const [configError, setConfigError] = useState<boolean>(false);

  const getClinics = async () => {
    setLoading(true);

    // Simulação de carregamento
    await new Promise((resolve) => setTimeout(resolve, 1450));
    try {
      const result = await Parse.Cloud.run("getClinics");

      if (result) {
        setClinics(result);
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

  const getFormsById = async (
    id_month: number,
    id_clinic: number
  ): Promise<Form | null> => {
    setLoading(true);

    try {
      const result: Form = await Parse.Cloud.run("getFormIds", {
        id_month,
        id_clinic,
      });

      return result ?? null;
    } catch (error) {
      console.error("Erro ao buscar formulários:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResultContext.Provider
      value={{
        getClinics,
        getFormsById,
        clinics,
        forms,
        loading,
        configError,
        setConfigError,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};
