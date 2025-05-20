
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillCard, Skill } from '@/components/SkillCard';
import { MatchRequestCard, MatchRequest } from '@/components/MatchRequestCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data
const mySkills: Skill[] = [
  {
    id: '100',
    title: 'Web Development',
    description: 'HTML, CSS, JavaScript and React. I can help you build responsive websites and web applications.',
    category: 'Programming',
    level: 'Advanced',
    user: { id: 'current-user', name: 'Current User', avatar: undefined },
    skillsWanted: ['Cooking', 'Photography', 'Spanish Language']
  },
  {
    id: '101',
    title: 'Digital Marketing',
    description: 'Social media marketing, SEO, content marketing, and analytics. I can help you market your business online.',
    category: 'Marketing',
    level: 'Intermediate',
    user: { id: 'current-user', name: 'Current User', avatar: undefined },
    skillsWanted: ['Graphic Design', 'Public Speaking', 'Video Editing']
  },
];

const incomingRequests: MatchRequest[] = [
  {
    id: 'r1',
    status: 'pending',
    date: '2023-06-15',
    otherUser: { id: 'u3', name: 'Carlos Rodriguez', avatar: undefined },
    skillOffered: { id: '3', title: 'Financial Planning' },
    skillRequested: { id: '100', title: 'Web Development' }
  },
  {
    id: 'r2',
    status: 'accepted',
    date: '2023-06-10',
    otherUser: { id: 'u7', name: 'Michael Lee', avatar: undefined },
    skillOffered: { id: '7', title: 'Photography Basics' },
    skillRequested: { id: '101', title: 'Digital Marketing' }
  }
];

const outgoingRequests: MatchRequest[] = [
  {
    id: 'r3',
    status: 'pending',
    date: '2023-06-14',
    otherUser: { id: 'u2', name: 'Maya Johnson', avatar: undefined },
    skillOffered: { id: '100', title: 'Web Development' },
    skillRequested: { id: '2', title: 'Digital Illustration' }
  },
  {
    id: 'r4',
    status: 'rejected',
    date: '2023-06-08',
    otherUser: { id: 'u8', name: 'Sophia Romano', avatar: undefined },
    skillOffered: { id: '101', title: 'Digital Marketing' },
    skillRequested: { id: '8', title: 'Italian Cooking' }
  }
];

// Category options
const categoryOptions = [
  'Programming',
  'Design',
  'Music',
  'Languages',
  'Cooking',
  'Fitness',
  'Photography',
  'Finance',
  'Marketing',
  'Education',
  'Business',
  'Arts & Crafts',
];

