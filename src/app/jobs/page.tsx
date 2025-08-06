'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ComputerDesktopIcon,
  ChartBarIcon,
  TagIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  HeartIcon,
  PaintBrushIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BoltIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  UserIcon,
  ClipboardIcon,
  StarIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  ChartPieIcon,
  BriefcaseIcon,
  FlagIcon,
  PlayIcon,
  CloudIcon,
  BeakerIcon,
  BookOpenIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Helper function to render icons
const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string; className?: string }) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    ComputerDesktopIcon,
    ChartBarIcon,
    TagIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    HeartIcon,
    PaintBrushIcon,
    LinkIcon,
    MagnifyingGlassIcon,
    SparklesIcon,
    RocketLaunchIcon,
    BoltIcon,
    AcademicCapIcon,
    ClipboardDocumentListIcon,
    BanknotesIcon,
    UserIcon,
    ClipboardIcon,
    StarIcon,
    GlobeAltIcon,
    CodeBracketIcon,
    ChartPieIcon,
    BriefcaseIcon,
    FlagIcon,
    PlayIcon,
    CloudIcon,
    BeakerIcon,
    BookOpenIcon,
    EyeIcon
  };
  
  const Icon = iconMap[iconName];
  return Icon ? <Icon className={className} /> : null;
};

interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  industries: string[];
  companyTypes: string[];
  skills: string[];
  platforms: string[];
  salaryRange: string;
  growthPotential: string;
  workLifeBalance: string;
  story: string;
}

interface QuestionnaireStep {
  id: number;
  question: string;
  story: string;
  options: {
    value: string;
    label: string;
    description: string;
    story: string;
  }[];
}

