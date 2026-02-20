"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("");

  const roles = ["Student", "Professional", "Founder", "Mentor"];
  const skillOptions = [
    "JavaScript",
    "Python",
    "Design",
    "Marketing",
    "Data Science",
    "Product Management",
    "AI/ML",
    "Leadership",
  ];
  const interestOptions = [
    "Startups",
    "AI",
    "Design",
    "Web Development",
    "Entrepreneurship",
    "Research",
    "Networking",
    "Mentorship",
  ];

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleComplete = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {step} of 4
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((step / 4) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What's your role?
              </h2>
              <p className="text-gray-600 mb-8">
                This helps us personalize your experience
              </p>

              <div className="grid grid-cols-2 gap-4">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      role === r
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-gray-900">
                        {r}
                      </span>
                      {role === r && (
                        <Check className="text-purple-600" size={20} />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!role}
                className="w-full mt-8 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What are your skills?
              </h2>
              <p className="text-gray-600 mb-8">Select all that apply</p>

              <div className="flex flex-wrap gap-3">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      skills.includes(skill)
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={skills.length === 0}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What interests you?
              </h2>
              <p className="text-gray-600 mb-8">
                Help us find the right communities for you
              </p>

              <div className="flex flex-wrap gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      interests.includes(interest)
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={interests.length === 0}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Bio */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Tell us about yourself
              </h2>
              <p className="text-gray-600 mb-8">
                Write a short bio to help others connect with you
              </p>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="I'm a passionate developer interested in AI and building products that make a difference..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                {bio.length} / 500 characters
              </p>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={bio.length < 20}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Setup
                  <Check size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
