import { configureStore } from '@reduxjs/toolkit'
import sampleSlice from '../sampleSlice'
import propertiesSlice from '../propertiesSlice'

export const store = configureStore({
    reducer: {
        sample: sampleSlice,
        properties: propertiesSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>