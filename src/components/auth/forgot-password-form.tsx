"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper";
import ErroMessage from "./error-message";

export const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {}
  return (
    <CardWrapper
      headerLabel="Forgot Password!"
      backButtonHref="/login"
      backButtonLable="Back to login"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <ErroMessage message="Something went wrong" />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">
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

          <Button
            type="submit"
            variant={"default"}
            size={"lg"}
            className="w-full cursor-pointer"
          >
            Send Reset OTP
          </Button>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};
