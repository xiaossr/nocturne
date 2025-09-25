"use client";

import Navbar from "@/app/navbar"
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

function PdfViewer({ url }: { url: string }) {
    const defaultLayout = defaultLayoutPlugin();
    return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="h-[85vh] w-full overflow-hidden rounded-lg border">
        <Viewer fileUrl={url} plugins={[defaultLayout]} theme="dark"/>
        </div>
    </Worker>
    );
}

export default function ResumePage() {
    return (
        <div className="font-sans min-h-screen mx-auto p-8 pb-20 gap-16 sm:p-20">
            <Navbar />
            <header className="text-7xl font-title font-bold text-left mb-12">Resume</header>
            <PdfViewer url="/resume.pdf" />
        </div>
    )
}