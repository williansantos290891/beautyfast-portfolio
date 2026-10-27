import { ZONAS } from '../lib/demo';
interface Props { selected: string[]; active?: string; onSelect?: (id: string) => void; compact?: boolean }
export function FaceMap({ selected, active, onSelect, compact }: Props) {
  const ordered = [...ZONAS].sort((a, b) => Number(b.id === 'ZONA_PELE') - Number(a.id === 'ZONA_PELE'));
  return <svg viewBox="0 0 300 400" className={compact ? 'h-24 w-full' : 'mx-auto w-full max-w-xs'} role="group" aria-label="Mapa facial ilustrativo">
    <path d={ZONAS.find(z => z.id === 'ZONA_PELE')?.path} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
    <path d="M150 152 C144 186 138 204 150 210 C162 204 156 186 150 152 M74 118 C92 106 116 106 128 114 M226 118 C208 106 184 106 172 114" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
    {ordered.map(z => {
      const chosen = selected.includes(z.id);
      const clickable = chosen && Boolean(onSelect);
      return <path key={z.id} d={z.path}
        fill={z.id === 'ZONA_PELE' ? 'none' : chosen ? 'hsl(var(--secondary))' : 'hsl(var(--muted))'}
        fillOpacity={chosen ? 0.65 : 0.22}
        stroke={active === z.id ? 'hsl(var(--primary))' : chosen ? 'hsl(var(--secondary))' : 'hsl(var(--border))'}
        strokeWidth={active === z.id ? 3 : 1.5}
        strokeDasharray={z.id === 'ZONA_PELE' ? '6 7' : undefined}
        className={clickable ? 'face-zone' : undefined}
        role={clickable ? 'button' : undefined} tabIndex={clickable ? 0 : undefined}
        aria-label={clickable ? z.nome : undefined} aria-pressed={clickable ? active === z.id : undefined}
        onClick={() => { if (clickable) onSelect?.(z.id); }}
        onKeyDown={e => { if (clickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect?.(z.id); } }}>
        <title>{z.nome}</title>
      </path>;
    })}
  </svg>;
}
