import importlib.util
import json
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('generator', ROOT / 'scripts/generate_synthetic_leads.py')
generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generator)

class SyntheticLeadTests(unittest.TestCase):
    def test_default_generates_300(self):
        self.assertEqual(len(generator.generate_leads()), 300)

    def test_bounds_200_and_500(self):
        self.assertEqual(len(generator.generate_leads(200)), 200)
        self.assertEqual(len(generator.generate_leads(500)), 500)

    def test_out_of_bounds_rejected(self):
        for count in (199, 501):
            with self.subTest(count=count), self.assertRaises(ValueError):
                generator.generate_leads(count)

    def test_reproducible_seed(self):
        self.assertEqual(generator.generate_leads(seed=42), generator.generate_leads(seed=42))
        self.assertNotEqual(generator.generate_leads(seed=42), generator.generate_leads(seed=43))

    def test_explicitly_synthetic_no_contact_fields(self):
        leads = generator.generate_leads()
        self.assertEqual(len({lead['id'] for lead in leads}), 300)
        for lead in leads:
            self.assertTrue(lead['synthetic'])
            self.assertTrue(lead['nome'].startswith('Fictício: '))
            self.assertEqual(set(lead), {'id', 'nome', 'interesse', 'status', 'faixa_etaria', 'synthetic'})
            self.assertIn(lead['status'], generator.STATUSES)
            self.assertIn(lead['faixa_etaria'], generator.AGES)

    def test_committed_dataset_matches_generator(self):
        saved = json.loads((ROOT / 'src/data/synthetic-leads.json').read_text(encoding='utf-8'))
        self.assertEqual(saved, generator.generate_leads())

    def test_metric_example_19_and_not_production(self):
        metrics = generator.illustrative_metrics()
        self.assertEqual(metrics['n'], 19)
        self.assertIs(metrics['synthetic'], True)
        self.assertIn('NOT measured production', metrics['provenance'])
        self.assertEqual(metrics['completed_runs'], 18)
        self.assertEqual(metrics['structured_outputs'], 16)
        self.assertEqual(metrics['reviewer_accepted_drafts'], 15)

if __name__ == '__main__':
    unittest.main()