const careerPaths: CareerPath[] = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    description: 'Build innovative software solutions and shape the digital future',
    icon: 'ComputerDesktopIcon',
    color: 'from-blue-500 to-blue-600',
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Gaming'],
    companyTypes: ['Startups', 'Tech Giants', 'Consulting Firms', 'Banks', 'Product Companies'],
    skills: ['Programming', 'Problem Solving', 'System Design', 'Collaboration', 'Continuous Learning'],
    platforms: ['LinkedIn', 'Indeed', 'AngelList', 'Stack Overflow Jobs', 'GitHub Jobs', 'Hired', 'Triplebyte', 'LeetCode Jobs'],
    salaryRange: '₹6,00,000 - ₹25,00,000+',
    growthPotential: 'High - Rapid advancement to senior roles',
    workLifeBalance: 'Moderate - Can be demanding but flexible',
    story: "You're the architect of the digital world, turning ideas into reality through code. Every line you write has the power to impact millions of lives."
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Transform data into insights that drive business decisions',
    icon: 'ChartBarIcon',
    color: 'from-purple-500 to-purple-600',
    industries: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Consulting'],
    companyTypes: ['Tech Companies', 'Banks', 'Consulting Firms', 'Startups', 'Research Labs'],
    skills: ['Statistics', 'Machine Learning', 'Python/R', 'Data Visualization', 'Business Acumen'],
    platforms: ['LinkedIn', 'Indeed', 'Kaggle Jobs', 'Data Science Central', 'Analytics Vidhya', 'DataJobs', 'AI Jobs', 'ML Jobs'],
    salaryRange: '₹8,00,000 - ₹30,00,000+',
    growthPotential: 'Very High - AI/ML boom creating demand',
    workLifeBalance: 'Good - Often remote-friendly',
    story: "You're the detective of the digital age, uncovering hidden patterns in data that others can't see. Your insights shape the future of business."
  },
  {
    id: 'product-management',
    title: 'Product Management',
    description: 'Bridge technology and business to create user-centric products',
    icon: 'TagIcon',
    color: 'from-green-500 to-green-600',
    industries: ['Technology', 'E-commerce', 'Fintech', 'Healthcare', 'Education'],
    companyTypes: ['Product Companies', 'Startups', 'Tech Giants', 'Consulting', 'Banks'],
    skills: ['Strategic Thinking', 'User Research', 'Data Analysis', 'Leadership', 'Communication'],
    platforms: ['LinkedIn', 'Indeed', 'AngelList', 'Product Hunt Jobs', 'Mind the Product', 'Product School', 'ProductCraft'],
    salaryRange: '₹10,00,000 - ₹35,00,000+',
    growthPotential: 'High - Path to VP/CPO roles',
    workLifeBalance: 'Moderate - High responsibility but good work-life balance',
    story: "You're the conductor of the product orchestra, harmonizing user needs, business goals, and technical capabilities to create something magical."
  },
  {
    id: 'consulting',
    title: 'Management Consulting',
    description: 'Solve complex business problems and drive organizational change',
    icon: 'BuildingOfficeIcon',
    color: 'from-indigo-500 to-indigo-600',
    industries: ['All Industries', 'Strategy', 'Operations', 'Technology', 'Finance'],
    companyTypes: ['Big 4', 'MBB', 'Boutique Firms', 'Tech Consulting', 'Strategy Houses'],
    skills: ['Problem Solving', 'Communication', 'Analytics', 'Client Management', 'Strategic Thinking'],
    platforms: ['LinkedIn', 'Indeed', 'Consulting.com', 'Management Consulted', 'Vault', 'Consulting Careers', 'Strategy&'],
    salaryRange: '₹12,00,000 - ₹40,00,000+',
    growthPotential: 'Very High - Fast-track to leadership',
    workLifeBalance: 'Challenging - High travel and long hours',
    story: "You're the trusted advisor to CEOs and executives, solving their most complex challenges and shaping the future of organizations."
  },
  {
    id: 'finance',
    title: 'Finance & Banking',
    description: 'Navigate the world of money, investments, and financial markets',
    icon: 'CurrencyDollarIcon',
    color: 'from-yellow-500 to-yellow-600',
    industries: ['Banking', 'Investment Banking', 'Asset Management', 'Fintech', 'Insurance'],
    companyTypes: ['Banks', 'Investment Firms', 'Startups', 'Consulting', 'Corporates'],
    skills: ['Financial Modeling', 'Excel', 'Analytics', 'Risk Management', 'Market Knowledge'],
    platforms: ['LinkedIn', 'Indeed', 'eFinancialCareers', 'Wall Street Oasis', 'Finance Jobs', 'eFinancialCareers', 'Toptal Finance'],
    salaryRange: '₹8,00,000 - ₹50,00,000+',
    growthPotential: 'High - Clear progression paths',
    workLifeBalance: 'Varies - Investment banking is demanding',
    story: "You're the guardian of capital, making strategic decisions that move markets and create wealth for individuals and institutions."
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medicine',
    description: 'Make a difference in people\'s lives through healthcare innovation',
    icon: 'HeartIcon',
    color: 'from-red-500 to-red-600',
    industries: ['Healthcare', 'Pharmaceuticals', 'Medical Devices', 'Telemedicine', 'Research'],
    companyTypes: ['Hospitals', 'Pharma Companies', 'Startups', 'Research Labs', 'Consulting'],
    skills: ['Medical Knowledge', 'Research', 'Patient Care', 'Technology', 'Communication'],
    platforms: ['LinkedIn', 'Indeed', 'Doximity', 'PracticeLink', 'Health eCareers', 'Medscape', 'Physician Jobs'],
    salaryRange: '₹15,00,000 - ₹50,00,000+',
    growthPotential: 'Very High - Healthcare is growing rapidly',
    workLifeBalance: 'Varies - Can be demanding but rewarding',
    story: "You're the healer of tomorrow, combining medical expertise with technology to save lives and improve human health."
  },
  {
    id: 'design',
    title: 'Design & Creative',
    description: 'Create beautiful, functional experiences that users love',
    icon: 'PaintBrushIcon',
    color: 'from-pink-500 to-pink-600',
    industries: ['Technology', 'Advertising', 'Media', 'E-commerce', 'Entertainment'],
    companyTypes: ['Design Agencies', 'Tech Companies', 'Startups', 'Creative Studios', 'Corporates'],
    skills: ['Visual Design', 'User Experience', 'Prototyping', 'User Research', 'Creativity'],
    platforms: ['LinkedIn', 'Indeed', 'Behance Jobs', 'Dribbble Jobs', 'AIGA', 'Design Jobs', 'Creative Market'],
    salaryRange: '₹6,00,000 - ₹20,00,000+',
    growthPotential: 'High - Design is increasingly valued',
    workLifeBalance: 'Good - Often flexible and creative',
    story: "You're the artist of the digital age, crafting experiences that delight users and solve real problems through beautiful design."
  }
];

