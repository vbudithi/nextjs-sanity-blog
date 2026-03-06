"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return <div className="w-10 h-10" />

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="
        relative w-14 h-7 
        flex items-center 
        bg-blue-300 dark:bg-gray-700 
        rounded-full 
        transition-colors 
        cursor-pointer
      "
        >
            {/* Sun icon */}
            <span className="absolute left-1 text-yellow-500 text-sm">☀️</span>

            {/* Moon icon */}
            <span className="absolute right-1 text-blue-300 text-sm">🌙</span>

            {/* Sliding circle */}
            <span
                className={`
          absolute w-6 h-6 bg-white rounded-full shadow 
          transform transition-transform
          ${isDark ? "translate-x-7" : "translate-x-0"}
        `}
            />
        </button>
    )
}