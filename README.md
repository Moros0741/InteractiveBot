# Interactive Trigger Bot

This bot was originally created to help with an Escape room type event in a server I participate in. Due to the increasing interest in the working
of the escape room we agreed to release the bot publicly for open source self hosting. If you are interested in using this bot for your own escape
room or other similar event follow the instructions below to self host the bot. 

## Contributing or Reporting Issues.

To contribute to this bots coding you can fork the repository and make your edits. Once you are satisfied with and tested your edits, you can create a
pull request to request a merge of your edits into the source code of this repository. In your pull request make sure you are explaining exactly what you 
were trying to do, what you did, and what the new changes will do. Mention any new dependencies that may be needed with your edits and of course list any 
new features you've added, if any.

### What makes a great contribution

A Good Contribution is one that benefits the application from a global scope. If you are just looking to add changes for your own version of the bot, then do not
submit a pull request of your changes and just use your forked repository with changes for your bot. 

# Self - Hosting Instructions and Set up. 

Many discord users know about Heroku and the hacks you can use to get a bot running on Heroku. Although this bot would work with heroku, albiet with some changes we will not be discussing how to host this repo on Heroku, as that is not Heroku's intended use.

## Creating & Inviting a Discord Bot account

To Create a discord bot account you can visit the tutorial [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Once you have created your bot account you can learn about inviting it [here](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#creating-and-using-your-invite-link)

## Obtaining your VPS (Virtual Private Server)

Now that you created and invited your bot, we need a VPS to host the code for our bot. You can find cheap VPS's with just a simple google search. Just a few common VPS Hosting services are: 
    - Digital Ocean
    - Vultr
    - GalaxyGate

Once you have decided on your VPS service, Set up your VPS on your host with Ubuntu or Debian OS Linux distro. You can usually find instructions on your host's support sections. Now that you have your host set up you can open your VPS's terminal login to it using the root user and password provided on your VPS's panel, and run: 
```
    $ apt update
    $ apt upgrade
```

## Installing Requirements & Dependancies

For instructions on how to install NodeJS V16+ on your new VPS [visit here](https://joshtronic.com/2021/05/09/how-to-install-nodejs-16-on-ubuntu-2004-lts/). Once you've installed Node Js you can install `npm` which is NodeJS package manager.
```
    $ apt install npm
```

Once `npm` is installed you can install the database package for the bot which is MongoDB's Mongoose package as well as Discordjs and their sub packages. To learn more about how to set up your own mongoDB database and Cluster [visit here](https://docs.atlas.mongodb.com/tutorial/create-atlas-account/)
```
    $ npm install mongoose -g
```
```
    $ npm install discord.js discord-api-types @discordjs/rest
```

## Cloning the Repository

Once you have completed the steps above you are ready to clone the repository. Enter the following into your command line on the terminal of your VPS:
```
    $ git clone https://github.com/Moros0741/InteractiveBot.git
    $ cd InteractiveBot
```
if you don't have git on your VPS you can install it using `apt install git`. 

## Editing config files

Now that you have cloned the repository you can edit the configuration files. 

run: 
``` 
    $ cd data
```
to open the data directory where the bots `config.json` file is. Open up the file by typing:
```
$ nano example.config.json
```

The contents of the file should look something like this: 
```
{
    "clientId": "your-bot-account-id",
    "guildId": "your-server-id-here",
    "token": "Your-bot-token-here",
    "database_srv": "Your-mongo-database-uri-here",
}
```
Replace the contents with their appropriate values, When you are done your `config.json` file should look something like this:

```
{
    "clientId": "900888924287807528",
    "guildId: "756401202434015232",
    "token": "OTAwODg4OTI0Mjg3ODA3NTI4.YXH4MQ.9snDXvaILf9h5e7wgegAy7nCXLI",
    "database_srv": "mongodb+srv://<USER>:<PASSWORD>@shard-01.fw9fd.mongodb.net/YOUR-DATABASE-NAME?retryWrites=true&w=majority"
}
```

You will need to get your `database_srv` from your MongoDB account when you press `CONNECT` to your Database. Make sure you add a User to the Database Access tab, you will need to for editing your database_srv. To edit the SRV do the following:

1. Replace `<USER>` with the user name of the User you created in Database Access Tab.
2. Replace `<PASSWORD>` with the password you created/generated for that User.
3. Replace `YOUR-DATABASE-NAME` with the name of your database. This will be the name directly to the left of the connect button we spoke about earlier. Once you've made those changes you can press `ctrl + X` and type in the new files name: `config.json` and hit enter to save it. 

## Turning on your bot 

If you do not want to use a process manager like PM2 you can just deploy your bot directly from your command line in the VPS terminal. Make sure you are in your bots main directory (this is the folder that contains the `deploy-commands.js` and `index.js` files). We left off in the `/data` directory of your bots files. To go back to your bots main directory run:
```
    $ cd ..
```
this will bring you back one folder in your files. from there you can run two commands to start your bot. 

First We need to deploy the slash commands to your server for the bot.
```
    $ node deploy-commands.js
```
You should receive a return that says "Slash Command Successfully registered". If you received that you can go ahead and start the bot. To start it you just need to run: 
```
    $ node index.js
```
You should receive an output saying:

```
YourBot#0000 has connected to discord with ID: your-bot-id.
Connected to MongoDB/database
```

If you have any further questions or issues, feel free to open an issue or discussion on this repo and i or another developer can talk you through any issues or get any bugs fixed for you. 

### Sorry for the confusing instructions

As you can probably tell, writing is not my strong suit. If you think you can explain it better I welcome any changes and contributions to the repo whether thats code wise, or instructions wise. Just create a fork and edit it how you think would be best. Create a pull request and I will review it and discuss any changes and additions needed. Again thanks for you interest in this bot. 

    ~ Moros#0741
