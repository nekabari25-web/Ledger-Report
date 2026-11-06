import { useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import {
  Add,
  ArrowForward,
  AssessmentOutlined,
  AutoGraph,
  CalendarMonthOutlined,
  ChevronRight,
  Close,
  DashboardOutlined,
  Menu,
  NotificationsNoneOutlined,
  SettingsOutlined,
  ShoppingBagOutlined,
  ShowChart,
  SwapHoriz,
  TrendingUp,
} from '@mui/icons-material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import '../App.css'

// Example data shown when the app first opens.
const initialTransactions = [
  {
    id: 1,
    name: 'Northstar Coffee Co.',
    detail: 'INV-2048 · Nov 4, 2026',
    type: 'Sale',
    category: 'Wholesale',
    amount: 2480,
    status: 'Completed',
    initials: 'NC',
    color: '#e8efe7',
  },
  {
    id: 2,
    name: 'Greenfield Packaging',
    detail: 'PO-0912 · Nov 4, 2026',
    type: 'Purchase',
    category: 'Supplies',
    amount: -640,
    status: 'Pending',
    initials: 'GP',
    color: '#f5eadf',
  },
  {
    id: 3,
    name: 'Harbor Market',
    detail: 'INV-2047 · Nov 3, 2026',
    type: 'Sale',
    category: 'Retail',
    amount: 890,
    status: 'Completed',
    initials: 'HM',
    color: '#e9e9f4',
  },
  {
    id: 4,
    name: 'Brightline Logistics',
    detail: 'PO-0911 · Nov 2, 2026',
    type: 'Purchase',
    category: 'Shipping',
    amount: -325,
    status: 'Completed',
    initials: 'BL',
    color: '#f4e8e9',
  },
  {
    id: 5,
    name: 'Sunday Supply Store',
    detail: 'INV-2046 · Nov 1, 2026',
    type: 'Sale',
    category: 'Retail',
    amount: 1250,
    status: 'Completed',
    initials: 'SS',
    color: '#f1ecdf',
  },
]

// These are the links shown in the main sidebar navigation.
const navItems = [
  { label: 'Overview', icon: DashboardOutlined },
  { label: 'Transactions', icon: SwapHoriz },
  { label: 'Sales', icon: TrendingUp },
  { label: 'Purchases', icon: ShoppingBagOutlined },
  { label: 'Reports', icon: AssessmentOutlined },
]

// Show the Evergreen logo and name.
function Brand() {
  return (
    <div className="brand">
      <Box className="brand-mark">
        <AutoGraph />
      </Box>
      <Typography className="brand-name">
        evergreen<span>.</span>
      </Typography>
    </div>
  )
}

// Show the sidebar and call the supplied functions when a link is clicked.
function Sidebar({
  activePage,
  onNavigate,
  onLogin,
  mobileOpen,
  closeMobile,
}) {
  return (
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      {/* Logo and close button for small screens */}
      <div className="sidebar-top">
        <Brand />
        <IconButton
          className="mobile-close"
          onClick={closeMobile}
          aria-label="Close navigation"
        >
          <Close />
        </IconButton>
      </div>

      {/* Current business and plan */}
      <div className="workspace-switcher">
        <Avatar className="workspace-avatar">S</Avatar>
        <div>
          <strong>Studio &amp; Co.</strong>
          <span>Free plan</span>
        </div>
        <ChevronRight className="workspace-chevron" />
      </div>

      {/* Links to the main app pages */}
      <Typography className="nav-caption">WORKSPACE</Typography>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.label

          return (
            <button
              key={item.label}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.label)
                closeMobile()
              }}
            >
              <Icon fontSize="small" />
              <span>{item.label}</span>

              {item.label === 'Transactions' && (
                <span className="nav-count">12</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Upgrade offer and links at the bottom of the sidebar */}
      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon">
            <ShowChart />
          </div>
          <strong>Know your numbers</strong>
          <span>Unlock deeper insights with Evergreen Pro.</span>
          <button
            onClick={() => {
              onNavigate('Explore plans')
              closeMobile()
            }}
          >
            Explore plans <ArrowForward />
          </button>
        </div>

        <button
          className={`nav-item ${activePage === 'Settings' ? 'active' : ''}`}
          onClick={() => {
            onNavigate('Settings')
            closeMobile()
          }}
        >
          <SettingsOutlined fontSize="small" />
          <span>Settings</span>
        </button>

        <button className="profile-link" onClick={onLogin}>
          <Avatar className="profile-avatar">JD</Avatar>
          <span>
            <strong>Jamie Davis</strong>
            <small>jamie@studio.co</small>
          </span>
          <ChevronRight className="profile-chevron" />
        </button>
      </div>
    </aside>
  )
}

