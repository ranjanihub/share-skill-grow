
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { toast } from 'sonner';

interface GoogleCalendarIntegrationProps {
  skillId?: string;
  skillName?: string;
  participantName?: string;
}

const GoogleCalendarIntegration = ({ 
  skillId, 
  skillName = "Skill Session", 
  participantName = "Participant"
}: GoogleCalendarIntegrationProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const handleScheduleSession = () => {
    if (!selectedDate) {
      toast.error("Please select a date for the session");
      return;
    }
    
    // Format the date for Google Calendar URL
    const startTime = new Date(selectedDate);
    startTime.setHours(startTime.getHours() + 1); // Set to next hour
    
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1); // 1 hour session
    
    // Format dates for Google Calendar
    const formatDate = (date: Date): string => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const title = `SkillSwap: ${skillName} Session`;
    const details = `SkillSwap session with ${participantName}. Skill: ${skillName}`;
    
    // Create Google Calendar URL
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${formatDate(startTime)}/${formatDate(endTime)}`;
    
    // Open Google Calendar in a new tab
    window.open(calendarUrl, '_blank');
    
    toast.success("Session scheduled! Added to Google Calendar");
  };
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Schedule Session
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Schedule a Skill Swap Session</DrawerTitle>
          <DrawerDescription>
            Pick a date for your {skillName} session. This will create an event in Google Calendar.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </div>
        <DrawerFooter>
          <Button onClick={handleScheduleSession} disabled={!selectedDate}>
            Add to Google Calendar
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GoogleCalendarIntegration;
