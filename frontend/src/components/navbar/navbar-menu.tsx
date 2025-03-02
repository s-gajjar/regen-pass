'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useGlobalStorage from '../../store';
import {
    Address,
    Avatar,
    EthBalance,
    Identity,
    Name,
} from '@coinbase/onchainkit/identity';
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownBasename,
    WalletDropdownDisconnect,
    WalletDropdownFundLink,
    WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
const transition = {
    type: 'spring',
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-montserrat font-medium"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={transition}
                                layoutId="active" // layoutId ensures smooth animation
                                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                            >
                                <motion.div
                                    layout // layout ensures smooth animation
                                    className="w-max h-full p-4"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    const navigate = useNavigate();
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative rounded-full border border-transparent bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm border-gray-200 dark:border-gray-800 shadow-xl flex items-center justify-between p-4 font-montserrat animate-glow-pulse"
        >
            <div
                className="flex items-center justify-center relative z-10 cursor-pointer"
                onClick={() => navigate('/')}
            >
                <img
                    src="/logo.png"
                    alt="RegenPass Logo"
                    className="h-8 sm:h-20 w-auto object-contain"
                />
            </div>

            <div className="flex items-center">{children}</div>
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
}: {
    title: string;
    description: string;
    href: string;
    src: string;
}) => {
    return (
        <Link to={href} className="flex space-x-2">
            <img
                src={src}
                width={140}
                height={70}
                alt={title}
                className="flex-shrink-0 rounded-md shadow-2xl"
            />
            <div>
                <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
                    {title}
                </h4>
                <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, ...rest }: any) => {
    return (
        <Link
            {...rest}
            to={rest.href || '#'} // Convert href prop to 'to' prop
            className="text-neutral-700 dark:text-neutral-200 hover:text-black "
        >
            {children}
        </Link>
    );
};

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setEmail, setName } = useGlobalStorage();

    const handleGoogleLogin = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential;
        const userInfo = await fetchUserDetails(idToken);
        console.log(userInfo);
        setEmail(userInfo.email);
        setName(userInfo.given_name);
        navigate('/events');
    };

    const fetchUserDetails = async (idToken: string) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
            );
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error fetching user details:', error);
            return null;
        }
    };
    const { name } = useGlobalStorage();
    return (
        <div
            className={cn(
                'fixed top-6 sm:top-8 md:top-10 inset-x-0 max-w-[95%] sm:max-w-4xl mx-auto z-[100]',
                className
            )}
        >
            <Menu setActive={setActive}>
                <div className="relative">
                    {window.location.pathname === '/' ? (
                        <button className="inline-flex h-10 sm:h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[#0847f7] bg-[length:200%_100%] px-6 sm:px-8 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            Get Started
                            <div className="opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    theme="filled_black"
                                    size="large"
                                    shape="pill"
                                    text="signin_with"
                                    locale="en"
                                    useOneTap
                                />
                            </div>
                        </button>
                    ) : (
                        <div className="flex text-black items-center relative z-10">
                            <Wallet className="pl-3">
                                <ConnectWallet>
                                    <Avatar className="h-6 w-6" />
                                    <Name />
                                </ConnectWallet>
                                <WalletDropdown>
                                    <Identity
                                        className="px-4 pt-3 pb-2"
                                        hasCopyAddressOnClick
                                    >
                                        <Avatar />
                                        <Name />
                                        <Address />
                                        <EthBalance />
                                    </Identity>
                                    <WalletDropdownBasename />
                                    <WalletDropdownLink
                                        icon="wallet"
                                        href="https://keys.coinbase.com"
                                    >
                                        Wallet
                                    </WalletDropdownLink>
                                    <WalletDropdownFundLink />
                                    <WalletDropdownDisconnect />
                                </WalletDropdown>
                            </Wallet>{' '}
                            <div className="text-black ml-4 font-semibold">
                                Hi, {name}
                            </div>
                        </div>
                    )}
                </div>
            </Menu>
        </div>
    );
}
