import Link from "next/link";
import InterestCard from "../../components/InterestCard";
import { 
  BriefcaseIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  TagIcon,
  ChartBarIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';

// Helper function to render icons
const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string; className?: string }) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    BriefcaseIcon,
    EnvelopeIcon,
    DocumentTextIcon,
    TagIcon,
    ChartBarIcon,
    HandRaisedIcon
  };
  
  const Icon = iconMap[iconName];
  return Icon ? <Icon className={className} /> : null;
};

const menuItems = [
  {
    title: "Career Path Discovery",
    description: "Take our interactive questionnaire to discover your perfect career path and job opportunities.",
    icon: "BriefcaseIcon",
    href: "/jobs",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Email Drafting",
    description: "Professional email templates for cover letters, follow-ups, networking, and all job communications.",
    icon: "EnvelopeIcon",
    href: "/email-drafting",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "CV Checker",
    description: "AI-powered CV analysis with ATS scoring, keyword suggestions, and improvement tips.",
    icon: "DocumentTextIcon",
    href: "/cv-checker",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Interview Prep",
    description: "Company-specific interview preparation for top MNCs with mock AI practice sessions.",
    icon: "TagIcon",
    href: "/interview-prep",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Application Tracker",
    description: "Comprehensive job application tracking with analytics, interview management, and follow-up tools.",
    icon: "ChartBarIcon",
    href: "/application-tracker",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Mentorship",
    description: "Connect with experienced professionals and industry experts for career guidance.",
    icon: "HandRaisedIcon",
    href: "/mentorship",
    color: "from-indigo-500 to-indigo-600"
  }
];

export default function MasterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-6 mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </Link>
            
            {/* Start Your Journey Button */}
            <Link 
              href="/jobs"
              className="font-body inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </Link>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                {/* Icon */}
                <div className="mb-6 text-center group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <IconComponent iconName={item.icon} className="w-16 h-16 text-gray-600" />
                </div>
                
                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 text-center">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="font-body text-gray-600 text-center leading-relaxed">
                  {item.description}
                </p>
                
                {/* Gradient Border Effect */}
                <div className={`mt-6 h-1 bg-gradient-to-r ${item.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6 text-center">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="font-body text-gray-600">Core Features</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="font-body text-gray-600">Job Opportunities</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-purple-600 mb-2">5</div>
              <div className="font-body text-gray-600">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="font-body text-gray-600">AI Support</div>
            </div>
          </div>
        </div>

        {/* Interest Card */}
        <div className="mt-12">
          <InterestCard />
        </div>
      </div>
    </div>
  );
} 