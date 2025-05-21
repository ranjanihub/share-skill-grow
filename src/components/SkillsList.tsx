
import React, { useState } from 'react';
import { SkillCardEnhanced, EnhancedSkill } from './SkillCardEnhanced';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface SkillsListProps {
  skills: EnhancedSkill[];
  title?: string;
  showFilters?: boolean;
}

export const SkillsList = ({ skills: initialSkills, title = "Skills", showFilters = true }: SkillsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [skills] = useState<EnhancedSkill[]>(initialSkills);

  // Extract unique categories
  const categories = ['All Categories', ...new Set(skills.map(skill => skill.category))];
  
  // Filter skills based on search term, category, and type
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || skill.category === selectedCategory;
    const matchesType = selectedType === 'All Types' || 
                        (selectedType === 'Offered' && skill.type === 'offered') ||
                        (selectedType === 'Wanted' && skill.type === 'wanted');
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleConnect = (skillId: string) => {
    // In a real app, this would send a request to the API
    console.log(`Connecting to skill ID: ${skillId}`);
    toast.success("Connection request sent! You'll be notified when they respond.");
  };

  return (
    <div className="container mx-auto py-6">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}

      {/* Search and filters */}
      {showFilters && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Offered">Offered</SelectItem>
                  <SelectItem value="Wanted">Wanted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters */}
          {(selectedCategory !== 'All Categories' || selectedType !== 'All Types' || searchTerm) && (
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-wrap gap-2 items-center">
                {searchTerm && (
                  <Badge variant="outline" className="px-3 py-1">
                    Search: {searchTerm}
                  </Badge>
                )}
                {selectedCategory !== 'All Categories' && (
                  <Badge className="bg-skillswap-primary px-3 py-1">
                    {selectedCategory}
                  </Badge>
                )}
                {selectedType !== 'All Types' && (
                  <Badge className="bg-skillswap-secondary px-3 py-1">
                    {selectedType}
                  </Badge>
                )}
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedType('All Types');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">
            {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'} found
          </h3>
        </div>
        
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map(skill => (
              <SkillCardEnhanced 
                key={skill.id} 
                skill={skill} 
                onConnect={handleConnect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <p className="text-xl text-gray-600">No skills match your search criteria.</p>
            {showFilters && (
              <Button 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedType('All Types');
                }}
              >
                Reset Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
