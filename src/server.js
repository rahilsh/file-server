'use strict';

const Hapi = require('@hapi/hapi');

const start = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/hello',
        handler: (req, h) => {
            return "Hello World!"
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '../../../Downloads',
                listing: true
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();