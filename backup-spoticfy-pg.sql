--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-07-31 14:21:19 -03

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 40961)
-- Name: albumes; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.albumes (
    id integer NOT NULL,
    nombre text NOT NULL,
    artista integer NOT NULL
);


ALTER TABLE public.albumes OWNER TO "default";

--
-- TOC entry 216 (class 1259 OID 40960)
-- Name: albumes_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.albumes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.albumes_id_seq OWNER TO "default";

--
-- TOC entry 3358 (class 0 OID 0)
-- Dependencies: 216
-- Name: albumes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.albumes_id_seq OWNED BY public.albumes.id;


--
-- TOC entry 219 (class 1259 OID 40970)
-- Name: artistas; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.artistas (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public.artistas OWNER TO "default";

--
-- TOC entry 218 (class 1259 OID 40969)
-- Name: artistas_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.artistas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artistas_id_seq OWNER TO "default";

--
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 218
-- Name: artistas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.artistas_id_seq OWNED BY public.artistas.id;


--
-- TOC entry 221 (class 1259 OID 40979)
-- Name: canciones; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.canciones (
    id integer NOT NULL,
    album integer NOT NULL,
    duracion integer NOT NULL,
    reproducciones integer DEFAULT 0 NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public.canciones OWNER TO "default";

--
-- TOC entry 220 (class 1259 OID 40978)
-- Name: canciones_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.canciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.canciones_id_seq OWNER TO "default";

--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 220
-- Name: canciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.canciones_id_seq OWNED BY public.canciones.id;


--
-- TOC entry 3191 (class 2604 OID 40964)
-- Name: albumes id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.albumes ALTER COLUMN id SET DEFAULT nextval('public.albumes_id_seq'::regclass);


--
-- TOC entry 3192 (class 2604 OID 40973)
-- Name: artistas id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.artistas ALTER COLUMN id SET DEFAULT nextval('public.artistas_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 40982)
-- Name: canciones id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.canciones ALTER COLUMN id SET DEFAULT nextval('public.canciones_id_seq'::regclass);


--
-- TOC entry 3347 (class 0 OID 40961)
-- Dependencies: 217
-- Data for Name: albumes; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public.albumes (id, nombre, artista) VALUES (1, 'La Base de los Datos', 7);
INSERT INTO public.albumes (id, nombre, artista) VALUES (2, 'Ya lo sabIA', 3);
INSERT INTO public.albumes (id, nombre, artista) VALUES (3, 'No es Java', 4);
INSERT INTO public.albumes (id, nombre, artista) VALUES (4, 'Nada como Unity', 1);
INSERT INTO public.albumes (id, nombre, artista) VALUES (5, 'Desaparezco', 5);
INSERT INTO public.albumes (id, nombre, artista) VALUES (6, 'Dame inspiración', 6);
INSERT INTO public.albumes (id, nombre, artista) VALUES (7, 'Internet of Boca', 2);
INSERT INTO public.albumes (id, nombre, artista) VALUES (8, 'Cortocircuito', 2);
INSERT INTO public.albumes (id, nombre, artista) VALUES (9, 'Un contrato inteligente', 3);


--
-- TOC entry 3349 (class 0 OID 40970)
-- Dependencies: 219
-- Data for Name: artistas; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public.artistas (id, nombre) VALUES (1, 'Jero');
INSERT INTO public.artistas (id, nombre) VALUES (2, 'Ivo');
INSERT INTO public.artistas (id, nombre) VALUES (3, 'Chona');
INSERT INTO public.artistas (id, nombre) VALUES (4, 'Nacho');
INSERT INTO public.artistas (id, nombre) VALUES (5, 'Daro');
INSERT INTO public.artistas (id, nombre) VALUES (6, 'Ranzo');
INSERT INTO public.artistas (id, nombre) VALUES (7, 'Aro');


--
-- TOC entry 3351 (class 0 OID 40979)
-- Dependencies: 221
-- Data for Name: canciones; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (1, 1, 115, 150, 'Momento phpMyAdmin ft. Nacho');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (2, 2, 145, 110, 'Orbitando Jupyter');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (3, 3, 160, 5500, 'Es JavaScript');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (4, 5, 135, 1300, '¿Dónde estoy? ft. Chona');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (5, 4, 125, 1600, 'Modelame así en 3D');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (6, 6, 160, 400, 'Protopersona');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (7, 7, 200, 600, 'Arduino (la mitad más) UNO');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (8, 3, 115, 800, 'Sos el WHERE de mi SELECT');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (9, 8, 155, 1000, 'El WIFI de mi ESP');
INSERT INTO public.canciones (id, album, duracion, reproducciones, nombre) VALUES (10, 9, 165, 6500, 'Mi chain de bloque');


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 216
-- Name: albumes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.albumes_id_seq', 1, false);


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 218
-- Name: artistas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.artistas_id_seq', 1, false);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 220
-- Name: canciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.canciones_id_seq', 1, false);


--
-- TOC entry 3196 (class 2606 OID 40968)
-- Name: albumes albumes_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.albumes
    ADD CONSTRAINT albumes_pkey PRIMARY KEY (id);


--
-- TOC entry 3198 (class 2606 OID 40977)
-- Name: artistas artistas_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.artistas
    ADD CONSTRAINT artistas_pkey PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 40985)
-- Name: canciones canciones_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.canciones
    ADD CONSTRAINT canciones_pkey PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 49157)
-- Name: canciones album_fk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.canciones
    ADD CONSTRAINT album_fk FOREIGN KEY (album) REFERENCES public.albumes(id) NOT VALID;


--
-- TOC entry 3201 (class 2606 OID 49152)
-- Name: albumes artistafk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.albumes
    ADD CONSTRAINT artistafk FOREIGN KEY (artista) REFERENCES public.artistas(id) NOT VALID;


--
-- TOC entry 2050 (class 826 OID 32769)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2049 (class 826 OID 32768)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2024-07-31 14:21:34 -03

--
-- PostgreSQL database dump complete
--

