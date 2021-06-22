import React from 'react';
import Head from "next/head";
import Header from "./Header";
import Sidebar from "./Sidebar";
const AppLayout = ({ children }) => {
  return (
  <div className="h-screen bg-gray-100 overflow-hidden">

    <Head>
      <title>ORIONTEK</title>
      <meta name="description" content="Got5" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main className="flex">
      <Sidebar />
      <div className="p-3.5 w-full overscroll-auto h-auto overflow-y-scroll set-scroll">
        {children}
      </div>
    </main>

  </div>
  );
};

export default AppLayout;
