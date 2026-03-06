import Link from "next/link";
import { VivHead } from "./VivHead";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
    return (
        <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-34 py-5">
            <div className="flex items-center">
                <Link href="/" className="font-bold text-3xl">
                    Viv<span className="text-green-600 dark:text-green-400">Byte</span>
                </Link>
                <VivHead />
                <span className="text-sm text-green-700 dark:text-green-300 
py-2 px-3 rounded-md bg-gray-100 dark:bg-gray-800 font-medium
">
                    Think. Build. Byte.
                </span>
            </div>
            <ModeToggle />
        </nav>
    );
}