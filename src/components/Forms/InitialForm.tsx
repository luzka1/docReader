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
import { useNavigate } from "react-router-dom";
import { Dialog } from "../Dialog";

function InitialForm() {
  const { getClinics, getFormsById, clinics, loading } = useResultContext();

  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    id_month: 0,
    id_clinic: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await getFormsById(formData.id_month, formData.id_clinic);

    try {
      if (data) {
        navigate(`/results`, {
          state: {
            r: data.id_form_received,
            p: data.id_form_paid,
            c: formData.id_clinic,
            m: formData.id_month,
          },
        });
      } else {
        setMessage("Comissões não encontradas!");
        handleControlDialog(true);
      }
    } catch (error: any) {
      setMessage(error.text);
      handleControlDialog(true);
    }
  };

  const handleControlDialog = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  useEffect(() => {
    getClinics();
  }, []);

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

export { InitialForm };
