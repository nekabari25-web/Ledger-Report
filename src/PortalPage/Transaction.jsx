import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Add, Search } from '@mui/icons-material'
import {
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { TransactionTable } from './PageComponents.jsx'

// Show transactions with controls to filter by type and search by text.
export default function TransactionPage() {
  const { transactions, onAdd } = useOutletContext()

  // React remembers the selected type and search text between renders.
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  // Keep a transaction when it matches both the type and search text.
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      filter === 'All' || transaction.type === filter
    const searchText = `${transaction.name} ${transaction.category} ${transaction.type}`
    const matchesQuery = searchText
      .toLowerCase()
      .includes(query.toLowerCase())

    return matchesType && matchesQuery
  })

  return (
    <Paper elevation={0} className="panel page-panel">
      {/* Page title and button for adding a transaction */}
      <div className="panel-heading page-panel-heading">
        <div>
          <Typography className="panel-title">All transactions</Typography>
          <Typography className="panel-subtitle">
            Every sale and purchase, all in one place.
          </Typography>
        </div>

        <Button
          className="topbar-add"
          startIcon={<Add />}
          onClick={onAdd}
        >
          Add transaction
        </Button>
      </div>

      {/* Buttons choose a type; the text field searches transaction details. */}
      <div className="table-toolbar">
        <div className="filter-tabs">
          {['All', 'Sale', 'Purchase'].map((type) => {
            let buttonText = type

            if (type === 'Sale') {
              buttonText = 'Sales'
            } else if (type === 'Purchase') {
              buttonText = 'Purchases'
            }

            return (
              <button
                key={type}
                className={filter === type ? 'selected' : ''}
                onClick={() => setFilter(type)}
              >
                {buttonText}
              </button>
            )
          })}
        </div>

        <TextField
          size="small"
          placeholder="Search transactions"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-field"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      {/* Reuse the shared table component to display the filtered results. */}
      <TransactionTable transactions={filteredTransactions} />
    </Paper>
  )
}
