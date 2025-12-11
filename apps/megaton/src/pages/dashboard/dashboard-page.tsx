import {
  DashboardFilterForm,
  SummaryCards,
  FTDAchievements,
  WeeklyTradingVolume,
  TradingAssetsDistribution,
  MostTradedAssetsChart,
  OrderTypesUsedChart,
} from '@apollo/features/dashboard';

export default function DashboardPage() {
  return (
    <section data-testid="dashboard-page" className="p-4 space-y-6">
      {/* Header Row */}
      <div className="flex flex-col gap-4 md:flex-row justify-between">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <DashboardFilterForm />
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* FTD Progress */}
        <FTDAchievements />

        {/* Weekly Trading Volume */}
        <WeeklyTradingVolume />

        {/* Trading Asset Categories */}
        <TradingAssetsDistribution />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Most Traded Assets */}
        <MostTradedAssetsChart />

        {/* Order Types Used: Market, Limit, Stop, etc */}
        <OrderTypesUsedChart />
      </div>
    </section>
  );
}
