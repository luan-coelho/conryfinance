import { ChangeEvent } from "react";

export function addInputDateMask(e: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) {
  let inputValue = e.target.value;
  e.target.value = addDateMask(inputValue);
  onChange(e);
}

export function addDateMask(inputValue: string) {
  if (inputValue.length <= 2) {
    inputValue = inputValue.replace(/[^0-9]/g, "").substr(0, 2);
  } else if (inputValue.length > 2) {
    inputValue = inputValue.replace(/[^0-9/]/g, "").substr(0, 7);
    if (inputValue[2] !== "/") {
      inputValue = inputValue.slice(0, 2) + "/" + inputValue.slice(2);
    }
  }

  if (inputValue.length >= 2) {
    const month = parseInt(inputValue.slice(0, 2), 10);
    if (month < 1) {
      inputValue = "01" + inputValue.slice(2);
    } else if (month > 12) {
      inputValue = "12" + inputValue.slice(2);
    }
  }

  return inputValue;
}

export function stringToDate(date: string): Date | null {
  const parts = date.split("/");

  if (parts.length === 2 && parts[1].length === 4) {
    return new Date(parseInt(parts[1]), parseInt(parts[0]) - 1);
  }
  return null;
}

export function getMonthNameFromDate(period: Date): string {
  const date = new Date(period);
  const monthNumber = date.getMonth() + 1;

  switch (monthNumber) {
    case 1:
      return "Janeiro";
    case 2:
      return "Fevereiro";
    case 3:
      return "Março";
    case 4:
      return "Abril";
    case 5:
      return "Maio";
    case 6:
      return "Junho";
    case 7:
      return "Julho";
    case 8:
      return "Agosto";
    case 9:
      return "Setembro";
    case 10:
      return "Outubro";
    case 11:
      return "Novembro";
    case 12:
      return "Dezembro";
    default:
      return "Sem mês";
  }
}