'use strict';

// This plugin is disabled by default. See config.plugins to enable it
// The main objective for this plugin is to make sure that ./user is not empty (otherwise it would be excluded from git)

const socks = require('socks');

// Set module title
module.exports.title = 'TorPlugin';

// Initialize the module
module.exports.init = (app, done) => {
    let proxyConfig = (app.config && app.config.proxy) || {};
    let proxyHost = proxyConfig.host || '127.0.0.1';
    let proxyPort = proxyConfig.port || 9050;

    app.addHook('sender:fetch', (delivery, next) => {
        if (/\.onion$/i.test(delivery.domain)) {
            delivery.useOnionNetwork = true;
            delivery.mx = [
                {
                    priority: 0,
                    exchange: 'onion',
                    mx: false,
                    A: [proxyHost],
                    AAAA: []
                }
            ];
            delivery.mxPort = proxyPort;
        }
        next();
    });

    app.addHook('sender:connect', (delivery, options, next) => {
        if (delivery.useOnionNetwork) {
            let connection = {
                proxy: {
                    ipaddress: proxyHost,
                    port: proxyPort,
                    type: 5
                },
                target: {
                    host: 'delivery.domain',
                    port: 25
                },
                command: 'connect'
            };
            socks.createConnection(connection, (err, socket) => {
                if (err) {
                    return next(err);
                } else if (socket) {
                    options.socket = socket;
                }
                next();
            });
        }
    });

    // all set up regarding this plugin
    done();
};