// Show the current page title, date, and header buttons.
function Header({ activePage, onAdd, onMenu, onLogin }) {
  const today = new Date()
  const date = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(today)

  return (
    <header className="topbar">
      {/* Page name and the mobile menu button */}
      <div className="topbar-title">
        <IconButton
          className="menu-button"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Menu />
        </IconButton>
        <div>
          <Typography className="eyebrow">{date.toUpperCase()}</Typography>
          <Typography className="page-title">{activePage}</Typography>
        </div>
      </div>

      {/* Actions on the right side of the header */}
      <div className="header-actions">
        <Button
          className="topbar-add"
          startIcon={<Add />}
          onClick={onAdd}
        >
          Add transaction
        </Button>
        <IconButton
          className="notification-button"
          aria-label="Notifications"
          onClick={onLogin}
        >
          <NotificationsNoneOutlined />
        </IconButton>
        <Avatar className="topbar-avatar" onClick={onLogin}>
          JD
        </Avatar>
      </div>
    </header>
  )
}

// Show the example workspace settings.
function SettingsPage({ onLogin }) {
  return (
    <Paper elevation={0} className="panel settings-panel">
      <Typography className="panel-title">Workspace settings</Typography>
      <Typography className="panel-subtitle">
        Make Evergreen feel like your own.
      </Typography>

      {/* Business profile setting */}
      <Divider className="settings-divider" />
      <div className="settings-row">
        <div>
          <strong>Business profile</strong>
          <span>Studio &amp; Co. · Small business</span>
        </div>
        <Button onClick={onLogin}>Edit profile</Button>
      </div>

      {/* Currency setting */}
      <Divider />
      <div className="settings-row">
        <div>
          <strong>Currency</strong>
          <span>US Dollar (USD)</span>
        </div>
        <span className="settings-value">USD $</span>
      </div>

      {/* Notification setting */}
      <Divider />
      <div className="settings-row">
        <div>
          <strong>Notifications</strong>
          <span>Transaction reminders and monthly summaries</span>
        </div>
        <Chip label="Enabled" className="settings-chip" />
      </div>
    </Paper>
  )
}

