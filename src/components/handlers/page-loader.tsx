'use client'

import { motion } from 'framer-motion'

export function GamePlatformLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#66cc00] z-50">
            <div className="relative w-64 h-64">
                {/* Game console shape */}
                <motion.div
                    className="absolute inset-0 bg-white rounded-3xl shadow-lg"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* D-pad */}
                <motion.div className="absolute top-6 left-6 w-16 h-16">
                    <motion.div className="absolute inset-0 bg-[#66cc00] rounded-full" />
                    <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-sm" />
                    <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-sm" />
                    <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-sm" />
                    <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-sm" />
                </motion.div>

                {/* Action buttons */}
                <motion.div className="absolute top-6 right-6 w-16 h-16 flex flex-wrap justify-between content-between">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-6 h-6 bg-[#66cc00] rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.15,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Pixelated Loading bar */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-white rounded-full overflow-hidden">
                    <motion.div
                        className="h-full w-full bg-[#66cc00] origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-0 bottom-0 w-4 bg-white"
                                style={{ left: `${i * 16}px` }}
                                initial={{ scaleY: 1 }}
                                animate={{ scaleY: [1, 0, 1] }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Loading text */}
                <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-white font-bold text-lg">Cargando..</span>
                </motion.div>
            </div>
        </div>
    )
};