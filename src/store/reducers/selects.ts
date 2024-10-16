import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootConfig';
import { Language } from '@/utils/types';

interface State {
  sidebarToggler: boolean;
  lang: Language;
}

const initialState: State = {
  sidebarToggler: false,
  lang: Language.ru,
};

export const toggleReducer = createSlice({
  name: 'toggler',
  initialState,
  reducers: {
    sidebarHandler: (state, { payload }: PayloadAction<boolean>) => {
      state.sidebarToggler = payload;
    },

    changeLanguage: (state, { payload }: PayloadAction<Language>) => {
      state.lang = payload;
    },
  },
});

export const toggleSidebar = (state: RootState) => state.selects.sidebarToggler;
export const langSelector = (state: RootState) => state.selects.lang;

export const { sidebarHandler, changeLanguage } = toggleReducer.actions;
export default toggleReducer.reducer;
