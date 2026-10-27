# Portfolio architecture

- Keep this public repository isolated from production: use only local deterministic results and synthetic in-memory CRM records, so portfolio visitors cannot access real clients.
- Never collect contact information or upload face photos in this demo; it has no consent or production data processing infrastructure.
- Keep navigation on HashRouter so static hosting can serve every view.
- Define visual roles in global CSS and use the Button component for commands so the brand presentation remains consistent.
