import { Check, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    verificationUrl: string;
    onVerificationComplete: () => void;
}

export const VerificationModal = ({
    isOpen,
    onClose,
    verificationUrl,
    onVerificationComplete,
}: VerificationModalProps) => {
    const [verificationStarted, setVerificationStarted] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (verificationStarted) {
            timer = setTimeout(() => {
                setIsVerified(true);
                onVerificationComplete();
            }, 5000); // 5 seconds delay
        }
        return () => clearTimeout(timer);
    }, [verificationStarted, onVerificationComplete]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md relative">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">Email Verification</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col items-center">
                    {!verificationStarted ? (
                        <>
                            <div className="mb-4 text-center">
                                <p className="text-gray-600">
                                    Click the button below to start email verification
                                </p>
                            </div>

                            {/* Verification Button */}
                            <a
                                href={verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                onClick={() => setVerificationStarted(true)}
                            >
                                Verify Email
                            </a>
                        </>
                    ) : (
                        <div className="flex flex-col items-center py-8">
                            {!isVerified ? (
                                <>
                                    <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
                                    <p className="text-lg font-medium">Verifying email...</p>
                                </>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Check className="h-8 w-8 text-green-500" />
                                    </div>
                                    <p className="text-lg font-medium text-green-600">Email Verified!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}; 