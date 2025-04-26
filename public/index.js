import config from "./sqlconfig.json" with { type: "json" };
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import postgres from "postgres";

const __dirname = import.meta.dirname;
const app = express();
// Serve static files from the 'public' directoryapp.use(express.static(path.join(__dirname, 'public')));
const port = 3000

  const sql = postgres({
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    schema: config.schema,
  })

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());

  /*app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  })

  app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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
    res.sendFile(path.join(__dirname, 'Statistics.html'));
  })

  app.get("/timer", (req, res) => {
    res.sendFile(path.join(__dirname, 'timer.html'));
  })

  app.get("/fish", (req, res) => {
    res.sendFile(path.join(__dirname, 'fishTank.html'));
  })

  app.get("/pie", (req, res) => {
    res.sendFile(path.join(__dirname, 'Piechart.html'));
  })

  app.get("/bar", (req, res) => {
    res.sendFile(path.join(__dirname, 'Barchart.html'));
  })

  app.get("/achievements", (req, res) => {
    res.sendFile(path.join(__dirname, 'achievements.html'));
  })

app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, 'error.html'));
})*/

  app.get("/username", (req, res) => {
    const username = async () => {
      let query = await sql`SELECT username
                            FROM s_fe80a0cc.procrastiNOT;`;
      console.log(query.length)
      let values = []
      for (let i = 0; i < query.length; i++) {
        values.push(query[i])
      }
      res.send(values);
    }
    username();
  });

  app.post("/clearDays", (req, res) => {
    const {username} = req.body;
    const clearAllDays = async ({username}) => {
      let query = await sql`UPDATE s_fe80a0cc.procrastiNOT set timeday1 = '00:00:00', timeday2 = '00:00:00', timeday3 = '00:00:00', timeday4 = '00:00:00', timeday5 = '00:00:00', timeday6 = '00:00:00', timeday7 = '00:00:00' WHERE username = ${username}`;
    }
    clearAllDays({username});
  })

  app.get("/password", (req, res) => {
    const password = async () => {
      let query = await sql`SELECT password
                            FROM s_fe80a0cc.procrastiNOT;`;
      console.log(query.length)
      let values = []
      for (let i = 0; i < query.length; i++) {
        values.push(query[i])
      }
      res.send(values);
    }
    password();
  });


  app.post("/createUser", (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    const create = async ({username, password}) => {
      let query = await sql`INSERT INTO s_fe80a0cc.procrastiNOT (username, password)
                            VALUES (${username}, ${password});`;
      console.log("Thingy happened")
    }
    create({username, password})
  });

  app.post("/numTasks", (req, res) => {
    const {username} = req.body;
    const numTasks = async () => {
      let query = await sql`SELECT task
                            from s_fe80a0cc.tasks
                            where username = ${username};`
      let count = query.length
      console.log(count)
      count = JSON.stringify(count)
      res.send(count);
    }
    numTasks();
  })

  app.post("/tasks", (req, res) => {
    const {username} = req.body;
    const getTasks = async () => {
      let query = await sql`Select task
                            from s_fe80a0cc.tasks
                            where username = ${username};`;
      console.log("I'm a part time artist and I really like your pfp")
      let values = []
      for (let i = 0; i < query.length; i++) {
        values.push(query[i])
      }
      res.send(values);
    }
    getTasks();
  })

  app.post("/createTask", (req, res) => {
    const {username, task_number, task} = req.body;
    console.log(username, task_number, task);
    const addTask = async ({username, task_number, task}) => {
      let query = await sql`insert into s_fe80a0cc.tasks
                            values (${username}, ${task_number}, ${task});`;
      console.log("Thingy happened")
    }
    addTask({username, task_number, task});
  })

  app.post("/removeTask", (req, res) => {
    const {username, task} = req.body;
    const deleteTask = async ({username, task}) => {
      let query = await sql`select task_number
                            from s_fe80a0cc.tasks
                            where username = ${username}
                              and task = ${task};`;
      let taskNum = query[0]
      res.send(taskNum);
      query = await sql`delete
                        from s_fe80a0cc.tasks
                        where username = ${username}
                          and task = ${task};`;
      console.log("Thingy happened")
    }
    deleteTask({username, task});
  })

app.post("/setSecCol", (req, res) => {
  const {username, colour} = req.body;
  const SecCol = async ({username, colour}) => {
    let query = await sql`Update s_fe80a0cc.procrastinot
                            set secondarycolour = ${colour}
                            where username = ${username}`;
  }
  SecCol({username, colour});
})

