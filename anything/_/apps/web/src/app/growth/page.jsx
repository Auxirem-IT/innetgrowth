"use client";

import Sidebar from "@/components/Sidebar";
import { TrendingUp, Award, Users, MessageCircle, Target } from "lucide-react";
import { currentUser } from "@/data/mockUsers";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/utils/mockAuth";
import { useEffect, useState } from "react";

export default function GrowthPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("[GrowthPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  if (!isAuthenticated) {
    const target = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?redirect=${target}`} replace />;
  }

  const growthBreakdown = [
    {
      label: "Profile Completeness",
      value: currentUser.profileCompleteness,
      max: 100,
      color: "purple",
    },
    { label: "Network Activity", value: 85, max: 100, color: "blue" },
    { label: "Mentorship Engagement", value: 70, max: 100, color: "green" },
    { label: "Community Participation", value: 60, max: 100, color: "orange" },
  ];

  const achievements = [
    {
      title: "Early Adopter",
      description: "Joined in the first month",
      icon: Award,
      unlocked: true,
    },
    {
      title: "Networker",
      description: "Connected with 50+ professionals",
      icon: Users,
      unlocked: true,
    },
    {
      title: "Community Builder",
      description: "Joined 5+ communities",
      icon: MessageCircle,
      unlocked: false,
    },
    {
      title: "Mentor Match",
      description: "Completed 10 mentorship sessions",
      icon: Target,
      unlocked: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Growth Score
            </h1>
            <p className="text-gray-600">
              Track your professional development and network growth
            </p>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-purple-100 mb-2">Your Growth Score</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-bold">
                    {currentUser.growthScore}
                  </span>
                  <span className="text-2xl text-purple-100">/ 100</span>
                </div>
              </div>
              <div className="w-32 h-32 rounded-full border-8 border-white/30 flex items-center justify-center">
                <TrendingUp size={48} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-purple-100">
              <TrendingUp size={16} />
              <span>+12 points this month</span>
            </div>
          </div>

          {/* Growth Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Score Breakdown
            </h2>
            <div className="space-y-6">
              {growthBreakdown.map((item, index) => {
                const percentage = (item.value / item.max) * 100;
                const colorClasses = {
                  purple: "bg-purple-600",
                  blue: "bg-blue-600",
                  green: "bg-green-600",
                  orange: "bg-orange-600",
                };

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {item.label}
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.value}/{item.max}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${colorClasses[item.color]} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Achievements
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.unlocked
                        ? "border-purple-200 bg-purple-50"
                        : "border-gray-200 bg-gray-50 opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          achievement.unlocked
                            ? "bg-purple-600 text-white"
                            : "bg-gray-300 text-gray-500"
                        }`}
                      >
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <p className="text-xs text-purple-600 font-medium mt-2">
                            Unlocked!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Boost Your Score
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Complete your profile
                  </h3>
                  <p className="text-sm text-gray-600">
                    Add your education and work experience to gain +5 points
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Join more communities
                  </h3>
                  <p className="text-sm text-gray-600">
                    Participate in 2 more communities to gain +8 points
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Book a mentorship session
                  </h3>
                  <p className="text-sm text-gray-600">
                    Connect with a mentor to gain +10 points
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
