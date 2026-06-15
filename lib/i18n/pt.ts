/**
 * Portuguese (PT) content dictionary — Phase 3.
 * Structure mirrors English exactly for easy lookup.
 */
export const pt = {
  // ── Site-wide ──────────────────────────────────────────────────────────
  siteTitle: 'Beautiful Game History',
  siteDescription: 'Uma história interativa dos videogames mais revolucionários.',

  // ── Navigation buttons ──────────────────────────────────────────────────
  nav: {
    back: 'VOLTAR',
    next: 'AVANÇAR',
  },

  // ── Start Screen ────────────────────────────────────────────────────────
  start: {
    intro: 'INTRO',
    games: 'JOGOS',
    credits: 'CRÉDITOS',
    options: 'CONFIGURAÇÕES',
    game1: 'PONG (1972)',
    game2: 'PAC-MAN (1980)',
    game3: 'TETRIS (1984)',
    game4: 'MARIO (1985)',
    game5: 'MARIO 64 (1996)',
  },

  // ── Options Screen ──────────────────────────────────────────────────────
  options: {
    labelPt: 'PORTUGUÊS',
    labelEn: 'ENGLISH',
  },

  // ── Intro Screen ────────────────────────────────────────────────────────
  intro: {
    pageTitle: 'Introdução',
    seeGames: 'VER JOGOS',
    countdownMessage: (seconds: number) => `${seconds}s restantes…`,
  },

  // ── Game Screens ─────────────────────────────────────────────────────────
  game: {
    logoAlt: (title: string) => `Logo do ${title}`,
    controllerAlt: (title: string) => `Controle do ${title}`,
    // Shared technical labels
    technicalInfo: 'Informações Técnicas e de Mercado',
    history: 'História e Bastidores',
    howItWorks: 'Como o Jogo Funciona',
    impact: 'Impacto Histórico, Comercial e Social',
    techAdvancements: 'Impactos na Computação e Avanços Tecnológicos',
    // Info card labels
    cardLabelYear:     'ANO',
    cardLabelSales:    'VENDAS',
    cardLabelCreators: 'CRIADORES',

    // Per-game record
    games: {
      pong: {
        title: 'Pong (1972)',
        description: 'Uma análise sobre o clássico Pong (1972), abordando desde seus bastidores de desenvolvimento focados em engenharia de hardware até seu imensurável impacto comercial e cultural. A obra consolida a transição dos jogos eletrônicos de experimentos acadêmicos isolados para o primeiro grande fenômeno de entretenimento de massa no mundo inteiro.',
        manufacturer: 'Atari Inc.',
        year: '1972 (Arcade) / 1975 (Console Doméstico)',
        salesVolume: 'Atingiu mais de 8.000 máquinas de arcade em 1974 e aproximadamente 150.000 unidades do Home Pong em apenas uma temporada (1975).',
        creators: 'Desenvolvido pelo engenheiro Allan Alcorn, sob a direção dos fundadores da Atari Inc., Nolan Bushnell e Ted Dabney.',
        yearHighlight: '1972',
        yearDescription: 'Lançamento nos arcades. Console doméstico em 1975.',
        salesHighlight: '+8.000',
        salesDescription: 'Máquinas de arcade até 1974. 150 mil unidades do Home Pong em 1975.',
        creatorsHighlight: 'Allan Alcorn',
        creatorsDescription: 'E direção da Atari, Nolan Bushnell e Ted Dabney.',
        content: [
          '### A História e os Bastidores do Desenvolvimento',
          'A evolução dos jogos eletrônicos possui raízes em experimentos laboratoriais das décadas de 1950 e 1960, destacando-se o Tennis for Two (1958), pelo uso pioneiro de interfaces visuais em osciloscópios, e o Spacewar! (1962), pela complexidade lógica em ambientes computacionais acadêmicos como em seu caso o MIT. Contudo, apesar do pioneirismo técnico desses marcos, o Pong (1972) é adotado como o ponto de partida fundamental desta análise, tendo em vista sua transcendência acadêmica rumo ao mercado dos jogos.',
          'O projeto que daria vida ao Pong não nasceu com pretensões de dominar o mercado, mas sim como um exercício de "aquecimento" atribuído ao engenheiro Allan Alcorn pelos fundadores da recém-nascida Atari, Nolan Bushnell e Ted Dabney. Inspirando-se no tênis de mesa do sistema Magnavox Odyssey, Alcorn utilizou seus conhecimentos em circuitos lógicos para criar algo inovador, mesmo sem experiência prévia na área de jogos.',
          'A genialidade da equipe transpareceu no primeiro teste de campo, realizado no bar *Andy Capp’s Tavern*, utilizando uma TV adaptada em um gabinete de madeira: em apenas dez dias, a máquina simplesmente parou de funcionar porque seu coletor de moedas estava completamente abarrotado. Sem conseguir o financiamento tradicional — já que os bancos atrelavam a ideia aos malvistos jogos de azar e pinballs — Bushnell manobrou o mercado, recusando ofertas de parcerias com concorrentes e levando a própria Atari a fabricar o fliperama, o que a consagrou na indústria.',
          '### Como Funciona o Jogo',
          'Na tela, Pong é um simulador minimalista e bidimensional de tênis de mesa. O jogador controla uma "paleta" (uma barra vertical no canto esquerdo da tela) movendo-a para cima e para baixo para tentar rebater uma esfera quadrada, enquanto compete contra outro jogador ou contra a própria máquina no lado direito.',
          'O grande mérito da jogabilidade está na sua profundidade técnica embutida: a paleta é dividida em oito segmentos invisíveis. Se a bola tocar o centro da barra, ela retorna em um ângulo exato de 90 graus; caso atinja as extremidades, o ângulo de rebatida diminui, exigindo reflexo e estratégia geométrica. Para aumentar o desafio, a velocidade da bola acelera progressivamente a cada batida, reiniciando apenas quando alguém deixa a esfera passar. Vence quem fizer o oponente perder mais rebatidas.',
          '### O Impacto Histórico, Comercial e Social',
          'A chegada do Pong às ruas em 1972 causou uma ruptura sem precedentes no mundo do entretenimento digital, inaugurando o verdadeiro "fenômeno arcade". Cada máquina gerava um lucro estonteante de até US$ 40 diários — quatro vezes a média de outros equipamentos operados por moedas na época.',
          'Esse sucesso astronômico inevitavelmente atraiu concorrentes que inundaram o mercado com clones não licenciados (chamados por Bushnell de "chacais"). Em 1975, a Atari quebrou outra barreira cultural gigantesca ao lançar o *Home Pong* em parceria com a loja de departamentos Sears, transportando o fliperama diretamente para a sala de estar das famílias e esgotando 150 mil unidades rapidamente. Essa movimentação provou ao mundo que os videogames eram um negócio altamente lucrativo, garantindo não apenas a sobrevivência da Atari, mas motivando gigantes japonesas como Nintendo e Konami, além de empresas de tecnologia como Coleco, a investirem no setor. Como atestado de seu peso na sociedade, Pong encontra-se eternizado na coleção permanente da *Smithsonian Institution* por sua relevância cultural.',
          '### Impacto na Computação e Avanços Tecnológicos',
          'Talvez o fato mais fascinante sobre o Pong de 1972 seja a sua engenharia: ao contrário do que compreendemos como videogame hoje, o jogo não possuía CPU (processador), não tinha memória RAM e tampouco rodava qualquer linha de código de software. Tratava-se de um brilhante sistema de Máquina de Estados Finitos rodando inteiramente de forma física em hardware dedicado. A placa do jogo utilizava Lógica Discreta (TTL), contando com cerca de 66 chips, contadores e portas lógicas soldadas.',
          'O processamento das colisões, a aceleração e os ângulos da bola se baseavam puramente em temporizadores e correntes elétricas passando pelos circuitos (física analógica). Além disso, não existia memória de vídeo (*framebuffer*); a imagem da tela era gerada modulando o sinal de voltagem diretamente com o feixe de elétrons da televisão CRT em tempo real. Até mesmo os icônicos "bips" que o jogo emitia não eram arquivos de áudio, mas sim ruídos extraídos diretamente das frequências elétricas do gerador de sincronismo de vídeo da máquina.'
        ]
      },
      'pac-man': {
        title: 'Pac-Man (1980)',
        description: 'Uma visão geral sobre a criação, a mecânica inovadora e o impacto cultural e tecnológico de Pac-Man, o clássico jogo de labirinto que quebrou paradigmas e revolucionou a indústria do entretenimento interativo na década de 1980.',
        console: 'Arcade',
        year: '1980',
        salesVolume: 'Mais de 400.000 gabinetes de arcade vendidos mundialmente (sendo um dos jogos mais rentáveis da história)',
        creators: 'Toru Iwatani',
        yearHighlight: '1980',
        yearDescription: 'Lançado nos arcades pela Namco.',
        salesHighlight: '+400k',
        salesDescription: 'Gabinetes de arcade vendidos no mundo todo.',
        creatorsHighlight: 'Toru Iwatani',
        creatorsDescription: 'Desenvolvido na Namco.',
        content: [
          '### História e Bastidores',
          'No final da década de 1970, o mercado de fliperamas era fortemente focado no público masculino e saturado por jogos de tiro espacial violentos, como *Space Invaders*. Buscando expandir esse mercado e atrair o público feminino, Toru Iwatani decidiu criar uma experiência amigável e inofensiva. A inspiração para o design icônico do personagem principal surgiu da imagem de uma pizza com uma fatia faltando e do ideograma japonês para "boca" (*kuchi*). Originalmente, o projeto foi batizado de *Puck-Man*, uma brincadeira com *paku-paku* (a onomatopeia japonesa para o som de mastigar). No entanto, ao ser exportado para os Estados Unidos, o nome foi estrategicamente alterado para *Pac-Man* para evitar que vândalos alterassem a letra "P" para "F" nas máquinas.',
          '### Como o Jogo Funciona',
          '*Pac-Man* é um jogo de labirinto dinâmico onde o jogador controla o protagonista com o simples objetivo de comer todas as pílulas espalhadas pela tela enquanto foge de quatro fantasmas coloridos. O design de jogabilidade foi pensado para ser desafiador, mas não frustrante: segundo o próprio Iwatani, ser perseguido constantemente geraria muito estresse. Para solucionar isso, o jogo foi programado para que os inimigos atacassem em "ondas". Os fantasmas cercam o jogador e, de tempos em tempos, recuam e se dispersam, oferecendo um ritmo de jogo mais natural e dando momentos de respiro antes da próxima investida.',
          '### Impacto Histórico e na Sociedade',
          'O título transcendeu os fliperamas e causou um impacto profundo na cultura pop, tornando-se o primeiro grande "mascote" da história dos videogames. Sua estética agradável e a ausência de violência não apenas alcançaram o objetivo de atrair o público feminino, mas também popularizaram os jogos eletrônicos para toda a família, gerando uma onda sem precedentes de *merchandising*. Além disso, *Pac-Man* foi pioneiro ao introduzir as "intermissões" — curtas cenas animadas exibidas entre as fases. Essa inovação marcou um dos primeiros exemplos de narrativa visual nos videogames, um conceito de recompensa e humanização de personagens que se tornaria um padrão absoluto na indústria do entretenimento.',
          '### Avanços Tecnológicos e Computação',
          'Do ponto de vista tecnológico, rodando sob um processador Zilog Z80 de 8 bits, o jogo foi um marco no uso eficiente de hardware e inteligência artificial. Para lidar com a memória limitada da época sem perder a vibração visual, Iwatani usou um sistema inteligente de *sprites* com sub-paletas reduzidas (cerca de 4 cores por objeto), garantindo que cada elemento fosse facilmente distinguível na tela. A maior revolução, porém, foi a sua IA determinista baseada em regras. Em vez de se moverem aleatoriamente, cada um dos quatro fantasmas roda um algoritmo específico que dita sua "personalidade": o Vermelho persegue diretamente, o Rosa tenta antecipar e fechar o caminho, o Ciano age de forma combinada e o Laranja intercala agressividade com patrulha evasiva. Essa engenharia criou a ilusão de um comportamento inteligente e complexo, redefinindo como os inimigos seriam programados dali em diante.'
        ]
      },
      tetris: {
        title: 'Tetris (1984)',
        description: 'Uma síntese sobre a criação, a complexa batalha de direitos autorais, o funcionamento e os profundos impactos tecnológicos e culturais de Tetris, o jogo de origem soviética que revolucionou a indústria do entretenimento e da computação.',
        console: 'Desenvolvido inicialmente no Electronika 60; popularizado massivamente no Game Boy e no NES.',
        year: '1984',
        salesVolume: 'Mais de 520 milhões de cópias mundialmente (incluindo mídias físicas e downloads móveis).',
        creators: 'Alexey Pajitnov',
        yearHighlight: '1984',
        yearDescription: 'Criado no Electronika 60. Popularizado via Game Boy e NES.',
        salesHighlight: '+520M',
        salesDescription: 'Cópias, incluindo mídias físicas e downloads móveis.',
        creatorsHighlight: 'Alexey Pajitnov',
        creatorsDescription: 'Originalmente na Academia Soviética de Ciências.',
        content: [
          '### História e Bastidores',
          'Criado em 1984 pelo engenheiro soviético Alexey Pajitnov no computador Electronika 60, Tetris nasceu do fascínio de seu criador por quebra-cabeças matemáticos, especificamente os pentaminós. Ao adaptar o conceito para blocos de quatro quadrados, o jogo rapidamente se espalhou como uma febre silenciosa por toda a União Soviética. A transição para o mercado global, no entanto, desencadeou uma das mais complexas batalhas judiciais e de licenciamento da história dos videogames. O conflito envolveu o empresário Robert Stein, a britânica Mirrorsoft, a Nintendo e a agência estatal soviética Elorg, operando sob o rigor da burocracia comunista em plena Guerra Fria. Através de negociações audaciosas conduzidas por Nikolai Belikov e Henk Rogers, a Nintendo garantiu os direitos, pavimentando o caminho para o sucesso estrondoso no console portátil Game Boy. Pajitnov, que emigrou para os Estados Unidos em 1991, apenas conseguiu reaver o controle sobre os direitos autorais de sua obra em 1996, quando fundou a The Tetris Company.',
          '### O Jogo e Suas Mecânicas',
          'Tetris é um jogo de raciocínio lógico e reflexos rápidos focado na organização espacial contínua. O jogador deve manipular peças geométricas em queda livre, conhecidas como Tetriminos, dentro de uma matriz retangular vertical. Cada uma dessas peças é formada por quatro blocos unidos, assumindo sete formatos fundamentais (conhecidos pelas letras I, J, L, O, S, T e Z). O objetivo central é transladar e rotacionar as peças enquanto caem para formar linhas horizontais sólidas, sem deixar espaços vazios. Quando uma linha é completada, ela é eliminada da matriz, concedendo pontos ao jogador e abrindo espaço no topo. Com o avanço do jogo, a velocidade de queda das peças aumenta progressivamente, elevando a dificuldade e exigindo tomadas de decisão em frações de segundo para evitar que a torre de blocos alcance o limite superior da tela, o que decreta o fim da partida.',
          '### Impacto Histórico, nos Videogames e na Sociedade',
          'Muito além de um simples passatempo, Tetris quebrou barreiras geopolíticas e demográficas. Lançado durante os anos de tensão, o título serviu como uma forma de diplomacia cultural, sendo o primeiro software soviético a ser consumido em massa no Ocidente, humanizando a imagem do país por meio do entretenimento. Na indústria dos jogos, foi o pioneiro do que hoje conhecemos como "jogos casuais", introduzindo adultos, mulheres e idosos ao mundo digital devido à sua curva de aprendizado intuitiva. O sucesso também originou o "Efeito Tetris", fenômeno em que jogadores relatam enxergar padrões geométricos do jogo no cotidiano ou durante o sono, tornando-se objeto de estudo da neurociência. Além disso, a capacidade de organização abstrata e imersão visual do jogo demonstrou possuir aplicações terapêuticas reais, sendo estudado e utilizado no tratamento preventivo do Transtorno de Estresse Pós-Traumático (TEPT) por bloquear a fixação de imagens mentais intrusivas.',
          '### Impactos na Computação e Avanços Tecnológicos',
          'No âmbito tecnológico, Tetris atuou como um laboratório prático para o aperfeiçoamento de lógicas de hardware e software. O jogo popularizou sistemas de detecção de colisão baseados em coordenadas de grade (grid-based), distanciando-se das colisões por pixels tradicionais de sua época. Em sua concepção, exigia extrema precisão ao operar com o travamento instantâneo das peças, sem qualquer "lock delay", criando uma interação punitiva e direta entre o comando e a resposta gráfica. Além disso, utilizava uma geração de números aleatórios fundamentada em pura probabilidade matemática, resultando em sequências estatísticas implacáveis que futuramente forçariam a indústria a repensar o balanceamento. Como marco de hardware, o título foi a "killer app" que comprovou a viabilidade comercial das telas de cristal líquido (LCD), forçando a indústria a otimizar taxas de atualização para mitigar rastros visuais (ghosting) e consolidando técnicas como paletas indexadas e padrões de preenchimento (dithering) para driblar limitações de cor e profundidade de bits em sistemas primitivos.'
        ]
      },
      'mario-85': {
        title: 'Mario (1985)',
        description: 'Um jogo de plataforma revolucionário que introduziu a rolagem lateral contínua e a física baseada em inércia, sendo o principal responsável por resgatar a indústria de videogames da crise de 1983 e introduzir o entretenimento digital interativo em milhões de lares ao redor do mundo.',
        console: 'Famicom / Nintendo Entertainment System (NES)',
        year: '1985',
        salesVolume: 'Mais de 40 milhões de cópias',
        creators: 'Shigeru Miyamoto e Takashi Tezuka',
        yearHighlight: '1985',
        yearDescription: 'Lançado para o Famicom (Japão) e o NES (América do Norte).',
        salesHighlight: '+40M',
        salesDescription: 'Cópias vendidas, um dos mais vendidos de todos os tempos.',
        creatorsHighlight: 'Miyamoto & Tezuka',
        creatorsDescription: 'Dirigido por Shigeru Miyamoto e Takashi Tezuka, na Nintendo.',
        content: [
          '### A História e os Bastidores',
          'O desenvolvimento de Super Mario Bros. ocorreu em um cenário desafiador para a indústria do entretenimento digital, logo após o grande crash dos videogames de 1983, que retraiu fortemente o mercado norte-americano. Dirigido por Shigeru Miyamoto e Takashi Tezuka, o título foi concebido para ser o ápice das experiências que a equipe teve desenvolvendo jogos anteriores como Excitebike e Kung Fu. Miyamoto imaginava um projeto mais colorido e grandioso. Inicialmente, o conceito não era um jogo de plataforma convencional, mas sim um "jogo atlético" inspirado nos *undōkai* — eventos esportivos escolares japoneses focados em circuitos, saltos e obstáculos. Para protagonizar essa aventura, a Nintendo resgatou o carpinteiro "Jumpman", que já havia feito sucesso em Donkey Kong e no arcade Mario Bros.',
          '### O Jogo e sua Dinâmica',
          'Super Mario Bros. apresenta uma jornada por 32 fases de rolagem lateral pelo Reino Cogumelo, onde o jogador controla Mario (ou seu irmão Luigi) com o objetivo de resgatar a Princesa Toadstool do Rei Koopa. A mecânica principal baseia-se no pulo, que serve tanto para transpor plataformas móveis e buracos sem fundo quanto para derrotar inimigos como Goombas e Koopas. A jogabilidade é aprimorada pela coleta de itens que alteram os atributos do personagem, como o Super Cogumelo, a Flor de Fogo e a Estrela de invencibilidade. O level design brilha especialmente pelo modo como ensina as mecânicas: o célebre Mundo 1-1 atua como um tutorial orgânico, permitindo que o jogador entenda a lógica, os perigos e as recompensas por meio da própria experimentação e exploração.',
          '### Impacto Histórico e Sociocultural',
          'O impacto de Super Mario Bros. transcende as impressionantes 40 milhões de cópias vendidas; ele é creditado como o principal catalisador para a recuperação do mercado ocidental de consoles. Ao lado do NES, o jogo redefiniu o padrão de qualidade e complexidade que os consumidores poderiam esperar do entretenimento doméstico. Seu sucesso foi tão expressivo que, na década de 1990, Mario alcançou um status de ícone pop, sendo mais reconhecido pelas crianças norte-americanas do que o Mickey Mouse. Em uma escala social, o jogo e seu console serviram como o primeiro contato de inúmeras famílias com dispositivos computacionais interativos, ajudando a quebrar as barreiras de familiaridade com a tecnologia e pavimentando o caminho para a ampla adoção de computadores pessoais.',
          '### Avanços Tecnológicos e Computacionais',
          'O título é um marco histórico em otimização de software e engenharia computacional sob extremas restrições. Rodando no processador de 8 bits Ricoh 2A03 do NES, o jogo inteiro foi comprimido em apenas 40 KB (32 KB para o código e 8 KB para os gráficos), exigindo que fosse escrito totalmente em linguagem Assembly para garantir que a física de inércia, a inteligência artificial dos inimigos e a icônica trilha sonora de Koji Kondo rodassem simultaneamente e sem engasgos. Para contornar as limitações de memória e o limite de exibir cerca de 25 cores simultâneas de uma paleta de 52, os desenvolvedores empregaram técnicas brilhantes de reutilização de ativos de memória (assets), como o uso do mesmo gráfico para as nuvens e os arbustos, diferenciando-os apenas pela cor. Além disso, a arquitetura adotada abriu espaço para o uso de chips de expansão nos cartuchos ("mappers"), permitindo que futuros títulos executassem tarefas que excediam as capacidades nativas de processamento do console.'
        ]
      },
      'mario-64': {
        title: 'Mario 64 (1996)',
        description: 'Uma análise detalhada sobre Super Mario 64, detalhando seu processo de desenvolvimento, suas mecânicas de jogo fundamentais e o profundo impacto que a obra teve na indústria de videogames, na sociedade e no avanço da computação gráfica em tempo real.',
        console: 'Nintendo 64',
        year: '1996',
        salesVolume: 'Aproximadamente 11,91 milhões de unidades originais.',
        creators: 'Shigeru Miyamoto (Desenvolvido pela Nintendo Entertainment Analysis & Development - EAD)',
        yearHighlight: '1996',
        yearDescription: 'Lançado para o Nintendo 64.',
        salesHighlight: '~12M',
        salesDescription: 'Unidades em cartucho vendidas para o Nintendo 64.',
        creatorsHighlight: 'Shigeru Miyamoto',
        creatorsDescription: 'Nintendo Entertainment Analysis & Development (EAD).',
        content: [
          '### História e Bastidores',
          'A ideia de levar o mascote da Nintendo para a terceira dimensão começou a ser concebida pelo produtor e diretor Shigeru Miyamoto ainda em 1993, durante o desenvolvimento de Star Fox. O projeto de Super Mario 64 levou cerca de três anos para ser concluído pela equipe da Nintendo EAD, sendo um ano dedicado exclusivamente ao design e dois anos de programação e trabalho direto. Durante esse período, a equipe passou meses aperfeiçoando os movimentos de Mario em uma sala virtual vazia antes de construir qualquer fase, focando puramente na diversão da movimentação; um dos primeiros testes de física e animação envolveu a captura de um coelho amarelo, que mais tarde foi incluído no jogo como o personagem MIPS. Utilizando o software gráfico de alta performance Nichimen N-World e contando com a trilha sonora imersiva de Koji Kondo, o título foi lançado como o principal jogo de lançamento do Nintendo 64, juntamente com Pilotwings 64.',
          '### O Jogo e suas Mecânicas',
          'Ao abandonar a estrutura linear de percursos e obstáculos bidimensionais, Super Mario 64 introduziu um vasto mundo aberto com múltiplos ambientes interligados por um "mundo hub", o icônico Castelo da Princesa Peach. A premissa central de resgatar a princesa do vilão Bowser permanece, mas a progressão se dá através da exploração livre de pinturas mágicas que funcionam como portais para outras fases, onde o jogador deve coletar as Power Stars. O título se destaca por um conjunto de movimentos amplo e inédito para a época, permitindo que Mario salte contra paredes, dê pulos triplos, arraste-se e mergulhe. Além disso, o jogo conta com um design sonoro dinâmico, onde a música de Koji Kondo se adapta perfeitamente ao ambiente do jogador de forma contínua, como ao transitar da superfície para o fundo da água.',
          '### Impacto Histórico, nos Videogames e na Sociedade',
          'Super Mario 64 é frequentemente considerado o título que codificou as regras dos jogos em 3D, influenciando diretamente não apenas os jogos de plataforma, mas a indústria do entretenimento como um todo. Antes de seu lançamento, o público estava habituado a interfaces e navegações bidimensionais restritas; ao ensinar milhões de pessoas a navegar livremente em um espaço tridimensional, controlando câmera e profundidade, o jogo mudou a cognição espacial digital de uma geração. Ele consolidou o videogame como uma experiência imersiva baseada em exploração e múltiplos caminhos não lineares, estabelecendo um padrão de expectativa que se desdobrou para softwares 3D modernos, mapas interativos, cinema digital e, posteriormente, para as interfaces de realidade virtual que a sociedade consome hoje.',
          '### Impacto na Computação e Avanços Tecnológicos',
          'Tecnologicamente, o jogo representou um marco na aplicação prática da computação gráfica em tempo real, viabilizado pela parceria da Nintendo com a Silicon Graphics (SGI) para criar uma arquitetura de 64 bits em um hardware doméstico. Isso superou as limitações dos concorrentes de 32 bits, processando polígonos complexos, cores vibrantes sem tremor de texturas e utilizando um Z-buffer eficiente para calcular a profundidade, evitando que objetos distantes fossem renderizados incorretamente sobre os próximos. Para otimizar o processamento e manter a taxa de quadros estável, o jogo aplicava conceitos de Nível de Detalhe (LOD), simplificando os modelos poligonais conforme se afastavam da câmera. A maior revolução física e de interface, no entanto, foi o controle analógico com sensibilidade de pressão de 360 graus aliado a um sistema de câmera virtual dinâmica (o Lakitu). Essa combinação demonstrou de forma robusta como aplicar vetores e transformações espaciais para lidar com física simplificada e colisões em ambientes contínuos.'
        ]
      },
    }
  },

  // ── Credits Screen ───────────────────────────────────────────────────────
  credits: {
    pageTitle: 'Créditos',
    teamImageAlt: 'Espaço reservado para foto da equipe de desenvolvimento',
    memberPhotoAlt: (name: string) => `Foto de ${name}`,
    // Funções dos membros da equipe — uma string por membro
    team: {
      deizielle: 'pesquisa, escrita, conteúdo, imagem e vídeo',
      joao:      'direção de arte, ux/ui, design, front end, edição de vídeo',
      pedro:     'roteiro, gravação, apresentação, pesquisa e imagem',
    },
    aboutHeading: 'Sobre o projeto',
    aboutText: [
      'Este projeto foi desenvolvido em colaboração com o Museu de Computação do ICMC/USP (https://mc.icmc.usp.br/), com o propósito de aproximar o público geral do fascinante universo da tecnologia. Através de um website interativo, convidamos a comunidade a explorar a história dos videogames por meio de cinco grandes marcos: Pong, Pac-Man, Tetris, Super Mario Bros. (1985) e Super Mario 64. Cada um desses títulos foi selecionado para ilustrar as verdadeiras revoluções tecnológicas e computacionais de suas respectivas épocas, mostrando como desafios de hardware e software foram superados para dar vida a esses clássicos.',
      'O objetivo central desta iniciativa foi estender o conhecimento sobre computação e sociedade para além dos muros da universidade, traduzindo conceitos complexos em uma linguagem visual e interativa que qualquer pessoa pudesse consumir livremente. Ao destacar o profundo impacto cultural e social que esses jogos exerceram no mundo, buscamos democratizar o acesso à ciência e inspirar novas gerações. Agradecemos ao Museu do ICMC e a toda a equipe envolvida na criação deste espaço de descoberta e aprendizado digital.'
    ],
    linksHeading: 'Referências',
    links: [
      {
        game: 'Pong',
        items: [
          { href: 'https://www.pong-story.com/arcade.htm', label: 'https://www.pong-story.com/arcade.htm' },
          { href: 'https://youtu.be/6QYNlPLzj90?si=CbMrhNg62xd-fOQW', label: 'https://youtu.be/6QYNlPLzj90?si=CbMrhNg62xd-fOQW' },
          { href: 'https://assets.mitmuseum.mit.edu/iiifimg3/69578643/full/!800,800/0/default.jpg?response-content-disposition=attachment%3B%20filename%3D69578643.jpg', label: 'https://assets.mitmuseum.mit.edu/iiifimg3/69578643/full/!800,800/0/default.jpg' },
          { href: 'https://youtu.be/fiShX2pTz9A?si=3AZbPRLeGHiGzwp0', label: 'https://youtu.be/fiShX2pTz9A?si=3AZbPRLeGHiGzwp0' },
          { href: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Signed_Pong_Cabinet.jpg', label: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Signed_Pong_Cabinet.jpg' },
        ],
      },
      {
        game: 'Pac-Man',
        items: [
          { href: 'https://en-wikipedia-org.translate.goog/wiki/Pac-Man?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc', label: 'https://en-wikipedia-org.translate.goog/wiki/Pac-Man' },
          { href: 'https://pacman-fandom-com.translate.goog/wiki/Map_256_Glitch?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc', label: 'https://pacman-fandom-com.translate.goog/wiki/Map_256_Glitch' },
          { href: 'https://jovemnerd.com.br/noticias/games/pac-man-inteligencia-artificial-entenda', label: 'https://jovemnerd.com.br/noticias/games/pac-man-inteligencia-artificial-entenda' },
          { href: 'https://youtu.be/-CbyAk3Sn9I?si=7VU1DCFNqwsCD4rE', label: 'https://youtu.be/-CbyAk3Sn9I?si=7VU1DCFNqwsCD4rE' },
          { href: 'https://static.wikia.nocookie.net/villains/images/3/3b/Pacman_ghosts.png/revision/latest?cb=20251031210849', label: 'https://static.wikia.nocookie.net/villains/images/3/3b/Pacman_ghosts.png' },
          { href: 'https://static.wikia.nocookie.net/pacman/images/8/8d/Pacman-merch-top.jpg/revision/latest?cb=20240531165728', label: 'https://static.wikia.nocookie.net/pacman/images/8/8d/Pacman-merch-top.jpg' },
        ],
      },
      {
        game: 'Tetris',
        items: [
          { href: 'https://asmetro.org.br/portalsn/2023/05/01/tetris-a-dramatica-historia-de-como-o-maior-jogo-de-todos-os-tempos-foi-criado-e-deixou-a-uniao-sovietica/', label: 'https://asmetro.org.br/portalsn/2023/05/01/tetris-a-dramatica-historia…' },
          { href: 'https://tetris.com/news/the-history-of-tetris', label: 'https://tetris.com/news/the-history-of-tetris' },
          { href: 'https://pt.wikipedia.org/wiki/Tetris', label: 'https://pt.wikipedia.org/wiki/Tetris' },
          { href: 'https://www.historiadomundo.com.br/idade-contemporanea/origem-do-tetris.htm', label: 'https://www.historiadomundo.com.br/idade-contemporanea/origem-do-tetris.htm' },
          { href: 'https://www.bbc.com/portuguese/articles/cekdg02gxv0o', label: 'https://www.bbc.com/portuguese/articles/cekdg02gxv0o' },
          { href: 'https://www.psichi.org/blogpost/987366/511159/Stacking-Up-Thoughts-The-Tetris-Effect-and-Our-Brains', label: 'https://www.psichi.org/blogpost/987366/511159/Stacking-Up-Thoughts-The-Tetris-Effect-and-Our-Brains' },
          { href: 'https://aleadedu.medium.com/o-efeito-tetris-203b532cfe4b', label: 'https://aleadedu.medium.com/o-efeito-tetris-203b532cfe4b' },
          { href: 'https://youtube.com/shorts/z6nlLi1hQF0?si=zR4mDcZfNq20qkBe', label: 'https://youtube.com/shorts/z6nlLi1hQF0?si=zR4mDcZfNq20qkBe' },
          { href: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Falexey-pajitnov-inventor-of-tetris-1990-v0-icw43uknerk71.jpg%3Fwidth%3D640%26crop%3Dsmart%26auto%3Dwebp%26s%3D0f6ac303ba4b4fcf4d49448885e2790b9846aacc', label: 'https://www.reddit.com/media (foto Alexey Pajitnov)' },
          { href: 'https://youtube.com/shorts/K9uM4WSAxxA?si=XtRs6n1sUH3t_146', label: 'https://youtube.com/shorts/K9uM4WSAxxA?si=XtRs6n1sUH3t_146' },
        ],
      },
      {
        game: 'Super Mario Bros.',
        items: [
          { href: 'https://www.terra.com.br/gameon/plataformas-e-consoles/40-anos-de-super-mario-bros-o-jogo-que-salvou-a-industria-dos-videogames,3e0f147ae7443d20b68ddead62698d16jonxltqi.html', label: 'https://www.terra.com.br/gameon/… (40 anos de Super Mario Bros.)' },
          { href: 'https://pt.wikipedia.org/wiki/Crise_dos_jogos_eletr%C3%B4nicos_de_1983', label: 'https://pt.wikipedia.org/wiki/Crise_dos_jogos_eletrônicos_de_1983' },
          { href: 'https://pt.wikipedia.org/wiki/Jogo_eletr%C3%B4nico_de_rolagem_lateral', label: 'https://pt.wikipedia.org/wiki/Jogo_eletrônico_de_rolagem_lateral' },
          { href: 'https://br.ign.com/super-mario-bros/145986/feature/shigeru-miyamoto-conta-segredos-sobre-a-criacao-da-fase-1-1-de-super-mario-bros', label: 'https://br.ign.com/super-mario-bros/145986/feature/shigeru-miyamoto-conta-segredos…' },
          { href: 'https://youtu.be/EhLY-KgAhWY?si=3DhBJo6u-AQtocCO', label: 'https://youtu.be/EhLY-KgAhWY?si=3DhBJo6u-AQtocCO' },
          { href: 'https://static.wikia.nocookie.net/nintendo/images/5/58/Super_Mario_Bros.png/revision/latest?cb=20170730194148&path-prefix=pt-br', label: 'https://static.wikia.nocookie.net/nintendo/images/5/58/Super_Mario_Bros.png' },
          { href: 'https://youtu.be/oWyMk-2aH9E?si=BKrbSpvDL4Wcz-5O', label: 'https://youtu.be/oWyMk-2aH9E?si=BKrbSpvDL4Wcz-5O' },
          { href: 'https://youtu.be/-avspZlbOWU?si=4CM2bqEFwwm0cBs9', label: 'https://youtu.be/-avspZlbOWU?si=4CM2bqEFwwm0cBs9' },
          { href: 'https://hips.hearstapps.com/hmg-prod/images/80298bde-6d37-4145-8898-5f5aceed239d.jpeg?crop=0.889xw:1xh;0.056xw,0xh', label: 'https://hips.hearstapps.com/hmg-prod/images/80298bde…' },
        ],
      },
      {
        game: 'Super Mario 64',
        items: [
          { href: 'https://pt.wikipedia.org/wiki/Super_Mario_64', label: 'https://pt.wikipedia.org/wiki/Super_Mario_64' },
          { href: 'https://www.mariowiki.com/Super_Mario_64', label: 'https://www.mariowiki.com/Super_Mario_64' },
          { href: 'https://www.youtube.com/watch?v=kO7d9opl2u8', label: 'https://www.youtube.com/watch?v=kO7d9opl2u8' },
          { href: 'https://youtu.be/KVnhgyZN-wE?si=T2tbT4dzR6EqsMLc', label: 'https://youtu.be/KVnhgyZN-wE?si=T2tbT4dzR6EqsMLc' },
          { href: 'https://youtu.be/KVnhgyZN-wE?si=i8Ql-p7CH0ZpB5IK', label: 'https://youtu.be/KVnhgyZN-wE?si=i8Ql-p7CH0ZpB5IK' },
          { href: 'https://youtube.com/shorts/h1mdEOvZb80?si=3LUe79RLYIONwHfD', label: 'https://youtube.com/shorts/h1mdEOvZb80?si=3LUe79RLYIONwHfD' },
          { href: 'https://www.bojoga.com.br/files/2010/01/super-mario-64-screenshot-lakitu-cameraman-big.jpg', label: 'https://www.bojoga.com.br/files/2010/01/super-mario-64-screenshot-lakitu-cameraman-big.jpg' },
          { href: 'https://youtube.com/shorts/PriusTHmotA?si=N9tQbs-H5sprZhCJ', label: 'https://youtube.com/shorts/PriusTHmotA?si=N9tQbs-H5sprZhCJ' },
        ],
      },
    ],
  },

  // ── Error / Not Found ────────────────────────────────────────────────────
  errors: {
    notFoundTitle: 'Página Não Encontrada',
    notFoundBody: 'A página que você está procurando não existe.',
    notFoundHome: 'Voltar ao Início',
    errorTitle: 'Algo deu errado',
    errorBody: 'Ocorreu um erro inesperado.',
    errorRetry: 'Tentar novamente',
  },
} as const

export type Dictionary = typeof pt
