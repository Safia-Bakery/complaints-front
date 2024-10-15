import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../rootConfig";

interface State {
    telegram_id?: string;
    branch_name?: string;
    headerTitle?: string
}

const initialState: State = {
    telegram_id: undefined,
    headerTitle: undefined,
};

export const getTitleReducer = createSlice({
    name: "get-branch",
    initialState,
    reducers: {
        getBranch: (state, {payload}: PayloadAction<State>) => {
            state.telegram_id = payload.telegram_id;
        },
        getHeaderTitle: (state, action: PayloadAction<string>) => {
            state.headerTitle = action.payload;
        }
    },
});

export const branchSelector = (state: RootState) => state.getBranch;

export const {getBranch, getHeaderTitle} = getTitleReducer.actions;
export default getTitleReducer.reducer;
