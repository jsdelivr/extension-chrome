# Contributing

Suggestions and pull requests are highly encouraged!

## Workflow

1. Clone the project:

```sh
git clone https://github.com/jsdelivr/extension-chrome.git
cd extension-chrome
npm install
```

2. When working on the extension or checking out branches, use this to have it constantly build your changes:

```sh
npm run watch # Listen for file changes and automatically rebuild
```

3. Then load or reload it into the browser to see the changes (this does not happen automatically).

## Loading into the browser

Once built, load it in the browser of your choice:

<table>
	<tr>
		<th>Chrome</th>
		<th>Firefox</th>
	</tr>
	<tr>
		<td width="50%" valign="top">
			<ol>
				<li>Open <code>chrome://extensions</code>;
				<li>Check the <strong>Developer mode</strong> checkbox;
				<li>Click on the <strong>Load unpacked extension</strong> button;
				<li>Select the folder <code>extension-chrome/build</code>.
			</ol>
		</td>
		<td width="50%" valign="top">
			<ol>
				<li>Open <code>about:debugging#addons</code>;
				<li>Click on the <strong>Load Temporary Add-on</strong> button;
				<li>Select the file <code>extension-chrome/build/manifest.json</code>.
			</ol>
			Or you can use this command to have Firefox automatically load and reload it through <a href="https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_run"><code>web-ext run</code></a>:</p>
			<pre>npm run watch:firefox</pre>
		</td>
	</tr>
</table>

---

_Many thanks to [sindresorhus](https://github.com/sindresorhus/refined-github/blob/master/contributing.md) for the inspiration with this contributing guide_
