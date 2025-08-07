'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Using Unicode symbols instead of Heroicons for now

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  photo: string;
  bio: string;
  specialties: string[];
  experience: string;
  location: string;
  isFounder?: boolean;
  featured?: boolean;
}

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Software Developer at Meta",
    content: "My mentor helped me navigate my career transition from bootcamp to FAANG. The guidance was invaluable!",
    rating: 5,
    avatar: "👨‍💻"
  },
  {
    id: 2,
    name: "Priya Sharma", 
    role: "Product Manager at Stripe",
    content: "The mentorship program at Leap completely transformed my approach to product strategy. Highly recommend!",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "UX Designer at Figma",
    content: "Found my dream job with help from my mentor. The personalized advice made all the difference.",
    rating: 5,
    avatar: "👨‍🎨"
  }
];

export default function MentorshipPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [selectedMentor] = useState<Mentor | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectForm, setConnectForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('/mentors.json');
        const data = await response.json();
        const sortedMentors = data.mentors.sort((a: Mentor, b: Mentor) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setMentors(sortedMentors);
        setFilteredMentors(sortedMentors);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    const filtered = mentors.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.specialties.some(specialty => 
                             specialty.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesSpecialty = selectedSpecialty === 'All' || 
                              mentor.specialties.includes(selectedSpecialty);
      
      return matchesSearch && matchesSpecialty;
    });
    
    setFilteredMentors(filtered);
  }, [searchTerm, selectedSpecialty, mentors]);

  const allSpecialties = ['All', ...Array.from(new Set(mentors.flatMap(mentor => mentor.specialties)))];

  const handleConnect = () => {
    // Redirect to WhatsApp for all mentor connections
    window.open('https://wa.me/+9779813078299', '_blank');
  };

  const submitConnection = () => {
    alert(`Connection request sent to ${selectedMentor?.name}! (This is a demo)`);
    setShowConnectModal(false);
    setConnectForm({ name: '', email: '', message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Loading amazing mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link 
          href="/master"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-200 mb-4"
        >
          ← Back to Master Page
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm mb-6">
              <span className="text-lg mr-2">✨</span>
              <span className="text-sm font-medium">Leap&apos;s Unique Advantage</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Career Mentor
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              Connect with industry leaders, successful entrepreneurs, and experienced professionals who can guide your career to new heights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-lg">
                <span className="text-xl mr-2">👥</span>
                <span>{mentors.length}+ Expert Mentors</span>
              </div>
              <div className="flex items-center text-lg">
                <span className="text-xl mr-2">⭐</span>
                <span>4.9/5 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search mentors by name, role, company, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span className="mr-2">Filter by Specialty</span>
                <span className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {showFilters && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                  {allSpecialties.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => {
                        setSelectedSpecialty(specialty);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        selectedSpecialty === specialty ? 'bg-purple-50 text-purple-700' : ''
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredMentors.length === mentors.length 
              ? `Showing all ${mentors.length} mentors`
              : `Found ${filteredMentors.length} mentors matching your criteria`
            }
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 transform ${
                hoveredCard === mentor.id ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
              } ${mentor.featured ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}`}
              onMouseEnter={() => setHoveredCard(mentor.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Featured Badge */}
              {mentor.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <span className="mr-1">✨</span>
                    FOUNDER
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Mentor Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-5xl">{mentor.photo}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                    <p className="text-purple-600 font-semibold">{mentor.role}</p>
                    <p className="text-gray-600 text-sm font-medium">{mentor.company}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">📍</span>
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">⏱️</span>
                    <span>{mentor.experience}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 text-sm leading-relaxed mb-5 line-clamp-3">
                  {mentor.bio}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full border border-purple-200"
                      >
                        {specialty}
                      </span>
                    ))}
                    {mentor.specialties.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{mentor.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">⭐</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">5.0 (24 reviews)</span>
                </div>

                {/* Connect Button */}
                <button
                  onClick={handleConnect}
                  className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform ${
                    mentor.featured
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  } ${hoveredCard === mentor.id ? 'scale-105' : ''}`}
                >
                  {mentor.featured ? '🚀 Connect with Founder' : 'Connect with Mentor'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600">Real stories from professionals who found their dream careers through Leap mentorship</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-sm">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic">&quot;{testimonial.content}&quot;</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Leap Mentorship?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Personalized Guidance</h3>
              <p className="text-white opacity-90">Get tailored advice based on your specific goals, industry, and career stage from experienced professionals.</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Industry Connections</h3>
              <p className="text-white opacity-90">Access exclusive networking opportunities and get introduced to key players in your target industry.</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Proven Results</h3>
              <p className="text-white opacity-90">92% of our mentees land their dream job within 6 months of starting the mentorship program.</p>
            </div>
          </div>
        </div>

        {/* Connect Modal */}
        {showConnectModal && selectedMentor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl">{selectedMentor.photo}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Connect with {selectedMentor.name}</h3>
                  <p className="text-purple-600 font-medium">{selectedMentor.role} at {selectedMentor.company}</p>
                  {selectedMentor.featured && (
                    <div className="inline-flex items-center mt-1">
                      <span className="text-purple-500 mr-1">✨</span>
                      <span className="text-sm text-purple-600 font-medium">Founder of Leap</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={connectForm.name}
                    onChange={(e) => setConnectForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={connectForm.email}
                    onChange={(e) => setConnectForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message to {selectedMentor.name}
                  </label>
                  <textarea
                    value={connectForm.message}
                    onChange={(e) => setConnectForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder={`Hi ${selectedMentor.name}, I'm interested in learning more about ${selectedMentor.specialties[0]} and would love to connect...`}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={submitConnection}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Send Request
                  </button>
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}