const http = require('http');
const app = require('./app');


const normalizePort = valeur => {
	const port = parseInt(valeur, 10);

	if(isNaN(port)){
		return valeur;
	}

	if (port >= 0){
		return port;
	}
	return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const handleError = error => {
	if(error.syscall !== 'listen'){
		throw error;
	}

	const adress = server.address();
	const bind = typeof adress === 'string' ? 'pipe ' + bind : 'port ' + port;
	switch (error.code) {
		case 'EACCESS':
		console.log(bind + 'requires elevated privileges');
		process.exit(1);
		break;

		case'EADDRINUSE':
		console.log(bind + 'is already in use');
		process.exit(1);
		break;

		default:
		throw error

	}
}

const server = http.createServer(app);

server.on('error', handleError);
server.on('listening', () => {
	const adress = server.address();
	const bind = typeof adress === 'string' ? 'pipe ' + adress : 'port ' + port;
	console.log('listening on ' + bind);
})

server.listen(process.env.PORT || 3000);