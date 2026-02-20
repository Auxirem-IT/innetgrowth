export const mockCommunities = [
  {
    id: 1,
    name: "AI Innovators",
    description:
      "A community for AI enthusiasts, researchers, and practitioners to share knowledge and collaborate.",
    category: "Technology",
    type: "public",
    members: 1247,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    admin: "Dr. Rachel Kim",
    joined: true,
    posts: 342,
    activity: "Very Active",
    tags: ["AI", "Machine Learning", "Research"],
  },
  {
    id: 2,
    name: "Startup Founders Circle",
    description:
      "Exclusive community for startup founders to network, share experiences, and support each other.",
    category: "Entrepreneurship",
    type: "private",
    members: 456,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    admin: "Alex Rivera",
    joined: false,
    posts: 189,
    activity: "Active",
    tags: ["Startups", "Entrepreneurship", "Networking"],
  },
  {
    id: 3,
    name: "Design Systems Hub",
    description:
      "For designers building and maintaining design systems. Share components, patterns, and best practices.",
    category: "Design",
    type: "public",
    members: 892,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    admin: "Aisha Patel",
    joined: true,
    posts: 267,
    activity: "Very Active",
    tags: ["Design", "UI/UX", "Design Systems"],
  },
  {
    id: 4,
    name: "Women in Tech",
    description:
      "Supporting and empowering women in technology through mentorship, resources, and community.",
    category: "Diversity & Inclusion",
    type: "public",
    members: 2134,
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
    admin: "Sarah Chen",
    joined: true,
    posts: 521,
    activity: "Very Active",
    tags: ["Women in Tech", "Diversity", "Mentorship"],
  },
  {
    id: 5,
    name: "Full Stack Developers",
    description:
      "Community for full stack developers to discuss frameworks, tools, and best practices.",
    category: "Technology",
    type: "public",
    members: 3456,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    admin: "Marcus Johnson",
    joined: false,
    posts: 789,
    activity: "Very Active",
    tags: ["Web Development", "Full Stack", "Programming"],
  },
  {
    id: 6,
    name: "Product Management Masters",
    description:
      "Learn and grow as a product manager. Discuss strategy, roadmaps, and user research.",
    category: "Product",
    type: "private",
    members: 678,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    admin: "James Patterson",
    joined: false,
    posts: 234,
    activity: "Active",
    tags: ["Product Management", "Strategy", "Leadership"],
  },
];

export const mockPosts = [
  {
    id: 1,
    communityId: 1,
    author: "Sarah Chen",
    authorAvatar: "https://i.pravatar.cc/150?img=1",
    authorRole: "Product Designer",
    timestamp: "2 hours ago",
    content:
      "Just published a new paper on using transformers for design automation. Would love to hear your thoughts! The potential for AI to assist in the creative process is incredible.",
    likes: 45,
    comments: 12,
    tags: ["Research", "AI", "Design"],
  },
  {
    id: 2,
    communityId: 1,
    author: "Marcus Johnson",
    authorAvatar: "https://i.pravatar.cc/150?img=2",
    authorRole: "Full Stack Developer",
    timestamp: "5 hours ago",
    content:
      "Looking for collaborators on an open-source AI project. We're building a tool to help developers integrate ML models into their apps more easily. DM me if interested!",
    likes: 67,
    comments: 23,
    tags: ["Open Source", "Collaboration"],
  },
  {
    id: 3,
    communityId: 1,
    author: "Priya Sharma",
    authorAvatar: "https://i.pravatar.cc/150?img=3",
    authorRole: "Data Scientist",
    timestamp: "1 day ago",
    content:
      "Great discussion at today's meetup about ethical AI. Key takeaway: we need more diverse teams building AI systems to avoid bias. What are your thoughts on this?",
    likes: 89,
    comments: 34,
    tags: ["Ethics", "Discussion"],
  },
];

export const mockComments = [
  {
    id: 1,
    postId: 1,
    author: "Alex Rivera",
    authorAvatar: "https://i.pravatar.cc/150?img=4",
    timestamp: "1 hour ago",
    content:
      "This is fascinating! I'd love to see how this could be applied to product design workflows.",
  },
  {
    id: 2,
    postId: 1,
    author: "Emily Watson",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    timestamp: "30 minutes ago",
    content:
      "Just read the paper - brilliant work! The implications for design systems are huge.",
  },
];
