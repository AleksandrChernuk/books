// import { db } from "@/lib/firebase";

// type SetPaymentParams = {
//   invoiceId: string;
// };

// export default async function setPayment({ invoiceId }: SetPaymentParams) {
//   try {
//     const snapshot = await db
//       .collection("payments")
//       .where("invoiceId", "==", invoiceId)
//       .limit(1)
//       .get();

//     if (snapshot.empty) {
//       console.warn(`No payment found for invoiceId: ${invoiceId}`);
//       return;
//     }

//     const doc = snapshot.docs[0];

//     await doc.ref.update({
//       status: "success",
//       updatedAt: new Date(),
//     });

//     console.log(`✅ Updated payment ${doc.id}`);
//   } catch (error) {
//     console.error("❌ Error in setPayment:", error);
//     throw error;
//   }
// }
