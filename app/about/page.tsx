
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto px-4">

            <h1 className="text-4xl font-bold mb-6 text-center">
                About <span className="text-green-600 dark:text-green-400 text-center">Me</span> 👋
            </h1>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Hi, I'm <span className="font-semibold">Vivek</span> — a developer passionate about
                building modern web applications and sharing what I learn along the way. 💻✨
            </p>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                I enjoy working with technologies like <span className="font-semibold">Next.js, React,
                    modern backend systems, and AI-driven tools</span>. My focus is always on creating
                fast, clean, and meaningful digital experiences.
            </p>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                This blog is my space to write about development, experiments, lessons learned,
                and ideas I’m exploring while building products.
            </p>

            {/* Highlight quote */}
            <blockquote className="border-l-4 border-green-500 pl-4 italic text-lg text-slate-800 dark:text-slate-200 mb-10">
                Knowledge grows when it’s shared. 🌱
            </blockquote>

            {/* Projects Section */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">🚀 Projects</h2>

                <div className="bg-slate-100 dark:bg-gray-800 p-5 rounded-lg shadow hover:scale-[1.02] transition">
                    <h3 className="text-lg font-semibold mb-2">
                        📰 NewsPilot – Tech News Platform
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-3">
                        A modern platform that aggregates and presents the latest technology
                        news in a clean and fast interface.
                    </p>

                    <Link
                        href="https://newspilot.live/"
                        target="_blank"
                        className="text-green-600 dark:text-green-400 font-medium hover:underline"
                    >
                        Visit NewsPilot →
                    </Link>
                </div>
            </div>

            {/* Social Section */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">🌐 Connect With Me</h2>

                <Link
                    href="https://github.com/vbudithi"
                    target="_blank"
                    className="inline-block bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    View My GitHub
                </Link>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Thanks for visiting! Let’s keep learning, building, and shipping — one byte at a time. 🚀
            </p>

        </main>
    );
}
