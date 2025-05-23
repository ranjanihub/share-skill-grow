
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

interface DashboardHeaderProps {
  addSkillOpen: boolean;
  setAddSkillOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardHeader = ({ addSkillOpen, setAddSkillOpen }: DashboardHeaderProps) => {
  const { user } = useAuth();

  return (
    <section className="bg-skillswap-primary py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">My Dashboard</h1>
            <p className="text-white/80">
              Welcome, {user?.user_metadata?.full_name || user?.email}
            </p>
            <p className="text-white/80">Manage your skills and swap requests</p>
          </div>
          <Dialog open={addSkillOpen} onOpenChange={setAddSkillOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-skillswap-primary hover:bg-white/90">
                Add New Skill
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
