"use client";

import Sidebar from "@/components/Sidebar";
import PublicNav from "@/components/PublicNav";
import { Users, Lock, TrendingUp } from "lucide-react";
import { mockCommunities } from "@/data/mockCommunities";
import { useAuth, useRequireAuthAction } from "@/utils/mockAuth";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function CommunitiesPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const requireAuth = useRequireAuthAction("join this community");

  useEffect(() => {
    setMounted(true);
    console.log("[CommunitiesPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  const handleJoin = (communityId) => {
    console.log("[CommunitiesPage] Join community clicked:", communityId);
    requireAuth(() => {
      toast.success("Join request sent", {
        description: "We'll notify you when the community confirms.",
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
              Communities
            </h1>
            <p className="text-gray-600">
              Join communities that match your interests and goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockCommunities.map((community) => (
              <div
                key={community.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${community.image})` }}
                >
                  <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2">
                      {community.type === "private" && (
                        <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                          <Lock size={14} className="text-white" />
                          <span className="text-white text-xs font-medium">
                            Private
                          </span>
                        </div>
                      )}
                      <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                        <span className="text-white text-xs font-medium">
                          {community.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {community.name}
                  </h3>
                  <p className="text-gray-700 mb-4">{community.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {community.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{community.members.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={16} />
                      <span>{community.activity}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      Admin:{" "}
                      <span className="font-medium text-gray-900">
                        {community.admin}
                      </span>
                    </div>
                    {community.joined ? (
                      <a
                        href={`/communities/${community.id}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        View Community
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleJoin(community.id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        {community.type === "private"
                          ? "Request to Join"
                          : "Join Community"}
                      </button>
                    )}
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
