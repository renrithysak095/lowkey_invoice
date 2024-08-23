'use client'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CustomAlert_Center from '../components/others/CustomAlert_Center';
import { RootState } from '../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { pushAlert } from '../redux/sampleSlice';

const Layout = (props: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const getAlertData = useSelector((state: RootState) => state?.sample.alertState);
    const dispatch = useDispatch()
    return (
        <>
            <CustomAlert_Center
                open={getAlertData.open}
                setOpen={(open: boolean) => {
                    dispatch(pushAlert({ ...getAlertData, open }));
                }}
                message={getAlertData.message}
                type={getAlertData.type}
                duration={getAlertData.duration}
            />
            {/* <!-- ===== Page Wrapper Star ===== --> */}
            <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Star ===== --> */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Star ===== --> */}
                <div className="relative flex flex-1 flex-col">
                    {/* <!-- ===== Header Star ===== --> */}
                    {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Star ===== --> */}
                    <main>
                        <div className="mx-auto h-screen max-w-screen-2xl p-4 md:p-4 2xl:p-3">
                            {props.children}
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </>
    )
}

export default Layout