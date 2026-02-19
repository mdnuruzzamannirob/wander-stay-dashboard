import Container from '@/components/shared/Container';
import StatsCards from '@/components/modules/overview/StatsCards';
import TotalUserChart from '@/components/modules/overview/TotalUserChart';
import RevenueChart from '@/components/modules/overview/RevenueChart';
import RecentBookings from '@/components/modules/overview/RecentBookings';

const OverviewPage = () => {
  return (
    <Container title="Admin Dashboard" description="Welcome back!">
      <div className="space-y-6">
        <StatsCards />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TotalUserChart />
          <RevenueChart />
        </div>

        <RecentBookings />
      </div>
    </Container>
  );
};

export default OverviewPage;
