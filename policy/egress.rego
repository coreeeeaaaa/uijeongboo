package egress.allow

default allow = false

# §5.3 Egress Proxy Logic
allow {
  input.jwt.valid
  input.jwt.aud == input.expected_aud
  not reuse(input.jwt.jti)
  input.dpop.valid
  input.mtls.client_verified
  is_allowed_destination(input.dest)
  # Time check: token issued within last 60s
  time.now_ns() - input.jwt.iat_ns < 60 * 1000000000
}

reuse(jti) {
  # In a real implementation, this would check against a cache of recently used JTIs
  false
}

is_allowed_destination(dest) {
  allowed_list := {"api.openai.com", "api.anthropic.com"}
  dest == allowed_list[_]
}
