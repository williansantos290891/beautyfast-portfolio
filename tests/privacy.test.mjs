import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
const root = new URL('../', import.meta.url).pathname;
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (['.git', 'node_modules', 'dist', '__pycache__'].includes(entry.name)) return [];
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}
const all = files(root);
const runtime = all.filter(path => relative(root, path).startsWith('src/'));
test('Public snapshot excludes production configuration and customer exports', () => {
  const forbidden = all.filter(path => /(^|\/)(\.env(?:\..*)?|supabase|integrations|migrations|\.lovable)(\/|$)|depoimento|\.asset\.json$|\.(csv|sql|sqlite|db)$/i.test(relative(root, path)));
  assert.deepEqual(forbidden.map(path => relative(root, path)), []);
});
test('Demo runtime cannot call production services or store personal information', () => {
  const source = runtime.map(path => readFileSync(path, 'utf8')).join('\n');
  assert.equal(/\bfetch\s*\(|XMLHttpRequest|WebSocket|supabase|functions\.invoke|localStorage|sessionStorage|indexedDB|sendBeacon|https?:\/\//i.test(source), false);
  assert.equal(/type\s*=\s*["'](?:file|email|tel)["']|telefone|imagemBase64/i.test(source), false);
});
test('300 bundled leads are explicitly fictional with unique IDs', () => {
  const leads = JSON.parse(readFileSync(join(root, 'src/data/synthetic-leads.json'), 'utf8'));
  assert.equal(leads.length, 300);
  assert.equal(new Set(leads.map(lead => lead.id)).size, 300);
  assert.equal(leads.every(lead => lead.synthetic === true && lead.nome.startsWith('Fictício: ')), true);
});
