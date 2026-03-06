import Link from "next/link";
import { VivHead } from "./VivHead";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="w-full relative flex items-center justify-between max-w-5xl mx-auto py-3">
            <div className="flex items-center gap-3 min-w-[260px]">

                <Link href="/" className="font-bold text-xl">
                    Viv<span className="text-green-600 dark:text-green-400">Byte</span>
                </Link>
                <VivHead />
                <span className="text-sm text-green-700 dark:text-green-300 
py-1 px-3 rounded-md bg-gray-100 dark:bg-gray-800 font-medium
">
                    Think. Build. Byte.
                </span>
            </div>
            <div className="flex items-center gap-4">
                <Link
                    href="/about"
                    className="text-sm text-black dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
                >
                    About
                </Link>

                <Link
                    href="/contact"
                    className="text-sm text-black dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
                >
                    Contact
                </Link>
                <Link
                    href="/allPosts"
                    className="text-sm text-black dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
                >
                    All Posts
                </Link>
                <Button
                    className="
                            text-sm font-medium
                            bg-green-600 text-white
                            dark:bg-green-500
                            px-4 py-1.5 rounded-md
                            hover:bg-green-700 dark:hover:bg-green-400
                            transition-colors
                            cursor-pointer
                            "
                >
                    Sign In
                </Button>

                <ModeToggle />
            </div>

        </nav>
    );
}