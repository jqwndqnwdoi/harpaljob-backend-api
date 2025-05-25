
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Loader2, Search, Globe } from "lucide-react";
import { pageSeoApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const PAGE_OPTIONS = [
  { value: 'home', label: 'Home Page' },
  { value: 'jobs', label: 'Jobs Page' },
  { value: 'categories', label: 'Categories Page' },
  { value: 'contact', label: 'Contact Page' },
  { value: 'about', label: 'About Page' }
];

export const PageSeoSettings = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImageUrl: '',
    canonicalUrl: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (selectedPage) {
      fetchPageSeo(selectedPage);
    }
  }, [selectedPage]);

  const fetchPageSeo = async (pageName: string) => {
    try {
      setLoading(true);
      const response = await pageSeoApi.get(pageName);
      const seoData = response.data || response;
      setFormData({
        title: seoData.title || '',
        description: seoData.description || '',
        keywords: seoData.keywords || '',
        ogTitle: seoData.ogTitle || '',
        ogDescription: seoData.ogDescription || '',
        ogImageUrl: seoData.ogImageUrl || '',
        canonicalUrl: seoData.canonicalUrl || ''
      });
    } catch (error) {
      console.error('Error fetching page SEO:', error);
      // If page SEO doesn't exist, set empty form
      setFormData({
        title: '',
        description: '',
        keywords: '',
        ogTitle: '',
        ogDescription: '',
        ogImageUrl: '',
        canonicalUrl: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Title and description are required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSaving(true);
      await pageSeoApi.update(selectedPage, formData);
      toast({
        title: "Success",
        description: `SEO settings for ${selectedPage} page updated successfully`
      });
    } catch (error) {
      console.error('Error updating page SEO:', error);
      toast({
        title: "Error",
        description: "Failed to update page SEO settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-gray-900">Page SEO Management</h1>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Select Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="page-select">Choose a page to manage SEO settings</Label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_OPTIONS.map((page) => (
                  <SelectItem key={page.value} value={page.value}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>SEO Settings for {PAGE_OPTIONS.find(p => p.value === selectedPage)?.label}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter SEO optimized page title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Meta Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter meta description for search engines"
                  rows={3}
                  required
                />
                <p className="text-xs text-gray-500">Recommended length: 150-160 characters</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Textarea
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="Enter comma-separated keywords"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  type="url"
                  value={formData.canonicalUrl}
                  onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                  placeholder="https://harpaljob.com/page-url"
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
                  placeholder="Title for social media sharing"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ogDescription">Open Graph Description</Label>
                <Textarea
                  id="ogDescription"
                  value={formData.ogDescription}
                  onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                  placeholder="Description for social media sharing"
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
              Save SEO Settings
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
