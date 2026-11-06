import { Avatar, Button, Paper, Typography } from '@mui/material'
import {
  Add,
  ArrowForward,
  ArrowUpward,
  ShoppingBagOutlined,
  ShowChart,
  SwapHoriz,
  TrendingUp,
} from '@mui/icons-material'
import { currency } from './formatting.js'

// Show one business number with its label, change, note, and icon.
export function MetricCard({ label, value, change, note, icon, tone }) {
  const IconComponent = icon

  return (
    <Paper elevation={0} className="metric-card">
      <div className="metric-heading">
        <span>{label}</span>
        <span className={`metric-icon ${tone}`}>
          <IconComponent />
        </span>
      </div>

      <Typography className="metric-value">{value}</Typography>

      <div className="metric-foot">
        <span className="metric-change">
          <ArrowUpward /> {change}
        </span>
        <span>{note}</span>
      </div>
    </Paper>
  )
}

// Show transactions in a table, optionally filtering by type or using compact styles.
export function TransactionTable({
  transactions,
  compact = false,
  filter = 'All',
}) {
  const visibleTransactions = transactions.filter((transaction) => {
    return filter === 'All' || transaction.type === filter
  })

  // Use a different CSS class when this table appears in a smaller panel.
  const tableClassName = compact
    ? 'transactions-table compact-table'
    : 'transactions-table'

  return (
    <div className="table-scroll">
      <table className={tableClassName}>
        <thead>
          <tr>
            <th>TRANSACTION</th>
            <th>CATEGORY</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th className="amount-cell">AMOUNT</th>
          </tr>
        </thead>

        <tbody>
          {/* Create one table row for each transaction that passed the filter. */}
          {visibleTransactions.map((transaction) => {
            const detailParts = transaction.detail.split(' · ')
            const description = detailParts[0]
            const date = detailParts[1]
            const isNegative = transaction.amount < 0
            const amountSign = isNegative ? '−' : '+'
            const amountClass = isNegative ? 'negative-amount' : ''
            const statusClass = transaction.status.toLowerCase()
            const formattedAmount = currency.format(
              Math.abs(transaction.amount),
            )

            return (
              <tr key={transaction.id}>
                <td>
                  <div className="transaction-name">
                    <Avatar
                      className="transaction-avatar"
                      sx={{ bgcolor: transaction.color }}
                    >
                      {transaction.initials}
                    </Avatar>

                    <span>
                      <strong>{transaction.name}</strong>
                      <small>{description}</small>
                    </span>
                  </div>
                </td>

                <td>
                  <span className="category-text">
                    {transaction.category}
                  </span>
                </td>

                <td className="date-cell">{date}</td>

                <td>
                  <span className={`status-pill ${statusClass}`}>
                    <i />
                    {transaction.status}
                  </span>
                </td>

                <td className={`amount-cell ${amountClass}`}>
                  {amountSign}
                  {formattedAmount}
                </td>
              </tr>
            )
          })}

          {/* Show a message instead of rows when there are no matches. */}
          {visibleTransactions.length === 0 && (
            <tr>
              <td colSpan="5" className="empty-row">
                No transactions here yet. Add one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// Build the shared summary page used for both sales and purchases.
export function SummaryPage({ page, transactions, onAdd }) {
  const isSalesPage = page === 'Sales'

  let transactionType = 'Purchase'
  if (isSalesPage) {
    transactionType = 'Sale'
  }

  const pageTransactions = transactions.filter((transaction) => {
    return transaction.type === transactionType
  })

  const totalAmount = pageTransactions.reduce((sum, transaction) => {
    return sum + Math.abs(transaction.amount)
  }, 0)

  // Start with purchase text and replace it with sales text when needed.
  let pageTitle = 'Stay on top of spending.'
  let pageDescription = 'Keep tabs on what you spend to run your business.'
  let addButtonText = 'purchase'
  let totalLabel = 'Total purchases'
  let averageLabel = 'Average purchase'
  let monthlyChange = '8.2%'
  let recordedNote = 'purchases recorded'
  let tone = 'peach'
  let actionText = 'a purchase'

  if (isSalesPage) {
    pageTitle = 'A closer look at your sales.'
    pageDescription = 'Track incoming revenue and keep your momentum going.'
    addButtonText = 'sale'
    totalLabel = 'Total sales'
    averageLabel = 'Average sale'
    monthlyChange = '12.8%'
    recordedNote = 'sales recorded'
    tone = 'green'
    actionText = 'a sale'
  }

  let averageAmount = 0
  if (pageTransactions.length > 0) {
    averageAmount = Math.round(totalAmount / pageTransactions.length)
  }

  const formattedTotal = currency.format(totalAmount)
  const formattedAverage = currency.format(averageAmount)
  const transactionCount = String(pageTransactions.length).padStart(2, '0')
  const lowerCasePage = page.toLowerCase()

  return (
    <>
      {/* Page introduction and button to add a transaction */}
      <section className="welcome-row">
        <div>
          <Typography className="welcome-title">{pageTitle}</Typography>
          <Typography className="welcome-copy">
            {pageDescription}
          </Typography>
        </div>

        <Button
          className="topbar-add"
          startIcon={<Add />}
          onClick={onAdd}
        >
          Add {addButtonText}
        </Button>
      </section>

      {/* Totals and averages for the selected type */}
      <section className="metrics-grid summary-metrics">
        <MetricCard
          label={totalLabel}
          value={formattedTotal}
          change={monthlyChange}
          note="vs. last month"
          icon={isSalesPage ? TrendingUp : ShoppingBagOutlined}
          tone={tone}
        />

        <MetricCard
          label="Transactions"
          value={transactionCount}
          change="This month"
          note={recordedNote}
          icon={SwapHoriz}
          tone="lavender"
        />

        <MetricCard
          label={averageLabel}
          value={formattedAverage}
          change="Per transaction"
          note="this month"
          icon={ShowChart}
          tone="yellow"
        />
      </section>

      {/* Recent transactions matching this page */}
      <Paper elevation={0} className="panel page-panel">
        <div className="panel-heading page-panel-heading">
          <div>
            <Typography className="panel-title">
              Recent {lowerCasePage}
            </Typography>
            <Typography className="panel-subtitle">
              Your latest {lowerCasePage} activity.
            </Typography>
          </div>
        </div>

        <TransactionTable
          transactions={transactions}
          filter={transactionType}
        />
      </Paper>

      {/* Another shortcut for adding a transaction */}
      <div className="bottom-cta">
        <div className="cta-icon">
          <Add />
        </div>

        <div>
          <strong>One small step, clearer books</strong>
          <span>
            Keep this list current by logging transactions as they happen.
          </span>
        </div>

        <Button onClick={onAdd} endIcon={<ArrowForward />}>
          Add {actionText}
        </Button>
      </div>
    </>
  )
}
