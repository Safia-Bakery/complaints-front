import baseApi from "@/api/baseApi";
import { useMutation } from "@tanstack/react-query";

interface Body {
  files?: any;
  id?: number;
}

export const fileUploadMutation = () => {
  return useMutation({
    mutationKey: ["files_upload"],
    mutationFn: async ({ files }: Body) => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
      const { data } = await baseApi.post("/api/v2/files/", formData);
      return { files: [data] };
    },
  });
};

export const removeFileMutation = () => {
  return useMutation({
    mutationKey: ["file_remove"],
    mutationFn: async (body: Body) => {
      const { data } = await baseApi.delete("/v1/files", {
        data: body.id,
      });
      return data;
    },
  });
};
