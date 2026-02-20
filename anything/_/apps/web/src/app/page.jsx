"use client";

import {
  ArrowRight,
  Users,
  TrendingUp,
  MessageCircle,
  Sparkles,
  UserPlus,
  Briefcase,
  Calendar,
  Building,
} from "lucide-react";
import { useAuth, useRequireAuthAction } from "@/utils/mockAuth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

// GLOBAL DATA - Visible to everyone on HOME PAGE
const globalConnections = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Design Lead @ Figma",
    location: "San Francisco, CA",
    mutualConnections: 12,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Staff Engineer @ Stripe",
    location: "New York, NY",
    mutualConnections: 8,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "VP of Engineering @ Airbnb",
    location: "Austin, TX",
    mutualConnections: 15,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Senior Product Manager @ Google",
    location: "Mountain View, CA",
    mutualConnections: 6,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 5,
    name: "Jessica Wu",
    role: "Tech Lead @ Microsoft",
    location: "Seattle, WA",
    mutualConnections: 9,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    role: "Data Scientist @ Meta",
    location: "Menlo Park, CA",
    mutualConnections: 11,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
];

const globalMentors = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Design Lead @ Figma",
    match: 92,
    tags: ["Design Systems", "Leadership", "Career"],
    avatar: "https://i.pravatar.cc/150?img=1",
    sessions: 45,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Staff Engineer @ Stripe",
    match: 88,
    tags: ["Architecture", "API Design", "Growth"],
    avatar: "https://i.pravatar.cc/150?img=2",
    sessions: 38,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Linda Park",
    role: "Director of Engineering @ Spotify",
    match: 85,
    tags: ["Team Building", "Scaling", "Leadership"],
    avatar: "https://i.pravatar.cc/150?img=8",
    sessions: 52,
    rating: 5.0,
  },
  {
    id: 4,
    name: "Robert Chen",
    role: "Founder & CEO @ StartupX",
    match: 90,
    tags: ["Entrepreneurship", "Fundraising", "Strategy"],
    avatar: "https://i.pravatar.cc/150?img=14",
    sessions: 29,
    rating: 4.7,
  },
];

const globalCommunities = [
  {
    id: 1,
    name: "AI Innovators",
    members: "12.4K",
    activity: "Daily posts",
    description: "Builders and researchers shipping AI products.",
    tags: ["AI", "ML", "Innovation"],
  },
  {
    id: 2,
    name: "Women in Tech",
    members: "8.1K",
    activity: "Weekly meetups",
    description: "Supportive community for women growing their tech careers.",
    tags: ["Diversity", "Career", "Support"],
  },
  {
    id: 3,
    name: "Product Managers Unite",
    members: "15.2K",
    activity: "Daily discussions",
    description: "Share best practices, frameworks, and career advice.",
    tags: ["Product", "Strategy", "Growth"],
  },
  {
    id: 4,
    name: "Frontend Developers Hub",
    members: "10.8K",
    activity: "Weekly challenges",
    description: "React, Vue, and modern web development community.",
    tags: ["Frontend", "React", "JavaScript"],
  },
];

const globalEvents = [
  {
    id: 1,
    title: "Designing with AI Copilots",
    date: "Feb 12, 2026",
    time: "2:00 PM EST",
    location: "Virtual",
    attendees: "480 registered",
    organizer: "AI Innovators",
  },
  {
    id: 2,
    title: "Founder Roundtable: Fundraising in 2026",
    date: "Feb 20, 2026",
    time: "6:00 PM EST",
    location: "NYC + Streaming",
    attendees: "250 registered",
    organizer: "Startup Founders Network",
  },
  {
    id: 3,
    title: "Women in Leadership Summit",
    date: "Mar 5, 2026",
    time: "10:00 AM PST",
    location: "San Francisco",
    attendees: "350 registered",
    organizer: "Women in Tech",
  },
  {
    id: 4,
    title: "React 19: What's New",
    date: "Feb 28, 2026",
    time: "1:00 PM EST",
    location: "Virtual",
    attendees: "620 registered",
    organizer: "Frontend Developers Hub",
  },
];

const globalOpportunities = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "TechCorp",
    salary: "$140k - $170k",
    location: "Remote",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "AI Research Intern",
    company: "Future Labs",
    salary: "$35/hr",
    location: "Hybrid - SF",
    type: "Internship",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Staff Software Engineer",
    company: "Stripe",
    salary: "$200k - $250k",
    location: "Remote",
    type: "Full-time",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Product Manager - Growth",
    company: "Airbnb",
    salary: "$160k - $190k",
    location: "San Francisco",
    type: "Full-time",
    posted: "5 days ago",
  },
];

