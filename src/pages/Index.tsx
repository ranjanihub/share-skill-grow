
import React from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { SkillCard, Skill } from '@/components/SkillCard';
import { CategoryCard } from '@/components/CategoryCard';
import { Link } from 'react-router-dom';

// Mock data for skills
const popularSkills: Skill[] = [
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
  }
];

// Categories with emoji icons
const categories = [
  { title: 'Programming', icon: '💻', count: 124, slug: 'programming', color: 'bg-blue-500' },
  { title: 'Design', icon: '🎨', count: 98, slug: 'design', color: 'bg-purple-500' },
  { title: 'Music', icon: '🎵', count: 87, slug: 'music', color: 'bg-red-500' },
  { title: 'Languages', icon: '🌎', count: 76, slug: 'languages', color: 'bg-green-500' },
  { title: 'Cooking', icon: '🍳', count: 68, slug: 'cooking', color: 'bg-orange-500' },
  { title: 'Fitness', icon: '💪', count: 52, slug: 'fitness', color: 'bg-pink-500' },
];

const Index = () => {
  return (
    <Layout>
      <Hero 
        title="Learn Anything. Teach Everything." 
        subtitle="SkillSwap connects people who want to exchange skills. Learn what you've always wanted by teaching what you already know."
        ctaText="Join SkillSwap"
        secondaryCtaText="Browse Skills"
      />

      {/* How it works */}
      <section className="py-16 px-4 bg-pattern">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in">
              <div className="bg-skillswap-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">List skills you can teach and what you want to learn</p>
            </div>
            
            <div className="text-center fade-in" style={{animationDelay: '0.2s'}}>
              <div className="bg-skillswap-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Find Your Match</h3>
              <p className="text-gray-600">Connect with others who want to learn your skills</p>
            </div>
            
            <div className="text-center fade-in" style={{animationDelay: '0.4s'}}>
              <div className="bg-skillswap-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Start Learning</h3>
              <p className="text-gray-600">Schedule sessions and exchange knowledge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular skills */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Skills</h2>
            <Link to="/browse">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <CategoryCard 
                key={index} 
                title={category.title} 
                icon={category.icon} 
                count={category.count} 
                slug={category.slug}
                color={category.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / CTA */}
      <section className="py-16 px-4 bg-skillswap-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start learning?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">Join thousands of people exchanging skills and knowledge with each other.</p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-skillswap-primary hover:bg-gray-100">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
