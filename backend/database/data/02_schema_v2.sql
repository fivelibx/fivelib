


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE OR REPLACE FUNCTION "public"."rls_auto_enable"() RETURNS "event_trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


ALTER FUNCTION "public"."rls_auto_enable"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."favorite" (
    "usuario_id" integer NOT NULL,
    "ferramenta_id" integer NOT NULL,
    "adicionado_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."favorite" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."private_link" (
    "id" integer NOT NULL,
    "usuario_id" integer NOT NULL,
    "titulo" character varying(255) NOT NULL,
    "url" "text" NOT NULL
);


ALTER TABLE "public"."private_link" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."private_link_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."private_link_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."private_link_id_seq" OWNED BY "public"."private_link"."id";



CREATE TABLE IF NOT EXISTS "public"."support_ticket" (
    "id" integer NOT NULL,
    "usuario_id" integer NOT NULL,
    "email_contato" character varying(255) NOT NULL,
    "mensagem" "text" NOT NULL,
    "secao_site" character varying(255) NOT NULL,
    "status" character varying(255) DEFAULT 'Pendente'::character varying NOT NULL,
    "criado_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "observacao_admin" "text"
);


ALTER TABLE "public"."support_ticket" OWNER TO "postgres";


COMMENT ON COLUMN "public"."support_ticket"."status" IS 'Todo ticket novo aparecerá automaticamente como "Pendente".';



COMMENT ON COLUMN "public"."support_ticket"."criado_at" IS 'O banco registra a data/hora exata do momento em que o registro foi criado.';



CREATE SEQUENCE IF NOT EXISTS "public"."support_ticket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."support_ticket_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."support_ticket_id_seq" OWNED BY "public"."support_ticket"."id";



CREATE TABLE IF NOT EXISTS "public"."tool" (
    "id" integer NOT NULL,
    "nome" character varying(255) NOT NULL,
    "descricao" "text" NOT NULL,
    "url_oficial" "text" NOT NULL,
    "linguagem" character varying(255) NOT NULL,
    "status_ativo" boolean DEFAULT true NOT NULL,
    "stars" integer DEFAULT 0 NOT NULL,
    "tags" character varying(255)[] DEFAULT '{}'::character varying[] NOT NULL,
    "categoria" character varying(255) DEFAULT 'Geral'::character varying NOT NULL,
    "icon_slug" character varying(255)
);


ALTER TABLE "public"."tool" OWNER TO "postgres";


COMMENT ON COLUMN "public"."tool"."status_ativo" IS 'Por padrão, toda ferramenta nova cadastrada entra como ativa.';



COMMENT ON COLUMN "public"."tool"."stars" IS 'Número de estrelas/favoritos globais.';



COMMENT ON COLUMN "public"."tool"."tags" IS 'Array de tecnologias relacionadas (ex: {UI, Components, SPA}).';



CREATE SEQUENCE IF NOT EXISTS "public"."tool_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."tool_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."tool_id_seq" OWNED BY "public"."tool"."id";



CREATE TABLE IF NOT EXISTS "public"."user" (
    "id" integer NOT NULL,
    "nome" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "senha" character varying(255) NOT NULL,
    "data_nascimento" "date" NOT NULL,
    "perfil" character varying(255) NOT NULL,
    "criado_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "is_active" boolean DEFAULT false,
    "verification_code" character varying,
    "verification_expires_at" timestamp with time zone,
    "accepted_terms" boolean DEFAULT false,
    "accepted_terms_at" timestamp with time zone,
    "reset_password_code" "text",
    "reset_password_expires_at" timestamp with time zone,
    "titulo_profissional" character varying(150),
    "github" character varying(50),
    "linkedin" character varying(50),
    CONSTRAINT "check_perfil_valido" CHECK ((("perfil")::"text" = ANY ((ARRAY['superadmin'::character varying, 'admin'::character varying, 'moderador'::character varying, 'user'::character varying])::"text"[])))
);


ALTER TABLE "public"."user" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."user_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."user_id_seq" OWNED BY "public"."user"."id";



