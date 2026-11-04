# CampusGo

Aplicativo mobile desenvolvido com **React Native e Expo** como projeto acadêmico da disciplina de Programação para Dispositivos Móveis.

O CampusGo reúne funcionalidades úteis para a rotina universitária, permitindo acompanhar avisos, acessar recursos de tarefas, visualizar despesas e gerenciar informações do perfil.

## 📱 Demonstração

### Início
![Tela inicial](screenshots/inicio.png)

### Tarefas
![Tela de tarefas](screenshots/tarefas.png)

### Nova tarefa
![Modal de nova tarefa](screenshots/modal.png)

### Bolso
![Resumo financeiro](screenshots/bolso.png)

### Perfil
![Perfil do usuário](screenshots/perfil.png)

## ✨ Funcionalidades

- Navegação por abas com Expo Router.
- Visualização de avisos carregados por API.
- Publicação de avisos por requisição POST.
- Navegação para detalhes de tarefas e abertura de modal.
- Gerenciamento de despesas e cálculo do total.
- Compartilhamento do resumo financeiro.
- Seleção de imagens da galeria e captura pela câmera.
- Persistência da foto de perfil com AsyncStorage.
- Obtenção da localização atual do dispositivo.
- Agendamento de notificações locais.
- Feedback tátil com Expo Haptics.
- Animações com React Native Reanimated.

## 🛠️ Tecnologias

- React Native
- Expo SDK 58
- Expo Router
- JavaScript
- AsyncStorage
- Expo Image Picker
- Expo Location
- Expo Notifications
- Expo Haptics
- React Native Reanimated
- JSONPlaceholder API

## 🚀 Como executar

### Pré-requisitos

- Node.js
- npm
- Expo Go instalado no dispositivo ou um ambiente compatível para execução.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/kldlx/IESB-PDM-OESTE.git
```

Acesse a pasta do projeto:

```bash
cd IESB-PDM-OESTE/praticas/campusGo
```

Instale as dependências:

```bash
npm install
```

Configure a variável de ambiente criando um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

Inicie o projeto:

```bash
npx expo start
```

Leia o QR Code com o Expo Go para abrir o aplicativo.

## 👨‍🎓 Autor

**Kauã Oliveira de Lima**

- Matrícula: 25114290103
- Curso: Análise e Desenvolvimento de Sistemas
- Instituição: IESB

---

Desenvolvido como atividade acadêmica de Programação para Dispositivos Móveis.