// Set up one shared formatter so every page displays money the same way.
export const currency = new Intl.NumberFormat('en-NG', {
  // Use the Nigerian naira and Nigeria's number-formatting rules.
  style: 'currency',
  currency: 'NGN',
  // Show whole naira amounts without decimal places.
  maximumFractionDigits: 0,
})
