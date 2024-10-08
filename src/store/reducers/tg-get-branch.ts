import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../rootConfig";

interface State {
    branch_id?: string;
    branch_name?: string;
}

const initialState: State = {
    branch_id: undefined,
    branch_name: undefined,
};

export const getBranchReducer = createSlice({
    name: "get-branch",
    initialState,
    reducers: {
        getBranch: (state, {payload}: PayloadAction<State>) => {
            state.branch_id = payload.branch_id;
            state.branch_name = payload.branch_name;
        },

    },
});

export const branchSelector = (state: RootState) => state.getBranch;

export const {getBranch} = getBranchReducer.actions;
export default getBranchReducer.reducer;