const questionnaireSteps: QuestionnaireStep[] = [
  {
    id: 1,
    question: "Imagine you're at a crossroads in your career journey. What kind of environment calls to you?",
    story: "Picture yourself walking into your ideal workplace. What do you see? What energy do you feel?",
    options: [
      {
        value: 'fast-paced-innovative',
        label: 'A buzzing startup where every day brings new challenges',
        description: 'You thrive in dynamic environments where innovation happens fast',
        story: "The air crackles with energy. Whiteboards are covered in ideas, and the coffee never stops flowing. You're surrounded by people who believe they can change the world."
      },
      {
        value: 'structured-professional',
        label: 'A prestigious corporation where excellence is the standard',
        description: 'You value stability, clear processes, and professional growth',
        story: "The building stands tall and proud. Inside, everything runs like clockwork. You're part of something bigger than yourself, with clear paths to success."
      },
      {
        value: 'creative-flexible',
        label: 'A creative studio where imagination has no limits',
        description: 'You need space to think, create, and express your artistic vision',
        story: "The space is alive with color and creativity. Music plays softly in the background. You have the freedom to explore, experiment, and bring your wildest ideas to life."
      },
      {
        value: 'impact-driven',
        label: 'A mission-driven organization where you can make a real difference',
        description: 'You want your work to have a meaningful impact on people\'s lives',
        story: "Every project you touch has the potential to change lives. You're surrounded by people who share your passion for making the world a better place."
      }
    ]
  },
  {
    id: 2,
    question: "What kind of problems do you find yourself drawn to solving?",
    story: "Think about the challenges that keep you up at night, the puzzles you can't stop thinking about.",
    options: [
      {
        value: 'technical-complex',
        label: 'Complex technical puzzles that require deep thinking',
        description: 'You love diving deep into code, algorithms, and system architecture',
        story: "You see beauty in elegant solutions to complex problems. The satisfaction of making something work perfectly drives you forward."
      },
      {
        value: 'business-strategic',
        label: 'Strategic business challenges that affect entire organizations',
        description: 'You enjoy analyzing markets, developing strategies, and driving growth',
        story: "You think in terms of systems and strategies. Every decision you make has ripple effects across the entire organization."
      },
      {
        value: 'creative-design',
        label: 'Creative challenges that blend aesthetics with functionality',
        description: 'You love creating beautiful, intuitive experiences that users love',
        story: "You see the world as a canvas for improvement. Every interaction is an opportunity to delight and surprise."
      },
      {
        value: 'people-relationships',
        label: 'People-focused challenges that require empathy and leadership',
        description: 'You excel at understanding people, building teams, and driving collaboration',
        story: "You have a natural ability to read people and situations. Your superpower is bringing out the best in others."
      }
    ]
  },
  {
    id: 3,
    question: "How do you prefer to work and collaborate with others?",
    story: "Imagine your ideal workday. How do you interact with your team?",
    options: [
      {
        value: 'independent-deep',
        label: 'Deep, focused work with occasional collaboration',
        description: 'You need time to think deeply and work independently',
        story: "You find your flow in quiet, focused work. When you emerge, you have something remarkable to share with the team."
      },
      {
        value: 'collaborative-team',
        label: 'Active collaboration with cross-functional teams',
        description: 'You thrive in team environments where everyone contributes',
        story: "The best ideas come from bouncing thoughts off others. You love the energy of brainstorming sessions and team huddles."
      },
      {
        value: 'client-facing',
        label: 'Direct interaction with clients and stakeholders',
        description: 'You enjoy building relationships and understanding client needs',
        story: "You're the bridge between your organization and the outside world. Every client interaction is an opportunity to build trust."
      },
      {
        value: 'creative-autonomous',
        label: 'Creative autonomy with freedom to explore',
        description: 'You need space to experiment and follow your creative instincts',
        story: "You work best when given the freedom to explore. Your best ideas come when you're free to follow your curiosity."
      }
    ]
  },
  {
    id: 4,
    question: "What matters most to you in your career journey?",
    story: "Think about what will make you feel fulfilled and successful in the long run.",
    options: [
      {
        value: 'high-salary-growth',
        label: 'Rapid advancement and financial rewards',
        description: 'You want to climb the ladder quickly and be well-compensated',
        story: "You're ambitious and driven. You want your hard work to be recognized and rewarded with both growth and compensation."
      },
      {
        value: 'work-life-balance',
        label: 'A healthy balance between work and personal life',
        description: 'You value flexibility, remote work, and time for family',
        story: "Success isn't just about your career. You want to excel at work while having time for the things that matter most."
      },
      {
        value: 'meaningful-impact',
        label: 'Making a positive impact on society',
        description: 'You want your work to contribute to something bigger than yourself',
        story: "You measure success by the lives you touch and the positive change you create. Money is important, but purpose is essential."
      },
      {
        value: 'innovation-creativity',
        label: 'Working on cutting-edge, innovative projects',
        description: 'You want to be at the forefront of new technologies and ideas',
        story: "You're drawn to the unknown and the unexplored. You want to be part of creating the future, not just maintaining the present."
      }
    ]
  },
  {
    id: 5,
    question: "What size of organization feels most comfortable to you?",
    story: "Consider where you feel most at home and where you can make the biggest impact.",
    options: [
      {
        value: 'startup-small',
        label: 'Small, agile teams where you wear many hats',
        description: 'You enjoy the flexibility and impact of working in smaller organizations',
        story: "You love the energy of a small team where everyone's contribution matters. You're comfortable with uncertainty and rapid change."
      },
      {
        value: 'medium-growing',
        label: 'Growing companies with clear structure and opportunity',
        description: 'You want the best of both worlds - structure and growth potential',
        story: "You appreciate having processes and support while still being close to the action. You can see your impact while having room to grow."
      },
      {
        value: 'large-established',
        label: 'Large, established companies with stability and resources',
        description: 'You value the stability, resources, and clear career paths of big companies',
        story: "You appreciate the resources and stability that come with scale. You're comfortable in well-defined roles with clear advancement paths."
      },
      {
        value: 'remote-distributed',
        label: 'Remote or distributed teams with global opportunities',
        description: 'You want the flexibility to work from anywhere with global opportunities',
        story: "You're not bound by geography. You want to work with the best people, regardless of where they are in the world."
      }
    ]
  }
];

