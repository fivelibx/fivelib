from datetime import date


def validar_data_nascimento(data_nascimento: date) -> None:
    """
    Valida a data de nascimento conforme RN01:
    - Não pode ser futura
    - Usuário deve ter no mínimo 13 anos
    - Usuário deve ter no máximo 120 anos
    """
    hoje = date.today()

    if data_nascimento >= hoje:
        raise ValueError("Data de nascimento não pode ser hoje ou no futuro.")

    idade = (hoje - data_nascimento).days // 365

    if idade < 13:
        raise ValueError("É necessário ter pelo menos 13 anos para se cadastrar.")

    if idade > 120:
        raise ValueError("Data de nascimento inválida.")