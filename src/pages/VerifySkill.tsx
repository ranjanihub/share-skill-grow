
import React from 'react';
import { Layout } from '@/components/Layout';
import SkillVerificationForm from '@/components/SkillVerificationForm';

const VerifySkill = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Verify Your Skills</h1>
        <p className="text-gray-600 mb-8">
          Take a short assessment to verify your expertise and earn a verification badge for your skills.
        </p>
        <SkillVerificationForm />
      </div>
    </Layout>
  );
};

export default VerifySkill;
