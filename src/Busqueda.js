import React, { Component } from "react";
import {
	Container,
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	InputBase,
	IconButton,
	FormControlLabel,
	Switch
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
	paperBusqueda: {
		marginTop: 15,
		display: "flex",
		paddingLeft: 15,
		paddingRight: 15
	},
	input: {
		flexGrow: 1
	}
};
const cola = [
	// { negocio: "Yoga", localidad: "Cartagena", buscado: false }
];

class Busqueda extends Component {
	state = {
		negocio: "",
		localidad: "",
		termino: "",
		resultados: [],
		mostrarSoloEmails: true,
		buscando: false,
		cola
	};

	componentDidMount() {
		const { socket } = this.props;
		socket.on("nuevoResultado", resultado =>
			this.setState({ resultados: [...this.state.resultados, resultado] })
		);
		socket.on("mensajeConsola", mensaje => console.log(mensaje));
		socket.on("finBusqueda", () => this.setState({ buscando: false }));
		socket.on("statusUpdate", status => console.log(status));
	}

	handleChange = field => e => this.setState({ [field]: e.target.value });

	handleSwitch = field => e => this.setState({ [field]: e.target.checked });

	buscaApiSocket = e => {
		const { negocio, localidad, mostrarSoloEmails } = this.state;
		const { socket } = this.props;
		this.setState({ buscando: true, resultados: [] });
		if (localidad !== "" && negocio !== "") {
			socket.emit("buscaGoogle", { negocio, localidad, mostrarSoloEmails });
		} else {
			return false;
		}
	};

	buscaMasivoSocket = e => {
		const { cola, mostrarSoloEmails } = this.state;
		const { socket } = this.props;
		this.setState({ buscando: true, resultados: [] });
		if (cola.length > 0) {
			socket.emit("buscaMasivo", cola, mostrarSoloEmails);
		} else {
			return false;
		}
	};

	render() {
		const { buscando, cola } = this.state;
		return (
			<Container maxWidth="lg">
				<Paper style={styles.paperBusqueda}>
					<InputBase
						style={styles.input}
						placeholder="Negocio"
						inputProps={{ "aria-label": "Negocio" }}
						onChange={this.handleChange("negocio")}
						onKeyPress={e =>
							e.key === "Enter" && !buscando && this.buscaApiSocket()
						}
					/>
					<InputBase style={styles.input} value="..en.." />
					<InputBase
						style={styles.input}
						placeholder="Localidad"
						inputProps={{ "aria-label": "Localidad" }}
						onChange={this.handleChange("localidad")}
						onKeyPress={e =>
							e.key === "Enter" && !buscando && this.buscaApiSocket()
						}
					/>
					<IconButton
						aria-label="Search"
						onClick={this.buscaApiSocket}
						disabled={buscando}
					>
						<SearchIcon />
					</IconButton>
					<IconButton
						aria-label="SearchMassive"
						onClick={this.buscaMasivoSocket}
						disabled={buscando || cola.length === 0}
					>
						<SearchIcon />
					</IconButton>
				</Paper>
				<Paper style={styles.paperBusqueda}>
					<FormControlLabel
						control={
							<Switch
								checked={this.state.mostrarSoloEmails}
								onChange={this.handleSwitch("mostrarSoloEmails")}
								value="mostrarSoloEmails"
								color="primary"
							/>
						}
						label="Mostrar sólo emails"
					/>
				</Paper>
				{this.state.resultados.length === 0 ? (
					<div style={{ marginTop: 15, marginBottom: 15 }}>
						No hay resultados que mostrar
					</div>
				) : (
					<div>
						<div style={{ marginTop: 15, marginBottom: 15 }}>
							Búsqueda: {this.state.negocio} -en- {this.state.localidad} -
							Resultados encontrados: {this.state.resultados.length}
						</div>
						<Paper>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell>Nombre</TableCell>
										<TableCell align="right">Web</TableCell>
										<TableCell align="right">Telefono</TableCell>
										<TableCell align="right">Email</TableCell>
										<TableCell align="right">Facebook</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.resultados.map((row, key) => (
										<TableRow key={key}>
											<TableCell>{key + 1}</TableCell>
											<TableCell component="th" scope="row">
												{row.nombre}
											</TableCell>
											<TableCell align="right">
												<a
													href={row.web}
													target="_blank"
													rel="noopener noreferrer"
												>
													{row.web.length > 50
														? `${row.web.substr(0, 30)}...`
														: row.web}
												</a>
											</TableCell>
											<TableCell align="right">{row.telefono}</TableCell>
											<TableCell align="right">{row.email}</TableCell>
											<TableCell align="right">
												{row.facebook !== "" && (
													<a
														href={`https://www.facebook.com/${row.facebook}`}
														target="_blank"
														rel="noopener noreferrer"
													>
														FB
													</a>
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Paper>
					</div>
				)}
			</Container>
		);
	}
}

export default Busqueda;
