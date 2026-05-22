-- Usuários
CREATE TABLE "user" (
    "id"               SERIAL          NOT NULL,
    "nome"             VARCHAR(255)    NOT NULL,
    "email"            VARCHAR(255)    NOT NULL,
    "senha"            VARCHAR(255)    NOT NULL,
    "data_nascimento"  DATE            NOT NULL,
    "perfil"           VARCHAR(255)    NOT NULL,
    "criado_at"        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("id"),
    CONSTRAINT "user_email_unique" UNIQUE ("email")
);

-- Ferramentas
CREATE TABLE "tool" (
    "id"           SERIAL          NOT NULL,
    "nome"         VARCHAR(255)    NOT NULL,
    "descricao"    TEXT            NOT NULL,
    "url_oficial"  TEXT            NOT NULL,
    "linguagem"    VARCHAR(255)    NOT NULL,
    "status_ativo" BOOLEAN         NOT NULL DEFAULT TRUE,
    PRIMARY KEY ("id"),
    CONSTRAINT "tool_nome_unique" UNIQUE ("nome")
);

COMMENT ON COLUMN "tool"."status_ativo" IS 'Por padrão, toda ferramenta nova cadastrada entra como ativa.';

-- Favoritos (PK composta corrigida — original tinha dois ADD PRIMARY KEY separados, o que é inválido)
CREATE TABLE "favorite" (
    "usuario_id"    INTEGER     NOT NULL,
    "ferramenta_id" INTEGER     NOT NULL,
    "adicionado_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("usuario_id", "ferramenta_id")
);

CREATE INDEX "favorite_usuario_id_idx"    ON "favorite" ("usuario_id");
CREATE INDEX "favorite_ferramenta_id_idx" ON "favorite" ("ferramenta_id");
CREATE INDEX "favorite_adicionado_at_idx" ON "favorite" ("adicionado_at");

-- Links Privados (FK corrigida — original apontava "id" para "user"."id", o correto é "usuario_id")
CREATE TABLE "private_link" (
    "id"         SERIAL          NOT NULL,
    "usuario_id" INTEGER         NOT NULL,
    "titulo"     VARCHAR(255)    NOT NULL,
    "url"        TEXT            NOT NULL,
    PRIMARY KEY ("id")
);

CREATE INDEX "private_link_usuario_id_idx" ON "private_link" ("usuario_id");

-- Chamados de Suporte
CREATE TABLE "support_ticket" (
    "id"             SERIAL          NOT NULL,
    "usuario_id"     INTEGER         NOT NULL,
    "email_contato"  VARCHAR(255)    NOT NULL,
    "mensagem"       TEXT            NOT NULL,
    "secao_site"     VARCHAR(255)    NOT NULL,
    "status"         VARCHAR(255)    NOT NULL DEFAULT 'Pendente',
    "criado_at"      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("id")
);

CREATE INDEX "support_ticket_status_idx"     ON "support_ticket" ("status");
CREATE INDEX "support_ticket_usuario_id_idx" ON "support_ticket" ("usuario_id");

COMMENT ON COLUMN "support_ticket"."status"    IS 'Todo ticket novo aparecerá automaticamente como "Pendente".';
COMMENT ON COLUMN "support_ticket"."criado_at" IS 'O banco registra a data/hora exata do momento em que o registro foi criado.';

-- Foreign Keys
ALTER TABLE "favorite"       ADD CONSTRAINT "favorite_usuario_id_fk"       FOREIGN KEY ("usuario_id")    REFERENCES "user" ("id");
ALTER TABLE "favorite"       ADD CONSTRAINT "favorite_ferramenta_id_fk"     FOREIGN KEY ("ferramenta_id") REFERENCES "tool" ("id");
ALTER TABLE "private_link"   ADD CONSTRAINT "private_link_usuario_id_fk"    FOREIGN KEY ("usuario_id")    REFERENCES "user" ("id");
ALTER TABLE "support_ticket" ADD CONSTRAINT "support_ticket_usuario_id_fk"  FOREIGN KEY ("usuario_id")    REFERENCES "user" ("id");