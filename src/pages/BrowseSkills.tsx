
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { SkillCard, Skill } from '@/components/SkillCard';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Mock data for skills
const mockSkills: Skill[] = [
  {
    id: '1',
    title: 'Python Programming',
    description: 'Learn Python for data science and automation. I can teach you from the basics to advanced topics like machine learning.',
    category: 'Programming',
    level: 'Intermediate',
    user: { id: 'u1', name: 'Alex Chen', avatar: undefined },
    skillsWanted: ['Graphic Design', 'Spanish Language', 'Guitar']
  },
  {
    id: '2',
    title: 'Digital Illustration',
    description: 'I can teach you how to create beautiful digital illustrations using Procreate, Illustrator or Photoshop.',
    category: 'Design',
    level: 'Advanced',
    user: { id: 'u2', name: 'Maya Johnson', avatar: undefined },
    skillsWanted: ['Web Development', 'Public Speaking', 'Photography']
  },
  {
    id: '3',
    title: 'Financial Planning',
    description: 'Learn how to manage your personal finances, build a budget, invest wisely and plan for your future.',
    category: 'Finance',
    level: 'Beginner',
    user: { id: 'u3', name: 'Carlos Rodriguez', avatar: undefined },
    skillsWanted: ['Cooking', 'Yoga', 'Mobile App Development']
  },
  {
    id: '4',
    title: 'Spanish Language',
    description: 'Native Spanish speaker offering conversation practice and grammar lessons for beginners to intermediate learners.',
    category: 'Languages',
    level: 'Advanced',
    user: { id: 'u4', name: 'Elena Garcia', avatar: undefined },
    skillsWanted: ['Photography', 'Yoga', 'Web Development']
  },
  {
    id: '5',
    title: 'Guitar Lessons',
    description: 'Learn acoustic or electric guitar from a player with 10+ years of experience. Focus on chords, theory, or songwriting.',
    category: 'Music',
    level: 'Beginner',
    user: { id: 'u5', name: 'David Kim', avatar: undefined },
    skillsWanted: ['Digital Marketing', 'Cooking', 'Graphic Design']
  },
  {
    id: '6',
    title: 'Yoga and Meditation',
    description: 'Certified yoga instructor offering personalized sessions for stress relief, flexibility and mindfulness techniques.',
    category: 'Fitness',
    level: 'Intermediate',
    user: { id: 'u6', name: 'Sarah Johnson', avatar: undefined },
    skillsWanted: ['Photography', 'Web Development', 'Spanish Language']
  },
  {
    id: '7',
    title: 'Photography Basics',
    description: 'Professional photographer teaching composition, lighting and editing skills for beginners. DSLR or smartphone.',
    category: 'Photography',
    level: 'Beginner',
    user: { id: 'u7', name: 'Michael Lee', avatar: undefined },
    skillsWanted: ['Cooking', 'Yoga', 'French Language']
  },
  {
    id: '8',
    title: 'Italian Cooking',
    description: 'Learn authentic Italian recipes from a home cook with Italian heritage. Pasta, sauces, and traditional dishes.',
    category: 'Cooking',
    level: 'Intermediate',
    user: { id: 'u8', name: 'Sophia Romano', avatar: undefined },
    skillsWanted: ['Web Development', 'Photography', 'Guitar']
  },
  {
    id: '9',
    title: 'React Development',
    description: 'Frontend developer with 5 years experience teaching React, Redux, and modern JavaScript practices.',
    category: 'Programming',
    level: 'Advanced',
    user: { id: 'u9', name: 'Tyler Nguyen', avatar: undefined },
    skillsWanted: ['Cooking', 'Photography', 'Spanish Language']
  }
];

const categories = ['All Categories', 'Programming', 'Design', 'Music', 'Languages', 'Cooking', 'Fitness', 'Photography', 'Finance'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

const BrowseSkills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [skills, setSkills] = useState<Skill[]>(mockSkills);

  // Filter skills based on search term, category, and level
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || skill.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || skill.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleRequestSwap = (skillId: string) => {
    // In a real app, this would send a request to the API
    console.log(`Requesting swap for skill ID: ${skillId}`);
    toast.success("Swap request sent! You'll be notified when they respond.");
  };

  return (
    <Layout>
      <Hero 
        title="Find Skills to Learn" 
        subtitle="Browse through skills offered by our community members and find your perfect match."
        backgroundClass="bg-skillswap-dark"
        ctaText={undefined}
        secondaryCtaText={undefined}
      />

      {/* Search and filters */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
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
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'} found
              {selectedCategory !== 'All Categories' && (
                <Badge className="ml-2 bg-skillswap-primary">{selectedCategory}</Badge>
              )}
              {selectedLevel !== 'All Levels' && (
                <Badge className="ml-2 bg-skillswap-secondary">{selectedLevel}</Badge>
              )}
            </h2>
            
            {(selectedCategory !== 'All Categories' || selectedLevel !== 'All Levels' || searchTerm) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedLevel('All Levels');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          {filteredSkills.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map(skill => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  onRequestSwap={handleRequestSwap}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No skills match your search criteria.</p>
              <Button 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedLevel('All Levels');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BrowseSkills;
