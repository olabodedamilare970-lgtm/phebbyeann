import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Heart, Sparkles } from 'lucide-react';

export default function TimeCounter({ startDate = "2023-10-14T00:00:00" }) {
  const [elapsed, setElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate);
      const now = new Date();

      if (isNaN(start.getTime())) return;

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const diffMs = now.getTime() - start.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
        totalDays: Math.max(0, totalDays),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const cards = [
    { label: "Years", value: elapsed.years },
    { label: "Months", value: elapsed.months },
    { label: "Days", value: elapsed.days },
    { label: "Hours", value: String(elapsed.hours).padStart(2, '0') },
    { label: "Minutes", value: String(elapsed.minutes).padStart(2, '0') },
    { label: "Seconds", value: String(elapsed.seconds).padStart(2, '0') },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -right-20 -top-20 w-52 h-52 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-rose-900/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-950/60 border border-rose-500/20 text-rose-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg md:text-xl font-semibold tracking-wider text-rose-100">
                Time With You
              </h3>
              <p className="text-xs text-rose-300/60 font-light">
                Since our story began on October 14, 2023
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs font-medium tracking-wide shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Over <strong>{elapsed.totalDays}</strong> cherished days</span>
          </div>
        </div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-rose-950/80 hover:border-rose-500/40 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-[0_0_20px_rgba(225,29,72,0.2)]"
            >
              <span className="font-cinzel text-2xl sm:text-3xl font-bold text-rose-200 group-hover:text-rose-100 transition-colors drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                {item.value}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-400/70 group-hover:text-rose-300 font-medium mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <p className="text-xs text-rose-300/50 italic font-playfair tracking-wide flex items-center justify-center gap-1.5">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> "And every second since has been my favorite."
          </p>
        </div>
      </div>
    </section>
  );
}
