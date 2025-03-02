import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

import { NavbarDemo } from '../../components/navbar/navbar-menu';
import VerticalLinearStepper from '../../components/stepper';
import { Button } from '../../components/ui/button';
import StarWarsButton from '../../components/ui/startwar-btn';
import { events } from '../Events';
import { VerificationModal } from '../../components/VerificationModal';

const getEventDetails = (id: string) => {
    return events.find((event) => event.slug === id);
};

export default function EventPage() {
    const [em, setEm] = useState(false);
    const [isUserInRange, setIsUserInRange] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const eventId = params.eventId as string;
    const event = getEventDetails(eventId);
    if (!event) {
        return <div>Event not found</div>;
    }

    const handleVerification = () => {
        toast.dismiss();
        setIsModalOpen(true);
    };

    const handleVerificationSuccess = () => {
        toast.success('Email verified successfully');
        setEm(true);
        setActiveStep(1);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 1000);
    };

    return (
        <div className="relative">
            {/* <Navbar /> */}
            <NavbarDemo />
            <img
                className="absolute top-0 opacity-10"
                src="https://cdn.prod.website-files.com/669aeedffebb61f45e26347a/678eb7c9f8fcb0d17dbdaf48_ETHDEN2025_web_background_nopaper_header.webp"
                alt="bg"
            />
            <div className="min-h-screen bg-white text-black p-4 sm:p-8 mt-28 md:mt-36">
                <div className="max-w-4xl mx-auto">
                    <Link to={'/events'}>
                        <Button variant="ghost" className="mb-4 relative z-10">
                            ← Back to Events
                        </Button>
                    </Link>
                    <div className="w-full h-full">
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-full h-full object-cover rounded-lg mb-5 shadow-2xl"
                        />
                    </div>
                    <h1 className="text-3xl font-semibold mb-4">
                        {event.title}
                    </h1>
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-3xl backdrop-blur-md border shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 group flex-1 border-zinc-800 p-6 mb-6">
                        <p className="text-lg mb-2">
                            <span className="font-medium">Date:</span>{' '}
                            {event.date}
                        </p>
                        <p className="text-lg mb-2">
                            <span className="font-medium">Time:</span>{' '}
                            {event.time}
                        </p>
                        {event.location && (
                            <p className="text-lg mb-2">
                                <span className="font-medium">Location:</span>{' '}
                                {event.location}
                            </p>
                        )}
                        {event.platform && (
                            <p className="text-lg mb-2">
                                <span className="font-medium">Platform:</span>{' '}
                                {event.platform}
                            </p>
                        )}
                        {event.description && (
                            <p className="text-lg mb-2">
                                <span className="font-medium">
                                    About the event:
                                </span>{' '}
                                {event.description}
                            </p>
                        )}
                    </div>

                    <StarWarsButton
                        title={' Verify for Event'}
                        onClick={handleVerification}
                    />

                    <VerticalLinearStepper
                        event={event}
                        isUserInRange={isUserInRange}
                        setIsUserInRange={setIsUserInRange}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        em={em}
                    />
                </div>
            </div>
            
            <VerificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                verificationUrl="https://share.reclaimprotocol.org/verifier?template=%7B%22sessionId%22%3A%2221bc9df3-99f4-4d4e-9c40-7c00d9e5e32b%22%2C%22providerId%22%3A%22bee752c9-c41b-44b8-9e3d-d3462bcb3dbc%22%2C%22applicationId%22%3A%220x486dD3B9C8DF7c9b263C75713c79EC1cf8F592F2%22%2C%22signature%22%3A%220xb6d6d630da40ce20e48a399cebc2f71bf582e5e1594b504c0b963615002fa0ae1646d4fd997f7ed13fa35a303d20af3a5f9c88319ebfe290698630bff788d6351b%22%2C%22timestamp%22%3A%221740938612544%22%2C%22callbackUrl%22%3A%22https%3A%2F%2Fapi.reclaimprotocol.org%2Fapi%2Fsdk%2Fcallback%3FcallbackId%3D21bc9df3-99f4-4d4e-9c40-7c00d9e5e32b%22%2C%22context%22%3A%22%7B%5C%22contextAddress%5C%22%3A%5C%220x0%5C%22%2C%5C%22contextMessage%5C%22%3A%5C%22%5C%22%7D%22%2C%22verificationType%22%3A%22WITNESS%22%2C%22parameters%22%3A%7B%7D%2C%22redirectUrl%22%3A%22https%3A%2F%2Fdemo.reclaimprotocol.org%2Fsession%2F21bc9df3-99f4-4d4e-9c40-7c00d9e5e32b%22%7D"
                onVerificationComplete={handleVerificationSuccess}
            />
        </div>
    );
}
