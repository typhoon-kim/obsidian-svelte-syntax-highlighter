import { App, Plugin, PluginManifest } from 'obsidian';
import loadPrismWithSvelte from 'loadPrismWithSvelte';
import SvelteHighlight from 'svelteHighlighter';
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
            this.registerEditorExtension(
                ViewPlugin.fromClass(
                    SvelteHighlight, { 
                        decorations: (plugin) => plugin.decorations,
                    }
                )
            );

        } catch (error) {
            console.error('Failed to load Prism: ', error);
        }
    }

    onunload() {
        console.log('Unloading Svelte Syntax Highlighting Plugin');

        // Prism.js에서 Svelte 구문 제거
        if (this.obsidianPrism && this.obsidianPrism.languages.svelte) {
            delete this.obsidianPrism.languages.svelte;
        }
    }
}