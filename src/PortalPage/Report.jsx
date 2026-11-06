import { useOutletContext } from 'react-router-dom'
import { AssessmentOutlined, AutoGraph } from '@mui/icons-material'
import { Paper, Typography } from '@mui/material'
import { currency } from './formatting.js'

// Show totals for sales, purchases, and net income.
export default function ReportPage() {
  const { transactions } = useOutletContext()

  // Sales are positive amounts; purchases are stored as negative amounts.
  const sales = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const purchases = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)

  const netIncome = sales - purchases

  return (
    <section className="reports-layout">
      {/* Monthly totals */}
      <Paper elevation={0} className="panel report-summary">
        <div className="panel-heading">
          <div>
            <Typography className="panel-title">
              Your monthly snapshot
            </Typography>
            <Typography className="panel-subtitle">
              A simple picture of where you stand.
            </Typography>
          </div>
          <span className="insight-spark">
            <AssessmentOutlined />
          </span>
        </div>

        <div className="report-total">{currency.format(netIncome)}</div>
        <span className="report-total-label">net income this month</span>

        {/* The two values that are used to calculate net income */}
        <div className="report-breakdown">
          <div>
            <span>
              <i className="legend-sales" />
              Total sales
            </span>
            <strong>{currency.format(sales)}</strong>
          </div>

          <div>
            <span>
              <i className="legend-purchases" />
              Total purchases
            </span>
            <strong>{currency.format(purchases)}</strong>
          </div>
        </div>
      </Paper>

      {/* A short reminder about keeping transaction records */}
      <Paper elevation={0} className="panel report-tip">
        <span className="report-tip-icon">
          <AutoGraph />
        </span>
        <Typography className="panel-title">Small steps add up</Typography>
        <Typography className="panel-subtitle">
          A consistent record of your sales and purchases helps you spot
          patterns and make better-informed decisions for your business.
        </Typography>
        <div className="report-tip-footer">
          Report period <strong>October 8 – November 4, 2026</strong>
        </div>
      </Paper>
    </section>
  )
}
