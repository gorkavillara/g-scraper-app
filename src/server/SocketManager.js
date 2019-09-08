const io = require("./index.js").io;
const GoogleController = require("./controllers/GoogleController");

module.exports = socket => {
	socket.emit("mensajeConsola", "Conectado al socket");
	socket.on("buscaGoogle", async data => {
		await GoogleController.buscaSocket(data, socket, data.mostrarSoloEmails);
		io.emit("finBusqueda");
	});
	socket.on("buscaMasivo", async (cola, mostrarSoloEmails) => {
		for (let i = 0; i < cola.length; i++) {
			let data = {
				localidad: cola[i].localidad,
				negocio: cola[i].negocio
			}
			await GoogleController.buscaSocket(data, socket, mostrarSoloEmails);
		}
		io.emit("finBusqueda");
	});
};