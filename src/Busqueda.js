import React, { Component } from "react";
import {
	Container,
	TextField,
	Button,
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
import axios from "axios";

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
	// { negocio: "Autoescuelas", localidad: "Bilbao", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Vitoria", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Pamplona", buscado: false },
	// { negocio: "Autoescuelas", localidad: "San Sebastián", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Zaragoza", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Huesca", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Oviedo", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Burgos", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Salamanca", buscado: false },
	// { negocio: "Autoescuelas", localidad: "León", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Gijón", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Valladolid", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Vigo", buscado: false },
	// { negocio: "Autoescuelas", localidad: "La Coruña", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Tarrasa", buscado: false },
	// { negocio: "Autoescuelas", localidad: "Badalona", buscado: false },
	// { negocio: "Spas", localidad: "Bilbao", buscado: false },
	// { negocio: "Spas", localidad: "Vitoria", buscado: false },
	// { negocio: "Spas", localidad: "Pamplona", buscado: false },
	// { negocio: "Spas", localidad: "San Sebastián", buscado: false },
	// { negocio: "Spas", localidad: "Zaragoza", buscado: false },
	// { negocio: "Spas", localidad: "Huesca", buscado: false },
	// { negocio: "Spas", localidad: "Oviedo", buscado: false },
	// { negocio: "Spas", localidad: "Burgos", buscado: false },
	// { negocio: "Spas", localidad: "Salamanca", buscado: false },
	// { negocio: "Spas", localidad: "León", buscado: false },
	// { negocio: "Spas", localidad: "Gijón", buscado: false },
	// { negocio: "Spas", localidad: "Valladolid", buscado: false },
	// { negocio: "Spas", localidad: "Vigo", buscado: false },
	// { negocio: "Spas", localidad: "La Coruña", buscado: false },
	// { negocio: "Spas", localidad: "Tarrasa", buscado: false },
	// { negocio: "Spas", localidad: "Badalona", buscado: false },
	// { negocio: "Yoga", localidad: "Zaragoza", buscado: false },
	// { negocio: "Yoga", localidad: "Huesca", buscado: false },
	// { negocio: "Yoga", localidad: "Oviedo", buscado: false },
	// { negocio: "Yoga", localidad: "Burgos", buscado: false },
	// { negocio: "Yoga", localidad: "Salamanca", buscado: false },
	// { negocio: "Yoga", localidad: "León", buscado: false },
	// { negocio: "Yoga", localidad: "Gijón", buscado: false },
	// { negocio: "Yoga", localidad: "Valladolid", buscado: false },
	// { negocio: "Yoga", localidad: "Vigo", buscado: false },
	// { negocio: "Yoga", localidad: "La Coruña", buscado: false },
	// { negocio: "Yoga", localidad: "Tarrasa", buscado: false },
	// { negocio: "Yoga", localidad: "Badalona", buscado: false },
	// { negocio: "Yoga", localidad: "Madrid", buscado: false },
	// { negocio: "Yoga", localidad: "Barcelona", buscado: false },
	{ negocio: "Dentistas", localidad: "Madrid", buscado: false },
	{ negocio: "Dentistas", localidad: "Barcelona", buscado: false },
	{ negocio: "Dentistas", localidad: "Bilbao", buscado: false },
	{ negocio: "Dentistas", localidad: "Vitoria", buscado: false },
	{ negocio: "Dentistas", localidad: "Pamplona", buscado: false },
	{ negocio: "Dentistas", localidad: "San Sebastián", buscado: false },
	{ negocio: "Dentistas", localidad: "Zaragoza", buscado: false },
	{ negocio: "Dentistas", localidad: "Huesca", buscado: false },
	{ negocio: "Dentistas", localidad: "Oviedo", buscado: false },
	{ negocio: "Dentistas", localidad: "Burgos", buscado: false },
	{ negocio: "Dentistas", localidad: "Salamanca", buscado: false },
	{ negocio: "Dentistas", localidad: "León", buscado: false },
	{ negocio: "Dentistas", localidad: "Gijón", buscado: false },
	{ negocio: "Dentistas", localidad: "Valladolid", buscado: false },
	{ negocio: "Dentistas", localidad: "Vigo", buscado: false },
	{ negocio: "Dentistas", localidad: "La Coruña", buscado: false },
	{ negocio: "Dentistas", localidad: "Tarrasa", buscado: false },
	{ negocio: "Dentistas", localidad: "Badalona", buscado: false },
	{ negocio: "Abogados", localidad: "Madrid", buscado: false },
	{ negocio: "Abogados", localidad: "Barcelona", buscado: false },
	{ negocio: "Abogados", localidad: "Bilbao", buscado: false },
	{ negocio: "Abogados", localidad: "Vitoria", buscado: false },
	{ negocio: "Abogados", localidad: "Pamplona", buscado: false },
	{ negocio: "Abogados", localidad: "San Sebastián", buscado: false },
	{ negocio: "Abogados", localidad: "Zaragoza", buscado: false },
	{ negocio: "Abogados", localidad: "Huesca", buscado: false },
	{ negocio: "Abogados", localidad: "Oviedo", buscado: false },
	{ negocio: "Abogados", localidad: "Burgos", buscado: false },
	{ negocio: "Abogados", localidad: "Salamanca", buscado: false },
	{ negocio: "Abogados", localidad: "León", buscado: false },
	{ negocio: "Abogados", localidad: "Gijón", buscado: false },
	{ negocio: "Abogados", localidad: "Valladolid", buscado: false },
	{ negocio: "Abogados", localidad: "Vigo", buscado: false },
	{ negocio: "Abogados", localidad: "La Coruña", buscado: false },
	{ negocio: "Abogados", localidad: "Tarrasa", buscado: false },
	{ negocio: "Abogados", localidad: "Badalona", buscado: false },
	{ negocio: "Autoescuela", localidad: "Madrid", buscado: false },
	{ negocio: "Autoescuela", localidad: "Barcelona", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Valencia", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Sevilla", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Málaga", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Murcia", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Palma", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Las Palmas", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Alicante", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Córdoba", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Hospitalet de Llobregat", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Granada", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Elche", buscado: false },
	{ negocio: "Artes Marciales", localidad: "Cartagena", buscado: false },
	{ negocio: "Yoga", localidad: "Valencia", buscado: false },
	{ negocio: "Yoga", localidad: "Sevilla", buscado: false },
	{ negocio: "Yoga", localidad: "Málaga", buscado: false },
	{ negocio: "Yoga", localidad: "Murcia", buscado: false },
	{ negocio: "Yoga", localidad: "Palma", buscado: false },
	{ negocio: "Yoga", localidad: "Las Palmas", buscado: false },
	{ negocio: "Yoga", localidad: "Alicante", buscado: false },
	{ negocio: "Yoga", localidad: "Córdoba", buscado: false },
	{ negocio: "Yoga", localidad: "Hospitalet de Llobregat", buscado: false },
	{ negocio: "Yoga", localidad: "Granada", buscado: false },
	{ negocio: "Yoga", localidad: "Elche", buscado: false },
	{ negocio: "Yoga", localidad: "Cartagena", buscado: false }
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
