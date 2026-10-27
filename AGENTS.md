# Portfolio architecture

- Keep this public repository isolated from production: use only local deterministic results and synthetic in-memory CRM records, so portfolio visitors cannot access real clients.
- Never collect contact information or upload face photos in this demo; it has no consent or production data processing infrastructure.
- Keep navigation on HashRouter so static hosting can serve every view.
- Define visual roles in global CSS and use the Button component for commands so the brand presentation remains consistent.
- Generate bundled CRM fixtures with the seeded Python Faker script and verify their provenance in tests, so data can be reproduced without accessing production.
- Capture portfolio screenshots from the local demo in CI and publish generated files with GitHub's API, so evidence remains tied to the public source rather than customer sessions.
- Keep illustrative metric fixtures separate from CRM examples and explicitly marked synthetic, so fabricated scenarios cannot be mistaken for empirical production evidence.
