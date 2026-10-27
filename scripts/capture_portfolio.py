"""Capture screenshots and exercise the public synthetic demo only."""
import asyncio
import os
import subprocess
from pathlib import Path
from playwright.async_api import async_playwright
ROOT = Path(__file__).resolve().parents[1]

async def main():
    output = ROOT / 'docs/screenshots'
    output.mkdir(parents=True, exist_ok=True)
    process = subprocess.Popen(['npm', 'run', 'dev', '--', '--port', '8081'], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page(viewport={'width': 1280, 'height': 1800})
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            loaded = False
            for _ in range(50):
                try:
                    await page.goto('http://localhost:8081', wait_until='domcontentloaded')
                    loaded = True
                    break
                except Exception:
                    await asyncio.sleep(0.2)
            if not loaded:
                raise RuntimeError('Portfolio demo failed to start')
            await page.get_by_role('link', name='Iniciar Leitura de Pele').click()
            await page.get_by_role('button', name='36-45 anos', exact=True).click()
            await page.get_by_role('button', name='Testa Linhas').click()
            await page.get_by_role('button', name='Lábios Contorno').click()
            await page.get_by_role('button', name='Ver exemplo').click()
            await page.get_by_role('heading', name='Esta é uma Leitura de Pele de exemplo.').wait_for()
            await page.get_by_role('button', name='Lábios', exact=True).last.click()
            await page.evaluate('document.fonts.ready')
            await page.locator('body').screenshot(path=str(output / 'report.png'))
            await page.get_by_role('link', name='CRM demo').click()
            await page.get_by_role('heading', name='Quadro de oportunidades').wait_for()
            assert await page.locator('article').count() == 300
            first = page.get_by_role('combobox').first
            label = await first.get_attribute('aria-label')
            await first.select_option('contatado')
            assert await page.get_by_role('combobox', name=label, exact=True).input_value() == 'contatado'
            await page.get_by_role('button', name='Reiniciar exemplos').click()
            await page.evaluate('document.fonts.ready')
            # Viewport-only screenshot; never capture the hundreds of cards below.
            await page.screenshot(path=str(output / 'crm.png'))
            if errors:
                raise RuntimeError(f'Runtime errors: {errors}')
            await browser.close()
            print('Verified report interaction and 300 synthetic CRM leads; screenshots saved.')
    finally:
        process.terminate()
        process.wait(timeout=10)

if __name__ == '__main__':
    asyncio.run(main())
