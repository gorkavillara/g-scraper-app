import React from "react";
import Busqueda from "./Busqueda";
import { Container, AppBar, Toolbar } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import socketIO from "socket.io-client";

const styles = {
  container: {
    paddingRight: "0px",
    paddingLeft: "0px",
    marginRight: "0px",
    marginLeft: "0px",
    width: "100%"
	},
	toolbar: {
		padding: 15,
		justifyContent: "space-between"
	}
};

// const socketURL_dev = "http://localhost:4000/";
// const socketURL = "https://gvconsulting-g-scraping-api.herokuapp.com/";
const socketURL = "/";

class Principal extends React.Component {
	state = {
		socket: null
	}

	componentWillMount() {
		const socket = socketIO(socketURL);
		this.setState({ socket });
	}
	
	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<Container style={styles.container} maxWidth={false}>
					<AppBar position="static" color="white">
						<Toolbar style={styles.toolbar}>
							<a
								href="https://gorkavillar.com"
								rel="noreferrer noopener"
								target="_blank"
							>
								<img
									src="http://drive.google.com/uc?export=view&id=1l5hvFnHEFs1LG1Ah4c71Yl5UGnQv7p4E"
									alt="logo-gv-consulting"
									width="200px"
								/>
							</a>
							<div>
								Aplicación Google Scrape
							</div>
						</Toolbar>
					</AppBar>
					<Busqueda socket={this.state.socket} />
				</Container>
			</React.Fragment>
		);
	}
}

export default Principal;
