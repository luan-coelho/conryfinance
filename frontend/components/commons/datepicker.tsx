import React, { ChangeEvent, FocusEvent } from "react";
import { Input } from "@/components/ui/input";

interface DateInputProps {
  value: string;
  setValue: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, setValue }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (inputValue.length <= 2) {
      inputValue = inputValue.replace(/[^0-9]/g, "").substr(0, 2);
    } else if (inputValue.length > 2) {
      inputValue = inputValue.replace(/[^0-9/]/g, "").substr(0, 7);
      if (inputValue[2] !== "/") {
        inputValue = inputValue.slice(0, 2) + "/" + inputValue.slice(2);
      }
    }

    setValue(inputValue);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parts = value.split("/");

    if (parts.length === 2 && parts[1].length === 4) {
      const date = new Date(parseInt(parts[1]), parseInt(parts[0]) - 1);
    }
  };

  return (
    <Input
      id="description"
      className="col-span-3"
      placeholder="Informe o mês e ano - 00/0000"
      maxLength={7}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      value={value}
    />
  );
};

export default DateInput;
