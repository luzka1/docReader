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
import { Dialog } from "../Dialog";

type newForm = {
  id_form_received: string;
  id_form_paid: string;
  id_clinica: number;
  id_month: number;
};

function AddForm() {
  const { getClinics, addNewForm, clinics, loading } = useResultContext();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [formData, setFormData] = useState<newForm>({
    id_form_received: "",
    id_form_paid: "",
    id_clinica: 0,
    id_month: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await addNewForm(formData);
    if (data) {
      setMessage(data);
      handleControlDialog(true);
    } else {
      alert("Erro ao adicionar formulários");
    }
  };

  useEffect(() => {
    getClinics();
  }, []);

  const handleControlDialog = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Dialog
        isDialogOpen={isDialogOpen}
        message={message}
        controlDialog={handleControlDialog}
      />

      <div className="flex flex-col gap-4">
        <Select
          required
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, id_clinica: Number(value) }))
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

        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="pagar" className="text-sm text-muted-foreground">
              Contas A pagar
            </label>
            <Input
              id="pagar"
              required
              placeholder="Insira o Id da planilha de contas A pagar"
              className="placeholder:text-sm md:text-md"
              minLength={33}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  id_form_received: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full">
            <label htmlFor="pagas" className="text-sm text-muted-foreground">
              Contas Pagas
            </label>
            <Input
              id="pagas"
              required
              className="placeholder:text-sm md:text-md"
              placeholder="Insira o Id da planilha de contas Pagas"
              minLength={33}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  id_form_paid: e.target.value,
                }))
              }
            />
          </div>
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
