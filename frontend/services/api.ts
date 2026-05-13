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

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  data_nascimento: string;
  accepted_terms: boolean;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
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
    
    const errorMessage = typeof errorData.detail === 'string' 
      ? errorData.detail 
      : (errorData.detail?.message || 'Falha ao realizar login');
      
    throw new ApiError(errorMessage, response.status, errorData);
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

export async function register(userData: RegisterData): Promise<{ message: string }> {
  const url = `${API_URL}/auth/register`.replace(/([^:]\/)\/+/g, "$1");

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Falha ao realizar cadastro');
  }

  return data;
}

export async function verifyCode(data: { email: string; code: string }) {
  const response = await fetch(`${API_URL}/auth/verify-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Erro ao verificar código.");
  }

  return result;
}