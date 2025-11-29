const fs = require('fs');

// §7.1 Budget Gate Logic
// Usage: node budget-check.js --budget=100
const args = process.argv.slice(2);
const budgetArg = args.find(arg => arg.startsWith('--budget='));
const budgetLimit = budgetArg ? parseFloat(budgetArg.split('=')[1]) : 100.0;

// In a real scenario, this would fetch from a Cloud Billing API or local aggregated stats file.
// Here we mock the current cost.
// Fail-Closed check: If we cannot retrieve cost, we must exit 1.
const currentCost = getCostFromMonitoringSystem(); 

if (currentCost === null || currentCost === undefined) {
  console.error("FATAL: No cost signal received. Budget Gate Fail-Closed.");
  process.exit(1);
}

console.log(`Current Cost: $${currentCost} / Budget: $${budgetLimit}`);

if (currentCost > budgetLimit) {
  console.error(`FATAL: Budget Exceeded! ($${currentCost} > $${budgetLimit})`);
  // In a real system, this might trigger an alert or logical cutoff.
  process.exit(1);
}

// Warn at thresholds
if (currentCost >= budgetLimit * 1.0) console.warn("WARNING: 100% Budget Hit");
else if (currentCost >= budgetLimit * 0.8) console.warn("WARNING: 80% Budget Hit");
else if (currentCost >= budgetLimit * 0.6) console.warn("WARNING: 60% Budget Hit");

console.log("Budget Gate Passed.");
process.exit(0);

function getCostFromMonitoringSystem() {
  // MOCK: Return a value below budget for demonstration, or null to test fail-closed.
  // In prod, this makes an API call.
  return 42.50; 
}
