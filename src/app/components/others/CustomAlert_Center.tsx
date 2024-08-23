'use client'

import React from 'react'
import { Alert, Snackbar } from '@mui/material'

export default function CustomAlert_Center(props: any) {

    const {
        open,
        setOpen,
        type,
        message,
        duration,
        position = { vertical: "top", horizontal: "center" },
        handleClose = (event: any, reason: any) => {
            if (reason === 'clickaway') {
                return;
            }
            setOpen(false);
        },
    } = props


    return (
        <>
            <Snackbar
                anchorOrigin={position}
                open={open}
                autoHideDuration={duration}
                onClose={handleClose}>
                <Alert variant="standard" onClose={handleClose} severity={type} sx={{ width: '100%', borderRadius: 1 }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}