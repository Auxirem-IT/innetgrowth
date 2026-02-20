import Sidebar from "@/components/Sidebar";
import { Star, Calendar, MessageCircle, Award } from "lucide-react";
import { mockMentors, mockReviews } from "@/data/mockMentors";

export default function MentorDetailPage({ params }) {
  const mentor = mockMentors[0]; // Mock - would use params.id in real app
  const reviews = mockReviews.filter((r) => r.mentorId === mentor.id);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mentor Profile */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-6 mb-6">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {mentor.name}
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">{mentor.role}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-500"
                          size={18}
                          fill="currentColor"
                        />
                        <span className="font-semibold">{mentor.rating}</span>
                        <span className="text-gray-600">
                          ({mentor.reviews} reviews)
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {mentor.mentees} mentees
                      </div>
                      <div className="text-gray-600">
                        {mentor.sessions} sessions
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">
                    About
                  </h2>
                  <p className="text-gray-700">{mentor.bio}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">
                    Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Experience</p>
                    <p className="text-lg font-bold text-gray-900">
                      {mentor.experience}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Response Time</p>
                    <p className="text-lg font-bold text-gray-900">
                      {mentor.responseTime}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Languages</p>
                    <p className="text-lg font-bold text-gray-900">
                      {mentor.languages.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Reviews
                </h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {review.userName}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="text-yellow-500"
                                size={16}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {mentor.hourlyRate}
                    </span>
                    {mentor.hourlyRate !== "Free" && (
                      <span className="text-gray-600">/ session</span>
                    )}
                  </div>
                  <p
                    className={`text-sm font-medium ${
                      mentor.availability === "Waitlist"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {mentor.availability}
                  </p>
                </div>

                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 mb-3">
                  <Calendar size={18} />
                  Book a Session
                </button>

                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition-colors font-medium flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Send Message
                </button>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Award className="text-purple-600 mt-0.5" size={16} />
                      <span>1-on-1 video session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="text-purple-600 mt-0.5" size={16} />
                      <span>Personalized advice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="text-purple-600 mt-0.5" size={16} />
                      <span>Follow-up resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="text-purple-600 mt-0.5" size={16} />
                      <span>Session recording</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
