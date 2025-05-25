
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Save, 
  Search, 
  FileText,
  Tags,
  Link,
  Image,
  Code
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pages = [
  { value: "home", label: "Home Page" },
  { value: "jobs", label: "Jobs Page" },
  { value: "categories", label: "Categories Page" },
  { value: "contact", label: "Contact Page" },
  { value: "about", label: "About Page" },
];

export const PageSeoSettings = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [pageData, setPageData] = useState({
    title: "Find Your Dream Job - HarPalJob",
    description: "Discover thousands of job opportunities from top companies worldwide. Start your career journey today with HarPalJob.",
    keywords: "jobs, careers, employment, job search, hiring",
    ogTitle: "HarPalJob - Your Career Success Partner",
    ogDescription: "Join thousands of professionals who found their dream jobs through HarPalJob. Explore opportunities across all industries.",
    ogImageUrl: "https://harpaljob.com/images/home-og.jpg",
    canonicalUrl: "https://harpaljob.com/",
    schema: `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "HarPalJob",
  "url": "https://harpaljob.com",
  "description": "Premier job board for career opportunities"
}`,
  });

  const handleInputChange = (field: string, value: string) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (page: string) => {
    setSelectedPage(page);
    // Here you would typically fetch the SEO data for the selected page
    console.log("Loading SEO data for page:", page);
  };

  const handleSave = () => {
    console.log("Saving SEO data for page:", selectedPage, pageData);
    // Here you would typically send the data to your API
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Page SEO Management</h1>
        <Button onClick={handleSave} className="hover-scale animate-fade-in">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Select Page
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedPage} onValueChange={handlePageChange}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select a page to edit" />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.value} value={page.value}>
                  {page.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Basic SEO Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Page Title
              </Label>
              <Input
                id="title"
                value={pageData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter page title"
              />
              <p className="text-sm text-gray-500">Recommended: 50-60 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Meta Description
              </Label>
              <Textarea
                id="description"
                value={pageData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter meta description"
                rows={3}
              />
              <p className="text-sm text-gray-500">Recommended: 150-160 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords" className="flex items-center">
                <Tags className="w-4 h-4 mr-2" />
                Keywords
              </Label>
              <Textarea
                id="keywords"
                value={pageData.keywords}
                onChange={(e) => handleInputChange("keywords", e.target.value)}
                placeholder="Enter keywords separated by commas"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="canonicalUrl" className="flex items-center">
                <Link className="w-4 h-4 mr-2" />
                Canonical URL
              </Label>
              <Input
                id="canonicalUrl"
                value={pageData.canonicalUrl}
                onChange={(e) => handleInputChange("canonicalUrl", e.target.value)}
                placeholder="Enter canonical URL"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image className="w-5 h-5 mr-2" />
              Open Graph Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ogTitle" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                OG Title
              </Label>
              <Input
                id="ogTitle"
                value={pageData.ogTitle}
                onChange={(e) => handleInputChange("ogTitle", e.target.value)}
                placeholder="Enter Open Graph title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogDescription" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                OG Description
              </Label>
              <Textarea
                id="ogDescription"
                value={pageData.ogDescription}
                onChange={(e) => handleInputChange("ogDescription", e.target.value)}
                placeholder="Enter Open Graph description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImageUrl" className="flex items-center">
                <Image className="w-4 h-4 mr-2" />
                OG Image URL
              </Label>
              <Input
                id="ogImageUrl"
                value={pageData.ogImageUrl}
                onChange={(e) => handleInputChange("ogImageUrl", e.target.value)}
                placeholder="Enter Open Graph image URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schema" className="flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Structured Data (Schema)
              </Label>
              <Textarea
                id="schema"
                value={pageData.schema}
                onChange={(e) => handleInputChange("schema", e.target.value)}
                placeholder="Enter JSON-LD structured data"
                rows={6}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            SEO Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg text-blue-600 hover:underline cursor-pointer">
                {pageData.title}
              </h3>
              <div className="text-green-700 text-sm">{pageData.canonicalUrl}</div>
              <p className="text-gray-600 text-sm mt-1">{pageData.description}</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="text-sm text-gray-500 mb-2">Social Media Preview</div>
              <div className="border rounded bg-white p-3">
                {pageData.ogImageUrl && (
                  <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Image Preview</span>
                  </div>
                )}
                <h4 className="font-semibold text-gray-900">{pageData.ogTitle}</h4>
                <p className="text-gray-600 text-sm mt-1">{pageData.ogDescription}</p>
                <div className="text-xs text-gray-500 mt-2">harpaljob.com</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
