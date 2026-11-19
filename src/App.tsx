/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InventoryBriefSection } from './components/InventoryBriefSection';
import { LegalPage } from './components/LegalPage';
import { MobileBottomNav } from './components/MobileBottomNav';
import { type AppPage, MobileSidebar } from './components/MobileSidebar';
import { ReviewsPage } from './components/ReviewsPage';
import { ShowroomAndFaqSection } from './components/ShowroomAndFaqSection';
import { TradeInSection } from './components/TradeInSection';
import { VehicleBriefDrawer } from './components/VehicleBriefDrawer';
import {
  type DockFilter,
  SAMPLE_VEHICLES,
  type Vehicle,
} from './data/inventory';

function parseHashToPage(hash: string): AppPage {
  const cleaned = hash.replace(/^#\/?/, '').toLowerCase();
  if (cleaned === 'inventory') return 'inventory';
  if (cleaned === 'trade-in') return 'trade-in';
  if (cleaned === 'reviews') return 'reviews';
  if (cleaned === 'showroom') return 'showroom';
  if (cleaned === 'terms') return 'terms';
  if (cleaned === 'privacy') return 'privacy';
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    parseHashToPage(typeof window !== 'undefined' ? window.location.hash : '')
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<DockFilter>('All Stock');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(SAMPLE_VEHICLES[0].id);
  const [compareIds, setCompareIds] = useState<[string, string]>([
    SAMPLE_VEHICLES[1]?.id ?? SAMPLE_VEHICLES[0].id,
    SAMPLE_VEHICLES[2]?.id ?? SAMPLE_VEHICLES[0].id,
  ]);
  const [inspectedVehicle, setInspectedVehicle] = useState<Vehicle | null>(null);
  const [presetTargetCar, setPresetTargetCar] = useState<string>('');
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (motionPaused) {
      root.classList.add('motion-paused');
    } else {
      root.classList.remove('motion-paused');
    }
  }, [motionPaused]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(parseHashToPage(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const navigateTo = useCallback(
    (page: AppPage) => {
      setCurrentPage(page);
      const nextHash = page === 'home' ? '#/' : `#/${page}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
      window.scrollTo({ top: 0, behavior: motionPaused ? 'auto' : 'smooth' });
    },
    [motionPaused]
  );

  const filteredVehicles = useMemo(() => {
    if (
      activeFilter === 'All Stock' ||
      activeFilter === 'Direct Tokunbo' ||
      activeFilter === 'Sell / Swap'
    ) {
      return SAMPLE_VEHICLES;
    }
    return SAMPLE_VEHICLES.filter((vehicle) => vehicle.category === activeFilter);
  }, [activeFilter]);

  const selectedVehicle = useMemo(() => {
    const match = filteredVehicles.find((v) => v.id === selectedVehicleId);
    return match ?? filteredVehicles[0] ?? SAMPLE_VEHICLES[0];
  }, [filteredVehicles, selectedVehicleId]);

  const handleSelectFilter = (filter: DockFilter) => {
    setActiveFilter(filter);
    if (filter === 'Luxury SUVs' || filter === 'Executive Sedans') {
      const nextMatches = SAMPLE_VEHICLES.filter((v) => v.category === filter);
      if (nextMatches.length > 0 && !nextMatches.some((v) => v.id === selectedVehicleId)) {
        setSelectedVehicleId(nextMatches[0].id);
      }
    }
  };

  const handleToggleCompareVehicle = (vehicleId: string) => {
    setCompareIds(([slotA, slotB]) => {
      if (slotA === vehicleId || slotB === vehicleId) {
        return [slotA, slotB];
      }
      return [slotB, vehicleId];
    });
  };

  const handleOpenComparator = useCallback(() => {
    setCurrentPage('inventory');
    if (window.location.hash !== '#/inventory') {
      window.history.pushState(null, '', '#/inventory');
    }
    window.setTimeout(() => {
      document.getElementById('vehicle-comparator')?.scrollIntoView({
        behavior: motionPaused ? 'auto' : 'smooth',
      });
    }, 80);
  }, [motionPaused]);

  const handleRequestSwapForVehicle = (vehicleLabel: string) => {
    setPresetTargetCar(vehicleLabel);
    navigateTo('trade-in');
  };

  return (
    <MotionConfig reducedMotion={motionPaused ? 'always' : 'user'}>
      <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5]">
        {mapsQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <Header
          currentPage={currentPage}
          onNavigate={navigateTo}
          motionPaused={motionPaused}
          onToggleMotion={() => setMotionPaused((prev) => !prev)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 pb-28 md:pb-0">
          {currentPage === 'home' && (
            <HeroSection
              activeFilter={activeFilter}
              onSelectFilter={handleSelectFilter}
              filteredVehicles={filteredVehicles}
              selectedVehicle={selectedVehicle}
              onInspectVehicle={(vehicle) => {
                setSelectedVehicleId(vehicle.id);
                setInspectedVehicle(vehicle);
              }}
              onNavigate={navigateTo}
              motionPaused={motionPaused}
              onToggleMotion={() => setMotionPaused((prev) => !prev)}
            />
          )}

          {currentPage === 'inventory' && (
            <InventoryBriefSection
              activeFilter={activeFilter}
              onSelectFilter={handleSelectFilter}
              vehicles={filteredVehicles}
              selectedVehicle={selectedVehicle}
              compareIds={compareIds}
              onChangeCompareIds={setCompareIds}
              onToggleCompareVehicle={handleToggleCompareVehicle}
              onSelectVehicle={setSelectedVehicleId}
              onInspectVehicle={(vehicle) => setInspectedVehicle(vehicle)}
              onRequestSwapForVehicle={handleRequestSwapForVehicle}
            />
          )}

          {currentPage === 'trade-in' && (
            <TradeInSection presetTargetCar={presetTargetCar} />
          )}

          {currentPage === 'reviews' && <ReviewsPage onNavigate={navigateTo} />}

          {currentPage === 'showroom' && <ShowroomAndFaqSection />}

          {currentPage === 'terms' && (
            <LegalPage mode="terms" onNavigate={navigateTo} />
          )}

          {currentPage === 'privacy' && (
            <LegalPage mode="privacy" onNavigate={navigateTo} />
          )}
        </main>

        <Footer
          onNavigate={navigateTo}
          motionPaused={motionPaused}
          onToggleMotion={() => setMotionPaused((prev) => !prev)}
        />

        <MobileBottomNav
          currentPage={currentPage}
          onNavigate={navigateTo}
        />

        <MobileSidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onSelectInventoryFilter={handleSelectFilter}
          onOpenComparator={handleOpenComparator}
          motionPaused={motionPaused}
          onToggleMotion={() => setMotionPaused((prev) => !prev)}
        />

        <VehicleBriefDrawer
          vehicle={inspectedVehicle}
          motionPaused={motionPaused}
          onClose={() => setInspectedVehicle(null)}
          onSwapIntoVehicle={handleRequestSwapForVehicle}
        />
      </div>
    </MotionConfig>
  );
}
