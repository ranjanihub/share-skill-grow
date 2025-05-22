
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';

export const Navbar = () => {
  const isMobile = useIsMobile();
  const { user, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    // The signOut function in AuthContext handles the redirection
  };

  return (
    <nav className="border-b shadow-sm bg-white">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-skillswap-primary to-skillswap-secondary flex items-center justify-center text-white font-bold">S</div>
          <span className="font-bold text-xl text-skillswap-dark">SkillSwap</span>
        </Link>
        
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isLoading ? (
                <Button variant="outline" size="icon">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              ) : user ? (
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              ) : (
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/browse">Browse Skills</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/skills-demo">Skills Demo</Link>
              </DropdownMenuItem>
              
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">My Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    disabled={isLoading}
                    className="text-red-600 focus:text-red-600"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing out...
                      </span>
                    ) : (
                      "Sign out"
                    )}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-6">
            <Link to="/browse" className="text-gray-600 hover:text-skillswap-primary transition-colors">Browse Skills</Link>
            <Link to="/skills-demo" className="text-gray-600 hover:text-skillswap-primary transition-colors">Skills Demo</Link>
            
            {isLoading ? (
              <Button variant="outline" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            ) : user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-skillswap-primary transition-colors">My Dashboard</Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">My Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      disabled={isLoading} 
                      className="text-red-600 focus:text-red-600"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing out...
                        </span>
                      ) : (
                        "Sign out"
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
