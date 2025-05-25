
import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { JobManagement } from "@/components/dashboard/JobManagement";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { CategoryManagement } from "@/components/dashboard/CategoryManagement";
import { WebsiteSettings } from "@/components/dashboard/WebsiteSettings";
import { PageSeoSettings } from "@/components/dashboard/PageSeoSettings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "jobs":
        return <JobManagement />;
      case "users":
        return <UserManagement />;
      case "categories":
        return <CategoryManagement />;
      case "website":
        return <WebsiteSettings />;
      case "seo":
        return <PageSeoSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <DashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <DashboardHeader 
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <main className="p-6">
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
