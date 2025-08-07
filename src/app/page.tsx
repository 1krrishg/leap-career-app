'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { 
  BookOpenIcon,
  AcademicCapIcon,
  TagIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';

// Helper function to render icons
const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string; className?: string }) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    BookOpenIcon,
    AcademicCapIcon,
    TagIcon,
    BriefcaseIcon,
    RocketLaunchIcon,
    EnvelopeIcon,
    DocumentTextIcon,
    ChartBarIcon,
    HandRaisedIcon
  };
  
  const Icon = iconMap[iconName];
  return Icon ? <Icon className={className} /> : null;
};

export default function Home() {

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate active stage based on scroll position
      const stagesSection = document.getElementById('stages-section');
      if (stagesSection) {
        const rect = stagesSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / sectionHeight));
        const stageIndex = Math.floor(scrollProgress * 5);
        setActiveStage(Math.min(stageIndex, 4));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineData = [
    {
      stage: "School",
      emotion: "Dreams start here",
      description: "Where aspirations take flight and curiosity knows no bounds",
      icon: "BookOpenIcon",
      color: "from-blue-400 to-blue-600"
    },
    {
      stage: "College",
      emotion: "Building skills",
      description: "Crafting your foundation, discovering your passions",
      icon: "AcademicCapIcon",
      color: "from-green-400 to-green-600"
    },
    {
      stage: "Graduation",
      emotion: "Hopeful but uncertain",
      description: "Ready to conquer the world, yet unsure of the path ahead",
      icon: "TagIcon",
      color: "from-purple-400 to-purple-600"
    },
    {
      stage: "Job Search",
      emotion: "Lost, frustrated, exhausted",
      description: "Overwhelmed by applications, questioning your worth",
      icon: "BriefcaseIcon",
      color: "from-red-400 to-red-600"
    },
    {
      stage: "Leap",
      emotion: "Guided, focused, confident",
      description: "Found the solution, ready to soar to new heights",
      icon: "RocketLaunchIcon",
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Full-screen background with dark overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="%23000"/><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Brand Logo/Name */}
        <div className="mb-12">
          <div className="relative mb-6">
            {/* Cinematic Leap Logo */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                {/* Premium Cursive Logo */}
                <h1 className="font-serif text-6xl md:text-8xl font-light text-white mb-3 tracking-wide italic">
                  <span className="text-white relative top-4">
                    Leap
                  </span>
                </h1>
              </div>
            </div>
          </div>
          
          <p className="font-body text-lg md:text-xl text-white font-light drop-shadow-md tracking-wide">
            Your Career Journey, Simplified
          </p>
          
          {/* Professional Tagline */}
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-white opacity-80 font-body">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Career Development</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Professional Growth</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Success Platform</span>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="mb-20">
          <Link 
            href="/master"
            className="font-body inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl drop-shadow-lg tracking-wide"
          >
            Get Started
          </Link>
        </div>

        {/* Vertical Journey Stages */}
        <div id="stages-section" className="w-full max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-16 drop-shadow-lg tracking-wide">
            Your Journey to Success
          </h2>
          
          {/* Vertical Stages */}
          <div className="space-y-10">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ease-out ${
                  index <= activeStage 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
              >
                <div className="bg-black bg-opacity-70 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-30 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center space-x-8">
                    {/* Icon */}
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                      index <= activeStage 
                        ? `bg-gradient-to-r ${item.color} shadow-xl` 
                        : 'bg-white bg-opacity-20'
                    }`}>
                      <IconComponent iconName={item.icon} className="w-12 h-12 text-white" />
                    </div>
                    
                                            {/* Content */}
                        <div className="flex-1 text-left">
                          <h3 className="font-display text-2xl font-bold text-white mb-3 drop-shadow-md tracking-wide">
                            {item.stage}
                          </h3>
                          <p className="font-body text-lg text-yellow-200 drop-shadow-md mb-4 font-medium tracking-wide">
                            {item.emotion}
                          </p>
                          <p className="font-body text-gray-200 drop-shadow-md leading-relaxed tracking-wide">
                            {item.description}
                          </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-20 w-full max-w-5xl">
          <h3 className="font-display text-2xl font-semibold text-white mb-8 tracking-wide">Explore Our Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link href="/jobs" className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30 hover:bg-opacity-90 transition-all shadow-lg">
              <IconComponent iconName="BriefcaseIcon" className="w-8 h-8 text-white mb-3" />
              <p className="font-body text-white text-sm font-semibold tracking-wide drop-shadow-md">Job Matching</p>
            </Link>
            <Link href="/cv-checker" className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30 hover:bg-opacity-90 transition-all shadow-lg">
              <IconComponent iconName="DocumentTextIcon" className="w-8 h-8 text-white mb-3" />
              <p className="font-body text-white text-sm font-semibold tracking-wide drop-shadow-md">CV Checker</p>
            </Link>
            <Link href="/interview-prep" className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30 hover:bg-opacity-90 transition-all shadow-lg">
              <IconComponent iconName="TagIcon" className="w-8 h-8 text-white mb-3" />
              <p className="font-body text-white text-sm font-semibold tracking-wide drop-shadow-md">Interview Prep</p>
            </Link>
            <Link href="/application-tracker" className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30 hover:bg-opacity-90 transition-all shadow-lg">
              <IconComponent iconName="ChartBarIcon" className="w-8 h-8 text-white mb-3" />
              <p className="font-body text-white text-sm font-semibold tracking-wide drop-shadow-md">Application Tracker</p>
            </Link>
            <Link href="/mentorship" className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30 hover:bg-opacity-90 transition-all shadow-lg">
              <IconComponent iconName="HandRaisedIcon" className="w-8 h-8 text-white mb-3" />
              <p className="font-body text-white text-sm font-semibold tracking-wide drop-shadow-md">Mentorship</p>
            </Link>
            <Link href="/email-drafting" className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30 hover:bg-opacity-90 transition-all shadow-lg">
              <IconComponent iconName="EnvelopeIcon" className="w-8 h-8 text-white mb-3" />
              <p className="font-body text-white text-sm font-semibold tracking-wide drop-shadow-md">Email Drafting</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
