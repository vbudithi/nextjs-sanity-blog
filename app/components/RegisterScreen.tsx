"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function RegisterScreen() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const passwordRequirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
    };

    const passwordValid =
        passwordRequirements.length &&
        passwordRequirements.uppercase &&
        passwordRequirements.lowercase &&
        passwordRequirements.number;

    const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!passwordValid) {
            setError(
                "Please make sure your password meets all requirements."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) {
                setError(error.message);
                return;
            }

            if (data.user?.identities?.length === 0) {
                setError("Email address is already used, please use a different email or log in.");
                return;
            }
            setMessage(
                "Account created successfully. Please check your email to verify your account."
            );

            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="min-h-screen">
            <div className="text-center mb-8">
                <Link
                    href="/"
                    className="inline-block"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Viv<span className="text-green-600">Byte</span>
                    </h1>
                </Link>

                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Join VivByte to stay updated with the latest news and updates about AI.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 ">
                        Create your account.

                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Let’s get you started.
                    </p>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Full name*
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                            placeholder="Enter your full name"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Email address*
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Password*
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Create a password"
                                required
                                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {password && (
                            <div className="mt-3 space-y-1 text-xs">

                                <PasswordRequirement
                                    valid={
                                        passwordRequirements.length
                                    }
                                    text="At least 8 characters"
                                />

                                <PasswordRequirement
                                    valid={
                                        passwordRequirements.uppercase
                                    }
                                    text="One uppercase letter"
                                />

                                <PasswordRequirement
                                    valid={
                                        passwordRequirements.lowercase
                                    }
                                    text="One lowercase letter"
                                />

                                <PasswordRequirement
                                    valid={
                                        passwordRequirements.number
                                    }
                                    text="One number"
                                />

                            </div>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Confirm password*
                        </label>

                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Confirm your password"
                                required
                                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {confirmPassword && (
                            <div className="mt-2">
                                {password ===
                                    confirmPassword ? (
                                    <div className="flex items-center gap-1.5 text-xs text-green-600">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Passwords match
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-xs text-red-500">
                                        <XCircle className="w-4 h-4" />
                                        Passwords do not match
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        By creating an account, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="text-blue-600 hover:underline"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="text-blue-600 hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                    {error && (
                        <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                            {message}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium transition cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading
                            ? "Creating account..."
                            : "Create account"}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="font-medium text-green-500 hover:text-blue-700 hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </main>
    );
}
function PasswordRequirement({
    valid,
    text,
}: {
    valid: boolean;
    text: string;
}) {
    return (
        <div
            className={`flex items-center gap-2 ${valid
                ? "text-green-600"
                : "text-gray-400"
                }`}
        >
            {valid ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
                <XCircle className="w-3.5 h-3.5" />
            )}

            <span>{text}</span>
        </div>
    );
}
