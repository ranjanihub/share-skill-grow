
import React from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { SkillsList } from '@/components/SkillsList';
import { EnhancedSkill } from '@/components/SkillCardEnhanced';

// Sample data for skills
const sampleSkills: EnhancedSkill[] = [
  {
    id: '1',
    title: 'Python Programming',
    description: 'Learn Python for data science and automation. I can teach from basics to advanced topics like machine learning.',
    category: 'Programming',
    level: 'Intermediate',
    type: 'offered',
    user: { id: 'u1', name: 'Alex Chen', avatar: undefined },
    skills: ['Graphic Design', 'Spanish Language', 'Guitar']
  },
  {
    id: '2',
    title: 'Digital Illustration',
    description: 'I can teach you how to create beautiful digital illustrations using Procreate, Illustrator or Photoshop.',
    category: 'Design',
    level: 'Advanced',
    type: 'offered',
    user: { id: 'u2', name: 'Maya Johnson', avatar: undefined },
    skills: ['Web Development', 'Public Speaking', 'Photography']
  },
  {
    id: '3',
    title: 'Looking for Financial Planning Help',
    description: 'I want to learn how to manage my personal finances, build a budget, invest wisely and plan for the future.',
    category: 'Finance',
    type: 'wanted',
    user: { id: 'u3', name: 'Carlos Rodriguez', avatar: undefined },
    skills: ['Cooking', 'Yoga', 'Mobile App Development']
  },
  {
    id: '4',
    title: 'Spanish Conversation Partner',
    description: 'Native Spanish speaker offering conversation practice and grammar lessons for beginners to intermediate learners.',
    category: 'Languages',
    level: 'Advanced',
    type: 'offered',
    user: { id: 'u4', name: 'Elena Garcia', avatar: undefined },
    skills: ['Photography', 'Yoga', 'Web Development']
  },
  {
    id: '5',
    title: 'Need Guitar Lessons',
    description: 'Interested in learning acoustic guitar. Complete beginner looking for patient teacher who can help with basics.',
    category: 'Music',
    type: 'wanted',
    user: { id: 'u5', name: 'David Kim', avatar: undefined },
    skills: ['Digital Marketing', 'Cooking', 'Graphic Design']
  },
  {
    id: '6',
    title: 'Yoga and Meditation',
    description: 'Certified yoga instructor offering personalized sessions for stress relief, flexibility and mindfulness techniques.',
    category: 'Fitness',
    level: 'Intermediate',
    type: 'offered',
    user: { id: 'u6', name: 'Sarah Johnson', avatar: undefined },
    skills: ['Photography', 'Web Development', 'Spanish Language']
  }
];

const SkillsDemo = () => {
  return (
    <Layout>
      <Hero 
        title="Skill Exchange Marketplace" 
        subtitle="Browse through offered and wanted skills in our community. Connect with others to learn and teach."
        backgroundClass="bg-skillswap-dark"
        ctaText={undefined}
        secondaryCtaText={undefined}
      />
      
      <SkillsList skills={sampleSkills} title="Available Skills" />
    </Layout>
  );
};

export default SkillsDemo;
