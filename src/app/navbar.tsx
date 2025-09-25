"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    // { href: "/projects", label: "Projects" },
    { href: "/art", label: "Art" },
    { href: "/resume", label: "Resume" },
    { href: "/thoughts", label: "Thoughts" }
];

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href);

    return (
        <header className="sticky flex justify-between items-center top-0 bg-background opacity-90 z-50 p-3 mb-16 w-full">
            <Link href="/">nocturne ⏾</Link>
            <nav className="gap-x-15">
                {links.map(({href, label} : {href: string, label: string}) => (
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