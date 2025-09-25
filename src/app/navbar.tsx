"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/art", label: "Art" },
    { href: "/resume", label: "Resume" },
    { href: "/thoughts", label: "Blog" }
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href);

    return (
        <header className="sticky flex justify-between items-center top-0 z-50 w-full">
            <Link href="/">nocturne ⏾</Link>
            <nav className="gap-x-15">
                {links.map(({href, label}) => (
                    <Link key={href} href={href}
                        className={`text-sm mx-3 transition hover:opacity-80 ${
                            isActive(href) ? "font-semibold" : "text-gray-600"
                    }`}>
                        {label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}