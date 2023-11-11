import path from 'path';
import Domain from '../../interfaces/domain';

export default async function({ files }) {
  const fileName = '*.md';

  const directoryStart = path.join(files, '**/', fileName);
  await Domain.Files.All(directoryStart);
}