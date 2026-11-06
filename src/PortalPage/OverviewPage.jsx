import { useOutletContext } from 'react-router-dom'
import { Button, Paper, Typography } from '@mui/material'
import {
  Add,
  ArrowForward,
  AutoGraph,
  CalendarMonthOutlined,
  ChevronRight,
  ShoppingBagOutlined,
  TrendingUp,
  WalletOutlined,
} from '@mui/icons-material'
import { MetricCard, TransactionTable } from './PageComponents.jsx'
import { currency } from './formatting.js'

// Draw a decorative bar chart for the last 28 days.
function SalesChart() {
  const barHeights = [
    40, 55, 46, 68, 51, 74, 59, 48, 69, 84, 63, 76, 52, 70,
    88, 63, 79, 58, 72, 96, 65, 81, 59, 73, 91, 67, 83, 61,
  ]

  return (
    <div className="chart-wrap">
      {/* Labels down the left side of the chart */}
      <div className="chart-y-labels">
        <span>$8k</span>
        <span>$6k</span>
        <span>$4k</span>
        <span>$2k</span>
        <span>$0</span>
      </div>

      <div className="chart-main">
        {/* Horizontal grid lines behind the bars */}
        <div className="chart-grid">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        {/* Each group contains one sales bar and one purchase bar. */}
        <div
          className="chart-bars"
          role="img"
          aria-label="Sales and purchases chart for the last 28 days"
        >
          {barHeights.map((height, index) => {
            const purchaseHeight = Math.max(14, height * 0.4)

            return (
              <div key={index} className="bar-group">
                <span
                  className="bar-sales"
                  style={{ height: `${height}%` }}
                />
                <span
                  className="bar-purchases"
                  style={{ height: `${purchaseHeight}%` }}
                />
              </div>
            )
          })}
        </div>

        {/* Date labels along the bottom of the chart */}
        <div className="chart-x-labels">
          <span>Oct 8</span>
          <span>Oct 15</span>
          <span>Oct 22</span>
          <span>Oct 29</span>
          <span>Nov 4</span>
        </div>
      </div>
    </div>
  )
}

// Show totals and recent activity for the whole business.
export default function OverviewPage() {
  const { transactions, onAdd, onNavigate } = useOutletContext()

  // Positive transaction amounts are sales.
  const sales = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  // Negative transaction amounts are purchases, so make them positive for display.
  const purchases = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)

  const netIncome = sales - purchases

  // Add up the amounts for transactions that have not been completed.
  const outstanding = transactions
    .filter((transaction) => transaction.status === 'Pending')
    .reduce(
      (sum, transaction) => sum + Math.abs(transaction.amount),
      0,
    )

  return (
    <>
      {/* Welcome text and the selected date range */}
      <section className="welcome-row">
        <div>
          <Typography className="welcome-title">
            Your business, at a glance.
          </Typography>
          <Typography className="welcome-copy">
            Here&apos;s what&apos;s happening with Studio &amp; Co. today.
          </Typography>
        </div>

        <Button
          className="period-button"
          startIcon={<CalendarMonthOutlined />}
          endIcon={<ChevronRight />}
        >
          Last 28 days
        </Button>
      </section>

      {/* Four summary cards for the business totals */}
      <section className="metrics-grid" aria-label="Business summary">
        <MetricCard
          label="Total sales"
          value={currency.format(sales)}
          change="12.8%"
          note="vs. last month"
          icon={TrendingUp}
          tone="green"
        />
        <MetricCard
          label="Total purchases"
          value={currency.format(purchases)}
          change="8.2%"
          note="vs. last month"
          icon={ShoppingBagOutlined}
          tone="peach"
        />
        <MetricCard
          label="Net income"
          value={currency.format(netIncome)}
          change="18.4%"
          note="vs. last month"
          icon={WalletOutlined}
          tone="lavender"
        />
        <MetricCard
          label="Outstanding"
          value={currency.format(outstanding)}
          change="3.1%"
          note="vs. last month"
          icon={CalendarMonthOutlined}
          tone="yellow"
        />
      </section>

      {/* Cash-flow chart and short business insight */}
      <section className="overview-grid">
        <Paper elevation={0} className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <Typography className="panel-title">Cash flow</Typography>
              <Typography className="panel-subtitle">
                Sales and purchases over time
              </Typography>
            </div>
            <button className="select-button">
              Last 28 days <ChevronRight />
            </button>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-sales" />
              Sales
            </span>
            <span>
              <i className="legend-purchases" />
              Purchases
            </span>
          </div>

          <SalesChart />
        </Paper>

        <Paper elevation={0} className="panel insight-panel">
          <div className="panel-heading">
            <div>
              <Typography className="panel-title">At a glance</Typography>
              <Typography className="panel-subtitle">
                A little perspective
              </Typography>
            </div>
            <span className="insight-spark">
              <AutoGraph />
            </span>
          </div>

          <div className="insight-value">
            {currency.format(netIncome)}
          </div>
          <Typography className="insight-caption">
            net income this month
          </Typography>
          <div className="insight-divider" />

          <div className="insight-note">
            <span className="insight-note-icon">
              <TrendingUp />
            </span>
            <span>
              You&apos;re earning <strong>18.4% more</strong> than this time
              last month. Keep it up!
            </span>
          </div>

          <button
            className="text-link"
            onClick={() => onNavigate('Reports')}
          >
            View your reports <ArrowForward />
          </button>
        </Paper>
      </section>

      {/* The latest transactions, shown in a compact table */}
      <Paper elevation={0} className="panel recent-panel">
        <div className="panel-heading recent-heading">
          <div>
            <Typography className="panel-title">
              Recent transactions
            </Typography>
            <Typography className="panel-subtitle">
              Your latest sales and purchases
            </Typography>
          </div>
          <button
            className="text-link"
            onClick={() => onNavigate('Transactions')}
          >
            View all <ArrowForward />
          </button>
        </div>

        <TransactionTable transactions={transactions} compact />
      </Paper>

      {/* A shortcut for adding another transaction */}
      <section className="bottom-cta">
        <div className="cta-icon">
          <Add />
        </div>
        <div>
          <strong>Keep your books up to date</strong>
          <span>
            Log a sale or purchase and see your numbers come to life.
          </span>
        </div>
        <Button onClick={onAdd} endIcon={<ArrowForward />}>
          Add a transaction
        </Button>
      </section>
    </>
  )
}
