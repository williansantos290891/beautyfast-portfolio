"""Reproducible portfolio fixtures. Never reads production data."""
import argparse
import json
import random
from pathlib import Path
from faker import Faker

ROOT = Path(__file__).resolve().parents[1]
STATUSES = ('novo', 'contatado', 'agendado', 'compareceu', 'em_tratamento', 'concluido', 'perdido', 'arquivado')
AGES = ('18-25', '26-35', '36-45', '46-55', '56-65', '65+')
INTERESTS = ('Testa', 'Entre as sobrancelhas', 'Ao redor dos olhos', 'Maçãs do rosto', 'Do nariz à boca', 'Lábios', 'Contorno do rosto', 'Queixo e pescoço', 'Pele em geral')

def generate_leads(count=300, seed=42):
    if not 200 <= count <= 500:
        raise ValueError('Count must be between 200 and 500.')
    fake = Faker('pt_BR')
    fake.seed_instance(seed)
    rng = random.Random(seed)
    return [
        {
            'id': f'synthetic-{i + 1:04d}',
            'nome': f'Fictício: {fake.name()}',
            'interesse': ' / '.join(rng.sample(INTERESTS, rng.randint(1, 3))),
            'status': STATUSES[i % len(STATUSES)],
            'faixa_etaria': rng.choice(AGES),
            'synthetic': True,
        }
        for i in range(count)
    ]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--count', type=int, default=300)
    parser.add_argument('--seed', type=int, default=42)
    args = parser.parse_args()
    try:
        leads = generate_leads(args.count, args.seed)
    except ValueError as error:
        parser.error(str(error))
    target = ROOT / 'src/data/synthetic-leads.json'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(leads, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Generated {len(leads)} explicitly fictional leads (seed={args.seed}).')

if __name__ == '__main__':
    main()
