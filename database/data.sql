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
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: dev
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
Plain chocolate
Butter
Milk
Eggs
Granulated Sugar
Flour
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.users ("userId", username, password, city, state) FROM stdin;
1	Evan	learningfuze	\N	\N
2	Alex	$2b$10$vMdVPyc.VY.KFAYn8hfBMexet.gtfJfaEhVCI5esI7O.nAKo5rNKu	\N	\N
4	fender	$2b$10$3rfRs3ClG11HpJqM91JSvOxdomMr2EglOKsq3OOxoya81xkpSzYlO	\N	\N
5	alex	$2b$10$wWwQqvpBDHWMpDmOSX4p4eXcJ0L5eAofGfumyBfhks7YMC4WA9txe	Cloud City	Bespin
25	asdf	$2b$10$hx4VoeiuJTZS9LZpmaIfg.ZUs2M/mkMhV1G762Q.nRmcz.WOk2t9O	Death Star City	CA
26	Ahsoka	$2b$10$ebKl2RiEHyl.2IjGO5aj/uNRF6ngXkzwKWMtJVda0G.dEJf9SDRry	Long Beach	CO
27	ffff	$2b$10$Sblkn3XDbJmbnTgKAAl7reUArOYDOvMuxch9vR/75NZgbw41LUuoO	Long Beach	CA
28	gggg	$2b$10$Wt2eBTyhvlDau/j7ejCHweNvRe8XX1PycM3UW.oEXtN97L3xhKqAu	f	FL
29	gg	$2b$10$rqDIhrsp69WM.Bdxn2o6E.SanCHWylNzIE3xxFK.J5aJZILWyZI52	los angeles	CA
\.


--
-- Data for Name: meals; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.meals ("mealId", name, "eatenAt", "userId") FROM stdin;
33	jello	2017-03-27 00:00:00-07	5
40	tomato soup	2021-02-20 00:00:00-08	5
211	potato, eggs	2021-03-03 23:25:57.09845-08	5
212	soup	2021-03-03 23:26:07.168685-08	5
213	steak	2021-03-03 23:26:11.708384-08	5
214	egg sandwich	2021-03-04 13:41:13.751607-08	5
34	potato, eggs	2021-02-19 00:00:00-08	5
35	curry rice	2021-02-19 00:00:00-08	5
36	cereal	2021-02-19 00:00:00-08	5
37	ice cream	2021-02-19 00:00:00-08	5
38	potato, eggs	2021-02-20 00:00:00-08	5
39	chicken quesadilla	2021-02-20 00:00:00-08	5
41	chocolate	2021-02-20 00:00:00-08	5
42	potato, eggs	2021-02-21 00:00:00-08	5
43	grilled cheese	2021-02-21 00:00:00-08	5
44	shrimp ramen	2021-02-21 00:00:00-08	5
51	ice cream	2021-02-21 00:00:00-08	5
52	potato, eggs	2021-02-22 00:00:00-08	5
53	chicken sandwich	2021-02-22 00:00:00-08	5
54	bulgogi	2021-02-22 00:00:00-08	5
55	ice cream	2021-02-22 00:00:00-08	5
57	ham sandwich	2021-02-23 00:00:00-08	5
58	pork katsu	2021-02-23 00:00:00-08	5
59	chocolate	2021-02-23 00:00:00-08	5
60	potato, eggs	2021-02-24 00:00:00-08	5
61	hot dogs	2021-02-24 00:00:00-08	5
62	cereal	2021-02-24 00:00:00-08	5
63	chocolate	2021-02-24 00:00:00-08	5
65	cheese burgerss	2021-02-25 00:00:00-08	5
66	spicy pork wraps	2021-02-25 00:00:00-08	5
151	asdffdsa	2021-02-26 15:41:32.288158-08	5
152	ssss	2021-02-26 16:31:19.90879-08	5
150	asdfasdf	2021-02-26 15:40:41.770506-08	5
85	mango	2021-02-25 00:00:00-08	5
64	potato, eggs	2021-02-25 00:00:00-08	5
153	almonds	2021-02-27 11:41:00.137118-08	5
56	potato, eggs	2021-02-23 00:00:00-08	5
155	almonds	2021-02-27 12:10:21.562987-08	5
154	asdfasdf	2021-02-27 12:08:53.428506-08	5
156	ffff	2021-02-27 12:12:45.289403-08	5
157	pancakes	2021-03-01 13:10:27.765383-08	5
165	cereal	2021-03-01 21:57:59.581513-08	5
236	potato, eggs	2021-04-03 15:13:14.119199-07	5
242	ffff	2021-04-03 17:26:48.58791-07	5
243	ss	2021-04-03 17:29:32.493581-07	5
244	ff	2021-04-03 17:37:49.659024-07	5
245	dd	2021-04-03 17:41:16.479526-07	5
246	cc	2021-04-03 17:43:23.657103-07	5
247	ff	2021-04-03 17:46:11.195875-07	5
249	ddd	2021-03-04 18:11:53.329-08	5
250	ssss	2021-03-05 18:11:53.329-08	5
251	dd	2021-03-30 18:21:53.91-07	5
252	gfdsgfd	2021-04-01 18:21:53.91-07	5
253	potato, eggs	2021-04-04 12:47:28.426-07	5
254	potato, eggs, veggie patty	2021-04-07 11:08:23.081-07	5
255	chicken salad sandwich	2021-04-07 11:08:23.081-07	5
256	pork kimchi hotpot	2021-04-07 11:08:23.081-07	5
257	 potato, eggs, veggie patty	2021-04-08 11:10:11.293985-07	5
258	ice cream	2021-04-07 11:08:23.081-07	5
259	potato, eggs, bacon	2021-04-06 11:08:23.081-07	5
260	ham sandwich	2021-04-06 11:08:23.081-07	5
261	curry	2021-04-06 11:08:23.081-07	5
262	mango	2021-04-06 11:08:23.081-07	5
\.