ALTER TABLE ONLY "public"."private_link" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."private_link_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."support_ticket" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."support_ticket_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."tool" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."tool_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."user" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."user_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."favorite"
    ADD CONSTRAINT "favorite_pkey" PRIMARY KEY ("usuario_id", "ferramenta_id");



ALTER TABLE ONLY "public"."private_link"
    ADD CONSTRAINT "private_link_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."support_ticket"
    ADD CONSTRAINT "support_ticket_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tool"
    ADD CONSTRAINT "tool_nome_unique" UNIQUE ("nome");



ALTER TABLE ONLY "public"."tool"
    ADD CONSTRAINT "tool_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");



CREATE INDEX "favorite_adicionado_at_idx" ON "public"."favorite" USING "btree" ("adicionado_at");



CREATE INDEX "favorite_ferramenta_id_idx" ON "public"."favorite" USING "btree" ("ferramenta_id");



CREATE INDEX "favorite_usuario_id_idx" ON "public"."favorite" USING "btree" ("usuario_id");



CREATE INDEX "private_link_usuario_id_idx" ON "public"."private_link" USING "btree" ("usuario_id");



CREATE INDEX "support_ticket_status_idx" ON "public"."support_ticket" USING "btree" ("status");



CREATE INDEX "support_ticket_usuario_id_idx" ON "public"."support_ticket" USING "btree" ("usuario_id");



ALTER TABLE ONLY "public"."favorite"
    ADD CONSTRAINT "favorite_ferramenta_id_fk" FOREIGN KEY ("ferramenta_id") REFERENCES "public"."tool"("id");



ALTER TABLE ONLY "public"."favorite"
    ADD CONSTRAINT "favorite_usuario_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."user"("id");



ALTER TABLE ONLY "public"."private_link"
    ADD CONSTRAINT "private_link_usuario_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."user"("id");



ALTER TABLE ONLY "public"."support_ticket"
    ADD CONSTRAINT "support_ticket_usuario_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."user"("id");



CREATE POLICY "Enable read access for all users" ON "public"."tool" FOR SELECT USING (true);



CREATE POLICY "Permitir inserção pública para cadastro" ON "public"."user" FOR INSERT WITH CHECK (true);



CREATE POLICY "Permitir leitura pública para login" ON "public"."user" FOR SELECT USING (true);



ALTER TABLE "public"."favorite" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."private_link" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."support_ticket" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tool" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "anon";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "service_role";



GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."favorite" TO "anon";
GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."favorite" TO "authenticated";
GRANT ALL ON TABLE "public"."favorite" TO "service_role";



GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."private_link" TO "anon";
GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."private_link" TO "authenticated";
GRANT ALL ON TABLE "public"."private_link" TO "service_role";



GRANT UPDATE ON SEQUENCE "public"."private_link_id_seq" TO "anon";
GRANT UPDATE ON SEQUENCE "public"."private_link_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."private_link_id_seq" TO "service_role";



GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."support_ticket" TO "anon";
GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."support_ticket" TO "authenticated";
GRANT ALL ON TABLE "public"."support_ticket" TO "service_role";



GRANT UPDATE ON SEQUENCE "public"."support_ticket_id_seq" TO "anon";
GRANT UPDATE ON SEQUENCE "public"."support_ticket_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."support_ticket_id_seq" TO "service_role";



GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."tool" TO "anon";
GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."tool" TO "authenticated";
GRANT ALL ON TABLE "public"."tool" TO "service_role";



GRANT UPDATE ON SEQUENCE "public"."tool_id_seq" TO "anon";
GRANT UPDATE ON SEQUENCE "public"."tool_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tool_id_seq" TO "service_role";



GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."user" TO "anon";
GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";



GRANT UPDATE ON SEQUENCE "public"."user_id_seq" TO "anon";
GRANT UPDATE ON SEQUENCE "public"."user_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT UPDATE ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT UPDATE ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT UPDATE ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLES TO "service_role";







