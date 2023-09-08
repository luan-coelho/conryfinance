import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function TextField(props: InputProps) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Input
      id={props.name}
      {...register(props.name)}
      {...props}
      className={errors[props.name] ? "border-red-500" : ""}
    />
  );
}