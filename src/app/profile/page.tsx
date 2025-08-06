'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InterestFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    university: '',
    graduationYear: '',
    skills: '',
    experience: '',
    interests: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage for demo purposes
    localStorage.setItem('userInterestProfile', JSON.stringify(formData));
    setSubmitted(true);
    
    // Auto redirect after 3 seconds
    setTimeout(() => {
      router.push('/jobs');
    }, 3000);
  };

  const handleSkip = () => {
    router.push('/jobs');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              We've received your information and we're excited about your interest in Leap! 
              We'll be in touch soon with updates and opportunities.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/jobs')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Continue to Job Search
              </button>
              <p className="text-sm text-gray-500">Redirecting automatically in 3 seconds...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Interested in Leap?</h1>
          <p className="text-gray-600 mb-4">
            Share your background with us and we'll keep you updated on new features, opportunities, and how Leap can help accelerate your career.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              📝 <strong>This form is completely optional!</strong> You can skip it and still access all of Leap's features.
            </p>
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mb-6">
          <button
            onClick={handleSkip}
            className="text-gray-600 hover:text-gray-800 font-medium underline"
          >
            Skip for now and continue to job search →
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name (optional)"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Background (Optional) */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Background <span className="text-sm text-gray-500 font-normal">(All Optional)</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="e.g., Computer Science, Business"
                  />
                </div>
                
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                    University/Institution
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="University name"
                  />
                </div>
                
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year
                  </label>
                  <select
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select year (optional)</option>
                    {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Skills & Interests */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Tell Us More <span className="text-sm text-gray-500 font-normal">(Optional)</span></h2>
              
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills & Technologies
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="e.g., JavaScript, React, Python, Project Management, Leadership"
                />
                <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Summary
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Describe your relevant experience, internships, projects..."
                />
              </div>

              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                  What interests you most about Leap?
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="e.g., AI-powered job matching, mentorship opportunities, career guidance..."
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="pt-6 space-y-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit Interest Form
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Skip and Continue to Job Search
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By submitting this form, you agree to receive updates about Leap's features and opportunities. 
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}