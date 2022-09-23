export interface Image {
  name: string;
  productId: string;
}

export interface UploadFiles {
  [fieldname: string]: Express.Multer.File[] | undefined;
}
