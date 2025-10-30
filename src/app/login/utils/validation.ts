export const validatePhone = (phone: string): string => {
  phone = phone.replace(/\D/g, "").trim();
  if (!phone) return "Введите номер телефона";
  if (phone === "7") return "Введите номер телефона";
  if (phone.length < 11 || phone[1] !== "9") return "Введите корректный номер телефона";
  return "";
};

export const validatePassword = (password: string): string => {
  password = password.trim();
  if (!password) return "Введите пароль";
  return "";
};
