import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { clinicas } from "@/data/clinicas";
import { months } from "@/data/months";
import { useState } from "react";
import { Button } from "../ui/button";

function InitialForm() {
  const [formData, setFormData] = useState({
    clinica: "",
    mes: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Select
          required
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, clinica: value }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a clínica" />
          </SelectTrigger>
          <SelectContent>
            {clinicas.map((clinica, index) => {
              return (
                <SelectItem key={index} value={clinica.name}>
                  {clinica.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          required
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, mes: Number(value) }))
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
          className="bg-cdp-blue cursor-pointer hover:scale-105 transition-transform hover:bg-cdp-blue"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}

export { InitialForm };
