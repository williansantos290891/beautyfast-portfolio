"""Publish only allowlisted synthetic evidence from this repository's CI job."""
import base64
import json
import os
from pathlib import Path
from urllib.request import Request, urlopen
ROOT = Path(__file__).resolve().parents[1]
FILES = (
    'src/data/synthetic-leads.json',
    'docs/illustrative-copilot-results.json',
    'docs/screenshots/report.png',
    'docs/screenshots/crm.png',
)

def main():
    token = os.environ['GH_TOKEN']
    repository = os.environ['GITHUB_REPOSITORY']
    branch = os.environ['GITHUB_REF_NAME']
    def api(path, body=None, method='GET'):
        request = Request(f'https://api.github.com/repos/{repository}/{path}',
            data=json.dumps(body).encode() if body is not None else None,
            method=method, headers={'Authorization': f'Bearer {token}', 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json'})
        with urlopen(request) as response:
            return json.load(response)
    ref = api(f'git/ref/heads/{branch}')
    head = ref['object']['sha']
    if head != os.environ['GITHUB_SHA']:
        raise RuntimeError('Branch changed during evidence generation; rerun the workflow.')
    commit = api(f'git/commits/{head}')
    entries = []
    for name in FILES:
        blob = api('git/blobs', {'content': base64.b64encode((ROOT / name).read_bytes()).decode(), 'encoding': 'base64'}, 'POST')
        entries.append({'path': name, 'mode': '100644', 'type': 'blob', 'sha': blob['sha']})
    tree = api('git/trees', {'base_tree': commit['tree']['sha'], 'tree': entries}, 'POST')
    if tree['sha'] == commit['tree']['sha']:
        print('Generated evidence already matches committed files.')
        return
    new_commit = api('git/commits', {'message': 'Generate 300 Faker leads and synthetic demo screenshots', 'tree': tree['sha'], 'parents': [head], 'author': {'name': 'github-actions[bot]', 'email': '41898282+github-actions[bot]@users.noreply.github.com'}}, 'POST')
    api(f'git/refs/heads/{branch}', {'sha': new_commit['sha'], 'force': False}, 'PATCH')
    print('Published allowlisted synthetic evidence.')

if __name__ == '__main__':
    main()
