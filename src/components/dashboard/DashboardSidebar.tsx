
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FolderOpen, 
  Settings, 
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "jobs", label: "Job Management", icon: Briefcase },
  { id: "users", label: "User Management", icon: Users },
  { id: "categories", label: "Categories", icon: FolderOpen },
  { id: "website", label: "Website Settings", icon: Settings },
  { id: "seo", label: "SEO Management", icon: Search },
];

export const DashboardSidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }: DashboardSidebarProps) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-gray-800 animate-fade-in">
            HarPalJob Admin
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-blue-50 hover:border-r-2 hover:border-blue-500 group",
              activeTab === item.id 
                ? "bg-blue-50 border-r-2 border-blue-500 text-blue-700" 
                : "text-gray-600 hover:text-blue-700"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
              activeTab === item.id ? "text-blue-700" : "text-gray-500"
            )} />
            {!collapsed && (
              <span className="ml-3 font-medium animate-fade-in">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
