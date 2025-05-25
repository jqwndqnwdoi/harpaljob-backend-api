
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2, Settings, Globe } from "lucide-react";
import { websiteSettingsApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export const WebsiteSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    siteTitle: '',
    siteDescription: '',
    siteKeywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImageUrl: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await websiteSettingsApi.get();
      const settings = response.data || response;
      setFormData({
        siteTitle: settings.siteTitle || '',
        siteDescription: settings.siteDescription || '',
        siteKeywords: settings.siteKeywords || '',
        ogTitle: settings.ogTitle || '',
        ogDescription: settings.ogDescription || '',
        ogImageUrl: settings.ogImageUrl || ''
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch website settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      await websiteSettingsApi.update(formData);
      toast({
        title: "Success",
        description: "Website settings updated successfully"
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update website settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>General SEO Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                value={formData.siteTitle}
                onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                placeholder="HarPalJob - Find Your Dream Job"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={formData.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                placeholder="Find and apply for the best job opportunities in your field..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteKeywords">Site Keywords</Label>
              <Textarea
                id="siteKeywords"
                value={formData.siteKeywords}
                onChange={(e) => handleInputChange('siteKeywords', e.target.value)}
                placeholder="jobs, careers, employment, hiring, job search"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Open Graph / Social Media Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ogTitle">Open Graph Title</Label>
              <Input
                id="ogTitle"
                value={formData.ogTitle}
                onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                placeholder="HarPalJob - Your Career Starts Here"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogDescription">Open Graph Description</Label>
              <Textarea
                id="ogDescription"
                value={formData.ogDescription}
                onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                placeholder="Discover thousands of job opportunities and take the next step in your career..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogImageUrl">Open Graph Image URL</Label>
              <Input
                id="ogImageUrl"
                type="url"
                value={formData.ogImageUrl}
                onChange={(e) => handleInputChange('ogImageUrl', e.target.value)}
                placeholder="https://harpaljob.com/og-image.jpg"
              />
              {formData.ogImageUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.ogImageUrl} 
                    alt="Open Graph Preview" 
                    className="w-64 h-32 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="hover-scale">
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
