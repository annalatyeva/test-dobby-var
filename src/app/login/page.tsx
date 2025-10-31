import { Metadata } from "next";
import Title from "@/app/components/Title";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Авторизация",
};

export default function LoginPage() {
  console.log("🔴 LoginPage перерендерился");
  return (
    <main className="h-screen w-full px-10 flex flex-col justify-center">
      <Title innerText="Вход" />
      <LoginForm />
    </main>
  );
}
