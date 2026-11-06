import { useOutletContext } from 'react-router-dom'
import { SummaryPage } from './PageComponents.jsx'

// Get shared transaction data and show the sales summary page.
export default function SalesPage() {
  const { transactions, onAdd } = useOutletContext()

  return (
    <SummaryPage
      page="Sales"
      transactions={transactions}
      onAdd={onAdd}
    />
  )
}
