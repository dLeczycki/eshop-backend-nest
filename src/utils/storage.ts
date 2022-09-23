import * as path from 'path';
import { diskStorage } from 'multer';
import * as mime from 'mime';
import { v4 as uuid } from 'uuid';

//<project_path>/storage
export function storageDir() {
  return path.join(__dirname, '..', 'storage');
}

//<project_path>/storage/public
export function publicDir() {
  return path.join(storageDir(), 'public');
}

//<project_path>/storage/public/images
export function publicImageDir() {
  return path.join(publicDir(), 'images');
}

export function saveMulterFileWithExtension(destination: string) {
  return diskStorage({
    destination: (req, file, cb) => cb(null, destination),
    filename: (req, file, cb) => {
      console.log((mime as any)._extensions[file.mimetype]);
      cb(null, `${uuid()}.${(mime as any)._extensions[file.mimetype]}`);
    },
  });
}
