// ==UserScript==
// @name         Token Fetcher
// @namespace    http://your-namespace.com
// @version      0.1
// @description  Fetch and log token from a URL
// @author       You
// @match        https://www.hetushu.com/book/5763/4327497.html
// @grant        none
// ==/UserScript==

function rm(selector, all = false, dom) {
    if (all) {
      const rs = dom.querySelectorAll(selector);
      rs.forEach((e) => e.remove());
    } else {
      const r = dom.querySelector(selector);
      if (r) {
        r.remove();
      }
    }
}

function countBr(d) {
    return Array.from(d.childNodes).filter((n) => n instanceof HTMLBRElement)
        .length;
}
function onlyTextAndBr(d) {
    return Array.from(d.childNodes)
        .map((n) => n.nodeName.toLowerCase())
        .every((nn) => ["#text", "hr", ...InlineElements].includes(nn));
}

function isBlankParagraph(node) {
    return (node instanceof HTMLParagraphElement &&
        node.innerText.trim() === "" &&
        Array.from(node.childNodes).every((n) => n instanceof Text));
}

async function inlineElement(element) {
    const map = new Map();
    const defaultList = [
        "abbr",
        "acronym",
        "bdi",
        "bdo",
        "cite",
        "data",
        "dfn",
        "span",
        "font",
        "time",
        "u",
        "tt",
        "#text",
    ];
    async function defaultHandler(elem) {
        if ((elem instanceof HTMLElement && elem.childElementCount === 0) ||
            elem instanceof Text) {
            let text;
            if (elem instanceof HTMLElement) {
                text = elem.innerText.trim();
            }
            if (elem instanceof Text) {
                text = elem.textContent?.trim() ?? "";
            }
            if (typeof text === "string") {
                const dom = new Text(text);
                const images = [];
                return {
                    dom,
                    text: text.replaceAll("\n", ""),
                    images,
                };
            }
        }
        if (elem instanceof HTMLElement && elem.childElementCount !== 0) {
            const nodes = [...findBase(elem)];
            const { dom, text, images } = await loop(nodes, document.createElement(elem.nodeName.toLowerCase()));
            return {
                dom,
                text,
                images,
            };
        }
        return null;
    }
}
async function blockElement(element) {
    const map = new Map();
    const divList = [
        "article",
        "dialog",
        "div",
        "footer",
        "header",
        "main",
        "section",
        "hgroup",
    ];
}
async function cleanDOM(elem, imgMode, options) {
    const baseNodes = [...findBase(elem)];
    const _obj = await loop(baseNodes, document.createElement("div"));
    const obj = await awaitAttachments(_obj);
    return postHook(obj);
    async function blockElement(element) {
        const map = new Map();
        const divList = [
            "article",
            "dialog",
            "div",
            "footer",
            "header",
            "main",
            "section",
            "hgroup",
        ];
        function div(elem) {
            if (elem instanceof HTMLElement) {
                const nodes = [...findBase(elem)];
                return loop(nodes, document.createElement("div"));
            }
            return null;
        }
        divList.forEach((n) => map.set(n, div));
        const pList = ["address", "p", "dd", "dt", "figcaption", "dl"];
        function p(elem) {
            if (elem instanceof HTMLElement) {
                const nodes = [...findBase(elem)];
                return loop(nodes, document.createElement("p"));
            }
            return null;
        }
        pList.forEach((n) => map.set(n, p));
        const blockquoteList = ["aside", "blockquote"];
        async function blockquote(elem) {
            if (elem instanceof HTMLElement) {
                const nodes = [...findBase(elem)];
                const { dom, text, images } = await loop(nodes, document.createElement("blockquote"));
                const outText = text
                    .split("\n")
                    .map((l) => l.replace(/^/, "> "))
                    .join("\n");
                return {
                    dom,
                    text: outText,
                    images,
                };
            }
            return null;
        }
        blockquoteList.forEach((n) => map.set(n, blockquote));
        const headerList = ["h1", "h2", "h3", "h4", "h5", "h6"];
        function header(elem) {
            if (elem instanceof HTMLElement) {
                const nodeName = elem.nodeName.toLowerCase();
                const n = parseInt(nodeName.substring(1));
                const dom = document.createElement(nodeName);
                dom.innerHTML = elem.innerHTML;
                const text = "#".repeat(n) + " " + elem.innerText;
                const images = [];
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        headerList.forEach((n) => map.set(n, header));
        const preList = ["pre", "textarea"];
        function pre(elem) {
            if (elem instanceof HTMLElement) {
                const dom = document.createElement("pre");
                dom.innerHTML = elem.innerHTML;
                const text = "```\n" + elem.innerText + "\n```";
                const images = [];
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        preList.forEach((n) => map.set(n, pre));
        function hr(elem) {
            if (elem instanceof HTMLHRElement) {
                const dom = document.createElement("hr");
                const text = "-".repeat(20);
                const images = [];
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        map.set("hr", hr);
        async function common1(boldName, baseName, elem) {
            const bold = elem.querySelector(boldName);
            let s;
            let sText = "";
            if (bold instanceof HTMLElement) {
                s = document.createElement(boldName);
                s.innerHTML = bold.innerHTML;
                sText = "**" + bold.innerText + "**";
                bold.remove();
            }
            const base = document.createElement(baseName);
            if (s){
                base.appendChild(s);
            }
            const nodes = [...findBase(elem)];
            const { dom, text, images } = await loop(nodes, base);
            const outText = sText + "\n\n" + text;
            return {
                dom,
                text: outText,
                images,
            };
        }
        function details(elem) {
            return common1("summary", "details", elem);
        }
        map.set("details", details);
        function figure(elem) {
            return common1("figcaption", "figure", elem);
        }
        map.set("figure", figure);
        function listItem(elem) {
            if (elem instanceof HTMLLIElement) {
                const dom = document.createElement("li");
                dom.innerHTML = elem.innerHTML;
                let prefix = "-   ";
                const parent = elem.parentNode;
                if (parent instanceof HTMLOListElement) {
                    const start = parent.getAttribute("start");
                    const index = Array.prototype.indexOf.call(parent.children, elem);
                    prefix = (start ? Number(start) + index : index + 1) + ".  ";
                }
                const text = prefix + elem.innerText;
                const images = [];
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        map.set("li", listItem);
        const listList = ["ul", "ol"];
        function list(elem) {
            const nodeName = elem.nodeName.toLowerCase();
            if (elem instanceof HTMLUListElement ||
                elem instanceof HTMLOListElement) {
                const tdom = document.createElement(nodeName);
                const nodes = [...findBase(elem)];
                return loop(nodes, tdom);
            }
            return null;
        }
        listList.forEach((n) => map.set(n, list));
        function table(elem) {
            if (elem instanceof HTMLTableElement) {
                const dom = elem.cloneNode(true);
                const text = processTable(elem);
                const images = [];
                return { dom, text, images };
            }
            return null;
            function fixText(text) {
                return text.trim().replaceAll("\t", "");
            }
            function processTable(tableDom) {
                let markdown_string = "";
                let table_header = "|";
                let table_header_footer = "|";
                let table_rows = "";
                let table_header_found = false;
                let table_header_cell_count = 0;
                let prev_row_cell_count = 0;
                Array.from(tableDom.querySelectorAll("thead > tr > td")).forEach((td) => {
                    table_header_cell_count++;
                    table_header = table_header + fixText(td.innerText) + "|";
                    table_header_footer = table_header_footer + "--- |";
                    table_header_found = true;
                });
                Array.from(tableDom.querySelectorAll("tr")).forEach((tr) => {
                    if (!table_header_found) {
                        Array.from(tr.querySelectorAll("th")).forEach((th) => {
                            table_header_cell_count++;
                            table_header = table_header + fixText(th.innerText) + "|";
                            table_header_footer = table_header_footer + "--- |";
                            table_header_found = true;
                        });
                    }
                    let table_row = "";
                    let curr_row_cell_count = 0;
                    Array.from(tr.querySelectorAll("td"))
                        .filter((td) => !Array.from(tableDom.querySelectorAll("thead > tr > td")).includes(td))
                        .forEach((td) => {
                        curr_row_cell_count++;
                        table_row = table_row + fixText(td.innerText) + "|";
                    });
                    if (prev_row_cell_count != 0 &&
                        curr_row_cell_count != prev_row_cell_count) {
                        markdown_string =
                            "ERROR: Your HTML table rows don't have the same number of cells. Colspan not supported.";
                        return false;
                    }
                    if (curr_row_cell_count) {
                        table_rows += "|" + table_row + "\n";
                        prev_row_cell_count = curr_row_cell_count;
                    }
                });
                if (markdown_string == "") {
                    if (table_header_found) {
                        if (table_header_cell_count != prev_row_cell_count) {
                            throw new Error("ERROR: The number of cells in your header doesn't match the number of cells in your rows.");
                        }
                    }
                    else {
                        for (let i = 0; i < prev_row_cell_count; i++) {
                            table_header = table_header + "|";
                            table_header_footer = table_header_footer + "--- |";
                        }
                    }
                    markdown_string += table_header + "\n";
                    markdown_string += table_header_footer + "\n";
                    markdown_string += table_rows;
                }
                return markdown_string;
            }
        }
        map.set("table", table);
        const nodeName = element.nodeName.toLowerCase();
        const fn = map.get(nodeName) ?? p;
        const obj = await fn(element);
        if (!obj) {
            return null;
        }
        const { dom, text, images } = obj;
        if (element.getAttribute("data-keep")) {
            const dk = element.getAttribute("data-keep");
            const keeps = dk.split(",").map((k) => k.trim());
            keeps.forEach((k) => {
                if (dom instanceof HTMLElement && element.getAttribute(k)) {
                    dom.setAttribute(k, element.getAttribute(k));
                }
            });
        }
        return { dom, text, images };
    }
}

const InlineElements = [
    "a",
    "abbr",
    "acronym",
    "audio",
    "b",
    "bdi",
    "bdo",
    "big",
    "br",
    "button",
    "canvas",
    "cite",
    "code",
    "data",
    "datalist",
    "del",
    "dfn",
    "em",
    "embed",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "map",
    "mark",
    "meter",
    "noscript",
    "object",
    "output",
    "picture",
    "progress",
    "q",
    "ruby",
    "s",
    "samp",
    "script",
    "select",
    "slot",
    "small",
    "span",
    "font",
    "strong",
    "sub",
    "sup",
    "svg",
    "template",
    "textarea",
    "time",
    "u",
    "tt",
    "var",
    "video",
    "wbr",
];

const IgnoreElements = [
    "#comment",
    "fieldset",
    "legend",
    "input",
    "label",
    "form",
    "button",
    "canvas",
    "datalist",
    "embed",
    "iframe",
    "map",
    "meter",
    "noscript",
    "object",
    "output",
    "progress",
    "script",
    "style",
    "link",
    "select",
    "slot",
    "svg",
    "template",
    "video",
    "wbr",
];

const BlockElements = [
    "address",
    "article",
    "aside",
    "blockquote",
    "details",
    "dialog",
    "dd",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "ul",
];

async function awaitAttachments({ dom, text, images, }) {
    const attachments = await Promise.all(images);
    attachments.forEach((attach) => {
        if (attach.comments) {
            dom.innerHTML = dom.innerHTML.replaceAll(attach.comments, attach.name);
            text = text.replaceAll(attach.comments, attach.name);
        }
    });
    return {
        dom,
        text,
        images: attachments,
    };
}

function convertBlankParagraphElement(dom) {
    const nodes = Array.from(dom.children);
    let count = 0;
    let buffer = [];
    for (const node of nodes) {
        if (isBlankParagraph(node)) {
            count++;
            buffer.push(node);
        }
        else if (count !== 0) {
            const p = document.createElement("p");
            while (count > 0) {
                count--;
                const br = document.createElement("br");
                p.appendChild(br);
            }
            buffer[0].replaceWith(p);
            buffer.forEach((n) => n.remove());
            count = 0;
            buffer = [];
        }
    }
}

function convertBr(dom, force = false) {
    if (onlyTextAndBr(dom) && (countBr(dom) > 4 || force)) {
        const outDom = document.createElement("div");
        const childNodes = dom.childNodes;
        let brCount = 0;
        let buffer = [];
        for (const node of Array.from(childNodes)) {
            if (node instanceof HTMLBRElement) {
                if (brCount === 0 && buffer.length !== 0) {
                    const p = document.createElement("p");
                    buffer.forEach((n) => p.appendChild(n));
                    outDom.appendChild(p);
                    buffer = [];
                }
                brCount++;
                continue;
            }
            if (node instanceof HTMLHRElement) {
                brCount = 0;
                if (buffer.length !== 0) {
                    const p = document.createElement("p");
                    buffer.forEach((n) => p.appendChild(n));
                    outDom.appendChild(p);
                    buffer = [];
                }
                const hr = document.createElement("hr");
                outDom.appendChild(hr);
                continue;
            }
            if (brCount === 0) {
                buffer.push(node);
                continue;
            }
            else {
                if (brCount > 2) {
                    let brRemainder = brCount - 2;
                    const brp = document.createElement("p");
                    while (brRemainder > 0) {
                        brRemainder--;
                        const br = document.createElement("br");
                        brp.appendChild(br);
                    }
                    outDom.appendChild(brp);
                }
                brCount = 0;
                buffer.push(node);
                continue;
            }
        }
        brCount = 0;
        if (buffer.length !== 0) {
            const p = document.createElement("p");
            buffer.forEach((n) => p.appendChild(n));
            outDom.appendChild(p);
            buffer = [];
        }
        return outDom;
    }
    else {
        return dom;
    }
}
function isBaseElemWithKeep(node) {
    const nodeName = node.nodeName.toLowerCase();
    if (keepElements.includes(nodeName)) {
        return true;
    }
    return isBaseElem(node);
}

const keepElements = [
    "aside",
    "blockquote",
    "details",
    "figure",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "ul",
    "ol",
    "li",
    "pre",
];

function htmlTrim(dom) {
    const childNodes = Array.from(dom.childNodes);
    remove(childNodes);
    const childNodesR = Array.from(dom.childNodes).reverse();
    remove(childNodesR);
    function remove(nodes) {
        for (const node of nodes) {
            if (node instanceof Text) {
                if (node.textContent?.trim() === "") {
                    node.remove();
                    continue;
                }
                else {
                    break;
                }
            }
            if (node instanceof HTMLBRElement) {
                node.remove();
                continue;
            }
            if (node instanceof HTMLParagraphElement && isBlankParagraph(node)) {
                node.remove();
                continue;
            }
            if (node instanceof HTMLElement && node.nodeName.toLowerCase() !== "br") {
                break;
            }
        }
    }
}

function isBaseElem(node) {
    const nodeName = node.nodeName.toLowerCase();
    if (node instanceof Text) {
        return true;
    }
    if (node.childElementCount === 0) {
        return true;
    }
    if (InlineElements.includes(nodeName)) {
        return true;
    }
    return Array.from(node.children).every((child) => {
        const n = child.nodeName.toLowerCase();
        return InlineElements.includes(n);
    });
}

async function loop(nodes, _outDom) {
    let _outText = "";
    let _outImages = [];
    for (const node of nodes) {
        const bNname = node.nodeName.toLowerCase();
        if (bNname === "textarea" || BlockElements.includes(bNname)) {
            if (node instanceof HTMLElement) {
                const tobj = await blockElement(node);
                if (tobj) {
                    const { dom: tdom, text: ttext, images: timages } = tobj;
                    _outDom.appendChild(tdom);
                    _outText = _outText + "\n" + ttext + "\n";
                    _outImages = _outImages.concat(timages);
                    continue;
                }
            }
        }
        if (node instanceof Text || InlineElements.includes(bNname)) {
            const tobj = await inlineElement(node);
            if (tobj) {
                const { dom: tdom, text: ttext, images: timages } = tobj;
                _outDom.appendChild(tdom);
                _outText = _outText + ttext;
                _outImages = _outImages.concat(timages);
                continue;
            }
        }
    }
    return {
        dom: _outDom,
        text: _outText,
        images: _outImages,
    };
}

function postHook({ dom, text, images, }) {
    htmlTrim(dom);
    dom = convertBr(dom);
    Array.from(dom.children).forEach((child) => child.replaceWith(convertBr(child)));
    convertBlankParagraphElement(dom);
    text = text.trim();
    return {
        dom,
        text,
        images,
    };
}

function* findBase(elem, withKeep = true) {
    let is;
    if (withKeep) {
        is = isBaseElemWithKeep;
    }
    else {
        is = isBaseElem;
    }
    const childNodes = Array.from(elem.childNodes).filter((node) => {
        if (node instanceof Text) {
            const textContent = node.textContent;
            if (textContent === null) {
                return false;
            }
            if (textContent.trim() === "") {
                return false;
            }
        }
        return true;
    });
    for (const child of childNodes) {
        const childNodeName = child.nodeName.toLowerCase();
        if (!IgnoreElements.includes(childNodeName)) {
            if (is(child)) {
                yield child;
            }
            else {
                yield* findBase(child, withKeep);
            }
        }
    }
}

async function getText(input, charset, init, test = (response) => Promise.resolve(false)) {
    if (typeof input === "string") {
        const _url = new URL(input);
        if (document.location.protocol === "https:" && _url.protocol === "http:") {
            _url.protocol = "https:";
            input = _url.toString();
        }
    }
    if (charset === undefined) {
        return fetch(input, init)
            .then(async (response) => {
            if (response.ok || (await test(response))) {
                return response.text();
            }
            else {
                throw new Error(`Bad response! ${input}`);
            }
        })
    }
    else {
        return fetch(input, init)
            .then(async (response) => {
            if (response.ok || (await test(response))) {
                return response.arrayBuffer();
            }
            else {
                throw new Error(`Bad response! ${input}`);
            }
        })
            .then((buffer) => {
            const decoder = new TextDecoder(charset);
            const text = decoder.decode(buffer);
            return text;
        })
    }
}

async function getHtmlDOM(input, charset, init, test = (response) => Promise.resolve(false)) {
    const htmlText = await getText(input, charset, init, test);
    if (!htmlText) {
        throw new Error("Fetch Content failed!");
    }
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    if (!doc.querySelector("base")) {
        const base = doc.createElement("base");
        if (typeof input === "string") {
            base.href = input;
        }
        else {
            base.href = input.url;
        }
        doc.head.appendChild(base);
    }
    return doc;
}


async function sortPage() {
    const doc = await getHtmlDOM('https://www.hetushu.com/book/5763/4327497.html', 'utf-8');
    console.log('Origin :', doc);
    try {
        const response = await fetch('https://www.hetushu.com/book/5763/r4327497.json', {
            headers: {
                accept: "*/*",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                pragma: "no-cache",
                "x-requested-with": "XMLHttpRequest",
            },
            referrer: 'https://www.hetushu.com/book/5763/4327467.html',
            method: "GET",
            mode: "cors",
            credentials: "include",
        });

        const token = await response.headers.get("token");

        if (token) {
            const tokenDict = atob(token)
                .split(/[A-Z]+%/)
                .map((v) => parseInt(v));
            console.log('Token:', token);
            console.log('Token Dictionary:', tokenDict);
            const thisBody = doc.querySelector("#content");
            rm(".mask.mask2", false, thisBody);
            console.log(thisBody);
            let b = 0;
            let star = 0;
            for (let i = 0; i < thisBody.childNodes.length; i++) {
                if (thisBody.childNodes[i].nodeName === "H2") {
                    star = i + 1;
                }
                if (thisBody.childNodes[i].nodeName === "DIV" &&
                    thisBody.childNodes[i].className !== "chapter") {
                    break;
                }
            }
            const thisChildNode = [];
                for (let i = 0; i < tokenDict.length; i++) {
                    if (tokenDict[i] < 5) {
                        thisChildNode[tokenDict[i]] = thisBody.childNodes[i + star];
                        b++;
                    }
                    else {
                        thisChildNode[tokenDict[i] - b] = thisBody.childNodes[i + star];
                    }
                }
                for (const childNode of thisChildNode) {
                    if (!childNode) {
                        continue;
                    }
                    thisBody.appendChild(childNode);
                }
            let content = thisBody.innerText
            console.log('this body 2', thisBody);
            console.log('content', content);
        } else {
            console.log('Token is null');
        }
    } catch (error) {
        console.error('Error fetching token:', error);
    }
    const content = doc.querySelector("#content");
    if (content) {
        const tagRemoved = "h2, acronym, bdo, big, cite, code, dfn, kbd, q, s, samp, strike, tt, u, var";
        tagRemoved.split(", ").forEach((s) => {
            rm(s, true, content);
        });
        Array.from(content.querySelectorAll("div")).map((oldNode) => {
            const newNode = document.createElement("p");
            newNode.innerHTML = oldNode.innerHTML;
            oldNode.parentNode?.replaceChild(newNode, oldNode);
        });
        const { dom, text, images } = await cleanDOM(content, "TM");
        return {
            contentText: text,
            };
        }
        else {
            return {
                contentText: null,
            };
        }
    }
sortPage();