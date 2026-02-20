"use client";

import Sidebar from "@/components/Sidebar";
import { TrendingUp, Users, MessageCircle, Award, Calendar, Briefcase, UserCheck, ArrowRight } from "lucide-react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/utils/mockAuth";
import { useEffect, useState } from "react";

// USER-SPECIFIC DATA ONLY - No global listings, only MY data
const myStats = {
  connectionsCount: 3,
  communitiesJoined: 2,
  eventsRegistered: 2,
  applicationsSubmitted: 2,
  growthScore: 85,
  profileCompleteness: 78,
};

const myConnections = [
  { id: 1, name: "Sarah Chen", role: "Product Designer @ Figma", avatar: "https://i.pravatar.cc/150?img=1", connectedDate: "2 weeks ago" },
  { id: 2, name: "Marcus Johnson", role: "Engineer @ Stripe", avatar: "https://i.pravatar.cc/150?img=2", connectedDate: "1 month ago" },
  { id: 3, name: "Emily Rodriguez", role: "VP Engineering @ Airbnb", avatar: "https://i.pravatar.cc/150?img=5", connectedDate: "3 days ago" },
];

const myCommunitiesJoined = [
  { id: 1, name: "AI Innovators", members: "12.4K", joinedDate: "1 month ago", lastVisit: "Today" },
  { id: 2, name: "Women in Tech", members: "8.1K", joinedDate: "2 weeks ago", lastVisit: "Yesterday" },
];

const myRegisteredEvents = [
  { id: 1, title: "Designing with AI Copilots", date: "Feb 12, 2026", status: "Upcoming" },
  { id: 2, title: "Women in Leadership Summit", date: "Mar 5, 2026", status: "Upcoming" },
];

const myAppliedOpportunities = [
  { id: 1, title: "Senior Product Designer", company: "TechCorp", status: "Under Review", appliedDate: "5 days ago" },
  { id: 2, title: "Staff Software Engineer", company: "Stripe", status: "Interview Scheduled", appliedDate: "1 week ago" },
];

export default function DashboardPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("[Dashboard] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  // Wait for hydration
  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    console.log("[Dashboard] Not authenticated, redirecting to login");
    const target = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?redirect=${target}`} replace />;
  }

  console.log("[Dashboard] Rendering authenticated dashboard");

  const stats = [
    {
      label: "My Connections",
      value: myStats.connectionsCount,
      icon: Users,
      color: "blue",
      link: "/connections",
    },
    {
      label: "Communities Joined",
      value: myStats.communitiesJoined,
      icon: MessageCircle,
      color: "purple",
      link: "/communities",
    },
    {
      label: "Events Registered",
      value: myStats.eventsRegistered,
      icon: Calendar,
      color: "green",
      link: "/events",
    },
    {
      label: "Applications",
      value: myStats.applicationsSubmitted,
      icon: Briefcase,
      color: "orange",
      link: "/opportunities",
    },
  ];

  const recentActivity = [
    { type: "connection", text: "Emily Rodriguez accepted your connection request", time: "3 days ago" },
    { type: "community", text: "You joined Women in Tech community", time: "2 weeks ago" },
    { type: "event", text: "Registered for Designing with AI Copilots", time: "1 week ago" },
    { type: "opportunity", text: "Interview scheduled with Stripe", time: "2 days ago" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600 mt-1">Your personal summary and activity</p>
          </div>

          {/* Growth Score Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-2">Your Growth Score</p>
                <p className="text-5xl font-bold">{myStats.growthScore}</p>
                <p className="text-purple-100 mt-2">Profile {myStats.profileCompleteness}% complete</p>
              </div>
              <div className="text-center">
                <TrendingUp size={64} className="text-white/30" />
                <p className="text-sm text-purple-100 mt-2">+12 this month</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                purple: "bg-purple-100 text-purple-600",
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                orange: "bg-orange-100 text-orange-600",
              };

              return (
                <a
                  key={index}
                  href={stat.link}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </a>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* My Connections */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">My Connections</h2>
                <a href="/connections" className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                  View all →
                </a>
              </div>
              <div className="space-y-3">
                {myConnections.map((conn) => (
                  <div key={conn.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <img src={conn.avatar} alt={conn.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{conn.name}</p>
                      <p className="text-sm text-gray-600 truncate">{conn.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Communities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Communities Joined</h2>
                <a href="/communities" className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                  View all →
                </a>
              </div>
              <div className="space-y-3">
                {myCommunitiesJoined.map((comm) => (
                  <div key={comm.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900">{comm.name}</p>
                      <span className="text-xs text-gray-500">{comm.members}</span>
                    </div>
                    <p className="text-sm text-gray-600">Joined {comm.joinedDate}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* My Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Registered Events</h2>
                <a href="/events" className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                  View all →
                </a>
              </div>
              <div className="space-y-3">
                {myRegisteredEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <p className="font-semibold text-gray-900 mb-1">{event.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{event.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
                <a href="/opportunities" className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                  View all →
                </a>
              </div>
              <div className="space-y-3">
                {myAppliedOpportunities.map((opp) => (
                  <div key={opp.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <p className="font-semibold text-gray-900 mb-1">{opp.title}</p>
                    <p className="text-sm text-gray-600 mb-2">{opp.company}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Applied {opp.appliedDate}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{opp.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.text}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions - Link to global discovery on home page */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Looking to explore?</h3>
            <p className="text-gray-600 mb-4">Discover global content on the home page</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Browse Global Feed
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
