export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto py-16 px-4 text-center">
            <h1 className="text-4xl font-bold mb-6 ">
                Contact <span className="text-green-600 dark:text-green-400">Me</span>
            </h1>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                Have a question, feedback, or just want to say hello?
                I’d love to hear from you. Fill out the form below and I’ll get back to you soon.
            </p>

            <form className="space-y-6">
                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 
                                   bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 
                                   focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 
                                   bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 
                                   focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Message */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Message
                    </label>
                    <textarea
                        rows={5}
                        placeholder="Write your message here..."
                        className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 
                                   bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 
                                   focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 
                               dark:hover:bg-green-400 text-white font-medium py-2.5 rounded-md 
                               transition-colors"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}