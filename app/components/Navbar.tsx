import Link from "next/link";
import { VivHead } from "./VivHead";

export default function Navbar() {
    return (
        <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-34 py-5">
            <div className="flex items-center gap-2">
                <span className="font-bold text-3xl">
                    Viv<span className="text-primary">Byte</span>
                </span>
                <VivHead />
                <span className="text-sm text-gray-400 py-1 rounded-md bg-gray-50">
                    Think. Build. Byte.
                </span>
            </div>


        </nav>

    );
}