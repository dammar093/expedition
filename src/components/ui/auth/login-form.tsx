"use client";
import React from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "@/schema/login";
import { Input } from "../input";
import { Button } from "../button";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {}
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonHref="/register"
      backButtonLable="register"
      backButtonDescription="Did not have an account?"
      showSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
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
            className="w-full"
          >
            Login
          </Button>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};