// Show the login or signup form depending on the selected mode.
function AuthScreen({ mode, onModeChange, onClose }) {
  const isSignup = mode === 'signup'
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  // Stop the browser from reloading and show the demo success message.
  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  // Clear the form's success message and switch between login and signup.
  function switchMode() {
    setSubmitted(false)

    if (isSignup) {
      onModeChange('login')
    } else {
      onModeChange('signup')
    }
  }

  return (
    <main className="auth-page">
      {/* Introductory text on the left side */}
      <div className="auth-left">
        <div className="auth-brand">
          <Brand />
        </div>

        <div className="auth-content">
          <span className="auth-kicker">
            <span /> YOUR BUSINESS, IN BALANCE
          </span>
          <Typography className="auth-headline">
            A little more clarity.
            <br />
            <em>A lot more confidence.</em>
          </Typography>
          <Typography className="auth-description">
            A calmer way to keep track of the money coming in and going out.
            Because running your business is enough work already.
          </Typography>

          <div className="auth-proof">
            <div className="proof-avatars">
              <Avatar>J</Avatar>
              <Avatar>M</Avatar>
              <Avatar>A</Avatar>
            </div>
            <span>Made for the people who make it happen.</span>
          </div>
        </div>

        <span className="auth-decoration decoration-one" />
        <span className="auth-decoration decoration-two" />
      </div>

      {/* Login/signup form on the right side */}
      <div className="auth-right">
        <IconButton
          className="auth-close"
          onClick={onClose}
          aria-label="Back to dashboard"
        >
          <Close />
        </IconButton>

        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">
            <Brand />
          </div>

          <Typography className="auth-form-title">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </Typography>
          <Typography className="auth-form-subtitle">
            {isSignup
              ? 'Start bringing your business finances into focus.'
              : 'Pick up right where you left off.'}
          </Typography>

          {submitted ? (
            <Alert severity="success" className="auth-success">
              You&apos;re all set! This demo keeps your information on this
              device.
            </Alert>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignup && (
                <TextField
                  label="Your name"
                  placeholder="Jamie Davis"
                  fullWidth
                  required
                />
              )}

              <TextField
                label="Email address"
                type="email"
                placeholder="you@yourbusiness.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                slotProps={{ htmlInput: { minLength: 8 } }}
                fullWidth
                required
              />

              {!isSignup && (
                <button
                  className="forgot-link"
                  type="button"
                  onClick={() => setSubmitted(true)}
                >
                  Forgot password?
                </button>
              )}

              <Button
                type="submit"
                className="auth-submit"
                fullWidth
              >
                {isSignup ? 'Create account' : 'Log in'}
                <ArrowForward />
              </Button>
            </form>
          )}

          {/* Link to switch between creating an account and logging in */}
          <div className="auth-switch">
            {isSignup
              ? 'Already have an account?'
              : 'New to Evergreen?'}
            <button onClick={switchMode}>
              {isSignup ? 'Log in' : 'Create an account'}
            </button>
          </div>

          <Typography className="auth-terms">
            By continuing, you agree to our <a href="#terms">Terms</a> and{' '}
            <a href="#privacy">Privacy Policy</a>.
          </Typography>
        </div>

        {/* Links and copyright at the bottom of the form */}
        <div className="auth-footer">
          <span>© 2026 Evergreen</span>
          <span>
            Made for small business <span className="footer-heart">♥</span>
          </span>
        </div>
      </div>
    </main>
  )
}

