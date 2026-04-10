CREATE TABLE "user"(
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "perfil" VARCHAR(255) NOT NULL,
    "criado_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");
CREATE TABLE "tool"(
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT NOT NULL,
    "url_oficial" TEXT NOT NULL,
    "linguagem" VARCHAR(255) NOT NULL,
    "status_ativo" BOOLEAN NOT NULL DEFAULT TRUE
);
ALTER TABLE
    "tool" ADD PRIMARY KEY("id");
ALTER TABLE
    "tool" ADD CONSTRAINT "tool_nome_unique" UNIQUE("nome");
COMMENT
ON COLUMN
    "tool"."status_ativo" IS 'Por padrão, toda ferramenta nova cadastrada entra como ativa.';
CREATE TABLE "favorite"(
    "usuario_id" INTEGER NOT NULL,
    "ferramenta_id" INTEGER NOT NULL,
    "adicionado_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL
);
CREATE INDEX "favorite_usuario_id_index" ON
    "favorite"("usuario_id");
CREATE INDEX "favorite_ferramenta_id_index" ON
    "favorite"("ferramenta_id");
CREATE INDEX "favorite_adicionado_at_index" ON
    "favorite"("adicionado_at");
CREATE INDEX "favorite_usuario_id_ferramenta_id_adicionado_at_index" ON
    "favorite"(
        "usuario_id",
        "ferramenta_id",
        "adicionado_at"
    );
ALTER TABLE
    "favorite" ADD PRIMARY KEY("usuario_id");
ALTER TABLE
    "favorite" ADD PRIMARY KEY("ferramenta_id");
CREATE TABLE "private_link"(
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "url" TEXT NOT NULL
);
CREATE INDEX "private_link_usuario_id_index" ON
    "private_link"("usuario_id");
ALTER TABLE
    "private_link" ADD PRIMARY KEY("id");
CREATE TABLE "support_ticket"(
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "email_contato" VARCHAR(255) NOT NULL,
    "mensagem" TEXT NOT NULL,
    "secao_site" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'Pendente',
    "criado_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "support_ticket_usuario_id_index" ON
    "support_ticket"("usuario_id");
ALTER TABLE
    "support_ticket" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "support_ticket"."status" IS 'Todo ticket novo aparecerá automaticamente como "Pendente".';
COMMENT
ON COLUMN
    "support_ticket"."criado_at" IS 'O banco registra a data/hora exata do momento em que o registro foi criado.';
ALTER TABLE
    "support_ticket" ADD CONSTRAINT "support_ticket_usuario_id_foreign" FOREIGN KEY("usuario_id") REFERENCES "user"("id");
ALTER TABLE
    "favorite" ADD CONSTRAINT "favorite_ferramenta_id_foreign" FOREIGN KEY("ferramenta_id") REFERENCES "tool"("id");
ALTER TABLE
    "favorite" ADD CONSTRAINT "favorite_usuario_id_foreign" FOREIGN KEY("usuario_id") REFERENCES "user"("id");
ALTER TABLE
    "private_link" ADD CONSTRAINT "private_link_id_foreign" FOREIGN KEY("id") REFERENCES "user"("id");