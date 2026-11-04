const API_URL = process.env.EXPO_PUBLIC_API_URL;

const noticeTitles = [
  'Manutenção programada dos serviços digitais',
  'Inscrições abertas para oficinas e atividades',
  'Novos materiais disponíveis para estudo',
  'Palestra sobre tecnologia e inovação',
  'Prazo de entrega de atividades acadêmicas',
  'Atualização da plataforma de aprendizagem',
  'Semana de integração e conhecimento',
  'Oportunidade de participação em projetos',
  'Novos conteúdos disponíveis na biblioteca digital',
  'Comunicado sobre eventos e atividades',
];

const noticeBodies = [
  'Informamos que alguns serviços digitais passarão por manutenção programada. Durante esse período, poderá ocorrer instabilidade no acesso à plataforma.',
  'Estão abertas as inscrições para novas oficinas e atividades de aprendizagem. Consulte as informações e organize sua participação.',
  'Novos materiais de apoio foram disponibilizados para complementar seus estudos. Aproveite os conteúdos para aprofundar seus conhecimentos.',
  'Participe de uma palestra especial sobre tecnologia, inovação e as tendências que estão transformando o mercado de trabalho.',
  'Fique atento aos prazos de entrega das atividades. Organize seu cronograma para concluir e enviar os trabalhos dentro do período estabelecido.',
  'A plataforma de aprendizagem recebeu melhorias para facilitar a navegação e o acesso aos conteúdos. Explore as funcionalidades atualizadas.',
  'Uma programação especial de integração e troca de conhecimentos está sendo preparada. Em breve, serão divulgados mais detalhes.',
  'Estão surgindo novas oportunidades para participar de projetos colaborativos e desenvolver habilidades práticas.',
  'A biblioteca digital recebeu novos conteúdos e materiais de consulta. Acesse o acervo e descubra recursos para seus estudos.',
  'Confira os próximos eventos e atividades disponíveis. Planeje sua participação e acompanhe as novidades.',
];

async function request(endpoint, options = {}) {
  if (!API_URL) {
    throw new Error('A URL da API não foi configurada.');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response.json();
}

export const api = {
  async get(endpoint) {
    const data = await request(endpoint);

    if (endpoint.startsWith('/posts')) {
      return data.map((item, index) => ({
        ...item,
        title: noticeTitles[index % noticeTitles.length],
        body: noticeBodies[index % noticeBodies.length],
      }));
    }

    return data;
  },

  create(endpoint, data) {
    return request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};