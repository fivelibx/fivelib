import os
import httpx
from logging import getLogger

logger = getLogger("uvicorn")

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_FROM_EMAIL = os.getenv("BREVO_FROM_EMAIL", "fivelibx@outlook.com")
BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

async def enviar_email_verificacao(email: str, codigo: str) -> bool:
    """
    Dispara um e-mail assíncrono via API do Brevo contendo o código OTP
    tanto para homologação local quanto para a produção no Render.
    """
    if not BREVO_API_KEY:
        logger.warning("⚠️ BREVO_API_KEY não localizada no ambiente. O código foi apenas impresso no terminal.")
        return False

    headers = {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    # Estrutura visual do e-mail em HTML mantendo a identidade limpa do FiveLib
    html_content = f"""
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 6px;">
        <h2 style="color: #0f172a; margin-bottom: 10px;">Código de Verificação - FiveLib</h2>
        <p style="color: #475569; font-size: 16px;">Olá,</p>
        <p style="color: #475569; font-size: 16px;">Você solicitou um código de validação de identidade para a sua conta no FiveLib. Utilize a credencial temporária abaixo:</p>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #0284c7;">{codigo}</span>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 30px;">Se você não solicitou este código, por favor ignore este e-mail por motivos de segurança.</p>
    </div>
    """

    payload = {
        "sender": {
            "name": "FiveLib",
            "email": BREVO_FROM_EMAIL
        },
        "to": [
            {
                "email": email
            }
        ],
        "subject": f"{codigo} é o seu código de validação FiveLib",
        "htmlContent": html_content
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(BREVO_API_URL, headers=headers, json=payload)
            if response.status_code in [200, 201, 202]:
                logger.info(f"📧 E-mail de verificação enviado via Brevo com sucesso para {email}")
                return True
            else:
                logger.error(f"❌ Falha ao enviar e-mail via Brevo: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            logger.error(f"💥 Erro de conexão ao tentar disparar e-mail pelo Brevo: {str(e)}")
            return False