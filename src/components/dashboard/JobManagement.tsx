
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Building,
  Calendar,
  Star,
  Loader2
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { JobForm } from "@/components/forms/JobForm";
import { jobApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export const JobManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobApi.getAll();
      setJobs(response.data || response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (jobData: any) => {
    try {
      setFormLoading(true);
      await jobApi.create(jobData);
      await fetchJobs();
      setIsSheetOpen(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateJob = async (jobData: any) => {
    if (!selectedJob?.id) return;
    
    try {
      setFormLoading(true);
      await jobApi.update(selectedJob.id, jobData);
      await fetchJobs();
      setIsSheetOpen(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await jobApi.delete(jobId);
      await fetchJobs();
      toast({
        title: "Success",
        description: "Job deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive"
      });
    }
  };

  const filteredJobs = jobs.filter((job: any) =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time": return "bg-blue-100 text-blue-800";
      case "part-time": return "bg-purple-100 text-purple-800";
      case "contract": return "bg-orange-100 text-orange-800";
      case "internship": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              className="hover-scale animate-fade-in"
              onClick={() => setSelectedJob(null)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Job
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-4xl max-h-screen overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{selectedJob ? 'Edit Job' : 'Create New Job'}</SheetTitle>
              <SheetDescription>
                {selectedJob ? 'Update job posting details' : 'Fill in the details to create a new job posting'}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <JobForm
                job={selectedJob}
                onSubmit={selectedJob ? handleUpdateJob : handleCreateJob}
                onCancel={() => {
                  setIsSheetOpen(false);
                  setSelectedJob(null);
                }}
                isLoading={formLoading}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Job Postings ({filteredJobs.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" onClick={fetchJobs}>
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job: any, index) => (
                  <TableRow key={job.id} className="animate-fade-in hover:bg-gray-50" style={{ animationDelay: `${index * 100}ms` }}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {job.isFeatured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        <span className="font-medium">{job.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        {job.employer?.companyName || job.company || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {job.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(job.jobType)}>
                        {job.jobType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-2 text-gray-400" />
                        {job.views || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover-scale"
                          onClick={() => {
                            setSelectedJob(job);
                            setIsSheetOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover-scale text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the job posting.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteJob(job.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No jobs found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
