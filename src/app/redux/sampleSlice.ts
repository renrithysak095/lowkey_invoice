import { createSlice } from '@reduxjs/toolkit'
interface FormState {
    test: any;
    alertState: any;
    pushTab: string;
}
const initialState: FormState = {
    test: {},
    alertState: {
        open: false,
        type: "",
        message: "",
        duration: 1600,
    },
    pushTab: "components",
}

const sampleSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setTest(state, action) {
            state.test = action.payload
        },
        pushAlert(state, action) {
            state.alertState = action.payload
        },
        pushTab(state, action) {
            state.pushTab = action.payload
        },
    },
})


export const {
    setTest,
    pushAlert,
    pushTab,
} = sampleSlice.actions
export default sampleSlice.reducer