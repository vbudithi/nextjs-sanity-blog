export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Page Not Found
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
                The page you're looking for doesn’t exist or has been moved.
            </p>

            <a
                href="/"
                className="
    px-5 py-2 rounded-md
    bg-blue-400 text-white
    dark:bg-blue-500
    hover:bg-blue-500 dark:hover:bg-blue-400
    transition-colors
  "
            >
                Go Home
            </a>

        </div>
    )
}