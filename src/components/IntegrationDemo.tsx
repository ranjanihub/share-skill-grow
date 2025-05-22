
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LinkedInLoginButton from './LinkedInLoginButton';
import GoogleCalendarIntegration from './GoogleCalendarIntegration';

const IntegrationDemo = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Integration Demonstrations</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Authentication</CardTitle>
            <CardDescription>
              Sign in with your LinkedIn account to access SkillSwap features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              LinkedIn integration allows users to login with their professional account,
              making it easier to connect with others who share similar skills or interests.
            </p>
          </CardContent>
          <CardFooter>
            <LinkedInLoginButton />
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Google Calendar Integration</CardTitle>
            <CardDescription>
              Schedule skill swap sessions directly to your Google Calendar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our Google Calendar integration makes it easy to schedule and keep track of
              your skill swap sessions. Simply select a date and time, and we'll create an
              event in your calendar.
            </p>
          </CardContent>
          <CardFooter>
            <GoogleCalendarIntegration 
              skillId="demo-skill" 
              skillName="Programming" 
              participantName="John Doe" 
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default IntegrationDemo;
