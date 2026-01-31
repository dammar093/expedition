"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  const router = useRouter();
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">
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

          <div className="flex justify-end">
            <Button
              variant={"link"}
              type="button"
              className="p-0 hover:text-blue-600 cursor-pointer"
              size={"lg"}
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password?
            </Button>
          </div>

          <Button
            type="submit"
            variant={"default"}
            size={"lg"}
            className="w-full cursor-pointer"
          >
            Login
          </Button>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};
