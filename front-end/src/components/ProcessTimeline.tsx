'use client';

import { useEffect, useRef, useState } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: Step[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = timelineRef.current?.querySelectorAll('[data-index]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-amber-500 via-amber-400 to-amber-300 dark:from-amber-600 dark:via-amber-500 dark:to-amber-400"></div>

      {/* Steps */}
      <div className="space-y-16">
        {steps.map((step, idx) => (
          <div
            key={idx}
            data-index={idx}
            className={`relative transition-all duration-700 ${
              activeStep >= idx ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-10'
            }`}
          >
            <div className={`flex flex-col md:flex-row items-start gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Content */}
              <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-800/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Number Circle */}
              <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ${
                    activeStep >= idx
                      ? 'bg-linear-to-br from-amber-400 to-amber-600 text-white scale-110 shadow-lg shadow-amber-500/50'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {step.number}
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
