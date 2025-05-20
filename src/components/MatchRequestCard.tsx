
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface MatchRequest {
  id: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  skillOffered: {
    id: string;
    title: string;
  };
  skillRequested: {
    id: string;
    title: string;
  };
}

interface MatchRequestCardProps {
  matchRequest: MatchRequest;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  isOutgoing?: boolean;
}

export const MatchRequestCard = ({ 
  matchRequest, 
  onAccept, 
  onReject, 
  isOutgoing = false 
}: MatchRequestCardProps) => {
  const getStatusBadge = () => {
    switch (matchRequest.status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Declined</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={matchRequest.otherUser.avatar} alt={matchRequest.otherUser.name} />
              <AvatarFallback>{matchRequest.otherUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{matchRequest.otherUser.name}</CardTitle>
              <p className="text-xs text-muted-foreground">Requested on {new Date(matchRequest.date).toLocaleDateString()}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="p-3 bg-muted rounded-md">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {isOutgoing ? "You're offering:" : "They're offering:"}
            </p>
            <p className="font-medium">{isOutgoing ? matchRequest.skillRequested.title : matchRequest.skillOffered.title}</p>
          </div>
          <div className="p-3 bg-muted rounded-md">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {isOutgoing ? "You're requesting:" : "They're requesting:"}
            </p>
            <p className="font-medium">{isOutgoing ? matchRequest.skillOffered.title : matchRequest.skillRequested.title}</p>
          </div>
        </div>
      </CardContent>
      {matchRequest.status === 'pending' && !isOutgoing && (
        <CardFooter className="flex justify-end space-x-2 pt-2">
          <Button variant="outline" onClick={() => onReject && onReject(matchRequest.id)}>
            Decline
          </Button>
          <Button onClick={() => onAccept && onAccept(matchRequest.id)}>
            Accept
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
