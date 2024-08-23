'use client'
import React, { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store/store';
import { NextUIProvider } from '@nextui-org/react';

interface Props {
    children: ReactNode
}

function Provider({ children }: Props) {
    return (
        <NextUIProvider>
            <ReduxProvider store={store}>
                {children}
            </ReduxProvider >
        </NextUIProvider>

    )
}

export default Provider