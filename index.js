/*import express from "./node_modules/express/index.js";
import path from "./node_modules/path/path.js";
import bodyParser from "./node_modules/body-parser/index.js";
import postgres from "postgres";*/
import config from "./sqlconfig.json" with { type: "json" };
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import postgres from "postgres";

const __dirname = import.meta.dirname;

const app = express();
const port = 3000;

const sql = postgres({
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  schema: config.schema,
} )


app.use(express.static(path.join('')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
})

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
})

app.get("/createAcc", (req, res) => {
  res.sendFile(path.join(__dirname, 'createAcc.html'));
})

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, 'stats.html'));
})

app.get("/timer", (req, res) => {
  res.sendFile(path.join(__dirname, 'timer.html'));
})

app.get("/fish", (req, res) => {
  res.sendFile(path.join(__dirname, 'fishTank.html'));
})

app.get("/time", (req, res) => {
  let query = `SELECT timeday1
               FROM s_fe80a0cc.procrastiNOT
               WHERE username = \'EmilyEmms\'`

})

app.get("/validate", (req, res) => {
  const validate = async () => {
    let query = await sql`SELECT username FROM s_fe80a0cc.procrastiNOT;`;
    console.log(query.length)
    let values = []
    for (let i = 0; i < query.length; i++) {
      values.push(query[i])
      console.log(values)
    }
    res.send(values);
  }
  validate();
});

app.post("/createUser", (req, res) => {
  res.send("REQUEST ACKNOWLEDGED!")
})

/*app.post("/goal", (req, res) => {
  const query = `UPDATE test SET goalpassed = TRUE WHERE username = \'EmilyEmms\'; `;

  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error occurred: ", error);
      res.status(500).send("An error occurred while retrieving data from the database");
    } else {
      const user = result.rows;
      res.json(user);
    }
  })
});

app.get("/isFish", (req, res) => {
  const query = `SELECT goalpassed FROM test WHERE username = \'EmilyEmms\';`;
  console.log(query);
  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error occurred: ", error);
      res.status(500).send("An error occurred while retrieving data from the database");
    } else {
      const user = result.rows;
      res.json(user);
      console.log(user)
    }
  });
});


})*/

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



/*const nu = sql`
    alter table ${schema} drop column id;`

const newUser = async () => console.log(await nu.execute());

newUser()
const schema = sql`set schema 's_fe80a0cc'`
const a = async () => console.log(await schema.execute());
console.log(a())*/








