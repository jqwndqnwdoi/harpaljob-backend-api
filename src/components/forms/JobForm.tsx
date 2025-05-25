
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TinyEditor } from "@/components/ui/tiny-editor";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobFormProps {
  job?: any;
  onSubmit: (jobData: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const JobForm = ({ job, onSubmit, onCancel, isLoading }: JobFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    experience: '',
    skills: '',
    country: '',
    position: '',
    qualification: '',
    industry: '',
    vacancy: '',
    applyLink: '',
    tags: '',
    applyBefore: '',
    isFeatured: false,
    seoTitle: '',
    seoDescription: ''
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        location: job.location || '',
        salary: job.salary || '',
        jobType: job.jobType || 'full-time',
        experience: job.experience || '',
        skills: job.skills || '',
        country: job.country || '',
        position: job.position || '',
        qualification: job.qualification || '',
        industry: job.industry || '',
        vacancy: job.vacancy || '',
        applyLink: job.applyLink || '',
        tags: job.tags || '',
        applyBefore: job.applyBefore ? job.applyBefore.split('T')[0] : '',
        isFeatured: job.isFeatured || false,
        seoTitle: job.seoTitle || '',
        seoDescription: job.seoDescription || ''
      });
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: job ? "Job updated successfully" : "Job created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save job",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{job ? 'Edit Job' : 'Create New Job'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g. Senior React Developer"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="e.g. Full Stack Developer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Job Description *</Label>
            <TinyEditor
              value={formData.description}
              onChange={(content) => handleInputChange('description', content)}
              placeholder="Describe the job responsibilities, requirements, and benefits..."
              height={300}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g. New York, NY"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="e.g. United States"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="e.g. $80,000 - $120,000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vacancy">Vacancy</Label>
              <Input
                id="vacancy"
                type="number"
                value={formData.vacancy}
                onChange={(e) => handleInputChange('vacancy', e.target.value)}
                placeholder="Number of positions"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="e.g. 3-5 years"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                value={formData.qualification}
                onChange={(e) => handleInputChange('qualification', e.target.value)}
                placeholder="e.g. Bachelor's in Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                placeholder="e.g. Technology"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="applyBefore">Apply Before</Label>
              <Input
                id="applyBefore"
                type="date"
                value={formData.applyBefore}
                onChange={(e) => handleInputChange('applyBefore', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              placeholder="e.g. React, Node.js, TypeScript"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="e.g. remote, senior, startup"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applyLink">Apply Link</Label>
            <Input
              id="applyLink"
              type="url"
              value={formData.applyLink}
              onChange={(e) => handleInputChange('applyLink', e.target.value)}
              placeholder="https://company.com/apply"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">SEO Settings</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="SEO optimized title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Input
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  placeholder="SEO meta description"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="isFeatured">Featured Job</Label>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {job ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
