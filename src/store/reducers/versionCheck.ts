import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootConfig';
import { CURRENT_VERSION } from '@/utils/version';
import successToast from '@/utils/success-toast.ts';
interface State {
  version: string | null;
}

const initialState: State = {
  version: null,
};

export const versionCheckReducer = createSlice({
  name: 'version',
  initialState,
  reducers: {
    versionHandler: (state) => {
      if (state.version !== CURRENT_VERSION) {
        state.version = CURRENT_VERSION;
        successToast('version updated');
        window.location.reload();
      }
    },
  },
});

export const versionSelector = (state: RootState) => state.version.version;

export const { versionHandler } = versionCheckReducer.actions;

export default versionCheckReducer.reducer;