export default function LandingPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const requireAuth = useRequireAuthAction("complete this action");

  useEffect(() => {
    setMounted(true);
    console.log("[LandingPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  const gateAction = (successMessage) => {
    requireAuth(() => {
      toast.success(successMessage, { description: "You are logged in. Action recorded." });
    });
  };

  // Don't render until hydrated
  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50" />;
  }

  return (
    <>
      {/* Show sidebar when authenticated */}
      {isAuthenticated && <Sidebar />}
      
      <div className={isAuthenticated ? "ml-64 min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50" : "min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50"}>
        {/* Header - Only show when NOT authenticated (sidebar has nav when authenticated) */}
        {!isAuthenticated && (
          <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IN</span>
                </div>
                <span className="font-bold text-xl text-gray-900">INNETGROWTH</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Get Started
                </a>
              </div>
            </div>
          </header>
        )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
          <Sparkles size={16} />
          <span className="text-sm font-medium">
            AI-Powered Professional Networking
          </span>
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Grow Your Network,
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Accelerate Your Career
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Connect with mentors, join communities, and unlock opportunities
          tailored to your goals. Our AI matches you with the right people at
          the right time.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/signup"
            className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg flex items-center gap-2"
          >
            Start Growing Today
            <ArrowRight size={20} />
          </a>
          <a
            href="#features"
            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Everything You Need to Grow
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI-Powered Matching
            </h3>
            <p className="text-gray-600">
              Our AI analyzes your profile, skills, and goals to connect you
              with the most relevant professionals and opportunities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Mentorship Programs
            </h3>
            <p className="text-gray-600">
              Get guidance from experienced mentors in your field. Book
              sessions, track progress, and accelerate your growth.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Vibrant Communities
            </h3>
            <p className="text-gray-600">
              Join communities aligned with your interests. Share knowledge,
              collaborate on projects, and build lasting relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-purple-100">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-purple-100">Expert Mentors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-purple-100">Communities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-purple-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Connections Section - GLOBAL DATA */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="connections">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Suggested Connections</h2>
            <p className="text-gray-600 mt-2">Discover professionals in your network. Connecting requires login.</p>
          </div>
          <a href="/connections" className="text-purple-600 font-semibold flex items-center gap-2">
            View all
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {globalConnections.map((connection) => (
            <div key={connection.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <img src={connection.avatar} alt={connection.name} className="w-20 h-20 rounded-full mb-4" />
                <h3 className="text-lg font-bold text-gray-900">{connection.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{connection.role}</p>
                <p className="text-gray-500 text-xs mb-3">{connection.location}</p>
                <p className="text-purple-600 text-sm font-medium mb-4">
                  {connection.mutualConnections} mutual connections
                </p>
                <button
                  type="button"
                  onClick={() => gateAction(`Connection request sent to ${connection.name}`)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} />
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mentors Section - GLOBAL DATA */}
      <section className="bg-gray-50 py-20" id="mentors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Top Mentors</h2>
              <p className="text-gray-600 mt-2">Explore expert mentors. Booking requires login.</p>
            </div>
            <a href="/mentors" className="text-purple-600 font-semibold flex items-center gap-2">
              Browse all
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {globalMentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                        <p className="text-gray-600 text-sm">{mentor.role}</p>
                      </div>
                      <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {mentor.match}% match
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {mentor.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <span>{mentor.sessions} sessions</span>
                      <span>⭐ {mentor.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => gateAction("Mentor booking started")}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Book a session
                  </button>
                  <a
                    href={`/mentors/${mentor.id}`}
                    className="px-4 py-3 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities Section - GLOBAL DATA */}
      <section className="bg-white py-20" id="communities">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Communities</h2>
              <p className="text-gray-600 mt-2">Join and collaborate. Login required to join.</p>
            </div>
            <a href="/communities" className="text-purple-600 font-semibold flex items-center gap-2">
              Explore all
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {globalCommunities.map((community) => (
              <div key={community.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{community.name}</h3>
                  <span className="text-sm text-gray-500">{community.activity}</span>
                </div>
                <p className="text-gray-700 mb-4">{community.description}</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {community.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Users size={16} />
                    {community.members} members
                  </div>
                  <button
                    type="button"
                    onClick={() => gateAction(`Joined ${community.name}`)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2"
                  >
                    <Building size={16} />
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - GLOBAL DATA */}
      <section className="bg-gray-50 py-20" id="events">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
              <p className="text-gray-600 mt-2">Register with one click after login.</p>
            </div>
            <a href="/events" className="text-purple-600 font-semibold flex items-center gap-2">
              View calendar
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {globalEvents.map((event) => (
              <div key={event.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">{event.title}</h3>
                  <span className="text-sm text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                    {event.date.split(',')[0]}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{event.organizer}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {event.time}
                  </span>
                  <span>{event.location}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{event.attendees}</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => gateAction(`Registered for ${event.title}`)}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Register
                  </button>
                  <a
                    href={`/events/${event.id}`}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
                  >
                    Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section - GLOBAL DATA */}
      <section className="bg-white py-20" id="opportunities">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Job Opportunities</h2>
              <p className="text-gray-600 mt-2">Apply instantly once logged in.</p>
            </div>
            <a href="/opportunities" className="text-purple-600 font-semibold flex items-center gap-2">
              Browse all jobs
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {globalOpportunities.map((opp) => (
              <div key={opp.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{opp.title}</h3>
                    <p className="text-gray-600 font-medium">{opp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">{opp.posted}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} />
                    {opp.type}
                  </span>
                  <span>{opp.location}</span>
                </div>
                <p className="text-purple-700 font-semibold mb-4">{opp.salary}</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => gateAction(`Applied to ${opp.title}`)}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Apply now
                  </button>
                  <a href={`/opportunities/${opp.id}`} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50">
                    Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About INNETGROWTH
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're on a mission to revolutionize professional networking by combining the power of AI with authentic human connections. Founded in 2024, INNETGROWTH has grown to serve over 10,000 professionals worldwide.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our platform uses advanced AI algorithms to intelligently match professionals based on skills, goals, and interests—making networking more meaningful and effective than ever before.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div>
                <p className="text-3xl font-bold text-purple-600">10K+</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">500+</p>
                <p className="text-sm text-gray-600">Expert Mentors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">95%</p>
                <p className="text-sm text-gray-600">Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users size={64} className="text-white" />
              </div>
              <p className="text-xl font-semibold text-gray-900">Building the Future of Professional Networking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
          <p className="text-xl text-gray-600">Insights, tips, and stories from the INNETGROWTH community</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 rounded-lg h-48 mb-4 flex items-center justify-center">
              <Sparkles size={48} className="text-purple-600" />
            </div>
            <div className="text-sm text-purple-600 font-semibold mb-2">Career Growth</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              10 Ways AI is Transforming Job Searches in 2026
            </h3>
            <p className="text-gray-600 mb-4">
              Discover how artificial intelligence is reshaping the way professionals find opportunities and advance their careers.
            </p>
            <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center gap-2">
              Read more <ArrowRight size={16} />
            </a>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-lg h-48 mb-4 flex items-center justify-center">
              <TrendingUp size={48} className="text-blue-600" />
            </div>
            <div className="text-sm text-blue-600 font-semibold mb-2">Networking Tips</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Building Meaningful Connections in a Digital World
            </h3>
            <p className="text-gray-600 mb-4">
              Learn strategies for creating authentic professional relationships that go beyond surface-level connections.
            </p>
            <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center gap-2">
              Read more <ArrowRight size={16} />
            </a>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-lg h-48 mb-4 flex items-center justify-center">
              <MessageCircle size={48} className="text-green-600" />
            </div>
            <div className="text-sm text-green-600 font-semibold mb-2">Success Stories</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              From Junior Dev to Tech Lead: Sarah's Journey
            </h3>
            <p className="text-gray-600 mb-4">
              How one developer leveraged mentorship and community to accelerate her career growth in just 2 years.
            </p>
            <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center gap-2">
              Read more <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl text-purple-100">Help us build the future of professional networking</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-2">Senior Frontend Engineer</h3>
              <p className="text-purple-100 mb-4">Remote • Full-time</p>
              <p className="text-purple-50 mb-4">
                Build beautiful, performant user experiences with React and modern web technologies.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-white font-semibold hover:underline">
                View details <ArrowRight size={16} />
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-2">AI/ML Engineer</h3>
              <p className="text-purple-100 mb-4">San Francisco • Full-time</p>
              <p className="text-purple-50 mb-4">
                Design and implement intelligent matching algorithms that power meaningful connections.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-white font-semibold hover:underline">
                View details <ArrowRight size={16} />
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-2">Product Designer</h3>
              <p className="text-purple-100 mb-4">Remote • Full-time</p>
              <p className="text-purple-50 mb-4">
                Craft intuitive, delightful experiences that help professionals achieve their goals.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-white font-semibold hover:underline">
                View details <ArrowRight size={16} />
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-2">Community Manager</h3>
              <p className="text-purple-100 mb-4">New York • Full-time</p>
              <p className="text-purple-50 mb-4">
                Foster vibrant communities and help members get the most value from the platform.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-white font-semibold hover:underline">
                View details <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="#" className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-lg inline-flex items-center gap-2">
              View All Openings <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Security is Our Priority</h2>
          <p className="text-xl text-gray-600">We take data protection seriously so you can network with confidence</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600">
              All messages and data are encrypted in transit and at rest using industry-standard protocols.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">GDPR & SOC 2 Compliant</h3>
            <p className="text-gray-600">
              We meet the highest standards for data privacy and security compliance worldwide.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy Controls</h3>
            <p className="text-gray-600">
              Granular privacy settings let you control exactly who can see your profile and data.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Best Practices</h3>
          <ul className="text-left max-w-2xl mx-auto space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Regular security audits by third-party experts</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>24/7 monitoring and incident response team</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Automatic data backups and disaster recovery protocols</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Two-factor authentication and passwordless login options</span>
            </li>
          </ul>
          <a href="#" className="mt-6 inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700">
            Read Our Security Documentation <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Career?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Join thousands of professionals who are growing their networks and
          achieving their goals with INNETGROWTH.
        </p>
        <a
          href="/signup"
          className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg inline-flex items-center gap-2"
        >
          Create Your Free Account
          <ArrowRight size={20} />
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IN</span>
                </div>
                <span className="font-bold text-lg text-gray-900">
                  INNETGROWTH
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                AI-powered professional networking platform for the modern
                professional.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
            © 2026 INNETGROWTH. All rights reserved.
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
