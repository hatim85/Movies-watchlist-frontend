import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    status: 'idle',
    error: null
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.status = 'loading';
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            state.status = 'success';
        },
        signInFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        signUpStart: (state) => {
            state.status = 'loading';
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            state.status = 'success';
        },
        signUpFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        signout: (state) => {
            state.currentUser = null;
            localStorage.removeItem('currentUser')
            state.error = null;
            state.status='success';
        }
    }
});

export const { signInStart,signInSuccess,signInFailure,signUpFailure,signUpStart,signUpSuccess,signout } = authSlice.actions;
export default authSlice.reducer;