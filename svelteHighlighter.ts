import { Decoration, DecorationSet, EditorView, PluginValue, ViewUpdate } from "@codemirror/view";
import { RangeSetBuilder } from '@codemirror/state'
import loadPrismWithSvelte from "loadPrismWithSvelte";

export default class SvelteHighlight implements PluginValue {
    decorations: DecorationSet;
    prism: any;

    constructor(view: EditorView) {
        this.decorations = Decoration.none;
        this.loadPrism().then(() => {
            this.decorations = this.buildDecorations(view);
            view.update([]);
        });
    }

    update(update: ViewUpdate): void {
        if (update.viewportChanged || update.docChanged) {
            this.decorations = this.buildDecorations(update.view);
        }
    }

    async loadPrism() {
        this.prism = await loadPrismWithSvelte();
    }

    buildDecorations(view: EditorView): DecorationSet {
        const builder = new RangeSetBuilder<Decoration>();

        if (!this.prism) {
            return Decoration.none;
        }

        const text = view.state.doc.toString(); // 전체 문서의 텍스트
        const regex = /```svelte(?:[\s:!?.;,@%&(){}[\]<>*~]*)([\s\S]*?)\n```/gi // svelte code block

        let match;
        while ((match = regex.exec(text)) !== null) {
            const codeBlock = match[0];
            const highlighted = this.prism.highlight(codeBlock, this.prism.languages.svelte, "svelte");

            const blockStart = match.index; // 코드 블록 내의 시작 인덱스 계산
            this.applyHighlighting(highlighted, blockStart, builder);
        }

        return builder.finish();
    }

    applyHighlighting(highlighted: string, blockStart: number, builder: RangeSetBuilder<Decoration>) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(highlighted, "text/html");
        const tempEl = doc.body;

        let currentIndex = blockStart;

        const ranges: { start: number, end: number, className: string }[] = [];

        const traverse = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || '';
                currentIndex += text.length;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                const className = element.className;

                // child를 순회하여 범위 별로 스타일클래스 추가
                const start = currentIndex;
                element.childNodes.forEach((child) => {
                    traverse(child);
                });

                const end = currentIndex;

                ranges.push({ start, end, className });
            }
        };

        tempEl.childNodes.forEach((child) => {
            traverse(child);
        });

        // 범위를 스타트 인덱스 기준으로 정렬 - builder에 순서대로 적용해야 하기 때문
        ranges.sort((a, b) => a.start - b.start);

        // 정렬된 스타일 대로 빌드
        for (const range of ranges) {
            builder.add(
                range.start,
                range.end,
                Decoration.mark({ class: range.className })
            );
        }
    }
}
