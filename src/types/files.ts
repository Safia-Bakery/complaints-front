type FileUploadRes = {
  files: {
    file_name: string;
  }[];
};

interface FileState {
  product_images?: FileUploadRes["files"];
  user_images?: FileUploadRes["files"];
}
