import loadPrismWithSvelte from 'loadPrismWithSvelte';
import { App, MarkdownPostProcessorContext, Plugin, PluginManifest } from 'obsidian';

export default class SvelteSyntaxHighlightingPlugin extends Plugin {
    obsidianPrism: any;

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
    }

    async onload() {
        try {
            console.log('Loading Svelte Syntax Highlighting Plugin');
            this.obsidianPrism = await loadPrismWithSvelte();

            console.log(this.obsidianPrism);

            // Markdown Post Processor 등록 (읽기 모드)
            this.registerMarkdownPostProcessor((element: HTMLElement, context: MarkdownPostProcessorContext) => {
                element.querySelectorAll('pre > code.language-svelte').forEach((block) => {
                    this.obsidianPrism.highlightElement(block);
                });
            });

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