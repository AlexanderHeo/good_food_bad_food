require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/enter', (req, res, next) => {
  // const userId = req.session.userId;
  const userId = 1;
  const { meal } = req.body;
  if (!userId) {
    next(new ClientError(`Cannot find user with id: ${userId}.`, 400));
    return;
  } else if (!meal) {
    next(new ClientError('Please enter a meal.', 400));
    return;
  }
  const sql = `
    insert into "meals" ("name", "userId")
    values ($1, $2)
    returning *;
  `;
  const params = [meal, userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(error =>
      next(error)
    );
});

// FOOD LIST WITH OR WITHOUT RATINGS
app.get('/api/ratefood', (req, res, next) => {
  const SQL = `
      SELECT m."userId", m."mealId", m."name", m."eatenAt", mp."report", mp."image"
      FROM "meals" as m
      LEFT JOIN "mealReports" as mp ON m."mealId" = mp."mealId"
      WHERE m."userId" = 1
    `;
  db.query(SQL)
    .then(result => {
      const meals = result.rows;
      res.status(200).json(meals);
    })
    .catch(err => next(err));
});

// SENDING NEW RATING
app.patch('/api/rate/:mealId', (req, res, next) => {
  const text = `
  UPDATE "mealReports"
  SET "report" = $2, "image" = $3
  WHERE "mealId" = $1
  RETURNING *
    `;
  const values = [req.body.mealId, req.body.report, req.body.image];

  db.query(text, values)
    .then(result => {
      const report = result.rows;
      res.json(report);
      return report;
    })
    .catch(err => next(err));
});

// GET INDIVIDUAL MEAL
app.get('/api/rate/:mealId', (req, res, next) => {
  const mealId = parseInt(req.params.mealId);
  const SQL = `
  SELECT m."name"
  FROM "meals" as m
  LEFT JOIN "mealReports" as mp ON m."mealId" = mp."mealId"
  WHERE m."mealId" = $1
`;

  const value = [mealId];
  db.query(SQL, value)
    .then(result => {
      const [singleMeal] = result.rows;
      res.status(200).json(singleMeal);
    })
    .catch(err => next(err));
});

// UPDATING RATINGS
// app.put('/api/ratefood', (req, res, next) => {
//   const text = `
//   update "mealReports"
//   set "report" = $2
//   where "mealId" = $1
//   `;

//   const values = [`${req.body.mealId}`, `${req.body.report}`];

//   db.query(text, values)
//     .then(result => {
//       const report = result.rows;
//       res.json(report);
//       return report;
//     });
// });

app.get('/api/list', (req, res, next) => {
  let { userId } = req.session;

  // for testing default userId to 1;
  if (!userId) {
    userId = 1;
  }

  const condition = new RegExp('^\\d+$');
  if (!condition.test(userId)) return next(new ClientError(`user Id must be valid! Bad Id: ${userId}`, 404));
  const sql = `
  select "m"."name",
  "m"."eatenAt",
  "r"."report",
  "r"."image"
  from "meals" as "m"
  left join "mealReports" as "r" using ("mealId")
  where "m"."userId" = $1
  order by "eatenAt" desc;
  `;
  const params = [1];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
