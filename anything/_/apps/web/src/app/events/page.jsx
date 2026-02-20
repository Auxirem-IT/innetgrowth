"use client";

import Sidebar from "@/components/Sidebar";
import PublicNav from "@/components/PublicNav";
import { Calendar, MapPin, Users, Bookmark } from "lucide-react";
import { mockEvents } from "@/data/mockEvents";
import { useAuth, useRequireAuthAction } from "@/utils/mockAuth";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const requireAuth = useRequireAuthAction("register for this event");

  useEffect(() => {
    setMounted(true);
    console.log("[EventsPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  const handleRegister = (eventId) => {
    console.log("[EventsPage] Register event clicked:", eventId);
    requireAuth(() => {
      toast.success("Registration saved", {
        description: "Your seat is reserved for this event.",
      });
    });
  };

  return (
    <div className={isAuthenticated ? "flex min-h-screen bg-gray-50" : "min-h-screen bg-gray-50"}>
      {isAuthenticated ? <Sidebar /> : <PublicNav />}

      <div className={isAuthenticated ? "flex-1 ml-64" : "max-w-7xl mx-auto"}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
            <p className="text-gray-600">
              Discover webinars, workshops, and networking events
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded">
                        <span className="text-white text-sm font-medium">
                          {event.type}
                        </span>
                      </div>
                      {event.saved && (
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded">
                          <Bookmark
                            className="text-white"
                            size={16}
                            fill="currentColor"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} />
                      <span className="text-sm">
                        {event.attendees} attending
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-600">Organized by</p>
                      <p className="font-medium text-gray-900">
                        {event.organizer}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-purple-600">
                        {event.price}
                      </span>
                      {event.registered ? (
                        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                          Registered
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRegister(event.id)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                          Register
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
