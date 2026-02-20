"use client";

import { useEffect, useState } from "react";
import {
  Home,
  LayoutDashboard,
  Users,
  UserCircle,
  TrendingUp,
  Calendar,
  Briefcase,
  MessageCircle,
  Settings,
  Shield,
} from "lucide-react";
import { useAuth } from "@/utils/mockAuth";

export default function Sidebar() {
  const { isAuthenticated, logout, isHydrated } = useAuth();
  const [currentPath, setCurrentPath] = useState("/dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Don't render if not authenticated or not hydrated
  if (!mounted || !isHydrated || !isAuthenticated) {
    return null;
  }

  console.log("[Sidebar] Rendering for authenticated user");

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/profile", icon: UserCircle, label: "Profile" },
    { href: "/connections", icon: Users, label: "Connections" },
    { href: "/mentors", icon: TrendingUp, label: "Mentors" },
    { href: "/communities", icon: Users, label: "Communities" },
    { href: "/growth", icon: TrendingUp, label: "Growth Score" },
    { href: "/events", icon: Calendar, label: "Events" },
    { href: "/opportunities", icon: Briefcase, label: "Opportunities" },
    { href: "/messages", icon: MessageCircle, label: "Messages" },
  ];

  const isActive = (href) => {
    if (typeof window !== "undefined") {
      return window.location.pathname === href;
    }
    return currentPath === href;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IN</span>
          </div>
          <span className="font-bold text-xl text-gray-900">INNETGROWTH</span>
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Admin Section */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <a
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/admin")
                ? "bg-purple-50 text-purple-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Shield size={20} />
            <span className="font-medium">Admin Panel</span>
          </a>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => {
            console.log("[Sidebar] Logout clicked");
            logout();            window.location.href = "/";          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer text-left"
        >
          <img
            src="https://i.pravatar.cc/150?img=10"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">Jordan Smith</p>
            <p className="text-sm text-gray-500 truncate">Software Engineer</p>
          </div>
          <span className="text-sm text-purple-600 font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );
}
