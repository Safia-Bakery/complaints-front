import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

const MainDropZone = () => {
  // const ref = useRef();
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles, "acceptedFiles");
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-1 bg-white rounded-xl border border-borderColor p-2"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default MainDropZone;
