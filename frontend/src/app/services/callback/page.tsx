"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { verifyPayment } from "@/lib/api";
import type { PaymentResponse } from "@/types";

function CallbackContent() {
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    const [payment, setPayment] = useState<PaymentResponse | null>(null);

    useEffect(() => {
        if (!reference) {
            setStatus("failed");
            return;
        }

        const verify = async () => {
            try {
                const result = await verifyPayment(reference);
                setPayment(result);
                setStatus(result.status === "SUCCESS" ? "success" : "failed");
            } catch {
                setStatus("failed");
            }
        };

        verify();
    }, [reference]);

    const formatPrice = (amount: number) =>
        new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(amount);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-12 max-w-md w-full text-center"
            >
                {status === "loading" && (
                    <>
                        <Loader2 size={64} className="mx-auto text-accent animate-spin mb-6" />
                        <h2 className="font-jakarta text-2xl font-bold text-white mb-3">Verifying Payment</h2>
                        <p className="text-primary-muted">Please wait while we confirm your transaction...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                        >
                            <CheckCircle size={80} className="mx-auto text-green-400 mb-6" strokeWidth={1.5} />
                        </motion.div>
                        <h2 className="font-jakarta text-2xl font-bold text-white mb-3">Payment Successful!</h2>
                        <p className="text-primary-muted mb-8">Your payment has been confirmed. We&apos;ll be in touch shortly.</p>

                        {payment && (
                            <div className="bg-white/5 rounded-xl p-6 mb-8 text-left space-y-3 border border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Service</span>
                                    <span className="text-white font-medium">{payment.serviceName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Amount</span>
                                    <span className="text-white font-medium">{formatPrice(payment.amount)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Reference</span>
                                    <span className="text-accent font-mono text-xs">{payment.reference}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Email</span>
                                    <span className="text-white">{payment.email}</span>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {status === "failed" && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                        >
                            <XCircle size={80} className="mx-auto text-red-400 mb-6" strokeWidth={1.5} />
                        </motion.div>
                        <h2 className="font-jakarta text-2xl font-bold text-white mb-3">Payment Failed</h2>
                        <p className="text-primary-muted mb-8">
                            {reference ? "We could not verify your payment. Please try again or contact support." : "No payment reference found."}
                        </p>
                    </>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/services"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Services
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                        <Home size={16} /> Go Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default function PaymentCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[70vh] flex items-center justify-center">
                    <Loader2 size={48} className="text-accent animate-spin" />
                </div>
            }
        >
            <CallbackContent />
        </Suspense>
    );
}
