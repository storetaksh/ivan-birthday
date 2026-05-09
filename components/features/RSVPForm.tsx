"use client";

import React, { useState } from 'react';

export default function RSVPForm({ weddingData }: { weddingData: any }) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('yes');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const babyName = weddingData.baby?.name || 'Baby';
    const parent1 = weddingData.baby?.parents?.mother || 'Jane';
    const parent2 = weddingData.baby?.parents?.father || 'Joseph';

    let message = "";
    if (attendance === "yes") {
      message = `Hi ${parent1} & ${parent2}! I'm delighted to confirm my presence for ${babyName}'s ${weddingData.eventType ? weddingData.eventType.toLowerCase() : 'birthday'} celebrations.\nWarm regards,\n${name}`;
    } else {
      message = `Hi ${parent1} & ${parent2}! Thank you so much for the invitation. Unfortunately, I won't be able to attend ${babyName}'s ${weddingData.eventType ? weddingData.eventType.toLowerCase() : 'birthday'}.\nWith best wishes,\n${name}`;
    }

    const phoneNumber = weddingData.contact.phone?.[0]?.number?.replace(/[^0-9]/g, '') || "919097785207";
    const encodedMessage = encodeURIComponent(message);
    const whatsappWebURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappWebURL, '_blank');
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-[#6B0D1E]/40 border border-[#E6C27A]/30 rounded-xl backdrop-blur-md shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase mb-2 text-[#E6C27A]/80">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-black/20 border border-[#E6C27A]/40 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#E6C27A] transition-colors font-sans text-base"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase mb-2 text-[#E6C27A]/80">Will you attend?</label>
          <div className="relative">
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full bg-black/20 border border-[#E6C27A]/40 rounded px-4 py-3 text-white focus:outline-none focus:border-[#E6C27A] transition-colors appearance-none font-sans text-sm"
            >
              <option value="yes" className="bg-[#6B0D1E] text-white">Joyfully Accept</option>
              <option value="no" className="bg-[#6B0D1E] text-white">Regretfully Decline</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#E6C27A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-[#E6C27A] text-[#6B0D1E] hover:bg-[#FCEBAE] rounded py-4 uppercase tracking-[0.2em] font-bold text-xs transition-all flex items-center justify-center gap-2"
        >
          <span>Share via WhatsApp</span>
        </button>
      </form>
    </div>
  );
}
