import React, { createContext, useState } from "react";
import Parse from "parse";

// ================= TYPES ===========================
type Clinica = { id_clinic: number; clinic_name: string };
type Form = { id_form_received: string; id_form_paid: string };
type newForm = {
  id_form_received: string;
  id_form_paid: string;
  id_clinica: number;
  id_month: number;
};

// ================= INTERFACES ======================
interface IResultContext {
  getClinics: () => Promise<void>;
  getFormsById: (id_month: number, id_clinic: number) => Promise<Form | null>;
  addNewForm: (body: newForm) => Promise<string>;
  clinics: Clinica[];
  loading: boolean;
}

export const ResultContext = createContext<IResultContext>(
  {} as IResultContext
);

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [clinics, setClinics] = useState<Clinica[]>(() => {
    const storedValue = localStorage.getItem("clinics");
    return storedValue ? JSON.parse(storedValue) : [];
  }); // Clínicas armazenadas em storage

  const [loading, setLoading] = useState<boolean>(false); // Variável de carregamento

  const getClinics = async () => {
    if (clinics.length > 0) return;

    setLoading(true);

    // Simulação de carregamento de 1,45s
    await new Promise((resolve) => setTimeout(resolve, 1450));
    try {
      const result = await Parse.Cloud.run("getClinics");

      if (result && Array.isArray(result)) {
        setClinics(result);
        localStorage.setItem("clinics", JSON.stringify(result));
      } else {
        console.error("Não foi possível encontrar as clínicas");
      }
    } catch (error) {
      console.error("Erro ao buscar as clínicas do app:", error);
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

  const addNewForm = async (body: newForm): Promise<string> => {
    setLoading(true)
    // Simulação de carregamento de 1,45s
    await new Promise((resolve) => setTimeout(resolve, 1450));
    try {
      const result = await Parse.Cloud.run("addNewForm", body);
      return result;
    } catch (error: any) {
      console.error("Erro ao chamar a função do Parse:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResultContext.Provider
      value={{
        getClinics,
        getFormsById,
        addNewForm,
        clinics,
        loading,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};
