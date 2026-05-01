from sqlalchemy import String, Text, Boolean, Integer, Date, DateTime, ForeignKey, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from .base import Base

class Favorite(Base):
    """
    Entidade: Favoritos (Relacionamento N:N)
    Finalidade: Persistência de itens favoritados (RF02).
    """
    __tablename__ = "favorite"

    usuario_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("user.id", name="favorite_usuario_id_fk"), 
        primary_key=True
    )
    ferramenta_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("tool.id", name="favorite_ferramenta_id_fk"), 
        primary_key=True
    )
    adicionado_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )

    # Índices conforme schema.sql
    __table_args__ = (
        Index("favorite_usuario_id_idx", "usuario_id"),
        Index("favorite_ferramenta_id_idx", "ferramenta_id"),
    )

class Tool(Base):
    __tablename__ = "tool"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    descricao: Mapped[str] = mapped_column(Text, nullable=False)
    url_oficial: Mapped[str] = mapped_column(Text, nullable=False)
    linguagem: Mapped[str] = mapped_column(String(255), nullable=False)
    status_ativo: Mapped[bool] = mapped_column(Boolean, server_default="true")

class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    senha: Mapped[str] = mapped_column(String(255), nullable=False)
    data_nascimento: Mapped[datetime] = mapped_column(Date, nullable=False)
    perfil: Mapped[str] = mapped_column(String(255), nullable=False)
    criado_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )

    # Relacionamentos
    links_privados: Mapped[list["PrivateLink"]] = relationship(back_populates="usuario")
    tickets: Mapped[list["SupportTicket"]] = relationship(back_populates="usuario")

class PrivateLink(Base):
    __tablename__ = "private_link"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    usuario_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("user.id", name="private_link_usuario_id_fk"), 
        nullable=False
    )
    titulo: Mapped[str] = mapped_column(String(255), nullable=False)
    url: Mapped[str] = mapped_column(Text, nullable=False)

    usuario: Mapped["User"] = relationship(back_populates="links_privados")

    __table_args__ = (
        Index("private_link_usuario_id_idx", "usuario_id"),
    )

class SupportTicket(Base):
    __tablename__ = "support_ticket"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    usuario_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("user.id", name="support_ticket_usuario_id_fk"), 
        nullable=False
    )
    email_contato: Mapped[str] = mapped_column(String(255), nullable=False)
    mensagem: Mapped[str] = mapped_column(Text, nullable=False)
    secao_site: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(255), server_default="Pendente")
    criado_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )

    usuario: Mapped["User"] = relationship(back_populates="tickets")

    __table_args__ = (
        Index("support_ticket_status_idx", "status"),
    )