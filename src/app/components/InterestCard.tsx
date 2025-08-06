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
    const timestamp = new Date().toISOString();
    const dataToStore = {
      ...formData,
      submittedAt: timestamp,
      source: 'interest_card'
    };
    
    localStorage.setItem('userInterestProfile', JSON.stringify(dataToStore));
    
    // Create WhatsApp message
    const message = `Hi! I'm interested in Leap Career App. Here's my info:
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Interests: ${formData.interests || 'Not specified'}

I'd like to learn more about your career development platform!`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+1234567890?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setSubmitted(true);
    
    // Hide after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 3000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) {
    return null;
  }

  if (submitted) {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Thanks for your interest!</h3>
          <p className="text-base text-gray-600">
            We&apos;ve opened WhatsApp for you to connect with us directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 relative ${className}`}>
      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
        aria-label="Dismiss"
      >
        ×
      </button>

      <div className="pr-10">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-4">💡</div>
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">Interested in Leap?</h3>
            <p className="text-base text-gray-800">Stay updated on new features and opportunities</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name (optional)"
              className="px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email (optional)"
              className="px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white"
            />
          </div>
          
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            placeholder="What interests you most about Leap? (AI-powered matching, mentorship, career guidance...)"
            rows={3}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg text-base transition-all duration-200"
            >
              Contact via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 text-base font-medium transition-colors duration-200"
            >
              Maybe Later
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Optional - We respect your privacy and you can unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}