app.post("/getSecCol", (req, res) => {
  const {username} = req.body;
  const SecColGet = async ({username}) => {
    let query = await sql`SELECT secondarycolour FROM s_fe80a0cc.procrastinot where username = ${username}`;
    res.send(query[0])
  }
  SecColGet({username})
})

app.post("/setPrimCol", (req, res) => {
  const {username, colour} = req.body;
  const PrimCol = async ({username, colour}) => {
    let query = await sql`Update s_fe80a0cc.procrastinot
                            set primarycolour = ${colour}
                            where username = ${username}`;
  }
  PrimCol({username, colour});
})

app.post("/getPrimCol", (req, res) => {
  const {username} = req.body;
  const PrimColGet = async ({username}) => {
    let query = await sql`SELECT primarycolour FROM s_fe80a0cc.procrastinot where username = ${username}`;
    res.send(query[0])
  }
  PrimColGet({username})
})

  app.post("/findUpdate", (req, res) => {
    const {username, task_number} = req.body;
    console.log(username, task_number)
    const reqUpdate = async ({username, task_number}) => {
      let query = await sql`select task_number
                            from s_fe80a0cc.tasks
                            where username = ${username}
                              and task_number > ${task_number}`
      let tasks = []
      for (let i = 0; i < query.length; i++) {
        tasks.push(query[i])
      }
      res.send(tasks);
    }
    reqUpdate({username, task_number});
  })

  app.post("/updateTask", (req, res) => {
    const {username, task_number, currentNum} = req.body;
    const updateTask = async ({username, task_number, currentNum}) => {
      let query = await sql`update s_fe80a0cc.tasks
                            set task_number = ${task_number}
                            where username = ${username}
                              and task_number = ${currentNum};`;
      console.log("Thingy happened")
    }
    updateTask({username, task_number, currentNum});
  })

  app.post("/clearTasks", (req, res) => {
    const {username} = req.body;
    const clearTasks = async ({username}) => {
      let query = await sql`delete
                            from s_fe80a0cc.tasks
                            where username = ${username};`
      console.log("Thingy happened")
    }
    clearTasks({username})
  })

  app.get("/clearGuest", (req, res) => {
    const clearGuestUser = async () => {
      let query;
      query = await sql`delete
                        from s_fe80a0cc.tasks
                        where username = 'Guest';`
      query = await sql`delete
                        from s_fe80a0cc.procrastiNOT
                        where username = 'Guest';`
      query = await sql`insert into s_fe80a0cc.procrastiNOT
                        where username = 'Guest';`
    }
    clearGuestUser()
  })

  app.post("/today", (req, res) => {
    const {username} = req.body;
    const todayDate = async ({username}) => {
      let query = await sql`select Today
                            from s_fe80a0cc.procrastiNOT
                            where username = ${username};`
      res.send(query[0])
    }
    todayDate({username})
  })

  app.post("/newDay", (req, res) => {
    const {username, today} = req.body;
    const newDate = async ({username, today}) => {
      let query = await sql`select totaldays
                            from s_fe80a0cc.procrastiNOT
                            where username = ${username};`
      const numDays = query[0].totaldays + 1
      query = await sql`Update s_fe80a0cc.procrastiNOT
                        set today     = ${today},
                            totaldays = ${numDays}
                        where username = ${username};`
    }
    newDate({username, today})
  })

  app.post("/time", (req, res) => {
    const {username} = req.body;
    const getTimes = async ({username}) => {
      let query = await sql`SELECT timeday1, timeday2, timeday3, timeday4, timeday5, timeday6, timeday7
                            FROM s_fe80a0cc.procrastiNOT
                            WHERE username = ${username}`
      console.log(query[0])
      res.json(query[0]);
    }
    getTimes({username})
  })

  app.post("/timeAvg", (req, res) => {
    const {username, time} = req.body;
    const toAvg = async ({username, time}) => {
      let query = await sql`SELECT totaldays
                            from s_fe80a0cc.procrastiNOT
                            where username = ${username}`
      const num_days = query[0].totaldays
      query = await sql`Select averagetime
                        from s_fe80a0cc.procrastiNOT
                        where username = ${username}`
      let averageTime = query[0].averagetime
      if (!averageTime) {
        averageTime = Number(time) / num_days;
      } else {
        averageTime = averageTime * (num_days - 1)
        averageTime += time;
        averageTime = averageTime / num_days;
      }
      query = await sql`update s_fe80a0cc.procrastiNOT
                        set averagetime = ${averageTime}
                        where username = ${username}`
    }
    toAvg({username, time})
  })

  app.post("/getTimeAvg", (req, res) => {
    const {username} = req.body;
    const fromAvgTime = async ({username}) => {
      let query = await sql`select averagetime
                            from s_fe80a0cc.procrastiNOT where username = ${username}`
      res.send(query[0])
    }
    fromAvgTime({username})
  })

  app.post("/goalsAchieved", (req, res) => {
    const {username} = req.body;
    const goalsAchieved = async ({username}) => {
      let query = await sql`select goalcompletion from s_fe80a0cc.procrastiNOT where username = ${username}`
      console.log(query[0])
      res.send(query[0])
    }
    goalsAchieved({username})
  })

  app.post("/pause", (req, res) => {
    console.log("Paws")
    const {username, time, day} = req.body;
    const timeToDB = async ({username, time, day}) => {
      let query;
      console.log(day)
      switch (day) {
        case 1:
          query = await sql`update s_fe80a0cc.procrastiNOT
                            set timeday1 = ${time}
                            where username = ${username}`
          res.json("success")
          break;
        case 2:
          query = await sql`update s_fe80a0cc.procrastiNOT
                            set timeday2 = ${time}
                            where username = ${username}`
          res.json("success")
          break;
        case 3:
          query = await sql`update s_fe80a0cc.procrastiNOT
                            set timeday3 = ${time}
                            where username = ${username}`
          res.json("success")
          break;
        case 4:
          query = await sql`update s_fe80a0cc.procrastiNOT
                            set timeday4 = ${time}
                            where username = ${username}`
          res.json("success")
          break;
        case 5:
          query = await sql`update s_fe80a0cc.procrastiNOT
                            set timeday5 = ${time}
                            where username = ${username}`
          res.json("success")
          break;
        case 6:
          query = await sql`update s_fe80a0cc.procrastiNOT
                            set timeday6 = ${time}
                            where username = ${username}`
          res.json("success")
          break;
        case 7:
          query = await sql`update s_fe80a0cc.procrastiNOT
                            set timeday7 = ${time}
                            where username = ${username}`
          res.json("success")
          break;
      }

    }
    timeToDB({username, time, day})
  })

  app.post("/setGoal", (req, res) => {
    const {username, goal} = req.body;
    const saveGoal = async () => {
      let query = await sql`Update s_fe80a0cc.procrastiNOT
                            set goaltime = ${goal}
                            where username = ${username}`
    }
    saveGoal({username, goal})
  })

  app.post("/getGoal", (req, res) => {
    const {username} = req.body;
    const getGoalDB = async ({username}) => {
      let query = await sql`SELECT goaltime
                            from s_fe80a0cc.procrastiNOT
                            where username = ${username}`
      console.log(query[0])
      const time = query[0]
      res.send(time)
    }
    getGoalDB({username})
  })

  app.post("/goal", (req, res) => {
    const {username} = req.body;
    const completedGoal = async () => {
      let query;
      query = await sql`select goalcompletion from s_fe80a0cc.procrastiNOT where username = ${username}`
      let numGoals = query[0].goalcompletion
      numGoals = numGoals + 1;
      query = await sql`UPDATE s_fe80a0cc.procrastiNOT
                            SET goalpassed = TRUE, goalcompletion = ${numGoals}
                            WHERE username = ${username}; `;
    }
    completedGoal({username});
  })

  app.post("/isFish", (req, res) => {
    const {username} = req.body;
    const fishy = async ({username}) => {
      let query = await sql`SELECT goalpassed
                            FROM s_fe80a0cc.procrastiNOT
                            where username = ${username};`;
      const values = query[0]
      res.send(values);
    }
    fishy({username});
  });

  app.post("/getDays", (req, res) => {
    const {username} = req.body;
    const numDays = async ({username}) => {
      let query = await sql`SELECT totaldays from s_fe80a0cc.procrastiNOT where username = ${username}`
      console.log(query[0])
      const days = query[0]
      res.json(days)
    }
    numDays({username});
  })

  app.post("/getAchievements", (req, res) => {
    const {username} = req.body;
    const getAchievementsDB = async({username}) => {
      let query = await sql`select achievement1, achievement2, achievement3, achievement4 from s_fe80a0cc.achievements where username = ${username}`
      res.send(query[0])
    }
    getAchievementsDB({username});
  })



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