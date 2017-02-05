<h1># 105-int</h1>

<div>
	<h2>basicFit</h2>
	<p>A responsive webpage using HTML/CSS only</p>
</div>

<div>
	<h2>nodeNotifier</h2>
	<p>
		A NodeJS script that can be invoked from the console with a list of emails, names and a message.<br>
		The script sends a new email to each correspondent in the list, with the given message.<br>
		The module <a href="https://nodemailer.com/about/">NodeMailer</a> is used for sending the actual message.
	</p>
	<h4>Possible invocation :</h4>		
	<ul>
		<li>
			Emails and the message from console:<br>
			<code>
				node notify.js "John Doe &lt;john.doe@example.com&gt;" "Alex Doe &lt;alex.doe@example.com&gt;" "Hi guys,\n\nPlease remember to show up for my birthday party on Tuesday!\n\nSee you soon,\nAnn"
			</code>
		</li>
		<li>
			Emails from console and the message from a file:<br>
			<code>
				node notify.js "John Doe &lt;john.doe@example.com&gt;" "Alex Doe &lt;alex.doe@example.com&gt;" "./email_templates/birthday_party.html"
			</code>
		</li>
		<li>
			Emails from a file and the message from console:<br>
			<code>
				node notify.js "./correspondents.log" "Hi guys,\n\nPlease remember to show up for my birthday party on Tuesday!\n\nSee you soon,\nAnn"
			</code>
		</li>
		<li>
			Both emails and the message from files:<br>
			<code>
				node notify.js "./correspondents.log" "./email_templates/birthday_party.html"
			</code>
		</li>
	</ul>
	<p>
		The file containing the email list would have an email+name on each line:<br>
		<pre><code>
		"John Doe &lt;john.doe@example.com&gt;"
		"Alex Doe &lt;alex.doe@example.com&gt;"
		....
		</code></pre>
	</p>
</div>

<div>
	<h2>currencyConverter</h2>
	<p>
		A basic react app that converts CHF to 4 different currencies.
		TODO : Take live exchange rate from an external api.
	</p>
</div>

<div>
	<h2>popupAnimation</h2>
	<p>
		A basic webpage with three different popup animation style
	</p>
</div>