'use client';

import { useSidebar } from '@/hooks/useSidebar';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="sticky top-0 z-10 gap-3 bg-gray-50 p-3 lg:p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">{title}</h1>{' '}
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="lg:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </div>{' '}
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
