# Portfolio • Avive Estética

Clone de alta fidelidade da landing page da **Avive Estética**, adaptado para fins de portfólio profissional e demonstração de engenharia front-end, com dados e contatos fictícios para preservação de privacidade.

---

## 🚀 Como Visualizar o Projeto

### Opção 1: Abrir direto no navegador (Sem dependências)
Basta dar duplo clique no arquivo [`index.html`](index.html) ou abri-lo diretamente em qualquer navegador moderno.

### Opção 2: Servidor local (Node.js)
```bash
npm start
# ou
npx serve -l 3000 .
```
Acesse no seu navegador: `http://localhost:3000`.

---

## 📁 Estrutura de Arquivos

```
portfolio-avive-estetica/
├── optimized/                      # Imagens otimizadas em WebP
│   ├── camila.webp
│   ├── helena.webp
│   ├── hero-1536.webp
│   ├── juliana.webp
│   ├── logo-avive.webp
│   ├── logo-header.webp
│   ├── mariana.webp
│   └── renata.webp
├── resultados/                     # Imagens de resultados em alta resolução
│   ├── resultado-1.jpg
│   ├── resultado-2.jpg
│   └── resultado-3.jpg
├── favicon.svg                     # Ícone da aplicação
├── whatsapp-icon.svg               # Ícone SVG do WhatsApp
├── index.html                      # Estrutura semântica e acessível (HTML5)
├── style.css                       # Design System completo e responsivo (CSS3)
├── app.js                          # Lógica interativa, modais, sliders e validações
├── package.json                    # Metadados e scripts de execução
├── .gitignore                      # Ignorados pelo controle de versão
└── README.md                       # Documentação do projeto
```

---

## 🔒 Dados Fictícios Substituídos

Para preservar a privacidade e evitar envio acidental de mensagens para contatos reais:

- **WhatsApp Comercial:** `(22) 99999-0000` (link `https://wa.me/5522999990000`)
- **Endereço Fictício:** `Av. John Kennedy, 500 - Sala 201 - Centro, Araruama - RJ, 28970-000`
- **Instagram Demonstrativo:** `@aviveestetica.demo` (`https://instagram.com/aviveestetica.demo`)
- **Localização / Google Maps:** Consulta demonstrativa no Centro de Araruama - RJ
- **E-mail Demonstrativo:** `contato@aviveestetica.exemplo.com.br`

---

## ✨ Recursos & Funcionalidades

1. **Slider Interativo de Antes e Depois (Comparison Gallery):**
   - Controle tátil/mouse e acessibilidade via teclado (setas).
   - Efeito de corte dinâmico `clip-path` em 3 procedimentos faciais e labiais.
2. **Carrossel de Depoimentos:**
   - 5 depoimentos reais com fotos em WebP de alta performance.
   - Navegação por setas, dynamic bullets e suporte a gestos touch/swipe.
3. **Modal de Agendamento Multi-Etapas (3 Passos):**
   - Passo 1: Seleção de cuidado desejado.
   - Passo 2: Nome e preferência de data (validação mínima a partir de hoje) e período (Manhã, Tarde, Noite).
   - Passo 3: Revisão estruturada, checkbox LGPD e botão de envio direto com mensagem formatada para o WhatsApp.
4. **Modal de Detalhes de Procedimentos:**
   - Visualização dos itens inclusos em cada plano com gatilho direto para solicitação de avaliação.
5. **Modal de Privacidade & LGPD:**
   - Termos claros de consentimento e tratamento local de dados.
6. **Barra de Progresso de Rolagem:**
   - Indicador visual em tempo real no topo do cabeçalho.
7. **Menu Mobile Drawer:**
   - Animação orgânica de hambúrguer para X, backdrop blur e bloqueio de scroll.
8. **Botão Flutuante de WhatsApp:**
   - Acesso rápido permanente com efeito pulsante.
