"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Loader } from "../shared/loader";
import { CardWrapper } from "./card-wrapper";
import ErroMessage from "./error-message";
import { useRouter } from "next/navigation";
import useAuth from "@/app/(auth)/_hooks/useAuth";

export const RegisgterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { error, registerUser, isLoading } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <CardWrapper
      headerLabel="Create Account!"
      backButtonHref="/login"
      backButtonLable="login"
      backButtonDescription="Already have an account?"
      showSocial
    >
      <form onSubmit={form.handleSubmit(registerUser)} noValidate>
        <FieldGroup>
          <ErroMessage message={error} />

          {/* NAME */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">
                  Name<span className="text-red-400">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="Enter your name"
                  autoComplete="off"
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* EMAIL */}
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
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* PASSWORD */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">
                  Password<span className="text-red-400">*</span>
                </FieldLabel>

                <div className="relative">
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full cursor-pointer"
          >
            Create Account {isLoading && <Loader />}
          </Button>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};
