import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { login, password } = await req.json();

    const response = await fetch("https://api.school-dobby-var.ru/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ login, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json({ error: errorData?.error || "Неверный логин или пароль" }, { status: response.status });
    }

    const data = await response.json();

    const authCookie = response.headers.get("set-cookie");
    const nextResponse = NextResponse.json(data, { status: response.status });

    if (authCookie) {
      nextResponse.headers.set("set-cookie", authCookie);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сети. Попробуйте позже." }, { status: 500 });
  }
}
