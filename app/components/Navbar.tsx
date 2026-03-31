
"use client";

import Link from "next/link";
import { useState } from "react";
import { VivHead } from "./VivHead";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full border-b border-gray-300 dark:border-gray-800 bg-sky-100 dark:bg-transparent ">
            <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">

                {/* Branding */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="font-bold text-xl">
                        Viv<span className="text-green-600 dark:text-green-400">Byte</span>
                    </Link>
                    <VivHead />
                    <span className="text-sm text-green-700 dark:text-green-300 py-1 px-3 rounded-md bg-gray-100 dark:bg-gray-800 font-medium">
                        Think. Build. Byte.
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">

                    <Link href="/" className="nav-link hover:underline underline-offset-4 border ">Articles</Link>
                    <Link href="/about" className="nav-link hover:underline underline-offset-4 border ">About</Link>
                    <Link
                        href="https://newspilot.live/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm px-2 py-1 rounded-md bg-gray-100 font-bold dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:underline underline-offset-4 border border-gray-500 dark:border-gray-700 transition-colors"
                    >
                        Byte News
                    </Link>
                    <Link href="/contact" className="nav-link hover:underline underline-offset-4 border  ">Contact</Link>

                    <Button className="text-sm font-medium bg-green-600 text-white dark:bg-green-500 px-4 py-1.5 rounded-md hover:bg-green-700 dark:hover:bg-green-400 transition-colors  cursor-pointer">
                        Sign In
                    </Button>

                    <ModeToggle />
                </div>

                {/* Hamburger (mobile only) */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu*/}
            {open && (
                <div className="md:hidden absolute left-0 top-16 w-full bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 px-4 py-4 flex flex-col gap-4 shadow-lg z-50 mt-5">


                    <Link href="/" onClick={() => setOpen(false)} className="text-base font-medium">Articles</Link>
                    <Link href="/about" onClick={() => setOpen(false)} className="text-base font-medium ">About</Link>

                    <Link
                        href="https://newspilot.live/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm px-3 py-1.5 rounded-md bg-green-100 dark:bg-green-900/30 
             text-green-700 dark:text-green-400 font-semibold border border-green-300 
             dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-900/50 
             transition-colors"
                    >
                        Byte News ↗
                    </Link>


                    <Link href="/contact" onClick={() => setOpen(false)} className="text-base font-medium">Contact</Link>

                    <div className="flex justify-between items-center w-full mt-2">
                        <Button
                            onClick={() => setOpen(false)}
                            className="text-sm font-medium bg-green-600 text-white dark:bg-green-500 px-4 py-1.5 rounded-md"
                        >
                            Sign In
                        </Button>

                        <div onClick={() => setOpen(false)}>
                            <ModeToggle />
                        </div>
                    </div>


                </div>
            )}
        </nav>
    );
}