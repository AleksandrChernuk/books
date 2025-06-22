// app/api/download-book/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getStorage, ref, getBytes } from "firebase/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json(
      { error: "No filePath provided" },
      { status: 400 }
    );
  }

  const storage = getStorage();
  const fileRef = ref(storage, filePath);
  const fileData = await getBytes(fileRef);

  return new NextResponse(fileData, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filePath
        .split("/")
        .pop()}"`,
    },
  });
}
