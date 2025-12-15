import {
  DashboardFilterForm,
  SummaryCards,
  FTDAchievements,
  WeeklyTradingVolume,
  TradingAssetsDistribution,
  MostTradedAssetsChart,
  OrderTypesUsedChart,
} from '@apollo/features/dashboard';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation('pages/dashboard');
  return (
    <section data-testid="dashboard-page" className="p-4 space-y-6">
      {/* Header Row */}
      <div className="flex flex-col gap-4 md:flex-row justify-between">
        <h2 className="text-2xl font-semibold">{t('title')}</h2>
        <DashboardFilterForm />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCards />
      </div>

      {/** Charts Group 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* FTD Progress */}
        <FTDAchievements />

        {/* Weekly Trading Volume */}
        <WeeklyTradingVolume />

        {/* Trading Asset Categories */}
        <TradingAssetsDistribution />
      </div>

      {/** Charts Group 2 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Most Traded Assets */}
        <MostTradedAssetsChart />

        {/* Order Types Used: Market, Limit, Stop, etc */}
        <OrderTypesUsedChart />
      </div>
    </section>
  );
}
