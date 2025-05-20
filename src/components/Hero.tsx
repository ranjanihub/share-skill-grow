
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundClass?: string;
}

export const Hero = ({
  title,
  subtitle,
  ctaText,
  ctaLink = "/signup",
  secondaryCtaText,
  secondaryCtaLink = "/browse",
  backgroundClass = "bg-gradient-to-br from-skillswap-primary to-skillswap-secondary"
}: HeroProps) => {
  return (
    <div className={`py-16 md:py-24 ${backgroundClass} text-white`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {ctaText && (
            <Link to={ctaLink}>
              <Button size="lg" className="bg-white text-skillswap-primary hover:bg-gray-100">
                {ctaText}
              </Button>
            </Link>
          )}
          {secondaryCtaText && (
            <Link to={secondaryCtaLink}>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                {secondaryCtaText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
