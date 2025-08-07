import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { months } from "@/data/months";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useResultContext } from "@/hooks/useResultContext";
import { LoaderCircle } from "lucide-react";
import { Input } from "../ui/input";

function AddForm() {
  const { getClinics, clinics, loading } = useResultContext();

  const [formData, setFormData] = useState({
    id_month: 0,
    id_clinic: 0,
    id_form_received: "",
    id_form_paid: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    getClinics();
  }, []);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Select
          required
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, id_clinic: Number(value) }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a clínica" />
          </SelectTrigger>
          <SelectContent>
            {clinics.length > 0 ? (
              clinics.map((clinica, index) => {
                return (
                  <SelectItem key={index} value={clinica.id_clinic.toString()}>
                    {clinica.clinic_name}
                  </SelectItem>
                );
              })
            ) : (
              <div className="w-full flex items-center justify-center gap-2 py-2">
                <LoaderCircle className="animate-spin text-cdp-blue" />
                <p className="text-zinc-500">Carregando...</p>
              </div>
            )}
          </SelectContent>
        </Select>

        <Select
          required
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, id_month: Number(value) }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o mês desejado" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => {
              return (
                <SelectItem key={index} value={month.value}>
                  {month.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <div className="w-full flex gap-4">
          <Input
            required
            placeholder="Insira o Id da planilha de contas a pagar"
            minLength={33}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                id_form_received: e.target.value,
              }))
            }
          />
          <Input
            required
            placeholder="Insira o Id da planilha de contas Pagas"
            minLength={33}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                id_form_received: e.target.value,
              }))
            }
          />
        </div>

        <Button
          type="submit"
          className="disabled:cursor-progress"
          disabled={loading}
        >
          {loading ? (
            <span className="flex gap-2 items-center">
              <LoaderCircle className="animate-spin" />
              Carregando...
            </span>
          ) : (
            "Enviar"
          )}
        </Button>
      </div>
    </form>
  );
}

export { AddForm };
