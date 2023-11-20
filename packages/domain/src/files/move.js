import fs from "fs";
import path from "path";

export default async function move(oldPath, newPath) {
  fs.mkdirSync(path.dirname(newPath), { recursive: true });
  return fs.renameSync(oldPath, newPath);
}