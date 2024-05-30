import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import { Decoration, DecorationSet, ViewUpdate, PluginValue, EditorView, ViewPlugin } from "@codemirror/view";
import { RangeSetBuilder } from '@codemirror/state';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prism-svelte';

export default class SvelteSyntaxHighlightingPlugin extends Plugin {
    async onload() {
        console.log('Loading Svelte Syntax Highlighting Plugin');

        // Svelte 구문 강조 추가
        this.addSvelteSyntaxHighlighting();

        //console.log(Prism.languages);

        // MarkdownPostProcessor 등록
        this.registerMarkdownPostProcessor((element: HTMLElement, context: MarkdownPostProcessorContext) => {
            element.querySelectorAll('pre > code.language-svelte').forEach((block) => {
                Prism.highlightElement(block);
            });
            
            console.log(element);
        });

        // this.registerMarkdownPostProcessor(
        //     this.registerMarkdownCodeBlockProcessor("svelte", (sorurce:string, el:HTMLElement, ctx: MarkdownPostProcessorContext) => {
        //         el.querySelectorAll('pre > code.language-svelte').forEach((block) => {
        //             Prism.highlightElement(block);
        //         });
        //         console.log(el);
        // }));

        // CodeMirror 편집 모드에서 구문 강조를 위한 뷰 플러그인 등록
        this.registerEditorExtension(ViewPlugin.fromClass(SveltePlugin, {
            decorations: (plugin) => plugin.decorations
        }));
    }

    onunload() {
        console.log('Unloading Svelte Syntax Highlighting Plugin');
    }

    addSvelteSyntaxHighlighting() {
        if (!Prism.languages.svelte) {
            Prism.languages.svelte = {
                ...Prism.languages.markup,
                'script': {
                    pattern: /<script[\s\S]*?>[\s\S]*?<\/script>/i,
                    inside: {
                        'language-javascript': {
                            pattern: /(<script[\s\S]*?>)[\s\S]*?(<\/script>)/i,
                            lookbehind: true,
                            inside: Prism.languages.javascript
                        }
                    }
                },
                'style': {
                    pattern: /<style[\s\S]*?>[\s\S]*?<\/style>/i,
                    inside: {
                        'language-css': {
                            pattern: /(<style[\s\S]*?>)[\s\S]*?(<\/style>)/i,
                            lookbehind: true,
                            inside: Prism.languages.css
                        }
                    }
                }
            };
        }
    }
}

class SveltePlugin implements PluginValue {
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

            while ((match = codeBlockRegex.exec(text.toLocaleLowerCase())) !== null) {
                console.log(1);
                const code = match[1];
                const start = from + match.index + 9; // 9는 "```svelte"의 길이

                // Prism.highlight를 사용하여 코드 하이라이팅
                const highlighted = Prism.highlight(code, Prism.languages.svelte, 'svelte');
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
