"use client";

import Sidebar from "@/components/Sidebar";
import PublicNav from "@/components/PublicNav";
import { Star, Clock, Users, Sparkles } from "lucide-react";
import { mockMentors } from "@/data/mockMentors";
import { useAuth, useRequireAuthAction } from "@/utils/mockAuth";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function MentorsPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const requireAuth = useRequireAuthAction("book a mentor session");

  useEffect(() => {
    setMounted(true);
    console.log("[MentorsPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  const handleBook = (mentorId) => {
    console.log("[MentorsPage] Book mentor clicked:", mentorId);
    requireAuth(() => {
      toast.success("Session requested", {
        description: "We've noted your interest. A mentor will confirm shortly.",
      });
    });
  };

  return (
    <div className={isAuthenticated ? "flex min-h-screen bg-gray-50" : "min-h-screen bg-gray-50"}>
      {isAuthenticated ? <Sidebar /> : <PublicNav />}

      <div className={isAuthenticated ? "flex-1 ml-64" : "max-w-7xl mx-auto"}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Find Your Mentor
            </h1>
            <p className="text-gray-600">
              Connect with experienced professionals who can guide your career
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {mockMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {mentor.name}
                        </h3>
                        <p className="text-gray-600">{mentor.role}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                        <Sparkles size={14} />
                        <span className="text-sm font-semibold">
                          {mentor.matchScore}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-500"
                          size={16}
                          fill="currentColor"
                        />
                        <span className="font-semibold">{mentor.rating}</span>
                        <span>({mentor.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{mentor.mentees} mentees</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{mentor.bio}</p>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Experience</p>
                    <p className="font-semibold text-gray-900">
                      {mentor.experience}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sessions</p>
                    <p className="font-semibold text-gray-900">
                      {mentor.sessions}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rate</p>
                    <p className="font-semibold text-gray-900">
                      {mentor.hourlyRate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Responds {mentor.responseTime}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span
                    className={`text-sm font-medium ${
                      mentor.availability === "Waitlist"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {mentor.availability}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleBook(mentor.id)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center"
                >
                  View Profile & Book Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
