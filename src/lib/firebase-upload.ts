import { getStorage, ref, deleteObject } from "firebase/storage";

// export async function deleteFileFromStorage(url: string) {
//   try {
//     const storage = getStorage();
//     const fileRef = ref(storage, url);
//     await deleteObject(fileRef);
//   } catch (e) {
//     if (typeof window !== "undefined") {
//       console.warn("File not found for delete:", url, e);
//     }
//   }
// }

export async function deleteFileFromStorage(url: string) {
  try {
    const storage = getStorage();

    // Извлечение пути из URL
    const matches = url.match(/\/o\/(.*?)\?/);
    if (!matches || !matches[1]) {
      console.warn("Invalid Firebase URL:", url);
      return;
    }

    const filePath = decodeURIComponent(matches[1]); // Пример: "books/filename.pdf"
    const fileRef = ref(storage, filePath);

    await deleteObject(fileRef);
  } catch (e) {
    if (typeof window !== "undefined") {
      console.warn("File not found for delete:", url, e);
    }
  }
}
