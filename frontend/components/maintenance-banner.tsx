import React from 'react';

// O nome da função mantém a primeira letra maiúscula (obrigatório pelo React)
export default function MaintenanceBanner() {
  return (
    <div className="w-full bg-[#1e1e1f] border-b border-[#2e2e30] py-3 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
        {/* Ícone de Alerta */}
        <span className="text-xl">⚠️</span>
        
        {/* Mensagem do Banner */}
        <p className="text-sm font-medium text-gray-200">
          <span className="text-[#dffe00] font-bold">Aviso:</span> Estamos realizando melhorias na infraestrutura do FiveLib. Algumas funções podem oscilar temporariamente, demorar ou não funciona. Peço por gentileza que tenham paciência.
        </p>
      </div>
    </div>
  );
}