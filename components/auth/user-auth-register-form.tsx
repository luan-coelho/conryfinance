"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/auth/icons";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/form";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UserAuthRegisterForm({ className, ...props }: UserAuthFormProps) {

  const authSchema = z.object({
    name: z.string()
      .min(1, "O nome é obrigatório"),
    email: z.string()
      .min(1, "O email é obrigatório").email("Informe um email válido"),
    password: z.string()
      .min(1, "A senha é obrigatória"),
    confirmPassword: z.string()
      .min(1, "Confirme a senha"),
  });

  const createAuthForm = useForm<User>({
    resolver: zodResolver(authSchema),
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = createAuthForm;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(user: User) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    reset();
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <FormProvider {...createAuthForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-3">
            <Form.Field className="grid gap-1">
              <Label htmlFor="email">
                Nome
              </Label>
              <Form.TextField name="name" id="name"
                              placeholder="João Silva"
                              autoCapitalize="none"
                              autoComplete="name"
                              autoCorrect="off"
                              disabled={isLoading} />
              <Form.ErrorMessage field="name" />
            </Form.Field>
            <Form.Field className="grid gap-1">
              <Label className="sr-onl" htmlFor="email">
                Email
              </Label>
              <Form.TextField name="email" id="email"
                              placeholder="joaosilva@exemplo.com"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              disabled={isLoading} />
              <Form.ErrorMessage field="email" />
            </Form.Field>
            <Form.Field className="grid gap-1">
              <Label htmlFor="password">
                Senha
              </Label>
              <Form.TextField name="password" id="password"
                              placeholder="Utilize uma senha forte"
                              type="password"
                              autoCapitalize="none"
                              autoComplete="password"
                              autoCorrect="off"
                              disabled={isLoading} />
              <Form.ErrorMessage field="password" />
            </Form.Field>
            <Form.Field className="grid gap-1">
              <Label htmlFor="confirmPassword">
                Confirmar senha
              </Label>
              <Form.TextField name="confirmPassword" id="confirmPassword"
                              placeholder="Utilize uma senha forte"
                              type="password"
                              autoCapitalize="none"
                              autoComplete="confirmPassword"
                              autoCorrect="off"
                              disabled={isLoading} />
              <Form.ErrorMessage field="confirmPassword" />
            </Form.Field>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cadastrar
            </Button>
          </div>
        </form>
      </FormProvider>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou cadastre-se com
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}