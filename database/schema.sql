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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.ingredients (
    name text NOT NULL
);


ALTER TABLE public.ingredients OWNER TO dev;

--
-- Name: mealIngredients; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."mealIngredients" (
    "mealId" integer NOT NULL,
    "ingredientName" text NOT NULL
);


ALTER TABLE public."mealIngredients" OWNER TO dev;

--
-- Name: mealReports; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."mealReports" (
    "mealId" integer NOT NULL,
    report integer
);


ALTER TABLE public."mealReports" OWNER TO dev;

--
-- Name: meals; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.meals (
    "mealId" integer NOT NULL,
    name character varying(90) NOT NULL,
    "eatenAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.meals OWNER TO dev;

--
-- Name: meals_mealId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."meals_mealId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."meals_mealId_seq" OWNER TO dev;

--
-- Name: meals_mealId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."meals_mealId_seq" OWNED BY public.meals."mealId";


--
-- Name: mealtime; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.mealtime (
    "mealId" integer,
    mealtime character varying
);


ALTER TABLE public.mealtime OWNER TO dev;

--
-- Name: userIngredients; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."userIngredients" (
    "userId" integer NOT NULL,
    ingredient text NOT NULL,
    unfavorable boolean NOT NULL
);


ALTER TABLE public."userIngredients" OWNER TO dev;

--
-- Name: users; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    username character varying(90) NOT NULL,
    password text NOT NULL,
    city character varying,
    state character varying
);


ALTER TABLE public.users OWNER TO dev;

--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users_userId_seq" OWNER TO dev;

--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: meals mealId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.meals ALTER COLUMN "mealId" SET DEFAULT nextval('public."meals_mealId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (name);


--
-- Name: mealReports mealreports_mealid_u; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."mealReports"
    ADD CONSTRAINT mealreports_mealid_u UNIQUE ("mealId");


--
-- Name: meals meals_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY ("mealId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: mealIngredients fk; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."mealIngredients"
    ADD CONSTRAINT fk FOREIGN KEY ("ingredientName") REFERENCES public.ingredients(name);


--
-- Name: mealIngredients mealIngredients_mealId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."mealIngredients"
    ADD CONSTRAINT "mealIngredients_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES public.meals("mealId");


--
-- Name: mealReports mealReports_mealId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."mealReports"
    ADD CONSTRAINT "mealReports_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES public.meals("mealId");


--
-- Name: meals meals_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: userIngredients userIngredients_ingredient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."userIngredients"
    ADD CONSTRAINT "userIngredients_ingredient_fkey" FOREIGN KEY (ingredient) REFERENCES public.ingredients(name);


--
-- Name: userIngredients userIngredients_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."userIngredients"
    ADD CONSTRAINT "userIngredients_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: dev
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

