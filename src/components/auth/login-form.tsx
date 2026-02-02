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
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import ErroMessage from "./error-message";
import { useState, useTransition } from "react";
import { Loader } from "../shared/loader";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "@/app/(auth)/_hooks/useAuth";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const searchPramas = useSearchParams();
  const urlError =
    searchPramas.get("error") === "OAuthAccountNotLinked"
      ? "Email aready in use width differnt provider!"
      : "";
  const router = useRouter();
  const { loginUser, isLoading, error } = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonHref="/register"
      backButtonLable="register"
      backButtonDescription="Did not have an account?"
      showSocial
    >
      <form onSubmit={form.handleSubmit(loginUser)}>
        <FieldGroup>
          <ErroMessage message={error || urlError} />
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
                  disabled={isLoading}
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
            disabled={isLoading}
            size={"lg"}
            className="w-full cursor-pointer"
          >
            Login {isLoading && <Loader />}
          </Button>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};
