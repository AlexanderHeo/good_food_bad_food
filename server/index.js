require('dotenv/config')
const express = require('express')
const bcrypt = require('bcrypt')

const db = require('./database')
const ClientError = require('./client-error')
const staticMiddleware = require('./static-middleware')
const sessionMiddleware = require('./session-middleware')

const app = express()

app.use(staticMiddleware)
app.use(sessionMiddleware)
app.use(express.json())

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.post('/api/sign-up', (req, res, next) => {
  const { username, password, city, state } = req.body
  if (!username || !password) {
    return next(new ClientError('Invalid username / password!', 400))
  }
  bcrypt.hash(password, 10)
    .then(hash => {
      const hashedPassword = hash
      const sql = `
				INSERT INTO "users"("username", "password", "city", "state")
				VALUES ($1, $2, $3, $4)
				RETURNING *;
      `
      const params = [username, hashedPassword, city, state]
      db.query(sql, params)
        .then(response => {
          const user = response.rows[0].username
          req.session.userId = response.rows[0].userId
          if (!user) return next(new ClientError('Please Enter A Unique UserName', 400))
          res.status(201).json({ success: 's' })
        })
        .catch(err => {
          console.error(err)
          next(err)
        })
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.post('/api/log-in', (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) return next(new ClientError('Invalid username / password!', 400))
  const sql = `
		SELECT *
			FROM "users"
			WHERE "username" = $1;
  `
  const params = [username]
  db.query(sql, params)
    .then(response => {
      if (!response.rows[0]) return next(new ClientError('User Account Does Not Exist!', 400))
      const dbPassword = response.rows[0].password
      bcrypt.compare(password, dbPassword)
        .then(result => {
          if (!result) return next(new ClientError('Invalid username / password!', 400))
          req.session.userId = response.rows[0].userId
          res.json({ success: 'Log-In success!' })
        })
        .catch(err => {
          console.error(err)
          next(err)
        })
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.get('/api/isloggedin', (req, res, next) => {
  const { userId } = req.session
  if (!userId) return next(new ClientError('Please log in first!', 400))
  if (isNaN(userId)) return next(new ClientError('User Id must be a positive integer.', 400))

  const sql = `
		SELECT "userId", "username", "city", "state"
		FROM "users" WHERE "userId" = $1;
	`
  const param = [userId]
  db.query(sql, param)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.get('/api/log-out', (req, res, next) => {
  if (!req.session.userId) return next(new ClientError('Please log-in before log-out!', 400))
  delete req.session.userId
  res.json({ success: 'Successful log-out' })
})

app.patch('/api/reset/:userId', (req, res, next) => {
  const { userId, newPassword } = req.body
  // validation for userId and newPassword
  bcrypt.hash(newPassword, 10)
    .then(hash => {
      const sql = `
				update "users"
				set "password" = $2
				where "userId" = $1
				returning *;
			`
      const params = [userId, hash]
      db.query(sql, params)
        .then(response => {
          if (response.rows[0]) res.json({ success: true })
        })
        .catch(err => {
          console.error(err)
          next(err)
        })
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.patch('/api/location/:userId', (req, res, next) => {
  const { city, state, userId } = req.body
  // validation
  const sql = `
		UPDATE "users"
		SET "city"=$1, "state"=$2
		WHERE "userId"=$3
		RETURNING "userId", "username", "city", "state";
	`
  const params = [city, state, userId]
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.post('/api/check', (req, res, next) => {
  const { userId, password } = req.body
  // validate userId and password
  const sql = `
		SELECT *
		FROM "users"
		WHERE "userId" = $1;
	`
  const param = [userId]
  db.query(sql, param)
    .then(response => {
      const resp = response.rows[0]
      const dbPW = resp.password
      // if (!resp) return next(new ClientError('User Account Does Not Exist!', 400))
      // if (resp.userId !== req.session.userId) return next(new ClientError('Error: code 234kd'))
      // if (resp.username !== username) return next(new ClientError('Username does not exist', 400))
      bcrypt.compare(password, dbPW)
        .then(result => {
          if (!result) return next(new ClientError('Invalid username/password!', 400))
          res.json({ success: result })
        })
        .catch(err => {
          console.error(err)
          next(err)
        })
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.get('/api/list', (req, res, next) => {
  const { userId } = req.session

  const condition = new RegExp('^\\d+$')
  if (!condition.test(userId)) return next(new ClientError(`user Id must be valid! Bad Id: ${userId}`, 404))
  const sql = `
		SELECT "m"."name",
		"m"."eatenAt",
		"m"."mealId",
		"t"."mealtime",
		"r"."report"
		FROM "meals" AS "m"
		LEFT JOIN "mealtime" AS "t" USING ("mealId")
		LEFT JOIN "mealReports" AS "r" USING ("mealId")
		WHERE "m"."userId" = $1
		ORDER BY "eatenAt" DESC;
  `
  const params = [userId]
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.post('/api/enter', (req, res, next) => {
  const userId = req.session.userId
  const { meal, mealtime, isToday, enterDate } = req.body

  if (!userId) return next(new ClientError(`Cannot find user with id: ${userId}.`, 400))
  else if (!meal) return next(new ClientError('Please enter a meal.', 400))
  const sql = `
		WITH add_to_meals AS (
			INSERT INTO "meals" ("name", "userId")
			VALUE ($1, $2)
			RETURNING "mealId", "name", "eatenAt"
		), add_to_reports AS (
			INSERT INTO "mealReports" ("mealId")
			SELECT "mealId" FROM "add_to_meals"
		), add_to_mealtime AS (
			INSERT INTO "mealtime" ("mealId", "mealtime")
			VALUES (
				(SELECT "mealId" FROM "add_to_meals"), $3)
			)
			SELECT *
			FROM "add_to_meals";
	`
  const params = [meal.toLowerCase(), userId, mealtime]
  db.query(sql, params)
    .then(result => {
      const postedMeal = result.rows[0]
      if (isToday) {
        postedMeal.mealtime = mealtime
        postedMeal.report = null
        res.status(200).json(postedMeal)
      } else {
        const { mealId } = postedMeal
        const { timestamp } = enterDate
        const eatenAt = new Date(timestamp)
        const sql = `
					UPDATE "meals"
					SET "eatenAt" = $1
					WHERE "mealId" = $2
					RETURNING *;
				`
        const params = [eatenAt, mealId]
        db.query(sql, params)
          .then(result => {
            const postedMeal = result.rows[0]
            postedMeal.mealtime = mealtime
            postedMeal.report = null
            res.status(200).json(postedMeal)
          })
          .catch(err => {
            console.error(err)
            next(err)
          })
      }
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.patch('/api/enter/:mealId', (req, res, next) => {
  const sql = `
		UPDATE meals
		SET name=$1
		WHERE "mealId"=$2
		RETURNING *;
	`
  const values = [req.body.name.toLowerCase(), req.body.mealId]
  db.query(sql, values)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.delete('/api/enter/:mealId', (req, res, next) => {
  const { mealId } = req.params
  if (!parseInt(mealId)) {
    return res.status(400).json({ error: 'The meal id must be a positive integer.' })
  }
  const sql1 = `
  	DELETE FROM "mealReports"
		WHERE "mealId" = $1;
	`
  const sql2 = `
  	DELETE FROM "mealtime"
		WHERE "mealId" = $1;
	`
  const sql3 = `
  	DELETE FROM "meals"
		WHERE "mealId" = $1;
	`
  const param = [mealId]
  db.query(sql1, param)
    .then(result => {
      db.query(sql2, param)
        .then(result => {
          db.query(sql3, param)
            .then(result => {
              if (!result.rows[0]) {
                res.status(404).json({
                  error: `Cannot find meal at ${mealId}`
                })
              } else {
                res.status(204).json(result.rows[0])
              }
            })
            .catch(err => {
              console.error(err)
              next(err)
            })
        })
        .catch(err => {
          console.error(err)
          next(err)
        })
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.get('/api/ratefood', (req, res, next) => {
  const userId = req.session.userId
  const sql = `
		SELECT m."mealId", m."name", m."eatenAt", mp."report"
		FROM "meals" AS m
		LEFT JOIN "mealReports" AS mp ON m."mealId" = mp."mealId"
		WHERE m."userId" = ${userId}
		ORDER BY "eatenAt" DESC;
	`
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.patch('/api/rate/:mealId', (req, res, next) => {
  const sql = `
		UPDATE "mealReports"
		SET "report" = $2
		WHERE "mealId" = $1
		RETURNING *;
	`
  const params = [req.body.mealId, req.body.report]

  db.query(sql, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.get('/api/rate/:mealId', (req, res, next) => {
  const mealId = parseInt(req.params.mealId)
  const sql = `
		SELECT m."name"
		FROM "meals" AS m
		LEFT JOIN "mealReports" AS mp ON m."mealId" = mp."mealId"
		WHERE m."mealId" = $1;
	`

  const param = [mealId]
  db.query(sql, param)
    .then(result => {
      const [singleMeal] = result.rows
      res.status(200).json(singleMeal)
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.get('/api/ingredients/:mealId', (req, res, next) => {
  const mealId = parseInt(req.params.mealId)
  if (!mealId) return next(new ClientError('Cannot find meal ID', 400))

  const sql = `
		SELECT "ingredientName"
		FROM "mealIngredients"
		WHERE "mealId" = $1;
  `
  const param = [mealId]

  db.query(sql, param)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404))
})

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message })
  } else {
    console.error(err)
    res.status(500).json({
      error: 'an unexpected error occurred'
    })
  }
})

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT)
})
