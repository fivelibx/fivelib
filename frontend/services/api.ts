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

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  code: string;
  nova_senha: string;
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

export interface DashboardStats {
  total_usuarios: number;
  ferramentas_ativas: number;
  tickets_pendentes: number;
  total_suporte: number;
}

export interface TicketCreateData {
  email_contato: string;
  secao_site: string;
  mensagem: string;
}

export interface TicketAdminResponse {
  id: number;
  usuario_id: number;
  email_contato: string;
  secao_site: string;
  mensagem: string;
  status: string;
  observacao_admin?: string;
  criado_at: string;
  user?: {
    nome: string;
    email: string;
  };
}

export interface TicketUpdateData {
  status: string;
  observacao_admin?: string;
}

export interface UserAdminResponse {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  data_nascimento?: string;
  criado_at: string;
}

export interface UserPerfilUpdateData {
  perfil: string;
}

export interface PrivateLink {
  id: number;
  titulo: string;
  url: string;
  descricao?: string;
  usuario_id?: string;
  criado_at?: string;
}

export interface PrivateLinkCreateData {
  titulo: string;
  url: string;
  descricao?: string;
}

export interface DashboardBibliotecaResponse {
  favoritos: Tool[];
  links_privados: PrivateLink[];
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

export const forgotPassword = async (data: ForgotPasswordData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw { status: response.status, data: errData, message: errData?.detail || "Erro ao solicitar recuperação." };
  }

  return response.json();
};

export const resetPassword = async (data: ResetPasswordData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw { status: response.status, data: errData, message: errData?.detail || "Erro ao redefinir senha." };
  }

  return response.json();
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  
  const response = await fetch(`${API_URL}/dashboard/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Acesso não autorizado. Faça login novamente.");
    }
    throw new Error("Falha ao carregar os dados da dashboard.");
  }

  return response.json();
}

export async function criarTicketSuporte(ticketData: TicketCreateData): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/tickets/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Você precisa estar autenticado para enviar uma solicitação.");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Falha ao enviar a solicitação de suporte.");
  }

  return response.json();
}

export async function getAdminTickets(): Promise<TicketAdminResponse[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/tickets/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Acesso restrito a administradores. Faça login novamente.");
    }
    throw new Error("Falha ao carregar a listagem de tickets.");
  }

  return response.json();
}

export async function atualizarTicketSuporte(ticketId: number, data: TicketUpdateData): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Falha ao atualizar o ticket.");
  }

  return response.json();
}

export async function getAdminUsers(): Promise<UserAdminResponse[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/usuarios/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Acesso restrito. Privilégios insuficientes.");
    }
    throw new Error("Falha ao carregar a listagem de usuários.");
  }

  return response.json();
}

export async function atualizarPerfilUsuario(userId: string, data: UserPerfilUpdateData): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/usuarios/${userId}/perfil`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Falha ao atualizar o perfil do usuário.");
  }

  return response.json();
}


export async function getBibliotecaData(): Promise<DashboardBibliotecaResponse> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sessão expirada. Faça login novamente.");
    }
    throw new Error("Falha ao carregar os dados da biblioteca.");
  }

  return response.json();
}

export async function criarLinkPrivado(linkData: PrivateLinkCreateData): Promise<PrivateLink> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/dashboard/private-links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(linkData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Falha ao salvar o link privado.");
  }

  return response.json();
}

export async function deletarLinkPrivado(linkId: number): Promise<void> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/dashboard/private-links/${linkId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível remover o link privado.");
  }
}

export async function removerFerramentaFavorita(toolId: number): Promise<void> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${API_URL}/dashboard/favorites/${toolId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível remover a ferramenta dos favoritos.");
  }
}