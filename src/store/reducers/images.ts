import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";

const initialState: FileState = {
  product_images: undefined,
  user_images: undefined,
};

export const imageReducer = createSlice({
  name: "image_upload",
  initialState,
  reducers: {
    uploadImage: (
      state,
      {
        payload,
      }: PayloadAction<{ key: keyof FileState; value: FileUploadRes["files"] }>
    ) => {
      if (!!state[payload.key]?.length) {
        const updated = state[payload.key];
        state[payload.key] = [...updated!, ...payload.value];
      } else state[payload.key] = payload.value;
    },
    removeImage: (
      state,
      { payload }: PayloadAction<{ key: keyof FileState; value: string }>
    ) => {
      if (!!state[payload.key]?.length) {
        const filtered: FileUploadRes["files"] = state[payload.key]!.filter(
          (item) => item.file_name !== payload.value
        );
        state[payload.key] = filtered;
      }
    },
    clearImages: (
      state,
      { payload }: PayloadAction<{ key: keyof FileState }>
    ) => {
      state[payload.key] = undefined;
    },
  },
});

export const imageSelector = (state: RootState) => state.images;

export const { uploadImage, removeImage, clearImages } = imageReducer.actions;
export default imageReducer.reducer;
