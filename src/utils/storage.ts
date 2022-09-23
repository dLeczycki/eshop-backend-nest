import * as path from 'path';

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
