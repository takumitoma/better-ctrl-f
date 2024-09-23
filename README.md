# Better Ctrl+F

<code><b>Better Ctrl+F</b></code> is a Chrome extension that is an enhanced version of the default Ctrl+F, providing a more flexible search experience within web pages.

<img src="https://github.com/takumitoma/better-ctrl-f/blob/master/docs/extension-light-theme.JPG" />

## 🔍 Key Features

- **Multi-term Search**: Simultaneously search for up to 5 different terms
- **Custom Highlighting**: Personalize colors for each search term and focused result
- **Advanced Search Options**: Toggle case-sensitive and diacritics-sensitive searches
- **Efficient Navigation**: Quickly move through search results using intuitive controls
- **Theme Options**: Choose between light and dark mode for your preference
- **Persistent Settings**: Your preferences are saved across browser sessions

## ⚠️ Compatibility Notice

Better Ctrl+F is designed to work with standard web pages. It is not compatible with certain document types or specialized web applications, including but not limited to:

- PDF viewers in browsers
- Microsoft Office online documents (Word, Excel, PowerPoint)
- Google Workspace apps (Docs, Sheets, Slides)
- Specialized web-based document editors

For these document types, please use their native search functions.

## 📥 Installation

### Chrome Web Store

<a href="https://chromewebstore.google.com/detail/better-ctrl+f/gplkloamjcmhfnchiefogpjijhiehpij" target="_blank" rel="noopener noreferrer">https://chromewebstore.google.com/detail/better-ctrl+f/gplkloamjcmhfnchiefogpjijhiehpij</a>

### From Source

1. Clone the repository:
   ```
   git clone https://github.com/takumitoma/better-ctrl-f.git
   cd better-ctrl-f
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a production build:
   ```
   npm run build
   ```

4. Open Google Chrome and navigate to `chrome://extensions`
5. Enable "Developer mode" in the top right corner
6. Click "Load unpacked" and select the `dist` directory from the project folder
7. The extension should now be visible in your Chrome toolbar

## 🛠️ Technologies

- React
- TypeScript
- Vite
- Chrome Extension API
- Jest

## 📁 Project Structure

- `src/`: Source code for the extension
  - `background/`: Background script (service worker)
  - `content/`: Content script injected into web pages
  - `popup/`: Popup UI for the extension
- `public/`: Static assets
- `tests/`: Unit tests 
- `manifest.json`: Extension manifest file

## 🔒 Privacy & Data Handling

During the highlighting process, the extension analyzes the content of web pages accessed by users. However, this analysis is performed entirely locally within the user's browser. The extension does not store, transmit, or process any page content or user data on external servers. The only data persistently stored are user preferences, such as search queries and highlight colors, which are kept locally in the browser's storage for the purpose of maintaining user settings between sessions.

<!-- ## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Have to set up CI/CD first -->

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

Boilerplate code: [chrome-extension-boilerplate-react-vite-typescript](https://github.com/himalaya0035/chrome-extension-boilerplate-react-vite-typescript) by Himalaya Gupta
