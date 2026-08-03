"use client";

import { zip, strToU8 } from "fflate";

export interface ZipEntry {
  name: string;
  data: Uint8Array;
}

/**
 * Create a ZIP archive from a list of named binary entries.
 */
export async function createZip(entries: ZipEntry[]): Promise<Blob> {
  const files: Record<string, Uint8Array> = {};
  for (const entry of entries) {
    files[entry.name] = entry.data;
  }
  return new Promise((resolve, reject) => {
    zip(files, (err, data) => {
      if (err) return reject(err);
      resolve(new Blob([data], { type: "application/zip" }));
    });
  });
}

export async function createZipFromBlobs(
  entries: { name: string; blob: Blob }[],
): Promise<Blob> {
  const converted: ZipEntry[] = await Promise.all(
    entries.map(async (e) => ({ name: e.name, data: new Uint8Array(await e.blob.arrayBuffer()) })),
  );
  return createZip(converted);
}

export function createTextZip(name: string, text: string): Promise<Blob> {
  return createZip([{ name, data: strToU8(text) }]);
}
