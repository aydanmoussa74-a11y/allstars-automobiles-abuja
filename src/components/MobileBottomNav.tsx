import { CarFront, Home, MapPin, Repeat, Star } from 'lucide-react';
import type { AppPage } from './MobileSidebar';

interface MobileBottomNavProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function MobileBottomNav({
  currentPage,
  onNavigate,
}: MobileBottomNavProps) {
  const tabs: {
    id: AppPage;
    label: string;
    icon: typeof Home;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'inventory', label: 'Stock', icon: CarFront },
    { id: 'trade-in', label: 'Swap', icon: Repeat },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'showroom', label: 'Map', icon: MapPin },
  ];

  return (
    <nav
      aria-label="Mobile app navigation"
      className="glass-obsidian fixed inset-x-0 bottom-0 z-40 border-x-0 border-b-0 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] px-safe md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 items-center gap-1 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-xs font-medium transition-[transform,background-color,color] duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                active
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#D4D4D8] hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
