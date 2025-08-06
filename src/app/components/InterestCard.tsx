'use client';

import { useState } from 'react';

interface InterestCardProps {
  onClose?: () => void;
  className?: string;
}

export default function InterestCard({ onClose, className = '' }: InterestCardProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage for demo purposes
    const existingData = localStorage.getItem('userInterestProfile');
    const timestamp = new Date().toISOString();
    const dataToStore = {
      ...formData,
      submittedAt: timestamp,
      source: 'interest_card'
    };
    
    localStorage.setItem('userInterestProfile', JSON.stringify(dataToStore));
    setSubmitted(true);
    
    // Hide after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, 3000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  if (!isVisible) {
    return null;
  }

  if (submitted) {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 ${className}`}>
        <div className="text-center">
          <div className="text-3xl mb-2">🚀</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Thanks for your interest!</h3>
          <p className="text-sm text-gray-600">
            We'll keep you updated on new features and opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 relative ${className}`}>
      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        aria-label="Dismiss"
      >
        ×
      </button>

      <div className="pr-8">
        <div className="flex items-center mb-4">
          <div className="text-2xl mr-3">💡</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Interested in Leap?</h3>
            <p className="text-sm text-gray-600">Stay updated on new features and opportunities</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name (optional)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email (optional)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            placeholder="What interests you most about Leap? (AI-powered matching, mentorship, career guidance...)"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all"
            >
              Stay Updated
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Maybe Later
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-2">
          Optional - We respect your privacy and you can unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}