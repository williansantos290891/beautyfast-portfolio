import { useState } from 'react';
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, RotateCcw, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Button, cn } from './components/Button';
import { FaceMap } from './components/FaceMap';
import { DEMO_LEADS, FAIXAS_ETARIAS, STATUS, STATUS_LABEL, ZONAS, type DemoLead, type Status } from './lib/demo';

function Layout() {
  return <>
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
        <Link to="/" className="text-lg font-semibold">Beauty Fast <span className="block font-display text-base font-normal text-secondary">by Clarissa Dias</span></Link>
        <nav className="flex items-center gap-2" aria-label="Navegação principal">
          <Button asChild size="sm" variant="ghost"><Link to="/crm"><Users /> CRM demo</Link></Button>
          <Button asChild size="sm"><Link to="/questionario">Começar agora <ArrowRight /></Link></Button>
        </nav>
      </div>
    </header>
    <div role="status" className="border-b border-border bg-muted/40 px-5 py-3 text-center text-xs text-muted-foreground">
      Portfólio · Dados fictícios · Sem envio de informações · Sem análise clínica
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionario" element={<Questionario />} />
      <Route path="/relatorio" element={<Relatorio />} />
      <Route path="/crm" element={<CRM />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <footer className="mt-16 border-t border-border px-5 py-8 text-center text-xs text-muted-foreground">
      Beauty Fast · Demonstração de portfólio por Willian Santos · Nenhum dado real de clientes
    </footer>
  </>;
}

function Home() {
  return <main className="mx-auto max-w-6xl px-5">
    <section className="grid items-center gap-10 py-12 md:grid-cols-[1.4fr_1fr] md:py-20">
      <div>
        <p className="mb-4 flex items-center gap-2 text-sm text-secondary"><Sparkles className="h-4 w-4" /> Leitura de Pele</p>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">Descubra as áreas do seu rosto que pedem harmonização e evite procedimentos desnecessários</h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">Uma orientação antes de qualquer decisão. Explore a seleção visual de regiões faciais e um relatório interativo de exemplo.</p>
        <Button asChild className="mt-8"><Link to="/questionario">Iniciar Leitura de Pele <ArrowRight /></Link></Button>
      </div>
      <div className="mx-auto w-full max-w-sm"><FaceMap selected={['ZONA_TESTA', 'ZONA_MALAR', 'ZONA_LABIOS']} /></div>
    </section>
    <section className="border-t border-border py-10">
      <h2 className="text-2xl font-semibold">A orientação que deveria vir antes de qualquer procedimento.</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {[
          ['01', 'Seu perfil', 'Idade, objetivos e regiões de interesse em uma experiência acessível.'],
          ['02', 'Sua Leitura de Pele', 'Um mapa interativo conecta cada região à sua observação.'],
          ['03', 'Atendimento organizado', 'Um quadro acompanha as oportunidades em cada etapa.']
        ].map(([n, title, text]) => <div key={n}><span className="text-sm text-secondary">{n}</span><h3 className="mt-3 font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}
      </div>
    </section>
  </main>;
}

function Questionario() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [age, setAge] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) => setSelected(values => values.includes(id) ? values.filter(v => v !== id) : [...values, id]);
  return <main className="mx-auto max-w-3xl px-5 py-8">
    <Button asChild variant="ghost" size="sm"><Link to="/"><ArrowLeft /> Início</Link></Button>
    <h1 className="mt-5 text-2xl font-semibold">Simulação Estética</h1>
    <ol className="my-6 flex gap-4 text-sm">
      {['Idade', 'Foco'].map((label, i) => <li key={label} className={cn('border-b-2 py-2', i === step ? 'border-secondary text-foreground' : 'border-border text-muted-foreground')} aria-current={i === step ? 'step' : undefined}>{i + 1}. {label}</li>)}
    </ol>
    {step === 0 ? <section>
      <h2 className="text-lg font-medium">Qual faixa etária deseja explorar?</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FAIXAS_ETARIAS.map(value => <Button key={value} variant="outline" aria-pressed={age === value} onClick={() => { setAge(value); setStep(1); }} className={cn('min-h-20', age === value && 'border-secondary bg-secondary/10')}>{value} anos</Button>)}
      </div>
    </section> : <section>
      <h2 className="text-lg font-medium">O que mais te incomoda hoje?</h2>
      <p className="mt-2 text-sm text-muted-foreground">Selecione uma ou mais regiões.</p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ZONAS.map(z => <Button key={z.id} variant="outline" aria-pressed={selected.includes(z.id)} onClick={() => toggle(z.id)} className={cn('relative h-auto flex-col items-stretch whitespace-normal p-3 text-left', selected.includes(z.id) && 'border-secondary bg-secondary/10')}>
          {selected.includes(z.id) && <Check className="absolute right-2 top-2 text-secondary" />}
          <FaceMap selected={[z.id]} compact />
          <span className="font-medium">{z.nome}</span><span className="text-xs font-normal leading-relaxed text-muted-foreground">{z.descricao}</span>
        </Button>)}
      </div>
    </section>}
    <div className="mt-6 flex items-center justify-between gap-3">
      <Button variant="outline" disabled={step === 0} onClick={() => setStep(0)}><ArrowLeft /> Anterior</Button>
      <Button disabled={step !== 1 || selected.length === 0} onClick={() => navigate('/relatorio', { state: { age, selected } })}>Ver exemplo <ArrowRight /></Button>
    </div>
  </main>;
}

