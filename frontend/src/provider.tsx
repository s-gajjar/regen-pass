import { createTheme, ThemeProvider } from '@mui/material/styles';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import '@coinbase/onchainkit/styles.css';
import { Toaster } from 'react-hot-toast';
import { baseSepolia } from 'wagmi/chains';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-react';

const wagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: 'onchainkit',
        }),
    ],
    ssr: true,
    transports: {
        [baseSepolia.id]: http(),
    },
});
const queryClient = new QueryClient();

// Clerk publishable key
const CLERK_PUBLISHABLE_KEY = "pk_test_Z3Jvd24taG9uZXliZWUtNTguY2xlcmsuYWNjb3VudHMuZGV2JA";

const Provider = ({ children }: { children: any }) => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                    },
                }}
            />
            <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        <OnchainKitProvider
                            apiKey={'yDaZynZGies9vtB5ZQDIVgRkFaM9IwXe'}
                            chain={baseSepolia}
                        >
                            {children}
                        </OnchainKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </ClerkProvider>
        </ThemeProvider>
    );
};

export default Provider;
