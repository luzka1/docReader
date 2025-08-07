import { useResultContext } from "@/hooks/useResultContext";

export function getClinicByNumber(number: number) {
  const { clinics } = useResultContext();

  if (clinics.length > 0) {
    const { clinic_name } = clinics[number - 1];

    return clinic_name;
  } else {
    console.log("erro ao buscar as clínicas");
    return;
  }
}
