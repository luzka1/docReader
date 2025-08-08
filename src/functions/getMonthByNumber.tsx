import { months } from "@/data/months";

export function getMonthByNumber(number: number) {
    const { name } = months[number - 1];

  return name;
}
