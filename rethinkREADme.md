#Connecting a Heroku application to a Compose.io RethinkDB deployment

##Install rethinkDB

Follow the documentation on rethinkDB: [install rethinkDB](http://rethinkdb.com/docs/install/)

Install the node rethinkdb driver: `npm install rethinkdb --save`

##Compose.io

Set up an account on [compose.io](https://www.compose.io/) and create a rethinkDB database.


##SSH tunnelling

###Heroku
To connect your Heroku app to the compose.io rethinkDB database you need to set up an SSH connection tunnel. [Read more](https://www.compose.io/articles/tunneling-from-heroku-to-compose-rethinkdb/).

The reason is that there is no authentication stage integrated into the Heroku server so it is more secure to expose the RethinkDB ports on Compose.io over an SSH tunnel.

####How does SSH tunneling work?

Secure Shell is a secure protocol for communications between two machines. To initiate the communication you need to genereate keys (one public and one private) with ``` ssh-keygen```. Never give your private key only, you can only chare the public key! The machine with the public key can then ask to be authenticated on the machine with the private key.

####Implementing it for your project

The Heroku side of the SSH tunnel needs the private key of the public/private SSH key pair.  The public key needs to be registered with Compose.io.  However to create an SSH tunnel without exposing your private API key on Github you need some help.

1. Add the tunnel.py file to your project from [here](https://github.com/fanout/leaderboard/blob/master/tunnel.py)

  This script configures an SSH tunnel for your app using data from three configuration variables that you add to Heroku:

  ```
  SSH_TUNNEL_TARGET=user@hostname:port
  SSH_TUNNEL_KEY=RSA:{base64 private key}
  SSH_TUNNEL_FORWARDS=localaddr:localport:remoteaddr:remoteport,[...]
  ```

  They'll be explained in detail in the next few steps.

* Generate a SSH private/public key pair. Type the following command into your terminal

  `ssh-keygen`

  This will create two files: 'key' and 'key.pub'.

2. Add the private key as the `SSH_TUNNEL_KEY` config variable in Heroku. Remember to include 'RSA:' before the key and ensure the key is all on one line (no linebreaks!).

3. In the compose.io dashboard for your database, click add User and give it a name (e.g. 'heroku'). Copy and paste the public key to this user.

4. Set up your Procfile so that the tunnel.py script is invoked before the rest of your application.

  `web: python tunnel.py && node server.js`


###Local Host

To connect to the rethinkDB database on compose.io from local host, create another ssh key pair.

1. Go to the root directory in your terminal and type out the following commands

      `ls -a`   (this should show all the files, even the ones starting with a '.')

      ` cd .ssh`   (move into your ssh folder)

      `ls -a`    (check if you have an `id_rsa` file)

      If not, create one using:
      `ssh-keygen`

      This will create a public and private SSH key which are stored in `id_rsa.pub` and `id_rsa` respectively.

2. In the compose.io dashboard, click add User and add the public key from `id_rsa.pub`. This enables you to access the compose.io rethinkDB database and admin UI while testing your application locally.

3. To connect locally, you don't need to tunnel using "tunnel.py" so remove this line from your Procfile if you are using `foreman` to run your application. If you're just using `nodemon` there's not need to modify your procfile.

4. To connect to the database locally run this command in a terminal window:

  ```
  ssh -N compose@aws-us-east-1-portal.5.dblayer.com -p 10485 \
  -L 127.0.0.2:28015:10.33.16.2:28015 \
  -L 127.0.0.3:28015:10.33.16.3:28015

  ```

  Run the application as normal (e.g. `node server.js`) and point your browser to `localhost:{yourport}`

5.  To connect to the database adminUI run this command in the terminal window:

  ```
  ssh -N compose@aws-us-east-1-portal.5.dblayer.com -p 10485 \
  -L 127.0.0.2:8080:10.33.16.2:8080 \
  -L 127.0.0.3:8080:10.33.16.3:8080

  ```

  To see the admin UI point your browser to `127.0.0.2:8080`

##### Mac users
When trying points 3 or 4 from above, you may get an error that looks like this:

```
bind: Can't assign requested address
channel_setup_fwd_listener: cannot listen to port: 8080
```
This is because in macs, the hosts 127.0.0.2 and 127.0.0.3 have restricted access. To resolve this issue type the following commands into the terminal:

```
sudo ifconfig lo0 alias 127.0.0.2 up
sudo ifconfig lo0 alias 127.0.0.3 up
```  
