'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Onboarding() {
  const router = useRouter();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false); // trigger bounce out
    }, 2000); // Show logo for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLogo) {
      const delay = setTimeout(() => {
        router.push('/GetStarted');
      }, 800); // Wait for exit animation to complete
      return () => clearTimeout(delay);
    }
  }, [showLogo, router]);

  return (
    <div className="flex bg-[#af0000] h-screen w-full items-center justify-center p-6">
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: 'spring', bounce: 0.5, duration: 0.8 } }}
            exit={{ x: 300, opacity: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
            className="relative"
          >
            <Image
              src="/SkystoneLogo.png"
              alt="Skystone Logo"
              width={400}
              height={400}
              className="filter brightness-0 invert"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
