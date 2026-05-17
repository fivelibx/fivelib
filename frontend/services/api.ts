//import { AuthResponse } from './api';
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

function authHeaders():HeadersInit{
  const token = 
  typeof window !== "undefined"? localStorage.getItem("access_token") : null

  if (!token){
    throw new Error("Não autenticado")
  }
  return {
    "Content-Type":"application/json",
    Authorization: `Bearer ${token}`
  }
}

export async function getMyFavoriteIds():Promise<number[]>{
  const response = await fetch(`${API_URL}/users/me/favorites`,{
    headers: authHeaders(),
  })
  if (response.status===401){
    return []
  }

  if (!response.ok){
    throw new Error("Erro ao buscar favoritos")
  }
  const data:{ferramenta_ids:number[]}=await response.json()

  if (data.ferramenta_ids!==null && data.ferramenta_ids!==undefined){
    return data.ferramenta_ids
  }
  return []
}

export async function addFavorite(ferramentaId:number):Promise<void>{
  const response = await fetch(`${API_URL}/users/me/favorites`,{
    method: "POST",
    headers:  authHeaders(),
    body: JSON.stringify({ferramenta_id:ferramentaId})
  })

  if(!response.ok){
    const data = await response.json().catch(()=>({}))
    throw new Error(data.detail ||"Erro ao adicionar aos favoritos")
  }
}

export async function removeFavorite(ferramentaId:number):Promise<void>{
  const response = await fetch(`${API_URL}/users/me/favorites/${ferramentaId}`,{
    method: "DELETE",
    headers: authHeaders()
  })

  if (!response.ok && response.status !== 204){
    const data = await response.json().catch(()=>({}))
    throw new Error(data.detail||"Erro ao deletar favorito")
  }
}



//trocando /tools/ por /resources/
export const api = {
  incrementStar: async (id: number) => {
    const response = await fetch(`${API_URL}/resources/${id}/star`, {
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