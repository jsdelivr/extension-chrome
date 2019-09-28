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

Once built, load it in the browser with below instructions:

1. Open **chrome://extensions**
2. Check the **Developer mode** checkbox
3. Click on the **Load unpacked extension** button
4. Select the folder **extension-chrome/build**

---

_Many thanks to [sindresorhus](https://github.com/sindresorhus/refined-github/blob/master/contributing.md) for the inspiration with this contributing guide_
