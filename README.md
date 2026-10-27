# Beauty Fast — Portfólio

Estudo de caso desenvolvido por **Willian Santos**: uma experiência de orientação estética facial com seleção visual de preocupações, relatório interativo e organização de oportunidades em um CRM.

## Sobre esta versão

Este é um repositório independente de demonstração para portfólio. **Não é uma cópia operacional da clínica.** O site e o CRM originais não foram alterados.

- Não contém cadastros, fotos, contatos ou depoimentos identificáveis de clientes.
- Não contém credenciais, configuração de produção nem histórico do repositório privado.
- Não se conecta ao CRM, não envia formulários e não faz chamadas de IA.
- O relatório é um exemplo determinístico baseado nas regiões selecionadas, não uma análise clínica.
- O quadro CRM usa exclusivamente oportunidades fictícias, mantidas em memória e reiniciadas ao recarregar.
- O upload de fotos e a coleta de informações pessoais foram retirados desta demonstração.

## Experiência demonstrada

1. Escolha da faixa etária.
2. Seleção de múltiplas regiões faciais em linguagem acessível.
3. Relatório de exemplo com mapa facial clicável.
4. Quadro CRM com oportunidades fictícias e alteração de status.

## Tecnologias

React 18, TypeScript, Vite, Tailwind CSS, Radix UI e Lucide. Navegação com HashRouter.

A solução original possui análise por IA através do Lovable AI Gateway, consentimento LGPD, funções protegidas por validação e controles de acesso, além de CRM administrativo. Essas integrações de produção **não estão disponíveis nesta versão pública**.

## Executar localmente

Requer Node.js 20 ou superior.

```sh
npm install
npm run dev
```

```sh
npm test
npm run build
```

## Privacidade

A demonstração não precisa de `.env`. Não adicione chaves, dados reais, imagens de pacientes, exportações de CRM ou credenciais a este repositório. O teste de privacidade verifica categorias proibidas e referências à produção.

## Compartilhar no LinkedIn

> Desenvolvi o Beauty Fast, uma experiência de orientação estética facial com seleção visual de preocupações, relatório interativo e CRM. Neste repositório compartilho uma demonstração independente, sem dados de clientes e sem conexões com a operação real.

## Direitos

Código disponibilizado para apresentação de portfólio. A identidade Beauty Fast by Clarissa Dias pertence aos seus respectivos titulares. Este repositório não concede direitos de uso comercial da marca.
