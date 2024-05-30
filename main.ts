import { MarkdownPostProcessor, MarkdownPostProcessorContext, Plugin, loadPrism } from 'obsidian';
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { RangeSetBuilder } from '@codemirror/state';
import 'prism-svelte';

let globalPrism: any;

export default class SvelteSyntaxHighlightingPlugin extends Plugin {
    private markdownProcessor: MarkdownPostProcessor;

    async onload() {
        console.log('Loading Svelte Syntax Highlighting Plugin');

        try {
            // Prism.js 로드
            globalPrism = await loadPrism();
    
            // Svelte 구문 강조 설정
            if (!globalPrism.languages.svelte) {
                console.log("add svelte to prismjs");

                globalPrism.languages.svelte = {
                    ...globalPrism.languages.markup,
                    'script': {
                        pattern: /<script[\s\S]*?>[\s\S]*?<\/script>/i,
                        inside: {
                            'language-javascript': {
                                pattern: /(<script[\s\S]*?>)[\s\S]*?(<\/script>)/i,
                                lookbehind: true,
                                inside: globalPrism.languages.javascript
                            }
                        }
                    },
                    'style': {
                        pattern: /<style[\s\S]*?>[\s\S]*?<\/style>/i,
                        inside: {
                            'language-css': {
                                pattern: /(<style[\s\S]*?>)[\s\S]*?(<\/style>)/i,
                                lookbehind: true,
                                inside: globalPrism.languages.css
                            }
                        }
                    }
                };
            }

            // Markdown Post Processor 등록 (읽기 모드)
            this.markdownProcessor = this.registerMarkdownPostProcessor((element: HTMLElement, context: MarkdownPostProcessorContext) => {
                element.querySelectorAll('pre > code.language-svelte').forEach((block) => {
                    globalPrism.highlightElement(block);
                });
            });

            // CodeMirror 플러그인 등록 (편집 모드)
            this.registerEditorExtension(ViewPlugin.fromClass(SvelteEditorPlugin, {
                decorations: (plugin) => plugin.decorations,
            }));

        } catch (error) {
            console.log('Faild to load Prism: ', error);
        }

        console.log(globalPrism);
    }

    onunload() {
        console.log('Unloading Svelte Syntax Highlighting Plugin');

        // Prism.js에서 Svelte 구문 제거
        if (globalPrism.languages.svelte) {
            console.log("remove svelte to prismjs");
            delete globalPrism.languages.svelte;
        }

        // Markdown Post Processor 제거
        this.app.workspace.off('markdown-post-process', this.markdownProcessor);

        console.log(globalPrism);
    }
}

class SvelteEditorPlugin {
    decorations: DecorationSet;

    constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view);
    }

    update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
            this.decorations = this.buildDecorations(update.view);
        }
    }

    destroy() {
        // 필요한 경우 자원 정리 코드 추가
    }

    buildDecorations(view: EditorView): DecorationSet {
        const builder = new RangeSetBuilder<Decoration>();

        for (const { from, to } of view.visibleRanges) {
            const text = view.state.doc.sliceString(from, to);
            const codeBlockRegex = /```svelte([\s\S]*?)```/g;
            let match;

            while ((match = codeBlockRegex.exec(text.toLowerCase())) !== null) {
                const code = match[1];
                const start = from + match.index + 9; // 9는 "```svelte"의 길이

                // Prism.highlight를 사용하여 코드 하이라이팅
                const highlighted = globalPrism.highlight(code, globalPrism.languages.svelte, 'svelte');
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = highlighted;

                let pos = start;
                tempDiv.childNodes.forEach((child) => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        const textNode = child as Text;
                        if (textNode.textContent) {
                            pos += textNode.textContent.length;
                        }
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        const elementNode = child as HTMLElement;
                        const textContent = elementNode.innerText;
                        if (textContent) {
                            const className = elementNode.className.split(" ").join(".");
                            const deco = Decoration.mark({
                                class: className,
                                tagName: elementNode.tagName.toLowerCase()
                            });
                            builder.add(pos, pos + textContent.length, deco);
                            pos += textContent.length;
                        }
                    }
                });
            }
        }

        return builder.finish();
    }
}