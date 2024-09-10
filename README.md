# Better Ctrl+F

<code><b>Better Ctrl+F</b></code> is a Chrome extension that enhances the default Ctrl+F functionality, providing a more powerful and flexible search experience within web pages.

## Features

- Multiple search queries: Search for up to 5 different terms simultaneously
- Customizable highlighting: Set different colors for each search term and focused result
- Case-sensitive and diacritics-sensitive search options
- Persistent settings across browser sessions

## Usage Limitations

Please note that Better Ctrl+F is designed to work with standard web pages. The extension does not function with certain document types or specialized web applications, including but not limited to:

- PDF files viewed in the browser
- Microsoft Office documents (e.g., Word, Excel, PowerPoint)
- Google Docs, Sheets, or Slides
- Other web-based document viewers or editors with custom rendering

For these types of documents, please rely on the native search functionality provided by their respective applications or viewers.

## Installation from Chrome Web Store

Coming soon...

## Installation from source

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

## Technologies Used

- React: A JavaScript library for building user interfaces
- TypeScript: A typed superset of JavaScript
- Vite: A build tool that provides a faster and leaner development experience
- Chrome Extension API: For integrating with the Chrome browser
- Jest: For unit testing

## Project Structure

- `src/`: Source code for the extension
  - `background/`: Background script (service worker)
  - `content/`: Content script injected into web pages
  - `popup/`: Popup UI for the extension
- `public/`: Static assets
- `tests/`: Unit tests for the content script
- `manifest.json`: Extension manifest file

## Privacy and Data Handling

Better Ctrl+F operates with a strong commitment to user privacy. During the highlighting process, the extension analyzes the content of web pages accessed by users. However, this analysis is performed entirely locally within the user's browser. The extension does not store, transmit, or process any page content or user data on external servers. The only data persistently stored are user preferences, such as search queries and highlight colors, which are kept locally in the browser's storage for the purpose of maintaining user settings between sessions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

Boilerplate code credits to Himalaya Gupta: [chrome-extension-boilerplate-react-vite-typescript](https://github.com/himalaya0035/chrome-extension-boilerplate-react-vite-typescript)