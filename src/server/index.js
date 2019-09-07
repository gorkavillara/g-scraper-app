const express = require("express");
const app = express();
var server = require("http").Server(app);
const io = module.exports.io = require("socket.io")(server);

const GoogleController = require("./controllers/GoogleController");
const SocketManager = require("./SocketManager");

app.set("port", process.env.PORT || 4000);

app.use(express.static(__dirname + "/../../build"));
app.use(express.json({ limit: "50mb" }));
app.use(
	express.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 5000000000
	})
);

app.post("/buscaGoogle", async (req, res) => {
	let resultados = await GoogleController.busca(req.body);
	res.json(resultados);
});

app.get("/api", (req, res) => {
	res.json({
		status: "Hola"
	});
});

io.on("connection", SocketManager);

server.listen(app.get("port"), () => {
	console.log(`server on port ${app.get("port")}`);
});