--
-- Data for Name: mealIngredients; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."mealIngredients" ("mealId", "ingredientName") FROM stdin;
\.


--
-- Data for Name: mealReports; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."mealReports" ("mealId", report) FROM stdin;
154	5
66	1
85	3
65	2
52	2
53	2
54	2
55	2
56	2
57	2
58	2
59	2
38	3
40	1
41	3
39	1
33	1
34	1
35	1
36	1
37	1
157	5
165	5
211	5
214	5
51	3
44	3
43	3
42	3
60	3
61	3
62	3
63	3
64	3
150	3
152	5
151	1
153	\N
155	\N
156	\N
213	4
212	3
236	5
242	\N
243	\N
244	\N
245	\N
246	\N
247	\N
249	3
250	\N
251	\N
252	\N
253	\N
257	\N
254	5
255	5
256	4
258	3
259	5
260	5
261	5
262	5
\.


--
-- Data for Name: mealtime; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.mealtime ("mealId", mealtime) FROM stdin;
85	snacks
150	breakfast
151	lunch
152	dinner
153	snacks
154	breakfast
155	snacks
156	lunch
157	breakfast
165	dinner
236	breakfast
242	lunch
243	dinner
244	snacks
245	snacks
246	snacks
33	snacks
34	breakfast
35	lunch
36	dinner
37	snacks
38	breakfast
39	lunch
40	dinner
41	snacks
42	breakfast
43	lunch
44	dinner
247	snacks
249	lunch
250	breakfast
251	lunch
51	snacks
52	breakfast
53	lunch
54	dinner
55	snacks
56	breakfast
57	lunch
58	dinner
59	snacks
60	breakfast
61	lunch
62	dinner
63	snacks
64	breakfast
65	lunch
66	dinner
252	dinner
253	breakfast
254	breakfast
255	lunch
256	dinner
257	breakfast
258	snacks
259	breakfast
260	lunch
261	dinner
262	snacks
211	breakfast
212	lunch
213	dinner
214	breakfast
\.


--
-- Data for Name: userIngredients; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."userIngredients" ("userId", ingredient, unfavorable) FROM stdin;
\.


--
-- Name: meals_mealId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."meals_mealId_seq"', 262, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."users_userId_seq"', 29, true);


--
-- PostgreSQL database dump complete
--

