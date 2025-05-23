
import React from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { AddSkillForm } from '@/components/dashboard/AddSkillForm';
import { SkillsTab } from '@/components/dashboard/SkillsTab';
import { MatchRequestsTab } from '@/components/dashboard/MatchRequestsTab';
import { SessionsTab } from '@/components/dashboard/SessionsTab';
import { useDashboard } from '@/components/dashboard/useDashboard';

const Dashboard = () => {
  const {
    addSkillOpen,
    setAddSkillOpen,
    newSkill,
    setNewSkill,
    mySkills,
    incomingRequests,
    outgoingRequests,
    isLoading,
    isSubmitting,
    handleAddSkill,
    handleAcceptRequest,
    handleRejectRequest
  } = useDashboard();

  return (
    <Layout>
      <DashboardHeader 
        addSkillOpen={addSkillOpen} 
        setAddSkillOpen={setAddSkillOpen} 
      />
      
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
              <SkillsTab 
                isLoading={isLoading} 
                mySkills={mySkills} 
                setAddSkillOpen={setAddSkillOpen} 
              />
            </TabsContent>
            
            <TabsContent value="incoming">
              <MatchRequestsTab 
                requests={incomingRequests}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            </TabsContent>
            
            <TabsContent value="outgoing">
              <MatchRequestsTab 
                requests={outgoingRequests}
                isOutgoing={true}
              />
            </TabsContent>
            
            <TabsContent value="sessions">
              <SessionsTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Add Skill Dialog - only rendering the content when needed */}
      {addSkillOpen && (
        <AddSkillForm
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          handleAddSkill={handleAddSkill}
          isSubmitting={isSubmitting}
        />
      )}
    </Layout>
  );
};

export default Dashboard;
