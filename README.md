# Instructions

First, run all three servers.
```
node cors_server1/app.js
node cors_server2/app.js
node cors_server3/app.js
```

Then, run the client
```
cd cors_client && yarn dev
```

Finally, go to http://localhost:3000/ and click around. The buttons just trigger POST requests, so check the console and network tab to see what's happening.