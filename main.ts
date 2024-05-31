import { App, Plugin, PluginManifest } from 'obsidian';
import loadPrismWithSvelte from 'loadPrismWithSvelte';
import SvelteHighlight from 'svelteHighlight';
import { ViewPlugin } from '@codemirror/view';

export default class SvelteSyntaxHighlightingPlugin extends Plugin {
    obsidianPrism: any;

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
    }

    async onload() {
        try {
            console.log('Loading Svelte Syntax Highlighting Plugin');
            this.obsidianPrism = await loadPrismWithSvelte();

            // 읽기 모드에서 Svelte 구문 강조 설정
            this.registerMarkdownPostProcessor((el, ctx) => {
                el.querySelectorAll('pre > code.language-svelte').forEach((block) => {
                    this.obsidianPrism.highlightElement(block);
                });
            });

            // 편집 모드에서 Svelte 구문 강조 설정
            this.registerMarkdownCodeBlockProcessor('svelte', (source, el, ctx) => {
                const pre = document.createElement('pre');
                const code = document.createElement('code');
                code.className = 'language-svelte';
                code.textContent = source;
                pre.appendChild(code);
                el.appendChild(pre);

                this.obsidianPrism.highlightElement(code);
            });

            //this.registerEditorExtension(ViewPlugin.fromClass(SvelteHighlight, { decorations: (plugin) => plugin.decorations }));

        } catch (error) {
            console.log('Failed to load Prism: ', error);
        }
    }

    onunload() {
        console.log('Unloading Svelte Syntax Highlighting Plugin');

        // Prism.js에서 Svelte 구문 제거
        if (this.obsidianPrism && this.obsidianPrism.languages.svelte) {
            delete this.obsidianPrism.languages.svelte;
            console.log("Removed Svelte from Prism.js");
        }
    }
}