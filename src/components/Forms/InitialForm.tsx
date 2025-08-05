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

function InitialForm() {
  const [formData, setFormData] = useState({
    clinica: "",
    ano: 0,
    mes: 0,
    quinzena: 0,
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => ({
    year: 2000 + i,
    value: (2000 + i).toString(),
  })).sort((a, b) => b.year - a.year);

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

        <div className="flex flex-row gap-4 xl:flex-nowrap flex-wrap">
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

          <Select
            required
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, ano: Number(value) }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o ano desejado" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year, index) => {
                return (
                  <SelectItem key={index} value={year.value}>
                    {year.year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <Select
          required
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, quinzena: Number(value) }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o período desejado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Primeira quinzena</SelectItem>

            <SelectItem value="2">Segunda quinzena</SelectItem>
          </SelectContent>
        </Select>

        <button
          type="submit"
          className="w-full bg-cdp-blue text-white py-2 rounded-lg hover:bg-cdp-blue/80 transition-colors"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

export { InitialForm };
