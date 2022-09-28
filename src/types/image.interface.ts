export interface Image {
  name: string;
  extension: string;
}

export interface UploadFiles {
  [fieldname: string]: Express.Multer.File[] | undefined;
}
