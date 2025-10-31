"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormErrors } from "@/app/login/types";
import Input from "@/components/Input";
import { validatePassword, validatePhone } from "./utils/validation";
import { normalizePhone } from "./utils/normalizePhone";
import { formatPhoneDisplay } from "./utils/formatPhoneDisplay";

export default function LoginForm() {
  const router = useRouter();

  const [phoneDisplay, setFormDisplay] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginFormErrors>({ phoneError: "", passwordError: "" });

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFormDisplay("+7 ");
      setTimeout(() => {
        e.target.setSelectionRange(4, 4);
      }, 0);
    }
  };

  const handlePhoneChange = (value: string) => {
    setErrors(prev => ({ ...prev, phoneError: "" }));
    setFormDisplay(formatPhoneDisplay(normalizePhone(value)));
  };

  const handlePhoneBlur = (value: string) => {
    if (value === "+7 " || value === "+7") {
      setFormDisplay("");
    }

    setErrors(prev => ({ ...prev, phoneError: validatePhone(value) }));
  };

  const handlePasswordBlur = (value: string) => {
    setErrors(prev => ({ ...prev, passwordError: validatePassword(value) }));
  };

  const handlePasswordChange = async (value: string) => {
    setErrors(prev => ({ ...prev, passwordError: "" }));
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedPhone = normalizePhone(phoneDisplay);

    const phoneError = validatePhone(normalizedPhone);
    const passwordError = validatePassword(password);

    setErrors({ phoneError, passwordError });

    if (!phoneError && !passwordError) {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ normalizedPhone, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
          router.push("/welcome");
        } else if (response.status === 401) {
          setErrors(prev => ({
            ...prev,
            dataError: "Неверный логин или пароль",
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            dataError: `${data.error}`,
          }));
        }
      } catch {
        setErrors(prev => ({
          ...prev,
          dataError: "Ошибка сети. Попробуйте позже.",
        }));
      }
    }
  };

  return (
    <form className=" mt-20 mx-auto max-w-xl flex flex-col items-center gap-3" onSubmit={handleSubmit}>
      <Input
        label="Телефон"
        error={errors.phoneError}
        type="text"
        name="phone"
        id="phone"
        placeholder="+7 (999) 000-00-00"
        value={phoneDisplay}
        onFocus={handlePhoneFocus}
        onChange={e => handlePhoneChange(e.target.value)}
        onBlur={e => handlePhoneBlur(e.target.value)}
      />
      <Input
        label="Пароль"
        error={errors.passwordError || errors.dataError || ""}
        type="password"
        name="password"
        id="password"
        placeholder="Введите пароль"
        onChange={e => handlePasswordChange(e.target.value)}
        onBlur={e => handlePasswordBlur(e.target.value)}
      />

      <button type="submit" className="w-full bg-(--main-orange) rounded-[22px]">
        Войти
      </button>
    </form>
  );
}
