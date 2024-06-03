# **옵시디언 Svelte 구문 강조 플러그인**

[English](https://typhoon-kim.github.io/obsidian-svelte-syntax-highlighter/) | 한국어

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/typhoon-kim/obsidian-svelte-syntax-highlighter)](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter/releases)
[![GitHub issues](https://img.shields.io/github/issues/typhoon-kim/obsidian-svelte-syntax-highlighter)](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter/issues)

[![npm 버전](https://badgen.net/npm/v/@typh007/obsidian-svelte-highlighter)](https://www.npmjs.com/package/@typh007/obsidian-svelte-highlighter)
[![다운로드](https://badgen.net/npm/dt/@typh007/obsidian-svelte-highlighter)](https://www.npmjs.com/package/@typh007/obsidian-svelte-highlighter)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/@typh007/obsidian-svelte-highlighter/badge)](https://www.jsdelivr.com/package/npm/@typh007/obsidian-svelte-highlighter)

[`Obsidian`](https://obsidian.md/)에서 [`Svelte`](https://svelte.dev/) 코드 블록에 대한 구문 강조를 제공하는 플러그인 입니다.
Obsidian의 프리즘 객체에 Svelte 구문에 대한 식별자를 추가하는 간단한 아이디어에서 출발하였습니다. 추후 [Prism.js](https://prismjs.com/)에서 Svelte에 대한 구문강조가 지원되고 Obsidian에서 이를 공식적으로 지원하게 되면 이 플러그인을 사용하지 마세요!

## 기능

- Obsidian에서 Svelte 코드 블록에 대한 구문 강조.
- CodeMirror Extention을 제공하여 편집 모드에서 라이브 구문 강조.

## 설치

### Obsidian에서 설치

커뮤니티 플러그인에서 찾을 수 없다면 [수동설치](#수동설치)해 주세요.

1. Obsidian을 실행합니다.
2. `설정` > `커뮤니티 플러그인`으로 이동합니다.
3. `제한 모드`를 비활성화합니다.
4. `탐색` 버튼을 클릭하고 "Svelte Syntax Highlighter"를 검색합니다.
5. `설치` 버튼을 클릭합니다.
6. 설치가 완료되면, 플러그인을 활성화 합니다.

### 수동설치

커뮤니티 플러그인으로 허용되기 전에 플러그인을 수동으로 설치할 수 있습니다.

1. [Releases](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter/releases)에서 최신 릴리즈를 다운로드합니다.
2. 다운로드한 파일을 원하는 Obsidian 볼트의 `.obsidian/plughins/obsidian-svelte-syntax-highlighter` 디렉토리에 압축 해제합니다.
3. Obsidian 설정에서 플러그인을 활성화 합니다.

## 사용법

Svelte Syntax Highlighter를 사용하려면 `svelte` 언어 식별자를 사용하여 코드 블록을 생성하세요:

    ```Svelte
    <script>
        export let name;
    </script>

    <h1>Hello {name}!</h1>
    ```

플러그인은 Svelte 코드 블록의 구문을 자동으로 강조합니다.

![screenshot](screenshot.gif)

## 개발

본 Obsidian 플러그인은 Obsidian의 [플러그인 개발 가이드](https://docs.obsidian.md)를 따릅니다. Obsidian의 Prism.js 객체를 이용하여 Svelte의 구문 강조 식별자를 추가하여 [CodeMirror](https://codemirror.net/)의 ViewPlugin.extention을 구현하였습니다. Prism.js에서 지원하지 않는 다른 언어나 커스텀 언어의 구문 강조를 구현하고 싶다면 본 플러그인의 내용이 도움이 될 것입니다.

### 필요 조건

- Node.js
- npm

### 플러그인 빌드

1. 리포지토리를 클론합니다:
    ```bash
    git clone https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter.git
    cd obsidian-svelte-syntax-highlighter
    ```

2. 종속성을 설치합니다:
    ```bash
    npm install
    ```

3. 플러그인을 빌드합니다:
    ```bash
    npm run build
    ```

## 🤝 기여

기여는 환영합니다! GitHub에서 [이슈](https://github.com/typhoon-kim/obsidian-svelte-syntax-highlighter/issues)를 열거나 풀 리퀘스트를 제출해주세요.

## 📝 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

---

*추가적인 질문이나 지원이 필요한 경우 언제든지 문의 주세요!*
