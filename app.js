/*const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db.js'); // Import the database connection file

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Nombre de tu archivo HTML
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    db.connectDB();
});
*/
/*
const fs = require('fs');
const path = require('path');
const db = require('./db.js'); // Importa el archivo de conexión a la base de datos

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Nombre de tu archivo HTML
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    }[extname] || 'application/octet-stream';

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        context.res = {
            status: 200,
            headers: {
                'Content-Type': contentType
            },
            body: content
        };
    } catch (error) {
        if (error.code === 'ENOENT') {
            context.res = {
                status: 404,
                body: '404 Not Found'
            };
        } else {
            context.res = {
                status: 500,
                body: '500 Internal Server Error'
            };
        }
    }

    db.connectDB(); // Conectar con la base de datos
};
*/
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db.js'); // Importa el archivo de conexión a la base de datos

const server = http.createServer(async (req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Nombre de tu archivo HTML
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    }[extname] || 'application/octet-stream';

    if (req.url === '/search') {
        try {
            // Lógica para realizar la búsqueda en la base de datos
            const searchData = await db.searchInDatabase(); // Llama a una función de búsqueda en tu db.js
            
            // Envía los resultados de búsqueda como respuesta
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(searchData));
        } catch (error) {
            // Manejo de errores
            res.writeHead(500);
            res.end('500 Internal Server Error');
        }
    } else {
        // Lógica para servir archivos estáticos
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500);
                    res.end('500 Internal Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    db.connectDB();
});
