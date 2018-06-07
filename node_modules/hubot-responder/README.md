# hubot-responder

## What is hubot-responder?

This module takes advantage of the built in express module in hubot to provide a couple of web pages where your users can add simple query/responses to hubot without doing any code. The purpose is to allow end-users to add *simple* responses, nothing with advanced logic. Additionally, there is a global whitelist/blacklist so that you can exclude/include these responses only where you want them. This way you can allow funny responses and memes to work in channels that make sense, and ensure they don't pop into channels designated for specific purposes.

![screenshot](https://cloud.githubusercontent.com/assets/6954817/23183430/9c0a9966-f841-11e6-8bb3-9bc8f7bc342b.png)

![screenshot](https://cloud.githubusercontent.com/assets/6954817/23183547/13bc2600-f842-11e6-98dc-62b365685520.png)

![screenshot](https://cloud.githubusercontent.com/assets/6954817/23183611/3f89d7aa-f842-11e6-879b-09035dacc52a.png)

## Requirements

You will need to install hubot with a brain so that the entries you place in it are persistent. To date I've simply been using hubot-mongodb-brain, though any should work.

## Additional Details

Once this module is installed and running, visit http://yourhubotaddress:8080/configuration and be sure to enter in at least one whitelist room so you can see your responses. 

You can then go to http://yourhubotaddress:8080/list to view a list of current responses. You can also add and modify existing responses.

## Installation

Copy the contents of this repo into your hubot/node_modules directory. Be sure to run an npm install after doing this so that any required modules are downloaded. You will then need to add "hubot-responder" to your external-scripts.json file in order to enable it. Additionally, you will need to install the ejs package in hubot using npm install ejs --save in your hubot directory.
