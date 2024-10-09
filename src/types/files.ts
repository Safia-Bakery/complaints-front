type FileUploadRes = {
  success: boolean;
  files: {
    id: number;
    url: string;
  }[];
};

interface FileState {
  product_images?: FileUploadRes["files"];
  brochures?: FileUploadRes["files"];
  sertificates?: FileUploadRes["files"];
}
