# zonemta-onion

Tor network plugin for [ZoneMTA](https://github.com/zone-eu/zone-mta). Install this to send emails to onion addresses.

## Setup

Add this as a dependency for your ZoneMTA app

```
npm install zonemta-onion --save
```

Add a configuration entry in the "plugins" section of your ZoneMTA app

```json
...
  "smtpInterfaces": {
    "feeder": {
      "authentication": true
      ...
    }
  },
  "plugins": {
    "modules/zonemta-onion": {
      "enabled": ["sender"],
      "proxy": {
        "host": "127.0.0.1",
        "port": 9050
      }
    }
  }
...
```

Where

  * **enabled** states which ZoneMTA processes should use this plugin. Should be "sender"
  * **proxy** defines Tor connection settings
  * **proxy.host** is the IP address to the Tor router proxy
  * **proxy.port** is the port for the Tor router proxy

## License

European Union Public License 1.1 ([details](http://ec.europa.eu/idabc/eupl.html))
