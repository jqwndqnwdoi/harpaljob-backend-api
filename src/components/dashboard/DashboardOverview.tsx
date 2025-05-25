
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Eye,
  Calendar,
  MapPin,
  Building
} from "lucide-react";

const statsCards = [
  {
    title: "Total Jobs",
    value: "1,234",
    change: "+12%",
    icon: Briefcase,
    color: "blue",
  },
  {
    title: "Active Users",
    value: "856",
    change: "+8%",
    icon: Users,
    color: "green",
  },
  {
    title: "Total Views",
    value: "45,678",
    change: "+23%",
    icon: Eye,
    color: "purple",
  },
  {
    title: "Featured Jobs",
    value: "89",
    change: "+5%",
    icon: TrendingUp,
    color: "orange",
  },
];

const recentJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    location: "New York, NY",
    type: "Full-time",
    posted: "2 hours ago",
    views: 245
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignStudio",
    location: "San Francisco, CA",
    type: "Part-time",
    posted: "5 hours ago",
    views: 189
  },
  {
    id: 3,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "Contract",
    posted: "1 day ago",
    views: 156
  },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <Card key={card.title} className="hover-scale animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <card.icon className={`w-5 h-5 text-${card.color}-600`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="flex items-center mt-1">
                <Badge variant="secondary" className={`text-${card.color}-600 bg-${card.color}-50`}>
                  {card.change}
                </Badge>
                <span className="text-xs text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Job Postings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job, index) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-fade-in" style={{ animationDelay: `${500 + index * 100}ms` }}>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{job.type}</Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      {job.views} views • {job.posted}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left hover-scale">
                <Briefcase className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm font-medium text-blue-900">Add New Job</div>
                <div className="text-xs text-blue-600">Create job posting</div>
              </button>
              <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left hover-scale">
                <Users className="w-6 h-6 text-green-600 mb-2" />
                <div className="text-sm font-medium text-green-900">Manage Users</div>
                <div className="text-xs text-green-600">View all users</div>
              </button>
              <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left hover-scale">
                <Eye className="w-6 h-6 text-purple-600 mb-2" />
                <div className="text-sm font-medium text-purple-900">Analytics</div>
                <div className="text-xs text-purple-600">View reports</div>
              </button>
              <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left hover-scale">
                <TrendingUp className="w-6 h-6 text-orange-600 mb-2" />
                <div className="text-sm font-medium text-orange-900">Featured Jobs</div>
                <div className="text-xs text-orange-600">Promote listings</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
