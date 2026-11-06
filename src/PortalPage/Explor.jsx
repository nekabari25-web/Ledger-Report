import { useOutletContext } from 'react-router-dom'
import { ArrowForward, AutoGraph, Check } from '@mui/icons-material'
import { Button, Paper, Typography } from '@mui/material'

// This list supplies the features shown on the plans page.
const planFeatures = [
  'Unlimited sales and purchase tracking',
  'Detailed business reports',
  'Monthly cash flow insights',
]

// Show the available plan and let the visitor open the signup screen.
export default function ExplorePage() {
  const { onSignup } = useOutletContext()

  return (
    <section className="plans-layout">
      {/* Page introduction */}
      <div className="welcome-row">
        <div>
          <Typography className="welcome-title">
            Make room to grow.
          </Typography>
          <Typography className="welcome-copy">
            Choose the tools that help you feel in control of your business
            finances.
          </Typography>
        </div>
      </div>

      {/* A card describing the Evergreen Pro plan */}
      <div className="plans-grid">
        <Paper elevation={0} className="panel plan-card">
          <div className="plan-icon">
            <AutoGraph />
          </div>

          <Typography className="panel-title">Evergreen Pro</Typography>
          <Typography className="panel-subtitle">
            More insight for your next big step.
          </Typography>

          <div className="plan-price">Coming soon</div>

          <ul>
            {planFeatures.map((feature) => (
              <li key={feature}>
                <Check />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            className="topbar-add"
            endIcon={<ArrowForward />}
            onClick={onSignup}
          >
            Get started
          </Button>
        </Paper>
      </div>
    </section>
  )
}
