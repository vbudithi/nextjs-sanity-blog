import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full py-5 text-center text-sm text-gray-500">
            Copyright &copy; {new Date().getFullYear()} {""}
            <Link href="/" className="text-blue-500 hover:underline">
                VivByte  </Link>{" "} Inc.
            All Rights Reserved.
        </footer>
    )
}

