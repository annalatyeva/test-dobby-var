"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { LoginFormErrors } from "@/app/login/types";
import { validatePassword, validatePhone } from "./utils/validation";
import { normalizePhone } from "./utils/normalizePhone";
import { formatPhoneDisplay } from "./utils/formatPhoneDisplay";

export default function LoginForm() {
  const router = useRouter();

  const [phoneDisplay, setFormDisplay] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginFormErrors>({ phoneError: "", passwordError: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFormDisplay("+7 ");
      setTimeout(() => {
        e.target.setSelectionRange(4, 4);
      }, 0);
    }
  };

  const handlePhoneChange = (value: string) => {
    if (isLoading) return;

    setErrors(prev => ({ ...prev, phoneError: "", formError: "" }));
    setFormDisplay(formatPhoneDisplay(normalizePhone(value)));
  };

  const handlePhoneBlur = (value: string) => {
    if (value === "+7 " || value === "+7") {
      setFormDisplay("");
    }

    setErrors(prev => ({ ...prev, phoneError: validatePhone(normalizePhone(value)) }));
  };

  const handlePasswordBlur = (value: string) => {
    setErrors(prev => ({ ...prev, passwordError: validatePassword(value) }));
  };

  const handlePasswordChange = (value: string) => {
    if (isLoading) return;

    setErrors(prev => ({ ...prev, passwordError: "", formError: "" }));
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const normalizedPhone = normalizePhone(phoneDisplay);

    const phoneError = validatePhone(normalizedPhone);
    const passwordError = validatePassword(password);

    setErrors({ phoneError, passwordError });

    if (!phoneError && !passwordError) {
      setIsLoading(true);

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login: normalizedPhone, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
          router.push("/welcome");
        } else if (response.status === 401) {
          setErrors(prev => ({
            ...prev,
            formError: "Неверный логин или пароль",
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            formError: `${data.error}`,
          }));
        }
      } catch {
        setErrors(prev => ({
          ...prev,
          formError: "Ошибка сети. Попробуйте позже.",
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {errors.formError && <div className="mx-auto w-full max-w-md mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{errors.formError}</div>}
      <form className="mx-auto w-full max-w-md flex flex-col items-start" onSubmit={handleSubmit}>
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
          disabled={isLoading}
        />
        <Input
          label="Пароль"
          error={errors.passwordError}
          type="password"
          name="password"
          id="password"
          placeholder="Введите пароль"
          onChange={e => handlePasswordChange(e.target.value)}
          onBlur={e => handlePasswordBlur(e.target.value)}
          disabled={isLoading}
        />

        <Button innerText="Войти" type="submit" disabled={isLoading} />
      </form>
    </>
  );
}
