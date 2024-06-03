# **Obsidian Svelte Syntax Highlighter Plugin**

English | [한국어](https://typhoon-kim.github.io/obsidian-svelte-syntax-highlighter/README_ko.html)

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/typhoon-kim/obsidian-svelte-syntax-highlighter)](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter/releases)
[![GitHub issues](https://img.shields.io/github/issues/typhoon-kim/obsidian-svelte-syntax-highlighter)](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter/issues)

[![npm](https://badgen.net/npm/v/obsidian-svelte-syntax-highlighter)](https://www.npmjs.com/package/obsidian-svelte-syntax-highlighter)
[![downloads](https://badgen.net/npm/dt/obsidian-svelte-syntax-highlighter)](https://www.npmjs.com/package/obsidian-svelte-syntax-highlighter)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/obsidian-svelte-syntax-highlighter/badge)](https://www.jsdelivr.com/package/npm/obsidian-svelte-syntax-highlighter)

This plug-in provides syntax highlighting for the [`Svelte`](https://svelte.dev/) code block in [`Obsidian`](https://obsidian.md/).  
It started with the simple idea of adding an identifier for the Svelte syntax to the Prism object of Obsidian.  
Don't use this plug-in when [Prism.js](https://prismjs.com/) supports syntax highlighting for Svelte in the future and Obsidian officially supports it!

## Features

- Syntax highlighting for Svelte code blocks in Obsidian.
- Highlight live syntax in edit mode by providing CodeMirror Extension.

## Installation

### From Obsidian

If you can't find it in the community plug-in, please install it [manually](#manual-installation).

1. Open Obsidian.
2. Go to `Settings` > `Community plugins`.
3. Disable `Safe mode`.
4. Click on `Browse` and search for "Svelte Syntax Highlighter".
5. Click `Install`.
6. Once installed, click `Enable` to activate the plugin.

### Manual Installation

1. Download the latest release from the [Releases](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter/releases) page.
2. Extract the files to your Obsidian vault's `.obsidian/plugins/obsidian-svelte-syntax-highlighter` directory.
3. Enable the plugin from the Obsidian settings.

## Usage

To use the Svelte Syntax Highlighter, simply create a code block with `svelte` as the language identifier:

    ```Svelte
    <script>
        export let name;
    </script>

    <h1>Hello {name}!</h1>
    ```

The plugin will automatically highlight the syntax of the Svelte code block.

![screenshot](screenshot.gif)

## Development

This Obsidian plug-in follows Obsidian's [plug-in development guide](https://docs.obsidian.md). Using Obsidian's Prism.js object, I have added Svelte's syntax highlighting identifier to implement ViewPlugin.extension in [CodeMirror](https://codemirror.net/). If you want to implement syntax highlighting in other or custom languages that Prism.js does not support, the content of this plug-in may be helpful.

### Prerequisites

- Node.js
- npm

### Building the Plugin

1. Clone the repository:
    ```bash
    git clone https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter.git
    cd obsidian-svelte-syntax-highlighter
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Build the plugin:
    ```bash
    npm run build
    ```

## Contributing

Contributions are welcome! Please open an [issue](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter/issues) or submit a pull request on GitHub.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---
*If you have any further questions or need support, please feel free to contact me!*
