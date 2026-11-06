import { Navigate, Route, Routes } from 'react-router-dom'
import OverviewPage from './PortalPage/OverviewPage.jsx'
import TransactionPage from './PortalPage/Transaction.jsx'
import SalesPage from './PortalPage/Sales.jsx'
import PurchasePage from './PortalPage/Purchase.jsx'
import ReportPage from './PortalPage/Report.jsx'
import ExplorePage from './PortalPage/Explor.jsx'
import PortalLayout from './PortalPage/PortalLayout.jsx'
import './App.css'

// This function connects each URL to the page that should appear there.
export default function App() {
  return (
    <Routes>
      {/* These pages all share the sidebar and header in PortalLayout. */}
      <Route element={<PortalLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="transactions" element={<TransactionPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="purchases" element={<PurchasePage />} />
        <Route path="reports" element={<ReportPage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="settings" />

        {/* Unknown addresses send the visitor back to the overview. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
