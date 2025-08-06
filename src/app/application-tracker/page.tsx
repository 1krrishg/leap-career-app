'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  salary?: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn' | 'ghosted';
  appliedDate: string;
  lastUpdated: string;
  jobUrl?: string;
  companyUrl?: string;
  jobDescription?: string;
  notes?: string;
  interviews: Interview[];
  followUps: FollowUp[];
  resumeVersion?: string;
  coverLetterVersion?: string;
  referral?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

interface Interview {
  id: string;
  type: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral' | 'final';
  date: string;
  time: string;
  interviewer?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  outcome?: 'positive' | 'negative' | 'neutral';
}

interface FollowUp {
  id: string;
  type: 'email' | 'call' | 'linkedin' | 'other';
  date: string;
  notes: string;
  response?: string;
}

const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  interview: 'bg-yellow-100 text-yellow-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-800',
  ghosted: 'bg-orange-100 text-orange-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-600',
  high: 'bg-red-100 text-red-600'
};

export default function ApplicationTrackerPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'dashboard' | 'list' | 'calendar'>('dashboard');

  // Load applications from localStorage on component mount
  useEffect(() => {
    const savedApplications = localStorage.getItem('jobApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (application: Omit<JobApplication, 'id' | 'lastUpdated'>) => {
    const newApplication: JobApplication = {
      ...application,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    setApplications(prev => [newApplication, ...prev]);
    setShowAddForm(false);
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    setApplications(prev => prev.map(app => 
      app.id === id 
        ? { ...app, ...updates, lastUpdated: new Date().toISOString() }
        : app
    ));
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStats = () => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === 'applied').length;
    const interviewing = applications.filter(app => app.status === 'interview').length;
    const offers = applications.filter(app => app.status === 'offer').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    const withdrawn = applications.filter(app => app.status === 'withdrawn').length;
    const ghosted = applications.filter(app => app.status === 'ghosted').length;
    const responseRate = total > 0 ? ((interviewing + offers) / total * 100).toFixed(1) : '0';
    const offerRate = (interviewing + offers) > 0 ? (offers / (interviewing + offers) * 100).toFixed(1) : '0';
    
    // Calculate average time to response
    const applicationsWithInterviews = applications.filter(app => app.interviews.length > 0);
    const avgTimeToResponse = applicationsWithInterviews.length > 0 
      ? applicationsWithInterviews.reduce((acc, app) => {
          const appliedDate = new Date(app.appliedDate);
          const firstInterview = app.interviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
          if (firstInterview) {
            const interviewDate = new Date(firstInterview.date);
            return acc + (interviewDate.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24);
          }
          return acc;
        }, 0) / applicationsWithInterviews.length
      : 0;

    // Get top companies by application count
    const companyStats = applications.reduce((acc, app) => {
      acc[app.company] = (acc[app.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topCompanies = Object.entries(companyStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return { 
      total, 
      applied, 
      interviewing, 
      offers, 
      rejected, 
      withdrawn,
      ghosted,
      responseRate, 
      offerRate, 
      avgTimeToResponse: Math.round(avgTimeToResponse),
      topCompanies 
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/master" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
            ← Back to Master Menu
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Application Tracker</h1>
          <p className="text-gray-600">Track your job applications, interviews, and follow-ups</p>
        </div>

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Track your progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">📞</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.interviewing}</p>
                <p className="text-xs text-gray-500">Active interviews</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">🎉</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Offers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.offers}</p>
                <p className="text-xs text-gray-500">Success rate: {stats.offerRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
                <p className="text-xs text-gray-500">Getting responses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">❌</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                <p className="text-xs text-gray-500">Learn and improve</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <span className="text-2xl">👻</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ghosted</p>
                <p className="text-2xl font-bold text-gray-900">{stats.ghosted}</p>
                <p className="text-xs text-gray-500">No response</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-lg">
                <span className="text-2xl">↩️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Withdrawn</p>
                <p className="text-2xl font-bold text-gray-900">{stats.withdrawn}</p>
                <p className="text-xs text-gray-500">You withdrew</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgTimeToResponse}</p>
                <p className="text-xs text-gray-500">Days to first contact</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ✨ Add Application
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setView('dashboard')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    view === 'dashboard' 
                      ? 'bg-blue-100 text-blue-700 shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    view === 'list' 
                      ? 'bg-blue-100 text-blue-700 shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📋 List View
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    view === 'calendar' 
                      ? 'bg-blue-100 text-blue-700 shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📅 Calendar
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">📊 All Status</option>
                <option value="applied">📤 Applied</option>
                <option value="interview">📞 Interview</option>
                <option value="offer">🎉 Offer</option>
                <option value="rejected">❌ Rejected</option>
                <option value="withdrawn">↩️ Withdrawn</option>
                <option value="ghosted">👻 Ghosted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Analytics Insights */}
        {stats.total > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Analytics Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Rate:</span>
                    <span className="font-semibold text-green-600">{stats.responseRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Offer Rate:</span>
                    <span className="font-semibold text-blue-600">{stats.offerRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Response Time:</span>
                    <span className="font-semibold text-purple-600">{stats.avgTimeToResponse} days</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Top Companies</h4>
                <div className="space-y-2">
                  {stats.topCompanies.map(([company, count]) => (
                    <div key={company} className="flex justify-between items-center">
                      <span className="text-gray-600 truncate">{company}</span>
                      <span className="font-semibold text-gray-900">{count} applications</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {applications.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  const needsFollowUp = applications.filter(app => 
                    app.status === 'applied' && 
                    new Date(app.appliedDate).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000
                  );
                  if (needsFollowUp.length > 0) {
                    alert(`${needsFollowUp.length} applications need follow-up!`);
                  } else {
                    alert('All applications are up to date!');
                  }
                }}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 text-left"
              >
                <div className="text-2xl mb-2">📧</div>
                <div className="font-medium text-gray-900">Check Follow-ups</div>
                <div className="text-sm text-gray-600">Find applications that need attention</div>
              </button>
              
              <button
                onClick={() => {
                  const recent = applications.filter(app => 
                    new Date(app.appliedDate).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
                  );
                  alert(`${recent.length} applications submitted this week`);
                }}
                className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-300 text-left"
              >
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium text-gray-900">Weekly Summary</div>
                <div className="text-sm text-gray-600">See your recent activity</div>
              </button>
              
              <button
                onClick={() => {
                  const interviews = applications.filter(app => app.interviews.length > 0);
                  const upcoming = interviews.filter(app => 
                    app.interviews.some(interview => 
                      new Date(interview.date).getTime() > Date.now()
                    )
                  );
                  alert(`${upcoming.length} interviews coming up`);
                }}
                className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300 text-left"
              >
                <div className="text-2xl mb-2">📅</div>
                <div className="font-medium text-gray-900">Upcoming Interviews</div>
                <div className="text-sm text-gray-600">Check your schedule</div>
              </button>
              
              <button
                onClick={() => {
                  const data = applications.map(app => ({
                    company: app.company,
                    position: app.position,
                    status: app.status,
                    appliedDate: app.appliedDate,
                    salary: app.salary
                  }));
                  const csv = [
                    ['Company', 'Position', 'Status', 'Applied Date', 'Salary'],
                    ...data.map(row => [row.company, row.position, row.status, row.appliedDate, row.salary || ''])
                  ].map(row => row.join(',')).join('\n');
                  
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'job-applications.csv';
                  a.click();
                  window.URL.revokeObjectURL(url);
                }}
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 text-left"
              >
                <div className="text-2xl mb-2">📥</div>
                <div className="font-medium text-gray-900">Export Data</div>
                <div className="text-sm text-gray-600">Download as CSV</div>
              </button>
            </div>
          </div>
        )}

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Applications</h2>
            {filteredApplications.length > 0 && (
              <div className="text-sm text-gray-500">
                Showing {filteredApplications.length} of {applications.length} applications
              </div>
            )}
          </div>
          
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filterStatus !== 'all' ? 'No matching applications' : 'No applications yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start tracking your job search by adding your first application'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                >
                  ✨ Add Your First Application
                </button>
                {(searchTerm || filterStatus !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                    }}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-300"
                  >
                    🔄 Clear Filters
                  </button>
                )}
              </div>
              
              {!searchTerm && filterStatus === 'all' && (
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">💡 Pro Tips for Job Search</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="text-left">
                      <p className="font-medium mb-2">📊 Track Everything</p>
                      <p>Log every application, even the ones you think won&apos;t work out. Data helps you improve.</p>
                    </div>
                    <div className="text-left">
                      <p className="font-medium mb-2">📞 Follow Up</p>
                      <p>Set reminders to follow up on applications. Persistence often pays off.</p>
                    </div>
                    <div className="text-left">
                      <p className="font-medium mb-2">📈 Analyze Patterns</p>
                      <p>Use the analytics to see which companies and roles get the best response rates.</p>
                    </div>
                    <div className="text-left">
                      <p className="font-medium mb-2">🎯 Stay Organized</p>
                      <p>Keep detailed notes about each application to prepare for interviews.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onUpdate={updateApplication}
                  onDelete={deleteApplication}
                  onSelect={setSelectedApplication}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add Application Modal */}
        {showAddForm && (
          <AddApplicationModal
            onClose={() => setShowAddForm(false)}
            onAdd={addApplication}
          />
        )}

        {/* Application Detail Modal */}
        {selectedApplication && (
          <ApplicationDetailModal
            application={selectedApplication}
            onClose={() => setSelectedApplication(null)}
            onUpdate={updateApplication}
            onDelete={deleteApplication}
          />
        )}
      </div>
    </div>
  );
}

// Application Card Component
function ApplicationCard({ 
  application, 
  onUpdate, 
  onDelete, 
  onSelect 
}: { 
  application: JobApplication; 
  onUpdate: (id: string, updates: Partial<JobApplication>) => void;
  onDelete: (id: string) => void;
  onSelect: (application: JobApplication) => void;
}) {
  const [showActions, setShowActions] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return '📤';
      case 'interview': return '📞';
      case 'offer': return '🎉';
      case 'rejected': return '❌';
      case 'withdrawn': return '↩️';
      case 'ghosted': return '👻';
      default: return '📝';
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 relative bg-white hover:bg-gray-50">
      {/* Header with company logo placeholder and actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
              {application.company.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{application.position}</h3>
              <p className="text-gray-600 text-sm">{application.company}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 flex items-center">
            📍 {application.location}
          </p>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ⚙️
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
              <button
                onClick={() => onSelect(application)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center"
              >
                👁️ View Details
              </button>
              <button
                onClick={() => onUpdate(application.id, { status: 'interview' as const })}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center"
              >
                📞 Mark Interview
              </button>
              <button
                onClick={() => onUpdate(application.id, { status: 'rejected' as const })}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center"
              >
                ❌ Mark Rejected
              </button>
              <button
                onClick={() => onDelete(application.id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600 flex items-center"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status and Priority Badges */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
          {getStatusIcon(application.status)} {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
        
        {application.priority && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[application.priority]}`}>
            {application.priority.charAt(0).toUpperCase() + application.priority.slice(1)} Priority
          </span>
        )}
      </div>

      {/* Key Information */}
      <div className="space-y-3 mb-4">
        <div className="text-sm text-gray-500 flex items-center">
          📅 Applied: {new Date(application.appliedDate).toLocaleDateString()}
        </div>

        {application.salary && (
          <div className="text-sm text-gray-600 flex items-center">
            💰 {application.salary}
          </div>
        )}

        {application.referral && (
          <div className="text-sm text-gray-600 flex items-center">
            👥 Referral: {application.referral}
          </div>
        )}

        {/* Days since applied */}
        <div className="text-sm text-gray-500">
          {(() => {
            const daysSinceApplied = Math.floor((Date.now() - new Date(application.appliedDate).getTime()) / (1000 * 60 * 60 * 24));
            return `⏱️ ${daysSinceApplied} day${daysSinceApplied !== 1 ? 's' : ''} ago`;
          })()}
        </div>
      </div>

      {/* Notes Preview */}
      {application.notes && (
        <div className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="font-medium mb-1">📝 Notes:</div>
          <div className="line-clamp-2">{application.notes}</div>
        </div>
      )}

      {/* Activity Summary */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          {application.interviews.length > 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
              📞 {application.interviews.length} Interview{application.interviews.length > 1 ? 's' : ''}
            </span>
          )}
          {application.followUps.length > 0 && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
              📧 {application.followUps.length} Follow-up{application.followUps.length > 1 ? 's' : ''}
            </span>
          )}
          {application.resumeVersion && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center">
              📄 {application.resumeVersion}
            </span>
          )}
        </div>
        
        <button
          onClick={() => onSelect(application)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          View Details →
        </button>
      </div>

      {/* Progress indicator for interview stages */}
      {application.interviews.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-2">Interview Progress:</div>
          <div className="flex space-x-1">
            {application.interviews.map((interview) => (
              <div
                key={interview.id}
                className={`w-3 h-3 rounded-full ${
                  interview.status === 'completed' ? 'bg-green-500' :
                  interview.status === 'scheduled' ? 'bg-yellow-500' :
                  'bg-gray-300'
                }`}
                title={`${interview.type} interview - ${interview.status}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Add Application Modal Component
function AddApplicationModal({ onClose, onAdd }: { onClose: () => void; onAdd: (application: Omit<JobApplication, 'id' | 'lastUpdated'>) => void }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'applied' as JobApplication['status'],
    appliedDate: new Date().toISOString().split('T')[0],
    jobUrl: '',
    companyUrl: '',
    jobDescription: '',
    notes: '',
    priority: 'medium' as JobApplication['priority'],
    tags: [] as string[],
    resumeVersion: '',
    coverLetterVersion: '',
    referral: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      interviews: [],
      followUps: []
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Application</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Job title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State or Remote"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="$50,000 - $70,000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as JobApplication['status'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
                <option value="ghosted">Ghosted</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as JobApplication['priority'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date</label>
              <input
                type="date"
                value={formData.appliedDate}
                onChange={(e) => setFormData(prev => ({ ...prev, appliedDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job URL</label>
              <input
                type="url"
                value={formData.jobUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, jobUrl: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any notes about this application..."
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Application Detail Modal Component
function ApplicationDetailModal({ 
  application, 
  onClose, 
  onUpdate, 
  onDelete 
}: { 
  application: JobApplication; 
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<JobApplication>) => void;
  onDelete: (id: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<'details' | 'interviews' | 'followups'>('details');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(application);

  const handleSave = () => {
    onUpdate(application.id, formData);
    setEditing(false);
  };

  const addInterview = () => {
    const newInterview: Interview = {
      id: Date.now().toString(),
      type: 'phone',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      status: 'scheduled',
      notes: ''
    };
    onUpdate(application.id, {
      interviews: [...application.interviews, newInterview]
    });
  };

  const addFollowUp = () => {
    const newFollowUp: FollowUp = {
      id: Date.now().toString(),
      type: 'email',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    };
    onUpdate(application.id, {
      followUps: [...application.followUps, newFollowUp]
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{application.position}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditing(!editing)}
                className="px-4 py-2 text-blue-600 hover:text-blue-800"
              >
                {editing ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={() => onDelete(application.id)}
                className="px-4 py-2 text-red-600 hover:text-red-800"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 px-1 ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`pb-2 px-1 ${activeTab === 'interviews' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            >
              Interviews ({application.interviews.length})
            </button>
            <button
              onClick={() => setActiveTab('followups')}
              className={`pb-2 px-1 ${activeTab === 'followups' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            >
              Follow-ups ({application.followUps.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as JobApplication['status'] }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                      <option value="withdrawn">Withdrawn</option>
                      <option value="ghosted">Ghosted</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as JobApplication['priority'] }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Company:</span>
                        <p className="text-gray-900">{application.company}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Position:</span>
                        <p className="text-gray-900">{application.position}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Location:</span>
                        <p className="text-gray-900">{application.location}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Applied Date:</span>
                        <p className="text-gray-900">{new Date(application.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </div>
                      {application.salary && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Salary:</span>
                          <p className="text-gray-900">{application.salary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Info</h3>
                    <div className="space-y-3">
                      {application.jobUrl && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Job URL:</span>
                          <a href={application.jobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 block">
                            View Job Posting
                          </a>
                        </div>
                      )}
                      {application.notes && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Notes:</span>
                          <p className="text-gray-900 mt-1">{application.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'interviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Interviews</h3>
                <button
                  onClick={addInterview}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  + Add Interview
                </button>
              </div>
              
              {application.interviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No interviews scheduled yet.</p>
              ) : (
                <div className="space-y-4">
                  {application.interviews.map((interview) => (
                    <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900 capitalize">{interview.type} Interview</h4>
                          <p className="text-sm text-gray-600">{interview.date} at {interview.time}</p>
                          {interview.interviewer && (
                            <p className="text-sm text-gray-600">Interviewer: {interview.interviewer}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          interview.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          interview.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {interview.status}
                        </span>
                      </div>
                      {interview.notes && (
                        <p className="text-sm text-gray-600 mt-2">{interview.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'followups' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Follow-ups</h3>
                <button
                  onClick={addFollowUp}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  + Add Follow-up
                </button>
              </div>
              
              {application.followUps.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No follow-ups recorded yet.</p>
              ) : (
                <div className="space-y-4">
                  {application.followUps.map((followUp) => (
                    <div key={followUp.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900 capitalize">{followUp.type} Follow-up</h4>
                          <p className="text-sm text-gray-600">{followUp.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{followUp.notes}</p>
                      {followUp.response && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <p className="text-sm text-gray-700"><strong>Response:</strong> {followUp.response}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 