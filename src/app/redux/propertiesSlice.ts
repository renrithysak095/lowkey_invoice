import { createSlice } from '@reduxjs/toolkit'
interface FormState {
    pushAttributeBlock: string;
    tableProps: any;
}
const initialState: FormState = {
    pushAttributeBlock: "",
    tableProps: {},
}

const propertiesSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setAttributeBlock(state, action) {
            state.pushAttributeBlock = action.payload
        },
        setTableProps(state, action) {
            state.tableProps = action.payload
        },
    },
})


export const {
    setAttributeBlock,
    setTableProps
} = propertiesSlice.actions
export default propertiesSlice.reducer