// Show a dialog for entering a new sale or purchase.
function TransactionDialog({ open, onClose, onSave }) {
  const [type, setType] = useState('Sale')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Retail')
  const [amount, setAmount] = useState('')

  // Reset the fields and close the dialog.
  function handleClose() {
    setName('')
    setAmount('')
    setCategory('Retail')
    setType('Sale')
    onClose()
  }

  // Check the entered data, then ask the parent to save the transaction.
  function handleSubmit(event) {
    event.preventDefault()

    const numberAmount = Number(amount)
    const hasName = name.trim().length > 0
    const hasValidAmount =
      Number.isFinite(numberAmount) && numberAmount > 0

    if (!hasName || !hasValidAmount) {
      return
    }

    let signedAmount = numberAmount
    if (type === 'Purchase') {
      signedAmount = -numberAmount
    }

    onSave({
      name: name.trim(),
      category,
      amount: signedAmount,
      type,
    })

    handleClose()
  }

  // Categories depend on whether this is a sale or a purchase.
  let categories = ['Retail', 'Wholesale', 'Services', 'Other']
  if (type === 'Purchase') {
    categories = ['Supplies', 'Shipping', 'Equipment', 'Other']
  }

  const today = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { className: 'transaction-dialog' } }}
    >
      <form onSubmit={handleSubmit}>
        {/* Dialog title and close button */}
        <DialogTitle className="dialog-heading">
          <span>
            <strong>Add a transaction</strong>
            <small>Keep your business books up to date.</small>
          </span>
          <IconButton onClick={handleClose} aria-label="Close">
            <Close />
          </IconButton>
        </DialogTitle>

        {/* Input fields for the new transaction */}
        <DialogContent className="dialog-content">
          <div className="transaction-type-switch">
            {['Sale', 'Purchase'].map((transactionType) => (
              <button
                key={transactionType}
                type="button"
                className={type === transactionType ? 'selected' : ''}
                onClick={() => {
                  setType(transactionType)

                  if (transactionType === 'Sale') {
                    setCategory('Retail')
                  } else {
                    setCategory('Supplies')
                  }
                }}
              >
                {transactionType}
              </button>
            ))}
          </div>

          <TextField
            label="Customer or supplier"
            placeholder="e.g. Northstar Coffee Co."
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            required
            autoFocus
          />

          <TextField
            select
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            fullWidth
          >
            {categories.map((categoryName) => (
              <MenuItem key={categoryName} value={categoryName}>
                {categoryName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            fullWidth
            required
            slotProps={{
              htmlInput: { min: 0.01, step: '0.01' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
          />

          <Typography className="dialog-date">
            <CalendarMonthOutlined />
            Recorded as today · {today}
          </Typography>
        </DialogContent>

        {/* Cancel or save the new transaction */}
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose} className="cancel-button">
            Cancel
          </Button>
          <Button type="submit" className="topbar-add">
            Save transaction
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

// Keep the app's shared data and controls, then show the selected page.
export default function PortalLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  // Match each URL with the title shown in the page header.
  const routePages = {
    '/': 'Overview',
    '/transactions': 'Transactions',
    '/sales': 'Sales',
    '/purchases': 'Purchases',
    '/reports': 'Reports',
    '/explore': 'Explore plans',
    '/settings': 'Settings',
  }

  const activePage = routePages[location.pathname] || 'Overview'

  // State values that change as the visitor uses the app.
  const [authMode, setAuthMode] = useState('')
  const [transactions, setTransactions] = useState(initialTransactions)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Add a new transaction at the start of the existing list.
  function addTransaction(transaction) {
    setTransactions((currentTransactions) => {
      const newId = Date.now()
      const invoiceNumber = String(
        currentTransactions.length + 2049,
      ).padStart(4, '0')
      const today = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date())
      const initials = transaction.name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()

      let color = '#f5eadf'
      if (transaction.type === 'Sale') {
        color = '#e8efe7'
      }

      const newTransaction = {
        ...transaction,
        id: newId,
        detail: `NEW-${invoiceNumber} · ${today}`,
        status: 'Completed',
        initials,
        color,
      }

      return [newTransaction, ...currentTransactions]
    })

    setDialogOpen(false)
    setToastOpen(true)
  }

  // Open the add-transaction dialog.
  function onAdd() {
    setDialogOpen(true)
  }

  // Match page names with the URLs used by the navigation.
  const pagePaths = {
    Overview: '/',
    Transactions: '/transactions',
    Sales: '/sales',
    Purchases: '/purchases',
    Reports: '/reports',
    'Explore plans': '/explore',
    Settings: '/settings',
  }

  // Move to the page selected from the sidebar or a link.
  function onNavigate(page) {
    navigate(pagePaths[page] || '/')
  }

  // Show the login or signup screen instead of the rest of the app.
  if (authMode) {
    return (
      <AuthScreen
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthMode('')}
      />
    )
  }

  // Share the transaction list and actions with the page inside <Outlet />.
  const pageContext = {
    transactions,
    onAdd,
    onNavigate,
    onSignup: () => setAuthMode('signup'),
    onLogin: () => setAuthMode('signup'),
  }

  return (
    <div className="app-shell">
      {/* Dark background behind the open mobile sidebar */}
      {mobileOpen && (
        <button
          className="mobile-scrim"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
      )}

      {/* Sidebar and page content */}
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        onLogin={() => setAuthMode('login')}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <main className="main-area">
        <Header
          activePage={activePage}
          onAdd={onAdd}
          onMenu={() => setMobileOpen(true)}
          onLogin={() => setAuthMode('login')}
        />

        <div className="content-area">
          <Outlet context={pageContext} />
          {activePage === 'Settings' && (
            <SettingsPage onLogin={() => setAuthMode('signup')} />
          )}
        </div>
      </main>

      {/* Dialog and confirmation message for adding a transaction */}
      <TransactionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={addTransaction}
      />

      <Snackbar
        open={toastOpen}
        autoHideDuration={3200}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
          className="save-toast"
        >
          Transaction saved to your books.
        </Alert>
      </Snackbar>
    </div>
  )
}
