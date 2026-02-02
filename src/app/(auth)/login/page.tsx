import dynamic from "next/dynamic";

// Dynamically import the named export `LoginForm`
const LoginForm = dynamic(() =>
  import("@/components/auth/login-form").then((mod) => mod.LoginForm),
);

export default function Page() {
  return <LoginForm />;
}
