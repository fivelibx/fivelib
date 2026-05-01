const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

/**
 * Função para buscar a lista de bibliotecas do backend FastAPI.
 * Implementa a camada de serviço para abstrair a chamada da API.
 */
export async function fetchLibraries() {
  const response = await fetch(`${API_URL}/libraries`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API');
  }
  
  return response.json();
}