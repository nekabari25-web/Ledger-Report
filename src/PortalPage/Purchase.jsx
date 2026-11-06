import { useOutletContext } from 'react-router-dom'
import { SummaryPage } from './PageComponents.jsx'

// Get shared transaction data and show the purchase summary page.
export default function PurchasePage() {
  const { transactions, onAdd } = useOutletContext()

  return (
    <SummaryPage
      page="Purchases"
      transactions={transactions}
      onAdd={onAdd}
    />
  )
}
