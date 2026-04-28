import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		title: 'My API',
		description: 'Auto-generated documentation'
	},
	// openapi: '3.0.0',
	basePath: '/api',
	host: 'localhost:3000',
	// schemes: ['http']
};
const options = {
	openapi: '3.0.0',
}

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.js']; // Replace with your main entry point or routes folder

// Note: swaggerAutogen is a function that returns a generator function
swaggerAutogen(options)(outputFile, routes, doc).then(async () => {
	// Optional: automatically start your server after generation
	// await import('./app.js');
});
