'use client';

import { motion, Variants } from 'framer-motion';
import { SlideData } from '@/lib/slides-data';
import Image from 'next/image';

export default function Slide({ data, isActive }: { data: SlideData; isActive: boolean }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (!isActive) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden"
    >
      {/* Background Orbs (Subtle) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px]"
          style={{ backgroundColor: data.accentColor || '#d4a574' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full opacity-5 blur-[80px]"
          style={{ backgroundColor: '#ffffff' }}
        />
      </div>

      <div className="w-full max-w-6xl flex flex-col h-full justify-center">
        {data.type === 'title' && (
          <div className="text-center space-y-6">
            <motion.h1 
              variants={itemVariants}
              className="text-7xl md:text-9xl font-bold tracking-tight text-white"
              style={{ color: data.accentColor }}
            >
              {data.title}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-2xl md:text-4xl font-serif italic text-[#9a9590]"
            >
              {data.subtitle}
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="pt-8 text-sm uppercase tracking-[0.3em] text-[#d4a574]"
            >
              {data.tagline}
            </motion.div>
          </div>
        )}

        {data.type === 'content' && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: data.accentColor }}>
                  {data.title}
                </h2>
                <p className="text-xl md:text-2xl text-[#9a9590] font-serif italic">{data.subtitle}</p>
              </motion.div>
              <ul className="space-y-4">
                {data.content?.map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={itemVariants}
                    className="text-lg md:text-xl flex items-start gap-4"
                  >
                    <span className="text-[#d4a574] mt-1">◆</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            {data.image && (
              <motion.div 
                variants={itemVariants}
                className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image 
                  src={data.image} 
                  alt={data.title} 
                  fill 
                  className="object-cover"
                />
              </motion.div>
            )}
          </div>
        )}

        {data.type === 'grid' && (
          <div className="space-y-12">
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: data.accentColor }}>
                {data.title}
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.gridItems?.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-default"
                >
                  <h3 className="text-xl font-bold mb-4 text-[#d4a574] group-hover:scale-110 transition-transform origin-left">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#9a9590] leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {data.type === 'image' && (
          <div className="space-y-8">
             <motion.div variants={itemVariants} className="text-center space-y-2">
                <h2 className="text-4xl md:text-6xl font-bold" style={{ color: data.accentColor }}>{data.title}</h2>
                <p className="text-xl font-serif italic text-[#9a9590]">{data.subtitle}</p>
             </motion.div>
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div 
                  variants={itemVariants}
                  className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-inner-white"
                >
                  <Image 
                    src={data.image!} 
                    alt={data.title} 
                    fill 
                    className="object-contain p-4"
                  />
                </motion.div>
                <ul className="space-y-6">
                  {data.content?.map((item, i) => (
                    <motion.li 
                      key={i} 
                      variants={itemVariants}
                      className="text-xl md:text-2xl border-l-2 pl-6"
                      style={{ borderColor: data.accentColor }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
             </div>
          </div>
        )}

        {data.type === 'quote' && (
          <div className="max-w-4xl mx-auto space-y-12 text-center">
            <motion.div variants={itemVariants} className="relative h-[300px] w-full max-w-lg mx-auto rounded-full overflow-hidden border-4 border-[#d4a574]/30 shadow-2xl">
               <Image src={data.image!} alt={data.title} fill className="object-cover" />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
               <h2 className="text-5xl md:text-7xl font-bold italic font-serif" style={{ color: data.accentColor }}>
                "{data.title}"
               </h2>
               <div className="h-px w-24 bg-[#d4a574] mx-auto" />
               <ul className="space-y-3 text-[#9a9590]">
                  {data.content?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
               </ul>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
