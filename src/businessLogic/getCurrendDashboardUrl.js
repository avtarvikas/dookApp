export function getCurrendDashboardUrl(account, defaultPath = '/') {
  if (account) {
    if (account.dashboardType !== 'regular') {
      return '/onDemandDashboard';
    }
  }
  return defaultPath;
}