interface ReportState { age?: string; selected?: string[] }
function Relatorio() {
  const { state } = useLocation();
  const data = (state ?? {}) as ReportState;
  const selected = (data.selected ?? []).filter(id => ZONAS.some(z => z.id === id));
  const [active, setActive] = useState<string>(selected[0] ?? '');
  const zone = ZONAS.find(z => z.id === active);
  if (!selected.length) return <Navigate to="/questionario" replace />;
  return <main className="mx-auto max-w-5xl px-5 py-8">
    <Button asChild variant="ghost" size="sm"><Link to="/questionario"><ArrowLeft /> Recomeçar</Link></Button>
    <p className="mt-5 text-sm text-secondary">Relatório demonstrativo · {data.age} anos</p>
    <h1 className="mt-2 text-2xl font-semibold md:text-4xl">Esta é uma Leitura de Pele de exemplo.</h1>
    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">As regiões selecionadas estão destacadas abaixo. Este exemplo não utiliza foto nem IA e não indica procedimentos para uma pessoa real.</p>
    <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
      <section className="glass rounded-md p-5"><h2 className="text-lg font-medium">Mapa facial</h2><FaceMap selected={selected} active={active} onSelect={setActive} /></section>
      <section><h2 className="text-lg font-medium">Regiões selecionadas</h2>
        <div className="mt-4 flex flex-col gap-3">{selected.map(id => {
          const z = ZONAS.find(item => item.id === id);
          if (!z) return null;
          return <Button key={id} variant="outline" aria-pressed={active === id} onClick={() => setActive(id)} className={cn('justify-between whitespace-normal text-left', active === id && 'border-secondary bg-secondary/10')}>{z.nome}<ArrowRight /></Button>;
        })}</div>
        {zone && <div className="mt-6 border-t border-border pt-5" aria-live="polite"><h3 className="font-medium">{zone.nome}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{zone.descricao} Na experiência original, a observação dessa região vem de uma análise assistida por IA, seguida de avaliação profissional.</p></div>}
      </section>
    </div>
    <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0" /> Exemplo de interface. Não é diagnóstico médico nem recomendação clínica.</p>
  </main>;
}

function CRM() {
  const [leads, setLeads] = useState<DemoLead[]>(() => DEMO_LEADS.map(lead => ({ ...lead })));
  const changeStatus = (id: string, status: Status) => setLeads(values => values.map(lead => lead.id === id ? { ...lead, status } : lead));
  return <main className="mx-auto max-w-6xl px-5 py-8">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-secondary">CRM demonstrativo</p><h1 className="mt-2 text-2xl font-semibold">Quadro de oportunidades</h1></div>
      <Button variant="outline" onClick={() => setLeads(DEMO_LEADS.map(lead => ({ ...lead })))}><RotateCcw /> Reiniciar exemplos</Button>
    </div>
    <p className="mt-4 text-sm text-muted-foreground">Pessoas fictícias. Alterações permanecem apenas nesta sessão.</p>
    <div className="mt-8 flex gap-4 overflow-x-auto pb-5" aria-label="Quadro CRM">
      {STATUS.map(status => <section key={status} className="w-64 shrink-0 border-t-2 border-secondary/40 pt-4">
        <h2 className="flex justify-between gap-2 text-sm font-medium">{STATUS_LABEL[status]}<span className="text-muted-foreground">{leads.filter(lead => lead.status === status).length}</span></h2>
        <div className="mt-4 space-y-3">{leads.filter(lead => lead.status === status).map(lead => <article key={lead.id} className="glass rounded-md p-4">
          <p className="text-xs text-secondary">Exemplo fictício</p><h3 className="mt-2 text-sm font-medium">{lead.nome}</h3><p className="mt-2 text-xs text-muted-foreground">{lead.interesse}</p>
          <label className="mt-4 block text-xs text-muted-foreground" htmlFor={lead.id}>Etapa</label>
          <select id={lead.id} aria-label={`Etapa de ${lead.nome}`} className="mt-2 w-full text-xs" value={lead.status} onChange={e => { const value = STATUS.find(s => s === e.target.value); if (value) changeStatus(lead.id, value); }}>
            {STATUS.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
        </article>)}</div>
      </section>)}
    </div>
  </main>;
}

export default function App() { return <HashRouter><Layout /></HashRouter>; }
