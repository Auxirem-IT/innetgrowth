"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Users,
  MessageCircle,
  TrendingUp,
  DollarSign,
  Search,
  MoreVertical,
} from "lucide-react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/utils/mockAuth";

export default function AdminPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    setMounted(true);
    console.log("[AdminPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  if (!isAuthenticated) {
    const target = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?redirect=${target}`} replace />;
  }

  const stats = [
    {
      label: "Total Users",
      value: "10,234",
      change: "+12%",
      icon: Users,
      color: "purple",
    },
    {
      label: "Active Communities",
      value: "156",
      change: "+8%",
      icon: MessageCircle,
      color: "blue",
    },
    {
      label: "Growth Rate",
      value: "23%",
      change: "+5%",
      icon: TrendingUp,
      color: "green",
    },
    {
      label: "Revenue",
      value: "$45.2K",
      change: "+18%",
      icon: DollarSign,
      color: "orange",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "User",
      status: "Active",
      joined: "2026-01-15",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      email: "marcus@example.com",
      role: "Mentor",
      status: "Active",
      joined: "2026-01-10",
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "User",
      status: "Active",
      joined: "2026-01-08",
    },
    {
      id: 4,
      name: "Alex Rivera",
      email: "alex@example.com",
      role: "Admin",
      status: "Active",
      joined: "2025-12-20",
    },
  ];

  const communities = [
    {
      id: 1,
      name: "AI Innovators",
      members: 1247,
      posts: 342,
      status: "Active",
      created: "2025-11-15",
    },
    {
      id: 2,
      name: "Startup Founders Circle",
      members: 456,
      posts: 189,
      status: "Active",
      created: "2025-12-01",
    },
    {
      id: 3,
      name: "Design Systems Hub",
      members: 892,
      posts: 267,
      status: "Active",
      created: "2025-11-20",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600">
              Manage users, communities, and platform analytics
            </p>
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
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}
                    >
                      <Icon size={24} />
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
              <div className="flex gap-8 px-6">
                <button
                  onClick={() => setActiveTab("users")}
                  className={`py-4 border-b-2 font-medium transition-colors ${
                    activeTab === "users"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  User Management
                </button>
                <button
                  onClick={() => setActiveTab("communities")}
                  className={`py-4 border-b-2 font-medium transition-colors ${
                    activeTab === "communities"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Communities
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`py-4 border-b-2 font-medium transition-colors ${
                    activeTab === "analytics"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab("monetization")}
                  className={`py-4 border-b-2 font-medium transition-colors ${
                    activeTab === "monetization"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Monetization
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* User Management Tab */}
              {activeTab === "users" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative flex-1 max-w-md">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                      Add User
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Role
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Joined
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-medium text-gray-900">
                              {user.name}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {user.email}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {user.joined}
                            </td>
                            <td className="py-3 px-4">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <MoreVertical
                                  size={18}
                                  className="text-gray-600"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Communities Tab */}
              {activeTab === "communities" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative flex-1 max-w-md">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Search communities..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                      Create Community
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Members
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Posts
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Created
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {communities.map((community) => (
                          <tr
                            key={community.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-medium text-gray-900">
                              {community.name}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {community.members.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {community.posts}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">
                                {community.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {community.created}
                            </td>
                            <td className="py-3 px-4">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <MoreVertical
                                  size={18}
                                  className="text-gray-600"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === "analytics" && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Platform Analytics
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        User Growth
                      </h4>
                      <div className="h-48 flex items-end justify-between gap-2">
                        {[40, 65, 55, 80, 70, 90, 85].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-purple-600 rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Engagement Rate
                      </h4>
                      <div className="h-48 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-purple-600 mb-2">
                            78%
                          </div>
                          <p className="text-gray-600">
                            Average Daily Engagement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Monetization Tab */}
              {activeTab === "monetization" && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Pricing Plans
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Free
                      </h4>
                      <div className="text-3xl font-bold text-gray-900 mb-4">
                        $0<span className="text-lg text-gray-600">/mo</span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li>✓ Basic profile</li>
                        <li>✓ Join communities</li>
                        <li>✓ Limited connections</li>
                      </ul>
                      <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Current Plan
                      </button>
                    </div>

                    <div className="border-2 border-purple-600 rounded-xl p-6 relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Popular
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Pro
                      </h4>
                      <div className="text-3xl font-bold text-gray-900 mb-4">
                        $19<span className="text-lg text-gray-600">/mo</span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li>✓ Everything in Free</li>
                        <li>✓ Unlimited connections</li>
                        <li>✓ Priority matching</li>
                        <li>✓ Analytics dashboard</li>
                      </ul>
                      <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Upgrade
                      </button>
                    </div>

                    <div className="border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Enterprise
                      </h4>
                      <div className="text-3xl font-bold text-gray-900 mb-4">
                        $99<span className="text-lg text-gray-600">/mo</span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li>✓ Everything in Pro</li>
                        <li>✓ Custom branding</li>
                        <li>✓ Dedicated support</li>
                        <li>✓ API access</li>
                      </ul>
                      <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
