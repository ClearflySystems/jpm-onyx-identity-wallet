## ENKI Wallet

A proof of concept Digital Asset wallet and SSI credential storage wallet. 
The idea being an all in one WEB3 Identity solution for use in WEB2/WEB3 authentication flows.
Using the JPM Onyx SSI SDK for the storage, verification and presentation of issued credentials (in the form of JWT Tokens)

The purpose of this project was to show that issued credentials can be stored in a users web browser context using WebExtensions and thus enabling the user to present those credentials easily when authenticating with web based applications. As an alternative or replacement to traditional login username/password flows or social media SSO flows.
The Wallet Extension injects a content script into every webpage and binds an event listener to any button with a classname of 'web3loginbutton'. When the button is clicked this triggers an event in the background service worker script which launches the Wallet extension.
The user can then select the credential required to login to the site. On selection the JWT credential is passed back to the content script which in turn submits the login page with an additional Auth header via ajax, to the server for verification and exchanged for a session based auth token.

The launch button could easily be configured with additional data attributes to customize the flow by passing the 'type' or credential being requested, the submission url etc...

### Instructions on use:
1) Clone/Download Repo.
2) Web Extension is available in the /extension/chrome directory, and should work in most chrome based browsers. A firefox version to follow.
3) Navigate your chrome browser to 'chrome://extensions/' in the address bar.
4) Under 'My extensions' select 'Load Unpacked' and select the project /extension/chrome directory. Click 'service_worker' to view debug log of background script.
5) The Wallet plugin should now be available in the Chrome browser toolbar. This demo wallet has no password to unlock it, and currently uses 2 test accounts.
6) If you want to test with your own accounts, you'll need to build the project and set the private keys/api keys in .env (and take note of the build notes file)
7) Watch the video for demo of the auth flow. https://streamable.com/7uri7x or https://www.clearfly.co.uk/screen-capture.webm
8) NextJS Demo login page for the wallet launcher once extension is installed in browser - https://web3-identity-wallet-auth-example.vercel.app/login.
  a) View console log to see returned VP (presentation) from wallet
  b) Ajax call will set 'authorized' cookie if verify call was successful