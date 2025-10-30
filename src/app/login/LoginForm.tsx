"use client";

import { useState } from "react";
import { LoginFormData, LoginFormErrors } from "@/app/login/types";
import Input from "@/components/Input";
import { validatePassword, validatePhone } from "./utils/validation";
import { normalizePhone } from "./utils/normalizePhone";
import { formatPhoneDisplay } from "./utils/formatPhoneDisplay";

export default function LoginForm() {
  const [loginData, setLoginData] = useState<LoginFormData>({ phone: "", password: "" });
  const [errors, setErrors] = useState<LoginFormErrors>({ phoneError: "", passwordError: "" });
  const [phoneDisplay, setFormDisplay] = useState<string>("");

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
    const phone = normalizePhone(value);
    setFormDisplay(formatPhoneDisplay(phone));
    setLoginData(prev => ({ ...prev, phone: phone }));
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

  const handlePasswordChange = (value: string) => {
    setErrors(prev => ({ ...prev, passwordError: "" }));
    setLoginData(prev => ({ ...prev, password: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneError = validatePhone(loginData.phone);
    const passwordError = validatePassword(loginData.password);

    setErrors({ phoneError, passwordError });

    if (!phoneError && !passwordError) {
      console.log(loginData);
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
        error={errors.passwordError}
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
