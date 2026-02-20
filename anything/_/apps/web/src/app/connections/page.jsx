"use client";

import Sidebar from "@/components/Sidebar";
import { Sparkles, UserPlus } from "lucide-react";
import { mockUsers } from "@/data/mockUsers";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/utils/mockAuth";
import { useEffect, useState } from "react";

export default function ConnectionsPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("[ConnectionsPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  if (!isAuthenticated) {
    const target = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?redirect=${target}`} replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI-Powered Connections
            </h1>
            <p className="text-gray-600">
              Discover professionals matched to your profile and goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                    <Sparkles size={14} />
                    <span className="text-sm font-semibold">
                      {user.matchScore}% Match
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {user.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{user.role}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {user.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {user.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 mb-4">
                  <p className="text-sm text-purple-900">
                    <span className="font-semibold">AI Insight:</span> You both
                    share interests in{" "}
                    {user.interests.slice(0, 2).join(" and ")}. Great potential
                    for collaboration!
                  </p>
                </div>

                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <UserPlus size={18} />
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
