const DEFAULT_API_URL = 'http://localhost:8001/api/v1';
const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

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

export interface AuthResponse {
  access_token: string;
  token_type: string;
  role: string;
  name: string;
}

export async function getResources(): Promise<Tool[]> {
  const response = await fetch(`${API_URL}/resources`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API');
  }
  
  return response.json();
}

export async function login(credentials: any): Promise<AuthResponse> {
  const url = `${API_URL}/auth/login`.replace(/([^:]\/)\/+/g, "$1");

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Falha ao realizar login');
  }

  const data: AuthResponse = await response.json();

  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user_name", data.name);
    localStorage.setItem("user_role", data.role);
  }

  return data;
}

export const api = {
  incrementStar: async (id: number) => {
    const response = await fetch(`${API_URL}/tools/${id}/star`, {
      method: 'PATCH',
    });
    return response.json();
  }
};