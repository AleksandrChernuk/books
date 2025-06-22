import https from "https";

export async function fetchInvoiceStatus(
  invoiceId: string
): Promise<string | null> {
  const token = process.env.MONO_KEY!;

  const options = {
    hostname: "api.monobank.ua",
    path: `/api/merchant/invoice/status?invoiceId=${invoiceId}`,
    method: "GET",
    headers: {
      "X-Token": token,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json.status || null);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}
