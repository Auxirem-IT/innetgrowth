"use client";

import { ArrowRight } from "lucide-react";

export default function PublicNav() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IN</span>
          </div>
          <span className="font-bold text-xl text-gray-900">INNETGROWTH</span>
        </a>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
