"use client";

import Sidebar from "@/components/Sidebar";
import PublicNav from "@/components/PublicNav";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Bookmark,
  Sparkles,
} from "lucide-react";
import { mockOpportunities } from "@/data/mockEvents";
import { useAuth, useRequireAuthAction } from "@/utils/mockAuth";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function OpportunitiesPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const requireAuth = useRequireAuthAction("apply for this opportunity");

  useEffect(() => {
    setMounted(true);
    console.log("[OpportunitiesPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  const handleApply = (oppId) => {
    console.log("[OpportunitiesPage] Apply opportunity clicked:", oppId);
    requireAuth(() => {
      toast.success("Application saved", {
        description: "We captured your intent. A recruiter will reach out soon.",
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
              Opportunities
            </h1>
            <p className="text-gray-600">
              Discover jobs, internships, and projects matched to your profile
            </p>
          </div>

          <div className="space-y-4">
            {mockOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={opp.logo}
                    alt={opp.company}
                    className="w-16 h-16 rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {opp.title}
                        </h3>
                        <p className="text-gray-600">{opp.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                          <Sparkles size={14} />
                          <span className="text-sm font-semibold">
                            {opp.matchScore}% Match
                          </span>
                        </div>
                        {opp.saved && (
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bookmark
                              size={20}
                              className="text-purple-600"
                              fill="currentColor"
                            />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        <span>{opp.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{opp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} />
                        <span>{opp.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{opp.applicants} applicants</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{opp.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {opp.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        Posted {opp.posted}
                      </span>
                      {opp.applied ? (
                        <button className="px-6 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                          Applied
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApply(opp.id)}
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
