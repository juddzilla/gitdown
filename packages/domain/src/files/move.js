import fs from "fs";
import path from "path";

export default async function move(oldPath, newPath) {
  // 1. Create the destination directory if it does not exist
  // Set the `recursive` option to `true` to create all the subdirectories
  fs.mkdirSync(path.dirname(newPath), { recursive: true });
  // 2. Rename the file (move it to the new directory)
  // Return the promise
  return fs.renameSync(oldPath, newPath);
}
// try {
//   await moveFile(oldPath, newPath);
//   // Handle success
//   console.log('File moved successfully');
// } catch (error) {
//   // Handle the error
//   console.error(error);
// }