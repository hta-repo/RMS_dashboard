import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.services";

const user = JSON.parse(localStorage.getItem("user"));

const userInfo = {};

export const signin = createAsyncThunk("signin", async (data) => {
    const response = await AuthService.signin(data);
    return {
        user: response.data.user,
        userInfo: response.data.user
    };
});

export const userDetail = createAsyncThunk("userDetail", async () => {
    const response = await AuthService.userDetail();
    return { userInfo: response.data.data };
});

const initialState = user
    ? { isLoggedIn: true, user, userInfo }
    : { isLoggedIn: false, user: null, userInfo: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [signin.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [signin.rejected]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [userDetail.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo.user;
        },
        [userDetail.rejected]: (state) => {
            state.isLoggedIn = false;
            state.userInfo = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;
