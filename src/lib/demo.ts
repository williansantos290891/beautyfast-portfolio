import syntheticLeads from '../data/synthetic-leads.json';
export const FAIXAS_ETARIAS = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
export const ZONAS = [
  { id: 'ZONA_TESTA', nome: 'Testa', descricao: 'Linhas que aparecem ao levantar as sobrancelhas.', path: 'M64 108 C82 68 118 52 150 52 C182 52 218 68 236 108 C200 92 100 92 64 108Z' },
  { id: 'ZONA_GLABELA', nome: 'Entre as sobrancelhas', descricao: 'O vinco que dá uma expressão de preocupação.', path: 'M136 116 C148 110 152 110 164 116 C170 130 170 142 164 152 C152 158 148 158 136 152 C130 142 130 130 136 116Z' },
  { id: 'ZONA_OLHOS', nome: 'Ao redor dos olhos', descricao: 'Risquinhos no canto dos olhos e aparência de cansaço.', path: 'M62 136 C80 116 116 116 124 140 C116 162 76 162 62 136Z M238 136 C220 116 184 116 176 140 C184 162 224 162 238 136Z' },
  { id: 'ZONA_MALAR', nome: 'Maçãs do rosto', descricao: 'Bochechas com menos volume ou sustentação.', path: 'M56 176 C80 160 112 168 118 194 C110 222 68 224 56 200Z M244 176 C220 160 188 168 182 194 C190 222 232 224 244 200Z' },
  { id: 'ZONA_NASOLABIAL', nome: 'Do nariz à boca', descricao: 'Os sulcos conhecidos como bigode chinês.', path: 'M124 200 C112 226 110 250 122 268 C116 244 122 220 132 204Z M176 200 C188 226 190 250 178 268 C184 244 178 220 168 204Z' },
  { id: 'ZONA_LABIOS', nome: 'Lábios', descricao: 'Contorno, volume e hidratação dos lábios.', path: 'M116 264 C132 252 168 252 184 264 C168 288 132 288 116 264Z' },
  { id: 'ZONA_MANDIBULA', nome: 'Contorno do rosto', descricao: 'O contorno lateral que ficou menos marcado.', path: 'M62 236 C76 296 112 334 150 342 C188 334 224 296 238 236 C228 300 194 352 150 358 C106 352 72 300 62 236Z' },
  { id: 'ZONA_SUBMENTUAL', nome: 'Queixo e pescoço', descricao: 'Papada e pele mais solta embaixo do queixo.', path: 'M112 348 C130 366 170 366 188 348 C184 384 116 384 112 348Z' },
  { id: 'ZONA_PELE', nome: 'Pele em geral', descricao: 'Textura, viço, poros e pequenas manchas.', path: 'M150 44 C214 44 248 100 248 186 C248 274 208 350 150 366 C92 350 52 274 52 186 C52 100 86 44 150 44Z' }
];
export const STATUS = ['novo', 'contatado', 'agendado', 'compareceu', 'em_tratamento', 'concluido', 'perdido', 'arquivado'] as const;
export type Status = typeof STATUS[number];
export const STATUS_LABEL: Record<Status, string> = {
  novo: 'Novo', contatado: 'Contatado', agendado: 'Agendado', compareceu: 'Compareceu',
  em_tratamento: 'Em acompanhamento', concluido: 'Concluído', perdido: 'Perdido', arquivado: 'Arquivado'
};
export interface DemoLead { id: string; nome: string; interesse: string; status: Status }
export const DEMO_LEADS: DemoLead[] = syntheticLeads.flatMap(lead => {
  const status = STATUS.find(value => value === lead.status);
  if (!status || lead.synthetic !== true || !lead.nome.startsWith('Fictício: ')) return [];
  return [{ id: lead.id, nome: lead.nome, interesse: lead.interesse, status }];
});
