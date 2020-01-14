import fs from 'fs';

const routing = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    const route = require(`./${file}`);
    app.use(route.routes()).use(route.allowedMethods());
  });
};

export default routing;
