import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Title from "@/app/components/Title";

export const metadata: Metadata = {
  title: "Вы вошли в систему",
};

export default async function WelcomePage() {
  // const cookieStore = await cookies();
  // const session = cookieStore.get("session");

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <main className="h-screen w-full px-10 flex flex-col justify-center">
      <Title innerText="Вы успешно вошли в систему!" />
    </main>
  );
}
