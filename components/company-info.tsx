import React from 'react';
import { GalleryVerticalEnd } from 'lucide-react'; // Ensure this import is correct

export const company = {
  name: 'CareCircle',
  logo: GalleryVerticalEnd,
  plan: 'Support Team'
};

const CompanyInfo: React.FC = () => {
  const { logo: Logo, name, plan } = company;

  return (
    <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
      <div className="bg-theme flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
        <Logo className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{name}</span>
        <span className="truncate text-xs">{plan}</span>
      </div>
    </div>
  );
};

export default CompanyInfo;
