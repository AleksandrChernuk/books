export default async function getPublicKey(): Promise<string> {
  try {
    const response = await fetch(
      "https://api.monobank.ua/api/merchant/pubkey",
      {
        method: "GET",
        headers: {
          "X-Token": process.env.MONO_KEY!,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch public key: ${response.statusText}`);
    }

    const text = await response.text();

    // Ожидаем base64-encoded ключ
    return text.trim();
  } catch (error) {
    console.error("❌ Error fetching public key from Monobank:", error);
    throw error;
  }
}