// Level options
const levelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const Dashboard = () => {
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    skillsWanted: [''] as string[]
  });

  const handleAcceptRequest = (id: string) => {
    // In a real app, this would call an API
    console.log(`Accepting request ${id}`);
    toast.success("Request accepted! You can now schedule a session.");
  };

  const handleRejectRequest = (id: string) => {
    // In a real app, this would call an API
    console.log(`Rejecting request ${id}`);
    toast.success("Request declined.");
  };

  const handleAddSkill = () => {
    // Validation
    if (!newSkill.title || !newSkill.description || !newSkill.category || !newSkill.level) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would call an API
    console.log("Adding new skill:", newSkill);
    toast.success("New skill added successfully!");
    setAddSkillOpen(false);
    
    // Reset form
    setNewSkill({
      title: '',
      description: '',
      category: '',
      level: '',
      skillsWanted: ['']
    });
  };

  const addWantedSkill = () => {
    setNewSkill({...newSkill, skillsWanted: [...newSkill.skillsWanted, '']});
  };

  const updateWantedSkill = (index: number, value: string) => {
    const updatedWantedSkills = [...newSkill.skillsWanted];
    updatedWantedSkills[index] = value;
    setNewSkill({...newSkill, skillsWanted: updatedWantedSkills});
  };

  const removeWantedSkill = (index: number) => {
    const updatedWantedSkills = newSkill.skillsWanted.filter((_, i) => i !== index);
    setNewSkill({...newSkill, skillsWanted: updatedWantedSkills});
  };

  return (
    <Layout>
      <section className="bg-skillswap-primary py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">My Dashboard</h1>
              <p className="text-white/80">Manage your skills and swap requests</p>
            </div>
            <Dialog open={addSkillOpen} onOpenChange={setAddSkillOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-skillswap-primary hover:bg-white/90">
                  Add New Skill
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add a New Skill</DialogTitle>
                  <DialogDescription>
                    What can you teach others? Add details about a skill you'd like to offer.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right font-medium">Title</label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Python Programming" 
                      className="col-span-3"
                      value={newSkill.title}
                      onChange={(e) => setNewSkill({...newSkill, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="description" className="text-right font-medium">Description</label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe what you'll teach and what experience you have" 
                      className="col-span-3"
                      value={newSkill.description}
                      onChange={(e) => setNewSkill({...newSkill, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="category" className="text-right font-medium">Category</label>
                    <Select 
                      value={newSkill.category} 
                      onValueChange={(value) => setNewSkill({...newSkill, category: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="level" className="text-right font-medium">Level</label>
                    <Select 
                      value={newSkill.level} 
                      onValueChange={(value) => setNewSkill({...newSkill, level: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select your expertise level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-start gap-4">
                    <div className="text-right font-medium">
                      Skills Wanted
                      <p className="text-xs font-normal text-gray-500">What do you want to learn?</p>
                    </div>
                    <div className="col-span-3 space-y-2">
                      {newSkill.skillsWanted.map((skill, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            placeholder="e.g., Photography" 
                            value={skill}
                            onChange={(e) => updateWantedSkill(index, e.target.value)}
                          />
                          {newSkill.skillsWanted.length > 1 && (
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon"
                              onClick={() => removeWantedSkill(index)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12"/>
                              </svg>
                            </Button>
                          )}
                        </div>
                      ))}
                      {newSkill.skillsWanted.length < 5 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={addWantedSkill}
                        >
                          Add Another Skill
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => setAddSkillOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleAddSkill}>
                    Add Skill
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
      
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="my-skills">
            <TabsList className="mb-6">
              <TabsTrigger value="my-skills">My Skills</TabsTrigger>
              <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
              <TabsTrigger value="outgoing">Outgoing Requests</TabsTrigger>
              <TabsTrigger value="sessions">Scheduled Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-skills">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
                <Card className="flex items-center justify-center h-full min-h-[300px] border-dashed">
                  <CardContent className="text-center">
                    <div className="p-4 rounded-full bg-gray-100 inline-flex mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v8M8 12h8"/>
                      </svg>
                    </div>
                    <h3 className="font-medium mb-1">Add a New Skill</h3>
                    <p className="text-gray-500 text-sm mb-4">Share what you can teach others</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setAddSkillOpen(true)}
                    >
                      Add Skill
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="incoming">
              <div className="grid md:grid-cols-2 gap-6">
                {incomingRequests.length > 0 ? (
                  incomingRequests.map((request) => (
                    <MatchRequestCard 
                      key={request.id} 
                      matchRequest={request} 
                      onAccept={handleAcceptRequest}
                      onReject={handleRejectRequest}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 col-span-2">
                    <p className="text-xl text-gray-600">You don't have any incoming requests yet.</p>
                    <p className="text-gray-500 mt-2">When someone requests to learn one of your skills, it will appear here.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="outgoing">
              <div className="grid md:grid-cols-2 gap-6">
                {outgoingRequests.length > 0 ? (
                  outgoingRequests.map((request) => (
                    <MatchRequestCard 
                      key={request.id} 
                      matchRequest={request} 
                      isOutgoing={true}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 col-span-2">
                    <p className="text-xl text-gray-600">You haven't made any requests yet.</p>
                    <p className="text-gray-500 mt-2">Browse skills and request to learn from others.</p>
                    <Button className="mt-4">Browse Skills</Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="sessions">
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No sessions scheduled yet.</p>
                <p className="text-gray-500 mt-2">Once you've matched with someone, you can schedule sessions here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
