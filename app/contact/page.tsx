
"use client";

import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors: any = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!form.message.trim()) {
            newErrors.message = "Message cannot be empty";
        } else if (form.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        return newErrors;
    };

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) return;

        setLoading(true);

        // simulate sending
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setLoading(false);
        setSuccess(true);

        setForm({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-4">

            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">
                    Contact <span className="text-green-600 dark:text-green-400">Me</span> ✉️
                </h1>

                <p className="text-lg text-slate-700 dark:text-slate-300">
                    Have a question, idea, or just want to say hello?
                    I’d love to hear from you.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 shadow-xl rounded-xl p-8 border border-slate-200 dark:border-slate-800">

                {success && (
                    <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        ✅ Message sent successfully! I'll get back to you soon.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Your Name
                        </label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-700 
              bg-white dark:bg-slate-950 focus:ring-2 focus:ring-green-500 outline-none"
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-700 
              bg-white dark:bg-slate-950 focus:ring-2 focus:ring-green-500 outline-none"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Message
                        </label>

                        <textarea
                            name="message"
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            className="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-700 
              bg-white dark:bg-slate-950 focus:ring-2 focus:ring-green-500 outline-none"
                        />

                        {errors.message && (
                            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 
            dark:hover:bg-green-400 text-white font-medium py-3 rounded-md 
            transition flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending..." : "Send Message 🚀"}
                    </button>

                </form>

            </div>
        </div>
    );
}

