// import config from '../../../config.js';
//
// import path from 'path';
// import Utils from '../interfaces/utils';
//
// const { workingDir } = config;
//
// const handler = async (req, res) => {
//   const directoryStart = path.join(workingDir, 'documents', '**', '*.md');
//   const filepaths = await Utils.FindFiles(directoryStart);
//   const relativePaths = filepaths
//       .map(Utils.RelativePath)
//       .sort((a, b) => {
//         const aParts = a.split('/');
//         const bParts = b.split('/');
//         if (aParts.length < bParts.length) {
//           return 1;
//         } else if (aParts.length > bParts.length) {
//           return -1;
//         }
//         const aLast = aParts.pop();
//         const bLast = bParts.pop();
//         return aLast < bLast ? -1 : 1;
//       });
//
//   res.send({ filepaths: relativePaths });
// };
//
// export const route = {
//   handler,
//   method: 'get',
//   name: 'Files',
//   path: '/files',
// };
// export default handler;
