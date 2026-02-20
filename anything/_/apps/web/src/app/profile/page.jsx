"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Edit2, Save, X } from "lucide-react";
import { currentUser } from "@/data/mockUsers";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(currentUser);

  const handleSave = () => {
    setIsEditing(false);
    // Mock save
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                {isEditing ? (
                  <button className="text-sm text-purple-600 hover:text-purple-700 mb-4">
                    Change Photo
                  </button>
                ) : null}
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {profile.name}
                </h2>
                <p className="text-gray-600 mb-4">{profile.role}</p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Connections</span>
                    <span className="font-semibold text-gray-900">
                      {profile.connections}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Growth Score</span>
                    <span className="font-semibold text-purple-600">
                      {profile.growthScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">
                      Profile Completeness
                    </span>
                    <span className="font-semibold text-green-600">
                      {profile.profileCompleteness}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                  />
                ) : (
                  <p className="text-gray-700">{profile.bio}</p>
                )}
              </div>

              {/* Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                      {isEditing && (
                        <button className="ml-2 text-purple-400 hover:text-purple-600">
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm hover:border-gray-400">
                      + Add Skill
                    </button>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {interest}
                      {isEditing && (
                        <button className="ml-2 text-blue-400 hover:text-blue-600">
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm hover:border-gray-400">
                      + Add Interest
                    </button>
                  )}
                </div>
              </div>

              {/* Experience & Education */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Experience
                  </h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.experience}
                      onChange={(e) =>
                        setProfile({ ...profile, experience: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.experience}</p>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Education
                  </h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.education}
                      onChange={(e) =>
                        setProfile({ ...profile, education: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.education}</p>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Availability
                </h3>
                {isEditing ? (
                  <select
                    value={profile.availability}
                    onChange={(e) =>
                      setProfile({ ...profile, availability: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option>Seeking mentorship</option>
                    <option>Available for mentorship</option>
                    <option>Open to collaboration</option>
                    <option>Available for projects</option>
                    <option>Limited availability</option>
                  </select>
                ) : (
                  <p className="text-gray-700">{profile.availability}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
