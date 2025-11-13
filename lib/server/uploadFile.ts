import { put } from "@vercel/blob";

/**
 * Upload a file to Vercel Blob Storage
 * @param file - The file to upload
 * @param folder - Optional folder prefix (e.g., 'posts', 'avatars')
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${folder}/${timestamp}-${sanitizedName}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return blob.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}

/**
 * Upload multiple files to Vercel Blob Storage
 * @param files - Array of files to upload
 * @param folder - Optional folder prefix
 * @returns Array of public URLs
 */
export async function uploadFiles(
  files: File[],
  folder: string = "uploads"
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadFile(file, folder));
  return Promise.all(uploadPromises);
}