const jobPlatforms = [
  {
    name: 'LinkedIn',
    icon: 'LinkIcon',
    description: 'Professional networking and job opportunities',
    url: 'https://www.linkedin.com/jobs/',
    category: 'Professional'
  },
  {
    name: 'Indeed',
    icon: 'MagnifyingGlassIcon',
    description: 'World\'s largest job search site',
    url: 'https://www.indeed.com/',
    category: 'General'
  },
  {
    name: 'AngelList',
    icon: 'StarIcon',
    description: 'Startup jobs and equity opportunities',
    url: 'https://angel.co/jobs',
    category: 'Startup'
  },
  {
    name: 'Stack Overflow Jobs',
    icon: 'CodeBracketIcon',
    description: 'Tech jobs from the developer community',
    url: 'https://stackoverflow.com/jobs',
    category: 'Tech'
  },
  {
    name: 'GitHub Jobs',
    icon: 'CodeBracketIcon',
    description: 'Jobs from the open source community',
    url: 'https://jobs.github.com/',
    category: 'Tech'
  },
  {
    name: 'Hired',
    icon: 'TagIcon',
    description: 'AI-powered job matching platform',
    url: 'https://hired.com/',
    category: 'Tech'
  },
  {
    name: 'Triplebyte',
    icon: 'RocketLaunchIcon',
    description: 'Technical interviews and job matching',
    url: 'https://triplebyte.com/',
    category: 'Tech'
  },
  {
    name: 'LeetCode Jobs',
    icon: 'BoltIcon',
    description: 'Jobs for competitive programmers',
    url: 'https://jobs.leetcode.com/',
    category: 'Tech'
  },
  {
    name: 'Kaggle Jobs',
    icon: 'ChartBarIcon',
    description: 'Data science and ML opportunities',
    url: 'https://www.kaggle.com/jobs',
    category: 'Data Science'
  },
  {
    name: 'Data Science Central',
    icon: '📈',
    description: 'Data science community and jobs',
    url: 'https://www.datasciencecentral.com/jobs/',
    category: 'Data Science'
  },
  {
    name: 'Analytics Vidhya',
    icon: 'BeakerIcon',
    description: 'Indian data science community',
    url: 'https://datahack.analyticsvidhya.com/jobs/',
    category: 'Data Science'
  },
  {
    name: 'Product Hunt Jobs',
    icon: 'TagIcon',
    description: 'Jobs at innovative product companies',
    url: 'https://www.producthunt.com/jobs',
    category: 'Product'
  },
  {
    name: 'Mind the Product',
    icon: 'BeakerIcon',
    description: 'Product management community',
    url: 'https://www.mindtheproduct.com/jobs/',
    category: 'Product'
  },
  {
    name: 'Product School',
    icon: 'AcademicCapIcon',
    description: 'Product management education and jobs',
    url: 'https://productschool.com/jobs/',
    category: 'Product'
  },
  {
    name: 'Consulting.com',
    icon: 'BuildingOfficeIcon',
    description: 'Management consulting opportunities',
    url: 'https://www.consulting.com/jobs',
    category: 'Consulting'
  },
  {
    name: 'Management Consulted',
    icon: '📋',
    description: 'Consulting career resources',
    url: 'https://managementconsulted.com/jobs/',
    category: 'Consulting'
  },
  {
    name: 'Vault',
    icon: '🏛️',
    description: 'Career guides and job listings',
    url: 'https://www.vault.com/jobs',
    category: 'Professional'
  },
  {
    name: 'eFinancialCareers',
    icon: 'CurrencyDollarIcon',
    description: 'Finance and banking jobs',
    url: 'https://www.efinancialcareers.com/',
    category: 'Finance'
  },
  {
    name: 'Wall Street Oasis',
    icon: 'BuildingOfficeIcon',
    description: 'Finance community and opportunities',
    url: 'https://www.wallstreetoasis.com/jobs',
    category: 'Finance'
  },
  {
    name: 'Doximity',
    icon: '🏥',
    description: 'Healthcare professional network',
    url: 'https://www.doximity.com/jobs',
    category: 'Healthcare'
  },
  {
    name: 'PracticeLink',
    icon: '👨‍⚕️',
    description: 'Physician and healthcare jobs',
    url: 'https://www.practicelink.com/',
    category: 'Healthcare'
  },
  {
    name: 'Health eCareers',
    icon: '💊',
    description: 'Healthcare job board',
    url: 'https://www.healthecareers.com/',
    category: 'Healthcare'
  },
  {
    name: 'Behance Jobs',
    icon: 'PaintBrushIcon',
    description: 'Creative and design opportunities',
    url: 'https://www.behance.net/joblist',
    category: 'Design'
  },
  {
    name: 'Dribbble Jobs',
    icon: '🏀',
    description: 'Design jobs from the community',
    url: 'https://dribbble.com/jobs',
    category: 'Design'
  },
  {
    name: 'AIGA',
    icon: '🎭',
    description: 'Professional design association',
    url: 'https://www.aiga.org/jobs/',
    category: 'Design'
  },
  {
    name: 'Naukri.com',
    icon: 'GlobeAltIcon',
    description: 'India\'s leading job portal',
    url: 'https://www.naukri.com/',
    category: 'General'
  },
  {
    name: 'Internshala',
    icon: 'AcademicCapIcon',
    description: 'Internships and entry-level jobs',
    url: 'https://internshala.com/',
    category: 'Entry Level'
  },
  {
    name: 'Shine',
    icon: '✨',
    description: 'Indian job search platform',
    url: 'https://www.shine.com/',
    category: 'General'
  },
  {
    name: 'Monster India',
    icon: '👹',
    description: 'Global job search platform',
    url: 'https://www.monsterindia.com/',
    category: 'General'
  }
];

