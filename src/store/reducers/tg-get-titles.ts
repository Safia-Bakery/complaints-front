import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../rootConfig";

interface State {
    branch_id?: string;
    branch_name?: string;
    headerTitle?: string
}

const initialState: State = {
    branch_id: undefined,
    branch_name: 'Rakat', // todo
    headerTitle: undefined,
};

export const getTitleReducer = createSlice({
    name: "get-branch",
    initialState,
    reducers: {
        getBranch: (state, {payload}: PayloadAction<State>) => {
            state.branch_id = payload.branch_id;
            state.branch_name = payload.branch_name;
        },
        getHeaderTitle: (state, action: PayloadAction<string>) => {
            state.headerTitle = action.payload;
        }
    },
});

export const branchSelector = (state: RootState) => state.getBranch;

export const {getBranch, getHeaderTitle} = getTitleReducer.actions;
export default getTitleReducer.reducer;
