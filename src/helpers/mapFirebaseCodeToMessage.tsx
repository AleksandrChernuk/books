export function mapFirebaseCodeToMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "Користувача з таким email не знайдено.";
    case "auth/wrong-password":
      return "Невірний пароль.";
    case "auth/invalid-email":
      return "Невірний формат email.";
    default:
      return "Сталася невідома помилка. Спробуйте пізніше.";
  }
}
