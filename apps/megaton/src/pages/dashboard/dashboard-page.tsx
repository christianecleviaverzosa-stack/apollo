import {
  DashboardFilterForm,
  FTDAchievements,
  SummaryCards,
  TradingAssetsDistribution,
  WeeklyTradingVolume,
} from '@apollo/features/dashboard';

export default function DashboardPage() {
  return (
    <section data-testid="dashboard-page" className="p-4 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <DashboardFilterForm />
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Radial Chart */}
        <FTDAchievements />

        {/* Bar Chart */}
        <WeeklyTradingVolume />

        {/* Pie Chart */}
        <TradingAssetsDistribution />
      </div>
    </section>
  );
}
