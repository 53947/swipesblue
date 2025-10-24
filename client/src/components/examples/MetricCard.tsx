import MetricCard from '../MetricCard'
import { DollarSign, CreditCard, TrendingUp, Users } from 'lucide-react'

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <MetricCard
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1% from last month"
        changeType="positive"
        icon={DollarSign}
      />
      <MetricCard
        title="Transactions"
        value="2,350"
        change="+15.3% from last month"
        changeType="positive"
        icon={CreditCard}
      />
      <MetricCard
        title="Success Rate"
        value="98.2%"
        change="+2.5% from last month"
        changeType="positive"
        icon={TrendingUp}
      />
      <MetricCard
        title="Active Customers"
        value="573"
        change="+12 new this week"
        changeType="neutral"
        icon={Users}
      />
    </div>
  )
}
