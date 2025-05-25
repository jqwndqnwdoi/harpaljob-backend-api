
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Save, 
  Globe, 
  Image,
  FileText,
  Tags,
  Eye
} from "lucide-react";

export const WebsiteSettings = () => {
  const [settings, setSettings] = useState({
    siteTitle: "HarPalJob - Find Your Dream Job",
    siteDescription: "The premier job board connecting talented professionals with amazing opportunities across all industries.",
    siteKeywords: "jobs, careers, employment, hiring, recruitment, job search",
    ogTitle: "HarPalJob - Your Gateway to Career Success",
    ogDescription: "Discover thousands of job opportunities from top companies. Find your perfect match today!",
    ogImageUrl: "https://harpaljob.com/og-image.jpg",
  });

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving website settings:", settings);
    // Here you would typically send the data to your API
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
        <Button onClick={handleSave} className="hover-scale animate-fade-in">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Basic SEO Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteTitle" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Site Title
              </Label>
              <Input
                id="siteTitle"
                value={settings.siteTitle}
                onChange={(e) => handleInputChange("siteTitle", e.target.value)}
                placeholder="Enter site title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Site Description
              </Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                placeholder="Enter site description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteKeywords" className="flex items-center">
                <Tags className="w-4 h-4 mr-2" />
                Site Keywords
              </Label>
              <Textarea
                id="siteKeywords"
                value={settings.siteKeywords}
                onChange={(e) => handleInputChange("siteKeywords", e.target.value)}
                placeholder="Enter keywords separated by commas"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
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
                value={settings.ogTitle}
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
                value={settings.ogDescription}
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
                value={settings.ogImageUrl}
                onChange={(e) => handleInputChange("ogImageUrl", e.target.value)}
                placeholder="Enter Open Graph image URL"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">{settings.ogTitle}</h3>
              <p className="text-gray-600">{settings.ogDescription}</p>
              <div className="text-sm text-gray-500">harpaljob.com</div>
            </div>
            {settings.ogImageUrl && (
              <div className="mt-3">
                <div className="w-full h-32 bg-gray-200 rounded border flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">OG Image Preview</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
