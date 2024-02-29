const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
  });
});

http.listen(8080, () => console.log("listening on http://192.168.200.10:8080"));

// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => {

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });

const express = require("express");
const cors = require("cors");

const app = express();

const mysqli = require("mysql");

app.use(express.json());
app.use(cors());

const con = mysqli.createConnection({
  host: "192.168.200.10",
  user: "root",
  password: "",
  database: "ctf_test",
});

app.post("/", (req, res) => {
  const { username, password } = req.body;

  const insertQuery = `insert into test values ('${username}','${password}')`;

  con.query(insertQuery, (err, result) => {
    if (err) throw new err();
    console.log(result);
  });
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

app.listen(3000, "192.168.200.10");

// prithvi features>...

//this is from anish-branch
