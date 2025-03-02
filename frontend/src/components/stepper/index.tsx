import {
    Transaction,
    TransactionButton,
    TransactionSponsor,
    TransactionStatus,
    TransactionStatusAction,
    TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import toast from 'react-hot-toast';
import { baseSepolia } from 'viem/chains';
import { ABI } from '../../abi';
import { calculateDistance, getUserLocation } from '../../lib/helper';
import Ar from '../Ar/index';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import { useAccount } from 'wagmi';

const steps = [
    { label: 'Email verification' },
    {
        label: 'You need to be within 500m of the event location to be able to verify',
    },
    {
        label: 'NFT collected successfully from booth',
    },
    {
        label: 'All set!',
    },
];

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
};

export default function VerticalLinearStepper({
    event,
    isUserInRange,
    activeStep,
    setActiveStep,
    setIsUserInRange,
    em,
}: {
    event: any;
    isUserInRange: boolean;
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    setIsUserInRange: React.Dispatch<React.SetStateAction<boolean>>;
    em: boolean;
}) {
    const [image, setImage] = React.useState<string | null>(null);
    const [ips, setIps] = React.useState<any>('');
    const [hash, setHash] = React.useState<any>('');
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [locationVerified, setLocationVerified] = React.useState(false);
    const [emailVerified, setEmailVerified] = React.useState(false);
    const [arInitiated, setArInitiated] = React.useState(false);
    const [location, setLocation] = React.useState<any>({
        latitude: 0,
        longitude: 0,
    });
    const { address } = useAccount();

    const [showAR, setShowAR] = React.useState(false);
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // Prevent multiple email verification toasts
    React.useEffect(() => {
        const handleEmailVerification = () => {
            if (activeStep === 0 && em && !emailVerified) {
                setEmailVerified(true);
                handleNext();
            }
        };

        // Only run once when component mounts
        if (!emailVerified) {
            handleEmailVerification();
        }
    }, [em, emailVerified]); // Remove activeStep dependency

    const handleRedeem = async () => {
        toast.dismiss();
        toast.loading('Redeeming perks...');
        const location = await getUserLocation();
        console.log(location);
        if (!localStorage.getItem('userUsed')) {
            localStorage.setItem('userUsed', 'true');
        }
    };
    const validateUserCoordinates = async () => {
        if (locationVerified) return; // Skip if already verified
        
        toast.dismiss();
        toast.loading('Verifying user location...');
        const userLocation = await getUserLocation();

        if (userLocation) {
            setLocation(userLocation); // Store the location for later use
            const distance = calculateDistance({
                lat1: userLocation.latitude,
                lon1: userLocation.longitude,
                lat2: userLocation.latitude,
                lon2: userLocation.longitude,
            });
            if (distance <= 500) {
                toast.dismiss();
                toast.success('You are in range of the event location');
                setIsUserInRange(true);
                setLocationVerified(true);
                handleNext();
            } else {
                toast.dismiss();
                toast.error('You are not in range of the event location');
                setIsUserInRange(false);
            }
        }
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    const handleARInvokation = async () => {
        if (arInitiated) return; // Prevent multiple AR initializations
        setArInitiated(true);
        setShowAR(true);
        
        try {
            const caller = await fetch(
                'https://regen-pass.up.railway.app/create-nft',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: Math.floor(Math.random() * 90 + 10).toString(),
                        name: 'Eth Denver 2025 POAP',
                        description:
                            'This is a POAP for ETH Denver 2025 sponsered by Chainlink',
                        image_uri:
                            'https://res.cloudinary.com/dt1dn773q/image/upload/fl_preserve_transparency/v1740837333/nft_pgajbj.jpg?_s=public-apps',
                        attributes: [
                            { trait_type: 'Event', value: 'ETH Denver 2025' },
                            { trait_type: 'Sponser', value: 'Chainlink' },
                            {
                                trait_type: 'Location',
                                value: location.latitude + ',' + location.longitude,
                            },
                            { trait_type: 'Category', value: 'POAP' },
                        ],
                    }),
                }
            );
            const res = await caller.json();
            if (res.success) {
                const data = res.metadataIPFSUrl.split('https://')[1];
                setIps(data);
                setTimeout(() => {
                    setShowSuccessModal(true);
                }, 3000);
            }
        } catch (error) {
            console.error('Error in AR invocation:', error);
            setArInitiated(false); // Reset flag if there's an error
        }
    };

    React.useEffect(() => {
        if (activeStep === 1 && !locationVerified) {
            validateUserCoordinates();
        }
    }, [activeStep]);

    React.useEffect(() => {
        if (activeStep === 2 && !arInitiated) {
            handleARInvokation();
        }
    }, [activeStep]);

    const calls = [
        {
            to: `0x2d2b9bf62b0143a8d68ed4a7063e5f50244dfc81` as `0x${string}`,
            functionName: 'crossChainMint',
            args: [address, ips, '16015286601757825753', 1]
        },
    ];
    const handleOnStatus = React.useCallback((status: LifecycleStatus) => {
        if (status?.statusName === 'success') {
            setHash(
                status?.statusData?.transactionReceipts[0]?.transactionHash
            );
        }
    }, []);
    return (
        <>
            <Box sx={{ maxWidth: 400 }}>
                {showAR ? (
                    <>
                        <Modal
                            open={showSuccessModal}
                            onClose={() => setShowSuccessModal(false)}
                            aria-labelledby="nft-success-modal"
                        >
                            <Box sx={modalStyle}>
                                <Typography 
                                    variant="h6" 
                                    component="h2" 
                                    className="text-white text-center font-bold text-xl mb-2"
                                >
                                    NFT Minting Successful! 🎉
                                </Typography>
                                <Button
                                    href="https://testnet.sophscan.xyz/tx/0x4d8f0815ffbc292a7e3a2dbc0930d3a94eeff6891d94190ec4368a1d7f9310d4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#0847f7',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '9999px',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: '#0037d7'
                                        },
                                        textTransform: 'none',
                                        boxShadow: '0 4px 14px 0 rgba(8, 71, 247, 0.39)',
                                    }}
                                >
                                    Show Transaction
                                </Button>
                            </Box>
                        </Modal>
                        <Ar
                            location={location}
                            setIsArOpen={setShowAR}
                            setImage={setImage}
                        />
                    </>
                ) : image ? (
                    <div className="relative">
                        <img src={image} alt="Captured Screenshot" />
                        <img
                            src={
                                'https://res.cloudinary.com/dt1dn773q/image/upload/fl_preserve_transparency/v1740837333/nft_pgajbj.jpg?_s=public-apps'
                            }
                            alt="Overlay"
                            className="absolute top-0 right-1"
                            height={200}
                            width={200}
                        />
                    </div>
                ) : null}
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step
                            key={step.label}
                            completed={
                                (isUserInRange && index === 1) ||
                                (em && index === 0)
                            }
                        >
                            <StepLabel
                                optional={
                                    index === steps.length - 1 ? (
                                        <Typography variant="caption">
                                            Last step
                                        </Typography>
                                    ) : null
                                }
                            >
                                <div className="text-black">{step.label}</div>
                            </StepLabel>
                            <StepContent>
                                {activeStep === 3 && (
                                    <Box sx={{ mb: 2 }}>
                                        <Button
                                            onClick={handleRedeem}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {`Redeem`}
                                        </Button>
                                    </Box>
                                )}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 2 && (
                    <>
                        <Transaction
                            chainId={baseSepolia.id}
                            calls={calls}
                            isSponsored
                            onStatus={handleOnStatus}
                        >
                            <TransactionButton />
                            <TransactionSponsor />
                            <TransactionStatus>
                                <TransactionStatusLabel />
                                <TransactionStatusAction />
                            </TransactionStatus>
                        </Transaction>
                        {hash && (
                            <div className="font-semibold text-lg">
                                Transaction success 🎉{' '}
                                <a
                                    href={`https://ccip.chain.link/tx/${hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    (View on Chain)
                                </a>
                            </div>
                        )}
                    </>
                )}

                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </>
    );
}
