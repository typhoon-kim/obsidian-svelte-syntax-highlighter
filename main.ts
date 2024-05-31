import { App, MarkdownPostProcessorContext, Plugin, PluginManifest, loadPrism } from 'obsidian';
import 'prism-svelte';

let obsidianPrism: any;

export default class SvelteSyntaxHighlightingPlugin extends Plugin {
    
    constructor (app: App, manifast: PluginManifest) {
        super(app, manifast);
        // obsidianPrism = await loadPrism().then(prism => {
        //     obsidianPrism = prism;
        // }).catch(error => {
        //     console.error('Failed to load Prism: ', error);
        // });
    }

    async onload() {
        try {
            console.log('Loading Svelte Syntax Highlighting Plugin');
            obsidianPrism = await loadPrism();
            console.log(obsidianPrism);

            // Svelte 구문 강조 설정
            if (!obsidianPrism.languages.svelte) {
                console.log("add svelte to prismjs");

                obsidianPrism.languages.svelte = {
                    ...obsidianPrism.languages.markup,
                    'script': {
                        pattern: /<script[\s\S]*?>[\s\S]*?<\/script>/i,
                        inside: {
                            'language-javascript': {
                                pattern: /(<script[\s\S]*?>)[\s\S]*?(<\/script>)/i,
                                lookbehind: true,
                                inside: obsidianPrism.languages.javascript
                            }
                        }
                    },
                    'style': {
                        pattern: /<style[\s\S]*?>[\s\S]*?<\/style>/i,
                        inside: {
                            'language-css': {
                                pattern: /(<style[\s\S]*?>)[\s\S]*?(<\/style>)/i,
                                lookbehind: true,
                                inside: obsidianPrism.languages.css
                            }
                        }
                    }
                };
            }

            // Markdown Post Processor 등록 (읽기 모드)
            this.registerMarkdownPostProcessor((element: HTMLElement, context: MarkdownPostProcessorContext) => {
                element.querySelectorAll('pre > code.language-svelte').forEach((block) => {
                    obsidianPrism.highlightElement(block);
                });
            });

        } catch (error) {
            console.log('Faild to load Prism: ', error);
        }
    }

    onunload() {
        console.log('Unloading Svelte Syntax Highlighting Plugin');

        // Prism.js에서 Svelte 구문 제거
        if (obsidianPrism && obsidianPrism.languages.svelte) {
            delete obsidianPrism.languages.svelte;
            console.log("remove svelte from prismjs");
            console.log(obsidianPrism.languages.svelte);
        }
    }
}