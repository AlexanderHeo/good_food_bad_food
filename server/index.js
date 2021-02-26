require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const bcrypt = require('bcrypt');
// const axios = require('axios');
// const pg = require('pg');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ClientError('Invalid username / password!', 400));
  }
  bcrypt.hash(password, 10)
    .then(hash => {
      const hashedPassword = hash;
      const sql = `
      insert into "users"("username", "password")
      values ($1, $2)
      returning "username", "userId";
      `;
      const params = [username, hashedPassword];
      db.query(sql, params)
        .then(response => {
          const user = response.rows[0].username;
          req.session.userId = response.rows[0].userId;
          if (!user) return next(new ClientError('Please Enter A Unique UserName', 400));
          res.status(201).json({ success: 's' });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/log-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next(new ClientError('Invalid username / password!', 400));
  const sql = `
  select *
    from "users"
    where "username" = $1;
  `;
  const params = [username];
  db.query(sql, params)
    .then(response => {
      if (!response.rows[0]) return next(new ClientError('User Account Does Not Exist!', 400));
      const dbPassword = response.rows[0].password;
      bcrypt.compare(password, dbPassword)
        .then(result => {
          if (!result) return next(new ClientError('Invalid username / password!', 400));
          req.session.userId = response.rows[0].userId;
          res.json({ success: 'Log-In success!' });
        });
    })
    .catch(err => next(err));
});

app.get('/api/isloggedin', (req, res, next) => {
  if (!req.session.userId) return res.json({ error: 'not logged in!' });
  res.json({ success: 'logged in' });
});

app.get('/api/log-out', (req, res, next) => {
  if (!req.session.userId) return next(new ClientError('Please log-in before log-out!', 400));
  delete req.session.userId;
  res.json({ success: 'Successful log-out' });
});

app.post('/api/enter', (req, res, next) => {
  const userId = req.session.userId;
  const { meal, mealtime } = req.body;
  if (!userId) return next(new ClientError(`Cannot find user with id: ${userId}.`, 400));
  else if (!meal) return next(new ClientError('Please enter a meal.', 400));
  const sql = `
    with add_to_meals as (
      insert into "meals" ("name", "userId")
      values ($1, $2)
      returning *
    ), add_to_reports as (
      insert into "mealReports" ("mealId")
      select "mealId" from "add_to_meals"
    ), add_to_mealtime as (
			insert into "mealtime" ("mealId", "mealtime")
			values (
				(select "mealId" from "add_to_meals"), $3)
			)
			select *
			from "add_to_meals"
  `;
  const params = [meal, userId, mealtime];
  db.query(sql, params)
    .then(result => {
      const postedMeal = result.rows[0]
      postedMeal.mealtime = mealtime
      postedMeal.report = null
      res.status(200).json(postedMeal)
      // const addedMeal = result.rows[0];
      // return axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${addedMeal.name}`)
      //   .then(response => {
      //     if (!response.data.meals) return res.status(201).json(addedMeal.mealId);
      //     const mealData = response.data.meals[0];
      //     const ingredients = [];
      //     Object.keys(mealData).filter(key => {
      //       if (key.includes('strIngredient') && mealData[key]) return ingredients.push(mealData[key]);
      //     });
      //     const insertValues = ingredients.map(ingredient => {
      //       return `(${pg.Client.prototype.escapeLiteral(ingredient)})`;
      //     }).join(',');
      //     const insertValues2 = ingredients.map(ingredient => {
      //       return `(${addedMeal.mealId}, ${pg.Client.prototype.escapeLiteral(ingredient)})`;
      //     }).join(',');
      //     const ingredientSQL = `
      //     with add_to_ingredients as (
      //       insert into "ingredients"("name")
      //       values ${insertValues}
      //       returning *
      //     ), add_to_meal_ingredients as (
      //       insert into "mealIngredients" ("mealId", "ingredientName")
      //       values ${insertValues2}
      //       returning *
      //     )
      //     select *
      //     from "add_to_meal_ingredients";
      //     `;
      //     return db.query(ingredientSQL)
      //       .then(ingreTable => {
      //         res.json(ingreTable.rows);
      //       });
      //   });
    })
    .catch(error =>
      next(error)
    );
});

app.patch('/api/enter/:mealId', (req, res, next) => {
  const sql = `
		UPDATE meals
		SET name=$1
		WHERE "mealId"=$2
		RETURNING *;
	`
  const values = [req.body.name, req.body.mealId]
  db.query(sql, values)
    .then(result => res.status(200).json(result.rows[0]))
})

app.get('/api/ratefood', (req, res, next) => {
  const userId = req.session.userId;
  const SQL = `
      SELECT m."mealId", m."name", m."eatenAt", mp."report"
      FROM "meals" as m
      LEFT JOIN "mealReports" as mp ON m."mealId" = mp."mealId"
      WHERE m."userId" = ${userId}
      order by "eatenAt" desc;
    `;
  db.query(SQL)
    .then(result => {
      const meals = result.rows;
      res.status(200).json(meals);
    })
    .catch(err => next(err));
});

app.patch('/api/rate/:mealId', (req, res, next) => {
  const text = `
  UPDATE "mealReports"
  SET "report" = $2
  WHERE "mealId" = $1
  RETURNING *
    `;
  const values = [req.body.mealId, req.body.report];

  db.query(text, values)
    .then(result => {
      const report = result.rows;
      res.json(report);
      return report;
    })
    .catch(err => next(err));
});

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

app.get('/api/ingredients/:mealId', (req, res, next) => {
  const mealId = parseInt(req.params.mealId);
  if (!mealId) {
    return next(new ClientError('Cannot find meal ID', 400));
  }

  const SQL = `
  select "ingredientName"
  from "mealIngredients"
  where "mealId" = ${mealId}
  `;

  db.query(SQL)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/list', (req, res, next) => {
  const { userId } = req.session;

  const condition = new RegExp('^\\d+$');
  if (!condition.test(userId)) return next(new ClientError(`user Id must be valid! Bad Id: ${userId}`, 404));
  const sql = `
  select "m"."name",
  "m"."eatenAt",
	"m"."mealId",
	"t"."mealtime",
  "r"."report"
  from "meals" as "m"
	left join "mealtime" as "t" using ("mealId")
  left join "mealReports" as "r" using ("mealId")
  where "m"."userId" = $1
  order by "eatenAt" desc;
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows)
    })
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
