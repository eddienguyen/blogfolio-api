/**
 * Basic Keystone set up for using template (.pug files)
 */
var keystone = require('keystone'),
    importRoutes = keystone.importer(__dirname);

var routes = {
    // views: importRoutes('./views'),
    api: importRoutes('./api'),
};

// exports = module.exports = function (app) {
//     app.get('/', routes.views.index);
//     app.get('/add-event', routes.views.addEvent);
//     app.post('/add-event', routes.api.event.post);
// }


// Export this app's routes
exports = module.exports = function (app) {
    app.all('/api*', keystone.middleware.cors);
    // API
    app.get('/api/articles/', keystone.middleware.api ,routes.api.articles.list);
    app.get('/api/articles/:id', keystone.middleware.api, routes.api.articles.get);

    app.get('/api/projects/', keystone.middleware.api, routes.api.projects.list);
    app.get('/api/projects/:id', keystone.middleware.api, routes.api.projects.get);
    
    app.get('/api/team-member/', keystone.middleware.api, routes.api.members.list);
    app.get('/api/team-member/:id', keystone.middleware.api, routes.api.members.get);
    app.get('/api/team-member/:id/projects', keystone.middleware.api, routes.api.projects.getProjectsByMember);
    
    // Set up the default app route to http://localhost:3000/index
    app.get('/index', function (req, res) {
        // Render some simple boilerplate html
        function renderFullPage() {
            // Note the div class name here, we will use that as a hook for our React code
            return`
                <!doctype HTML>

                <html>
                    <head>
                        <title>Blogfolio</title>
                    </head>

                    <body>
                        <div class='react-container'>
                        </div>
                        <script src='bundle.js'></script>
                    </body>
                </html>
            `;
        }

        // Send the html boilerplate
        res.send(renderFullPage());
    });
};