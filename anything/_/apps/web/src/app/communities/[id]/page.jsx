import Sidebar from "@/components/Sidebar";
import { Users, Send, Heart, MessageCircle } from "lucide-react";
import { mockCommunities, mockPosts } from "@/data/mockCommunities";

export default function CommunityDetailPage({ params }) {
  const community = mockCommunities[0]; // Mock - would use params.id
  const posts = mockPosts.filter((p) => p.communityId === community.id);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Community Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${community.image})` }}
            >
              <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {community.name}
                  </h1>
                  <p className="text-white/90">{community.description}</p>
                </div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gray-400" />
                  <span className="text-gray-900 font-medium">
                    {community.members.toLocaleString()} members
                  </span>
                </div>
                <div className="text-gray-600">{community.posts} posts</div>
                <div className="text-gray-600">{community.activity}</div>
              </div>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Joined
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Posts Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex gap-4">
                  <img
                    src="https://i.pravatar.cc/150?img=10"
                    alt="You"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      placeholder="Share your thoughts with the community..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                      rows="3"
                    />
                    <div className="flex justify-end mt-3">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2">
                        <Send size={16} />
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {post.author}
                      </h3>
                      <p className="text-sm text-gray-600">{post.authorRole}</p>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>

                  <p className="text-gray-900 mb-4">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <Heart size={18} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <MessageCircle size={18} />
                      <span className="text-sm font-medium">
                        {post.comments}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* About */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 mb-4">{community.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">
                      {community.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {community.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Admin</span>
                    <span className="font-medium text-gray-900">
                      {community.admin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {community.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Members Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Members
                </h2>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/150?img=${i}`}
                        alt="Member"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          Member {i}
                        </p>
                        <p className="text-sm text-gray-500 truncate">Role</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm">
                  View all members →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
