package budget.gate

# §7.1 Budget Gate (Fail-Closed)
default allow = false

deny[msg] {
  not input.cost.collected
  msg := "no cost signal (fail-closed)"
}

deny[msg] {
  input.cost.total > input.cost.budget
  msg := sprintf("budget exceeded: %.2f > %.2f", [input.cost.total, input.cost.budget])
}

allow {
  not deny
}
