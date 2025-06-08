import { getStorage, ref, deleteObject } from "firebase/storage";

export async function deleteFileFromStorage(url: string) {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (e) {
    // если файла нет — не проблема
    if (typeof window !== "undefined") {
      console.warn("File not found for delete:", url, e);
    }
  }
}
