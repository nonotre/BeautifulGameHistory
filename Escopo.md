# **Documento de Escopo: História Interativa dos Videogames**

## **1\. Visão Geral do Projeto**

O projeto é uma experiência web interativa e linear focada em contar a história dos videogames através da lente de cinco títulos revolucionários. O site utilizará uma estética retrô, com navegação primária via teclado (complementada por mouse) e um layout centralizado em coluna única. O ambiente será nativamente em *Dark Mode*.

**Público-alvo:** Usuários de PC/Desktop.

**Stack Tecnológica:** Next.js (App Router recomendado), CSS Modules ou Tailwind CSS, Vercel (Hobby Tier). Gerenciamento de estado global (Context API ou Zustand) para histórico de navegação.

## **2\. Arquitetura de Informação e Navegação**

A navegação do site é estritamente linear em seu consumo de conteúdo (Intro \> Game 1 \> Game 2 \> Game 3 \> Game 4 \> Game 5 \> Credits), mas suporta saltos pelo menu principal.

### **Telas e Fluxo**

* **Menu Inicial (Start Screen):** Três botões empilhados verticalmente: INTRO, GAMES, CREDITS.  
  * Ao clicar em GAMES, o menu se altera na mesma tela exibindo 5 novas opções: GAME 1 a GAME 5.  
* **Tela Intro:** Exibe um embed de vídeo do YouTube em *autoplay* (com som). Após o término do vídeo, um botão SEE GAMES é revelado, direcionando ao submenu de jogos.  
* **Telas de Jogo (Game 1 a 5):** Coluna central contendo a logo do jogo no topo, texto descritivo e histórico rolavel, e uma área fixa inferior (fixada na tela, interrompendo a coluna central) com o Controle Interativo.  
* **Tela Credits:** Imagem da equipe de três desenvolvedores com texto descritivo sobre o projeto abaixo. Sem controle interativo.

### **O Componente Header (Barra de Navegação)**

* Presente em todas as telas, exceto no Menu Inicial.  
* Limitado à largura da coluna central.  
* Dois botões com alinhamento oposto (gap auto): \[ BACK \] e \[ NEXT \].  
* **Comportamento do BACK:** Possui "memória de rota". Ele retorna para a tela exata de onde o usuário veio. Se o usuário acessou o GAME 2 a partir do Menu, o *back* volta para o Menu. Se acessou a partir do GAME 1 (usando o botão *next*), o *back* volta para o GAME 1.

## **3\. Componentes Especiais e Interatividade**

### **O Controle Interativo Temático**

* Fixo na parte inferior das telas de GAME X.  
* Formado por sprites/imagens de controles reais (ex: Atari).  
* Cada Game X terá um controle X diferente.  
* **Funcionamento:** Mapeia visualmente as ações do usuário. Se o usuário aperta a seta para baixo (ou a tecla S), o sprite do controle muda para a imagem do direcional pressionado para baixo.   
* **Ações Mapeadas:** \* Setas / WASD: Navegação espacial (scroll e cursor).  
  * Espaço / Enter: Ação principal (botão de tiro/seleção).

### **Sistema de Cursor de Leitura**

* A leitura dos textos nas telas de GAME X será guiada por um seletor visual (cursor ou *highlight*) que destaca linha por linha.  
* Ao apertar para baixo, o destaque desce uma linha. Se estiver na última linha visível, a tela realiza um *scroll* suave para revelar a próxima.  
* Se o usuário for para o lado, a seleção sai da linha, independente de qual seja e vai para o botão back, se o usuário for para a direita, a seleção vai para o botão next, e se o usuário estiver na primeira linha, e ir pra cima, vai para o botão back.

---

## **4\. Roadmap de Desenvolvimento**

O projeto será executado em três fases incrementais, garantindo que a base técnica esteja sólida antes da adição de polimento e animações complexas.

### **FASE 1: Fundação e Estrutura (MVP)**

**Objetivo:** Validar a navegação, estrutura de componentes, rotas, lógica do estado global e pipeline de *deploy*.

**Escopo da Fase:**

* Setup do projeto Next.js e deploy na Vercel.  
* Implementação do layout base: *Dark mode* total (preto e branco), estrutura de coluna única centralizada.  
* Criação das rotas (Menu, Intro, Game \[Slug\], Credits).  
* Implementação da lógica do botão BACK com memória de rota (estado global).  
* Mockups estáticos: Uso de caixas cinzas/placeholders para: Logos dos Jogos e a imagem da equipe de Créditos. Use “[https://www.youtube.com/embed/dQw4w9WgXcQ?si=Il8AG1Z-cwfbZAMT](https://www.youtube.com/embed/dQw4w9WgXcQ?si=Il8AG1Z-cwfbZAMT)” para o embed do video do youtube.  
* Controle Interativo em versão placeholder cinza estático na parte inferior da tela de jogos.  
* Navegação das telas feita exclusivamente por cliques do mouse e scroll (o teclado ainda não controla o site).  
* Transições entre telas ocorrem de forma abrupta (comportamento padrão web).

### **FASE 2: Identidade e Assets Finais**

**Objetivo:** Validar o design básico, injetar o conteúdo real e estabelecer a estética retrô.

**Escopo da Fase:**

* Aplicação das tipografias finais (fontes pixeladas ou adequadas ao tema).  
* Substituição dos placeholders pelos assets finais (Logos reais de cada jogo, foto real da equipe).  
* Adoção do esquema de cores final geral, e dos esquemas de cores personalizados de cada GAME X.  
* Implementação do componente do Controle Interativo com a imagem real (ex: controle do Atari), mas ainda em formato estático (apenas uma imagem).  
* O texto dos jogos ainda aparece integralmente na tela assim que a página carrega, com navegação de rolagem normal via *scroll* do mouse.

### **FASE 3: Refinamento, Interatividade e Imersão**

**Objetivo:** Elevar o projeto de um site estático para uma experiência interativa fluida e imersiva.

**Escopo da Fase:**

* **Animações de Entrada:** O texto dos jogos passa a aparecer linha por linha (da esquerda para a direita) com animação customizada, que será descrita no futuro.  
* **Transições de Tela:** Implementação de transições suaves entre páginas e menus.  
* **Navegação Híbrida (Teclado):** Ativação dos *event listeners* para o teclado. O site passa a responder a WASD, Setas, Espaço e Enter para avançar telas, voltar e selecionar opções no menu inicial.  
* **Controle Interativo Reativo:** O controle passa a trocar de *frames* (sprites) em tempo real de acordo com as teclas pressionadas ou cliques sobre as suas áreas sensíveis.  
* **Cursor de Leitura:** Implementação da lógica que destaca a linha de texto atual e gerencia o *scroll* da tela atrelado aos comandos direcionais.  
* **Mídia Final:** Substituição do placeholder de vídeo pelo embed do YouTube definitivo configurado para *autoplay*.  
* **Design de Som (Opcional, mas recomendado):** Adição de *sound effects* (SFX) sutis ao navegar no menu, confirmar seleções e utilizar o controle interativo.