export default function JobsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedPaths, setRecommendedPaths] = useState<CareerPath[]>([]);
  const [currentStory, setCurrentStory] = useState('');

  const handleAnswer = (stepId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }));
    
    // Find the story for this answer
    const step = questionnaireSteps.find(s => s.id === stepId);
    const option = step?.options.find(o => o.value === value);
    if (option) {
      setCurrentStory(option.story);
    }
  };

  const nextStep = () => {
    if (currentStep < questionnaireSteps.length) {
      setCurrentStep(currentStep + 1);
      setCurrentStory('');
    } else {
      generateRecommendations();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCurrentStory('');
    }
  };

  const generateRecommendations = () => {
    // Enhanced recommendation logic based on answers
    const recommendations: CareerPath[] = [];
    
    // Software Engineering
    if ((answers[1] === 'fast-paced-innovative' && answers[2] === 'technical-complex') ||
        (answers[2] === 'technical-complex' && answers[4] === 'innovation-creativity')) {
      recommendations.push(careerPaths.find(p => p.id === 'software-engineering')!);
    }
    
    // Data Science
    if ((answers[2] === 'technical-complex' && answers[4] === 'innovation-creativity') ||
        (answers[1] === 'fast-paced-innovative' && answers[2] === 'technical-complex')) {
      recommendations.push(careerPaths.find(p => p.id === 'data-science')!);
    }
    
    // Product Management
    if ((answers[2] === 'business-strategic' && answers[3] === 'collaborative-team') ||
        (answers[1] === 'structured-professional' && answers[2] === 'business-strategic')) {
      recommendations.push(careerPaths.find(p => p.id === 'product-management')!);
    }
    
    // Consulting
    if ((answers[4] === 'high-salary-growth' && answers[3] === 'client-facing') ||
        (answers[1] === 'structured-professional' && answers[2] === 'business-strategic')) {
      recommendations.push(careerPaths.find(p => p.id === 'consulting')!);
    }
    
    // Finance
    if ((answers[4] === 'high-salary-growth' && answers[1] === 'structured-professional') ||
        (answers[2] === 'business-strategic' && answers[4] === 'high-salary-growth')) {
      recommendations.push(careerPaths.find(p => p.id === 'finance')!);
    }
    
    // Healthcare
    if (answers[1] === 'impact-driven' || answers[4] === 'meaningful-impact') {
      recommendations.push(careerPaths.find(p => p.id === 'healthcare')!);
    }
    
    // Design
    if (answers[2] === 'creative-design' || answers[3] === 'creative-autonomous') {
      recommendations.push(careerPaths.find(p => p.id === 'design')!);
    }

    // Add some default recommendations if none match
    if (recommendations.length === 0) {
      recommendations.push(careerPaths[0], careerPaths[1], careerPaths[2]);
    }

    setRecommendedPaths(recommendations);
    setShowResults(true);
  };

  const restartQuestionnaire = () => {
    setCurrentStep(1);
    setAnswers({});
    setShowResults(false);
    setRecommendedPaths([]);
    setCurrentStory('');
  };

  const currentStepData = questionnaireSteps.find(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/master" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
            ← Back to Master Menu
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Career Story</h1>
          <p className="text-gray-600">Let&apos;s discover where your journey leads</p>
        </div>

        {!showResults ? (
          /* Questionnaire Section */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Step {currentStep} of {questionnaireSteps.length}</span>
                <span className="text-sm text-gray-500">{Math.round((currentStep / questionnaireSteps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / questionnaireSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{currentStepData?.question}</h2>
              <p className="text-gray-600 mb-6 italic">&quot;{currentStepData?.story}&quot;</p>
              
              {/* Story Response */}
              {currentStory && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 italic">&quot;{currentStory}&quot;</p>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {currentStepData?.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentStep, option.value)}
                  className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-300 ${
                    answers[currentStep] === option.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{option.label}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              
              <button
                onClick={nextStep}
                disabled={!answers[currentStep]}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === questionnaireSteps.length ? 'Discover My Path' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            {/* Your Career Story */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Career Story</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Based on your answers, we&apos;ve discovered the perfect career paths that align with your personality, 
                work style, and aspirations. Here are the roles where you&apos;re most likely to thrive and find fulfillment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedPaths.map((path) => (
                  <div key={path.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-gradient-to-r ${path.color}`}>
                        <IconComponent iconName={path.icon} className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
                        <p className="text-gray-600">{path.description}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700 italic">&quot;{path.story}&quot;</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Salary Range:</span>
                        <p className="text-gray-900">{path.salaryRange}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Growth Potential:</span>
                        <p className="text-gray-900">{path.growthPotential}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Work-Life Balance:</span>
                        <p className="text-gray-900">{path.workLifeBalance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={restartQuestionnaire}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Take the Journey Again
                </button>
              </div>
            </div>

            {/* Job Platforms Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Job Search Platforms</h2>
              <p className="text-lg text-gray-700 mb-8">
                Now that we know your path, here are the best platforms to find opportunities in your chosen field. 
                We&apos;re not a job search app - we&apos;re your guide to knowing where to look.
              </p>
              
              {/* Recommended Platforms for Your Path */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended for Your Path</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedPaths.flatMap(path => 
                    path.platforms.map(platform => {
                      const platformData = jobPlatforms.find(p => p.name === platform);
                      return platformData ? (
                        <a
                          key={platform}
                          href={platformData.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300"
                        >
                          <IconComponent iconName={platformData.icon} className="w-6 h-6 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{platformData.name}</h4>
                            <p className="text-sm text-gray-600">{platformData.description}</p>
                          </div>
                        </a>
                      ) : null;
                    })
                  ).filter(Boolean)}
                </div>
              </div>
              
              {/* All Platforms by Category */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">All Job Platforms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobPlatforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    >
                      <IconComponent iconName={platform.icon} className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                        <p className="text-sm text-gray-600">{platform.description}</p>
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {platform.category}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 