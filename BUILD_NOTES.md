1) Rename .env.exmaple to .ev and populate the missing keys with your own.

2) run `npm install` then `npm build`

3) After build copy /dist to /extension/chrome/ dir.

4) Open main.js - comment out any 'Function("r", "regeneratorRuntime = r")(runtime);' calls.

5) Open chrome browser to chrome://extensions/ and load extension via 'load unpacked' and navigate to extension folder.