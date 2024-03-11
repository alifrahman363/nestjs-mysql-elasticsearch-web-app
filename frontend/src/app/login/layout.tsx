"use client";
import React from 'react'
import Head from "next/head";
// import metaData from "../../../public/meta.json";
// import Footer from "~/components/features/footer";

interface LayoutProps {
    children: React.ReactNode;
}

export default function LoginLayout({ children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>ecom</title>
            </Head>
            <div>
                {children}
                <footer className="w-full">
                    {/* <Footer /> */}
                </footer>
            </div>
        </>
    );
}