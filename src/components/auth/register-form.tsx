"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { loginSchema, registerSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper";

export const RegisgterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {}
  return (
    <CardWrapper
      headerLabel="Create Account!"
      backButtonHref="/login"
      backButtonLable="login"
      backButtonDescription="Already have an account?"
      showSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Name<span className="text-red-400">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  arial-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  autoComplete="off"
                />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Email<span className="text-red-400">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  arial-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Password<span className="text-red-400">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="password"
                  arial-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            variant={"default"}
            size={"lg"}
            className="w-full cursor-pointer"
          >
            Create Account
          </Button>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};
