

<h1><a id="HubotMatteruser_0"></a>Hubot-Matteruser</h1>
<p>Hubot is “chat bot” created by GitHub that listens for commands and executes actions based on your requests.</p>
<ul>
<li>Learn more about <a href="https://about.mattermost.com/">Mattermost as an open source, self-hosted team communication server</a></li>
</ul>
<p>hubot-matteruser is a Hubot adapter for Mattermost written in coffee script that uses the Mattermost Web Services API and WebSockets to deliver Hubot functionality.</p>
<h2><a id="Getting_Started_With_Hubot_8"></a>Getting Started With Hubot</h2>
<p>You will need node.js and npm. Once those are installed, we can install the hubot generator:</p>
<pre><code class="language-sh">%  npm install -g yo generator-hubot
</code></pre>
<p>This will give us the hubot yeoman generator. Now we can make a new directory, and generate a new instance of hubot in it. For example, if we wanted to make a bot called myhubot:</p>
<pre><code class="language-sh">% mkdir myhubot
% <span class="hljs-built_in">cd</span> myhubot
% yo hubot
</code></pre>
<h3><a id="Installation_21"></a>Installation</h3>
<p>You now have your own functional hubot! There’s a ./bin/hubot command for convenience, to handle installing npm dependencies, loading scripts, and then launching your hubot.</p>
<p>Hubot needs Redis to persist data, so before you can start hubot on your own computer, you should have Redis installed on your localhost.</p>
<pre><code class="language-sh">% bin/hubot
Hubot&gt;
</code></pre>
<p>This starts hubot using the shell adapter, which is mostly useful for development. Make note of Hubot&gt;; this is the name your hubot will respond to with commands. For example, to list available commands:</p>
<pre><code class="language-sh">% bin/hubot
hubot&gt; hubot <span class="hljs-built_in">help</span>
hubot adapter - Reply with the adapter
hubot animate me &lt;query&gt; - The same thing as `image me`, except adds a few parameters to try to <span class="hljs-built_in">return</span> an animated GIF instead.
hubot <span class="hljs-built_in">echo</span> &lt;text&gt; - Reply back with &lt;text&gt;
hubot <span class="hljs-built_in">help</span> - Displays all of the <span class="hljs-built_in">help</span> commands that hubot knows about.
hubot <span class="hljs-built_in">help</span> &lt;query&gt; - Displays all <span class="hljs-built_in">help</span> commands that match &lt;query&gt;.
hubot image me &lt;query&gt; - The Original. Queries Google Images <span class="hljs-keyword">for</span> &lt;query&gt; and returns a random top result.
hubot map me &lt;query&gt; - Returns a map view of the area returned by `query`.
hubot mustache me &lt;query&gt; - Searches Google Images <span class="hljs-keyword">for</span> the specified query and mustaches it.
hubot mustache me &lt;url&gt; - Adds a mustache to the specified URL.
hubot ping - Reply with pong
hubot pronounce &lt;phrase&gt; <span class="hljs-keyword">in</span> &lt;language&gt; - Provides pronunciation of &lt;phrase&gt; (&lt;language&gt; is optional)
hubot pug bomb N - get N pugs
hubot pug me - Receive a pug
hubot the rules - Make sure hubot still knows the rules.
hubot time - Reply with current time
hubot translate me &lt;phrase&gt; - Searches <span class="hljs-keyword">for</span> a translation <span class="hljs-keyword">for</span> the &lt;phrase&gt; and <span class="hljs-keyword">then</span> prints that bad boy out.
hubot translate me from &lt;<span class="hljs-built_in">source</span>&gt; into &lt;target&gt; &lt;phrase&gt; - Translates &lt;phrase&gt; from &lt;<span class="hljs-built_in">source</span>&gt; into &lt;target&gt;. Both &lt;<span class="hljs-built_in">source</span>&gt; and &lt;target&gt; are optional
hubot youtube me &lt;query&gt; - Searches YouTube <span class="hljs-keyword">for</span> the query and returns the video embed link.
ship it - Display a motivation squirrel
</code></pre>
<p>You almost definitely will want to change your hubot’s name to add character. bin/hubot takes a --name:</p>
<pre><code class="language-sh">% bin/hubot --name myhubot
myhubot&gt;
</code></pre>
<p>Your hubot will now respond as myhubot. This is case-insensitive, and can be prefixed with @ or suffixed with :. These are equivalent:</p>
<pre><code class="language-sh">MYHUBOT <span class="hljs-built_in">help</span>
myhubot <span class="hljs-built_in">help</span>
@myhubot <span class="hljs-built_in">help</span>
myhubot: <span class="hljs-built_in">help</span>
</code></pre>
<h4><a id="mattermost_Client_67"></a>mattermost Client</h4>
<p>Follow the instructions to set up your bot, including setup of <a href="https://github.com/loafoe/mattermost-client">mattermost-client</a></p>
<h5><a id="Environment_variables_70"></a>Environment variables</h5>
<p>The adapter requires the following environment variables to be defined before your Hubot instance will start:</p>
<table class="table table-striped table-bordered">
<thead>
<tr>
<th>Variable</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>MATTERMOST_HOST</td>
<td>Yes</td>
<td>The Mattermost host e.g. <a href="http://mm.yourcompany.com">mm.yourcompany.com</a></td>
</tr>
<tr>
<td>MATTERMOST_GROUP</td>
<td>Yes</td>
<td>The team/group on your Mattermost server e.g. core</td>
</tr>
<tr>
<td>MATTERMOST_USER</td>
<td>Yes</td>
<td>The Mattermost user account name e.g. <a href="mailto:hubot@yourcompany.com">hubot@yourcompany.com</a></td>
</tr>
<tr>
<td>MATTERMOST_PASSWORD</td>
<td>Yes</td>
<td>The password of the user e.g. s3cr3tP@ssw0rd!</td>
</tr>
<tr>
<td>MATTERMOST_HTTP_PORT</td>
<td>No</td>
<td>Overrides the default port (80 or 443) for http:// or https:// connections</td>
</tr>
<tr>
<td>MATTERMOST_USE_TLS</td>
<td>No</td>
<td>(default: true) set to ‘false’ to switch to http/ws protocols</td>
</tr>
</tbody>
</table>
<h5><a id="Example_configuration_82"></a>Example configuration</h5>
<p>The below example assumes you have created a user <a href="mailto:hubot@yourcompany.com">hubot@yourcompany.com</a> with username hubot and password: s3cr3tP@ssw0rd! on your Mattermost server in the core team reachable on URL <a href="https://mm.yourcompany.com/core">https://mm.yourcompany.com/core</a></p>
<pre><code class="language-sh"><span class="hljs-built_in">export</span> MATTERMOST_HOST=mm.yourcompany.com 
<span class="hljs-built_in">export</span> MATTERMOST_GROUP=core
<span class="hljs-built_in">export</span> MATTERMOST_USER=hubot@yourcompany.com
<span class="hljs-built_in">export</span> MATTERMOST_PASSWORD=s3cr3tP@ssw0rd!
</code></pre>
<h1><a id="Install_Hubot_Responder_92"></a>Install Hubot Responder</h1>
<h5><a id="What_is_hubotresponder_94"></a>What is hubot-responder?</h5>
<p>This module takes advantage of the built in express module in hubot to provide a couple of web pages where your users can add simple query/responses to hubot without doing any code. The purpose is to allow end-users to add simple responses, nothing with advanced logic. Additionally, there is a global whitelist/blacklist so that you can exclude/include these responses only where you want them. This way you can allow funny responses and memes to work in channels that make sense, and ensure they don’t pop into channels designated for specific purposes.</p>
<h5><a id="Requirements_98"></a>Requirements</h5>
<p>You will need to install hubot with a brain so that the entries you place in it are persistent. I’ve simply been using hubot-Redis Brain.</p>
<h5><a id="Installation_102"></a>Installation</h5>
<pre><code class="language-sh">npm install hubot-responder
</code></pre>
<p>Copy the contents of this repo into your hubot/node_modules directory. Be sure to run an npm install after doing this so that any required modules are downloaded. You will then need to add “hubot-responder” to your external-scripts.json file in order to enable it. Additionally, you will need to install the ejs package in hubot using npm install ejs --save in your hubot directory.</p>
<h5><a id="Additional_Details_110"></a>Additional Details</h5>
<p>Once this module is installed and running, visit</p>
<ul>
<li><a href="http://yourhubotaddress:8080/configuration">http://yourhubotaddress:8080/configuration</a> and be sure to enter in at least one whitelist room so you can see your responses.</li>
<li>You can then go to <a href="http://yourhubotaddress:8080/list">http://yourhubotaddress:8080/list</a> to view a list of current responses. You can also add and modify existing responses.</li>
</ul>
<p>Once you have opened the Webpage via the abou´ve link, make sure you change the Global Configurations</p>
<ul>
<li>Room whitelist to  *</li>
<li>Room Blacklist to  GENERAL</li>
</ul>
<p>Make sure to save it. Once saved you can Create new responses with their answers and make sure to save. Once saved you can run it in the Mattermost client and should be able to receive the specified answer.<br>
We have to create a Hubot-Redis-Brain where all the entries will be stored, so that your Robot(Hubot) doesnt forget the next time you close your terminal.</p>
<h1><a id="HubotRedis_Brain_125"></a>Hubot-Redis Brain</h1>
<h3><a id="Installation_127"></a>Installation</h3>
<p>In hubot project repo, run:</p>
<pre><code class="language-sh">npm install hubot-redis-brain --save
</code></pre>
<p>Then add hubot-redis-brain to your external-scripts.json:</p>
<pre><code class="language-sh">[
  <span class="hljs-string">"hubot-redis-brain"</span>
]
</code></pre>
<h3><a id="Configuration_139"></a>Configuration</h3>
<p>hubot-redis-brain requires a redis server to work. It uses the REDIS_URL environment variable for determining where to connect to. The default is on localhost, port 6379 (ie the redis default). You have to install your own Redis Server, you can do so by following this steps:</p>
<p>Download, extract and compile Redis with:</p>
<pre><code class="language-sh">$ wget http://download.redis.io/releases/redis-<span class="hljs-number">4.0</span>.<span class="hljs-number">9</span>.tar.gz
$ tar xzf redis-<span class="hljs-number">4.0</span>.<span class="hljs-number">9</span>.tar.gz
$ <span class="hljs-built_in">cd</span> redis-<span class="hljs-number">4.0</span>.<span class="hljs-number">9</span>
$ make
</code></pre>
<p>The binaries that are now compiled are available in the src directory. Run Redis with:</p>
<pre><code class="language-sh">$ src/redis-server
</code></pre>
<h1><a id="Run_Mattermost_155"></a>Run Mattermost</h1>
<pre><code class="language-sh">./bin/hubot <span class="hljs-operator">-a</span> matteruser
</code></pre>

