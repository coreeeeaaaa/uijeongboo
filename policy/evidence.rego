package evidence.gate

# §6.1 Evidence Gate (2/3 Rule)
default allow = false

deny[msg] {
  not sources_ok
  msg := "insufficient independent evidence (need 2/3 from log, trace, git)"
}

sources_ok {
  # Count unique source kinds provided in the evidence input
  kinds := {s | s := input.evidence.sources[_]; s.kind == "log" } |
           {s | s := input.evidence.sources[_]; s.kind == "trace" } |
           {s | s := input.evidence.sources[_]; s.kind == "git" }
  count(kinds) >= 2
}

allow {
  not deny
}
