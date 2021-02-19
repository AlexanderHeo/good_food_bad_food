--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public."userIngredients" DROP CONSTRAINT "userIngredients_userId_fkey";
ALTER TABLE ONLY public."userIngredients" DROP CONSTRAINT "userIngredients_ingredient_fkey";
ALTER TABLE ONLY public.meals DROP CONSTRAINT "meals_userId_fkey";
ALTER TABLE ONLY public."mealReports" DROP CONSTRAINT "mealReports_mealId_fkey";
ALTER TABLE ONLY public."mealIngredients" DROP CONSTRAINT "mealIngredients_mealId_fkey";
ALTER TABLE ONLY public."mealIngredients" DROP CONSTRAINT fk;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.meals DROP CONSTRAINT meals_pkey;
ALTER TABLE ONLY public."mealReports" DROP CONSTRAINT mealreports_mealid_u;
ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.meals ALTER COLUMN "mealId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP TABLE public."userIngredients";
DROP TABLE public.mealtime;
DROP SEQUENCE public."meals_mealId_seq";
DROP TABLE public.meals;
DROP TABLE public."mealReports";
DROP TABLE public."mealIngredients";
DROP TABLE public.ingredients;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ingredients (
    name text NOT NULL
);


--
-- Name: mealIngredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."mealIngredients" (
    "mealId" integer NOT NULL,
    "ingredientName" text NOT NULL
);


--
-- Name: mealReports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."mealReports" (
    "mealId" integer NOT NULL,
    report integer,
    image text
);


--
-- Name: meals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.meals (
    "mealId" integer NOT NULL,
    name character varying(90) NOT NULL,
    "eatenAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: meals_mealId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."meals_mealId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: meals_mealId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."meals_mealId_seq" OWNED BY public.meals."mealId";


--
-- Name: mealtime; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mealtime (
    "mealId" integer,
    mealtime character(1)
);


--
-- Name: userIngredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userIngredients" (
    "userId" integer NOT NULL,
    ingredient text NOT NULL,
    unfavorable boolean NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    username character varying(90) NOT NULL,
    password text NOT NULL,
    location text
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: meals mealId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.meals ALTER COLUMN "mealId" SET DEFAULT nextval('public."meals_mealId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ingredients (name) FROM stdin;
bacon
tomato
lettuce
1
2
3
4
5
\.


--
-- Data for Name: mealIngredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."mealIngredients" ("mealId", "ingredientName") FROM stdin;
1	bacon
1	tomato
1	lettuce
\.


--
-- Data for Name: mealReports; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."mealReports" ("mealId", report, image) FROM stdin;
1	1	/images/badFace.jpg
2	2	/images/neutralFace.jpg
3	2	/images/neutralFace.jpg
5	3	/images/happyFace.jpg
12	3	/images/happyFace.jpg
11	3	/images/happyFace.jpg
13	3	images/happyFace.jpg
14	2	images/neutralFace.jpg
15	1	images/badFace.jpg
\.


--
-- Data for Name: meals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.meals ("mealId", name, "eatenAt", "userId") FROM stdin;
1	BLT	2020-01-22 10:54:40.912531-08	1
3	Mutton	2020-01-23 10:51:46.844296-08	1
2	water2.0	2020-01-23 10:31:46.63852-08	1
4	ksgagaglas	2020-01-24 16:58:50.839627-08	1
5	food1	2020-01-27 12:31:18.709119-08	1
6	sgsg	2020-01-27 17:27:22.054725-08	1
7	sgsg	2020-01-27 17:28:31.69958-08	1
8	sgsg	2020-01-27 17:29:22.814181-08	1
9	sgsg	2020-01-28 10:29:15.84586-08	1
10	sgsg	2020-01-28 10:31:54.144487-08	1
11	eggs	2021-01-06 11:07:55.392543-08	5
12	hash browns	2021-01-06 11:08:03.06037-08	5
13	chicken quesedilla	2021-02-17 19:40:15.472662-08	5
14	potato, eggs	2021-02-17 19:40:15.472662-08	5
15	shrimp ramen	2021-02-17 19:40:15.472662-08	5
\.


--
-- Data for Name: mealtime; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mealtime ("mealId", mealtime) FROM stdin;
11	b
12	b
13	l
14	b
15	d
\.


--
-- Data for Name: userIngredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."userIngredients" ("userId", ingredient, unfavorable) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", username, password, location) FROM stdin;
1	Evan	learningfuze	Irvine
2	Alex	$2b$10$vMdVPyc.VY.KFAYn8hfBMexet.gtfJfaEhVCI5esI7O.nAKo5rNKu	\N
4	fender	$2b$10$3rfRs3ClG11HpJqM91JSvOxdomMr2EglOKsq3OOxoya81xkpSzYlO	\N
5	alex	$2b$10$YMhm/IaR7OCematju.psUuRr/DBbksHRR1TQlhZhNEBVTLr5uViZ2	\N
\.


--
-- Name: meals_mealId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."meals_mealId_seq"', 15, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 5, true);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (name);


--
-- Name: mealReports mealreports_mealid_u; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."mealReports"
    ADD CONSTRAINT mealreports_mealid_u UNIQUE ("mealId");


--
-- Name: meals meals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY ("mealId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: mealIngredients fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."mealIngredients"
    ADD CONSTRAINT fk FOREIGN KEY ("ingredientName") REFERENCES public.ingredients(name);


--
-- Name: mealIngredients mealIngredients_mealId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."mealIngredients"
    ADD CONSTRAINT "mealIngredients_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES public.meals("mealId");


--
-- Name: mealReports mealReports_mealId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."mealReports"
    ADD CONSTRAINT "mealReports_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES public.meals("mealId");


--
-- Name: meals meals_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: userIngredients userIngredients_ingredient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userIngredients"
    ADD CONSTRAINT "userIngredients_ingredient_fkey" FOREIGN KEY (ingredient) REFERENCES public.ingredients(name);


--
-- Name: userIngredients userIngredients_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userIngredients"
    ADD CONSTRAINT "userIngredients_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

