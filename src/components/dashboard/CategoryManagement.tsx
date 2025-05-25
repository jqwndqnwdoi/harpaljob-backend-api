
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FolderOpen,
  Loader2,
  Save,
  X
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
import { categoryApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', iconUrl: '' });
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        name: selectedCategory.name || '',
        iconUrl: selectedCategory.iconUrl || ''
      });
    } else {
      setFormData({ name: '', iconUrl: '' });
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryApi.getAll();
      setCategories(response.data || response);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      setFormLoading(true);
      
      if (selectedCategory) {
        await categoryApi.update(selectedCategory.id, formData);
        toast({
          title: "Success",
          description: "Category updated successfully"
        });
      } else {
        await categoryApi.create(formData);
        toast({
          title: "Success",
          description: "Category created successfully"
        });
      }
      
      await fetchCategories();
      setIsSheetOpen(false);
      setSelectedCategory(null);
      setFormData({ name: '', iconUrl: '' });
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await categoryApi.delete(categoryId);
      await fetchCategories();
      toast({
        title: "Success",
        description: "Category deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive"
      });
    }
  };

  const filteredCategories = categories.filter((category: any) =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              className="hover-scale animate-fade-in"
              onClick={() => setSelectedCategory(null)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Category
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{selectedCategory ? 'Edit Category' : 'Create New Category'}</SheetTitle>
              <SheetDescription>
                {selectedCategory ? 'Update category details' : 'Fill in the details to create a new category'}
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Technology"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="iconUrl">Icon URL</Label>
                <Input
                  id="iconUrl"
                  value={formData.iconUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, iconUrl: e.target.value }))}
                  placeholder="https://example.com/icon.svg"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsSheetOpen(false);
                    setSelectedCategory(null);
                    setFormData({ name: '', iconUrl: '' });
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {selectedCategory ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Categories ({filteredCategories.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" onClick={fetchCategories}>
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
                  <TableHead>Category</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Jobs Count</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category: any, index) => (
                  <TableRow key={category.id} className="animate-fade-in hover:bg-gray-50" style={{ animationDelay: `${index * 100}ms` }}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FolderOpen className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {category.iconUrl ? (
                        <img src={category.iconUrl} alt={category.name} className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-gray-400">No icon</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {category.jobCount || 0} jobs
                    </TableCell>
                    <TableCell>
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover-scale"
                          onClick={() => {
                            setSelectedCategory(category);
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
                                This action cannot be undone. This will permanently delete the category.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>
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
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No categories found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
