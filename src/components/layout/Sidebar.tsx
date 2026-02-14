'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard,
  Users,
  Settings,
  ChevronDown,
  CreditCard,
  MessageSquare,
  LogOut,
  Info,
  Shield,
  FileText,
  Workflow,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  ShoppingBag,
  UserCircle,
  Book,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../shared/Logo';
import { useLogoutMutation } from '@/store/features/auth/authApi';
import { useSidebar } from '@/hooks/useSidebar';

const menuItems = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    path: '/overview',
  },
  {
    label: 'Users',
    icon: Users,
    path: '/users',
  },
  {
    label: 'Bookings',
    icon: Book,
    path: '/bookings',
  },
  {
    label: 'Payments & Finance',
    icon: CreditCard,
    path: '/payments-&-finance',
  },
  {
    label: 'Message',
    icon: MessageSquare,
    path: '/message',
  },
];

const settingsSubMenu = [
  {
    label: 'Profile',
    icon: UserCircle,
    path: '/profile',
  },
  {
    label: 'About Us',
    icon: Info,
    path: '/about-us',
  },
  {
    label: 'Privacy Policy',
    icon: Shield,
    path: '/privacy-policy',
  },
  {
    label: 'Terms & Condition',
    icon: FileText,
    path: '/terms-condition',
  },
  {
    label: 'How it Works',
    icon: Workflow,
    path: '/how-it-works',
  },
  {
    label: 'Trust & safety',
    icon: ShieldCheck,
    path: '/trust-safety',
  },
  {
    label: 'Help Center',
    icon: HelpCircle,
    path: '/help-center',
  },
  {
    label: 'Selling guide',
    icon: TrendingUp,
    path: '/selling-guide',
  },
  {
    label: 'Buying guide',
    icon: ShoppingBag,
    path: '/buying-guide',
  },
];

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // const { isLoading, user } = useAuth();

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage:
      'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
  };
  const [logout, { isLoading: isLogoutLoading, isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push('/login');
    }
  }, [isSuccess, router]);

  const isSettingsActive = settingsSubMenu.some((item) => pathname === item.path);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed z-50 flex h-screen flex-col overflow-x-hidden border-r border-gray-200 bg-white transition-all duration-300',
          'w-72 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center border-b border-gray-200 p-3">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="custom-scrollbar flex-1 space-y-2 overflow-x-hidden overflow-y-auto px-3 py-5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'group flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-sm font-medium transition',

                  isActive
                    ? 'bg-primary/10 text-primary border-primary/15'
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
                )}
              >
                <Icon className="size-5 shrink-0" />

                {item.label}
              </Link>
            );
          })}

          {/* Settings with Submenu */}
          <div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={cn(
                'group flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-sm font-medium tracking-tight transition-all',

                settingsOpen && !isSettingsActive
                  ? 'bg-primary/10 text-primary border-primary/15'
                  : 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
              )}
            >
              <div className="flex flex-1 items-center gap-3">
                <Settings className="size-5 shrink-0" />
                Settings
              </div>
              <ChevronDown
                className={cn('size-4 transition-all duration-200', settingsOpen && 'rotate-180')}
              />
            </button>

            {/* Submenu */}
            {settingsOpen && (
              <div className={cn('mt-2 ml-2 space-y-1 border-l border-gray-200 pl-2')}>
                {settingsSubMenu.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-2 rounded-md border border-transparent px-3 py-2 text-[13px] font-medium transition-all',
                        isActive
                          ? 'bg-primary/10 text-primary border-primary/15'
                          : 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="flex items-center justify-between gap-2 border-t border-gray-200 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="size-10 shrink-0 rounded-full bg-slate-200"></div>
            <div className="min-w-0">
              <h1 className="text-foreground truncate leading-4 font-medium">{user?.name}</h1>
              <p className="text-muted-foreground truncate text-xs">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            disabled={isLogoutLoading}
            className="hover: flex size-10 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600 transition"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
