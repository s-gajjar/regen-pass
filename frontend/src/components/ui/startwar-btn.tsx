import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
}

const StarWarsButton = ({
    onClick,
    title,
}: {
    onClick: () => void;
    title: string;
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [stars, setStars] = useState<Star[]>([]);
    const controls = useAnimation();

    useEffect(() => {
        const generateStars = () => {
            if (buttonRef.current) {
                const { width, height } =
                    buttonRef.current.getBoundingClientRect();
                setStars(
                    Array.from({ length: 50 }, (_, i) => ({
                        id: i,
                        x: Math.random() * width,
                        y: Math.random() * height,
                        size: Math.random() * 2 + 1,
                        speed: Math.random() * 50 + 20,
                    }))
                );
            }
        };

        generateStars();
        window.addEventListener('resize', generateStars);
        return () => window.removeEventListener('resize', generateStars);
    }, []);

    return (
        <motion.button
            onClick={onClick}
            ref={buttonRef}
            className="w-fit md:w-fit text-md relative overflow-hidden rounded-full border-2 border-[#9640ff] bg-black px-8 py-1 mb-3 font-semibold text-[#9640ff] focus:outline-none"
            style={{
                boxShadow:
                    '0 0 10px rgba(234, 179, 8, 0.5), 0 0 20px rgba(234, 179, 8, 0.3)',
            }}
            animate={controls}
            whileTap={{ scale: 0.95 }}
            whileHover={{
                boxShadow:
                    '0 0 15px rgba(234, 179, 8, 0.7), 0 0 30px rgba(234, 179, 8, 0.5)',
            }}
        >
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: star.x,
                        top: star.y,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        x: `-${star.speed}%`,
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 2,
                    }}
                />
            ))}
            <span className="relative z-10">{title}</span>
        </motion.button>
    );
};

export default StarWarsButton;
