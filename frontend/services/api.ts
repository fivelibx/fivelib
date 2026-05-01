const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

export interface Tool {
  id: number;
  nome: string;      
  descricao: string; 
  url_oficial: string; 
  linguagem: string;   
  status_ativo: boolean;

  stars: number;
  tags: string[];
  categoria: string;
  icon_slug?: string;
}

export async function getResources(): Promise<Tool[]> {
  const response = await fetch(`${API_URL}/resources`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API');
  }
  
  return response.json();
}

export const api = {
  // ... suas outras funções
  incrementStar: async (id: number) => {
    const response = await fetch(`${API_URL}/tools/${id}/star`, {
      method: 'PATCH',
    });
    return response.json();
  }
};