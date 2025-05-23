
import React from 'react';
import { MatchRequestCard, MatchRequest } from '@/components/MatchRequestCard';
import { Button } from '@/components/ui/button';

interface MatchRequestsTabProps {
  requests: MatchRequest[];
  isOutgoing?: boolean;
  onAccept?: (id: string) => Promise<void>;
  onReject?: (id: string) => Promise<void>;
}

export const MatchRequestsTab = ({ 
  requests, 
  isOutgoing = false,
  onAccept,
  onReject 
}: MatchRequestsTabProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {requests.length > 0 ? (
        requests.map((request) => (
          <MatchRequestCard 
            key={request.id} 
            matchRequest={request} 
            isOutgoing={isOutgoing}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))
      ) : (
        <div className="text-center py-12 col-span-2">
          {isOutgoing ? (
            <>
              <p className="text-xl text-gray-600">You haven't made any requests yet.</p>
              <p className="text-gray-500 mt-2">Browse skills and request to learn from others.</p>
              <Button className="mt-4">Browse Skills</Button>
            </>
          ) : (
            <>
              <p className="text-xl text-gray-600">You don't have any incoming requests yet.</p>
              <p className="text-gray-500 mt-2">When someone requests to learn one of your skills, it will appear here.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
