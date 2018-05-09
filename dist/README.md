### https://wallet.aion.network


### Aion Wallet

- Aion Wallet is a free and open source software. Users can use the Aion Wallet as an interface to interact with the Aion blockchain.

#### Features

- Create new wallets completely on client side.
- Access your wallet via unencrypted private key or encrypted private key (Keystore File).
- Physically print private key and QR code onto paper wallet.
- Unlock Wallet and send AION to different accounts securily!



### Developers

If you want to help contribute, here's what you need to know to get it up and running and compiling.

- The code is found in the `app` folder. Don't touch the `dist` folders.
- We use angular and bootstrap. We used to use jQuery and Bootstrap until it was converted in April 2016.
- We use npm / gulp for compiling. There is a lot of stuff happening in the compilation.


**Getting Started**

- Start by running `npm install`.
- Run `npm run dev`. Gulp will then watch & compile everything and then watch for changes to the HTML, JS, or CSS.
- For distribution, run `npm run dist`.

**Folder Structure**
- `fonts` and `images` get moved into their respective folders. This isn't watched via gulp so if you add an image or font, you need to run `gulp` again.
- `includes` are the pieces of the pages / the pages themselves. These are pretty self-explanatory and where you will make most frontend changes.
- `layouts` are the pages themselves. These basically take all the pieces of the pages and compile into one massive page. The navigation is also found here.

- The wallet decrypt directives are at `scripts/directives/walletDecryptDrtv.js`. These show up on a lot of pages.
- The navigation is in `scripts/services/globalServices.js`. Again, we control which navigation items show up in which version of the site in this single file.
- As of September 2016, almost all the copy in the .tpl files are only there as placeholders. It all gets replaced via angular-translate. If you want to change some copy you need to do so in `scripts/translations/en.js` folder. You should also make a note about what you changed and move it to the top of the file so that we can make sure it gets translated if necessary.
- `styles` is all the less. It's a couple custom folders and bootstrap.




### Connecting to different Aion nodes

- Run a node on your local machine under localhost:8545, and the wallet will automatically connect to that node
- If you dont want to run your own node you can connect to a node hosted by Aion Foundation by selecting "Aion Test Net" in the top right drop down menu.
- Run a node on your own server and simply enter the IP address and Port number of the server in the top right drop down menu. 






### How to Help Translate

**A couple of notes:**

- Everything on the entire site is broken down into lines and in this one file. The uppermost items are the highest priority and the further you go down, the less of a priority it is.
- You can add comments anywhere by wrapping it in /* Your Comment Here */. If you want to leave a note for yourself or someone else, do so in this format. That way it doesn't screw up the code or show up somewhere on the site.
- Don't delete any lines. Just leave it in English if you don't know how to translate it.
- Always make sure each line ends with `',`. So the format is `NAME: ' your text here ',` You only need to change the `your text here` part - try not to touch anything else.
- Aion Wallet only supports one language right now, please help us add more!

**If you are NOT a developer and want to help us transalate you can send us an email at support@aion.network 





### Contact
If you can think of any other features or run into bugs, let us know. You can fork, open a PR, open an issue, or email us at support@aion.network
