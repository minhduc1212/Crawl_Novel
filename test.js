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

async function sorfPage() {
  let path;
  let bid;
  let sid;
  let chapterUrl = "https://www.hetushu.com/book/5763/4327466.html"; // Add chapterUrl declaration
  if (
    /\/(book[0-9]?)\/([0-9]+)\/([0-9]+)\.html(\?position=([0-9]+))?$/.test(
      chapterUrl
    )
  ) {
    path = RegExp.$1;
    bid = RegExp.$2;
    sid = RegExp.$3;
  } else {
    return false;
  }

  const url = [
    "https://www.hetushu.com",
    path,
    bid,
    "r" + sid + ".json",
  ].join("/");
  console.log(`[Chapter]请求 ${url} Referer ${chapterUrl}`);
  const response = await fetch(url, {
    headers: {
      accept: "*/*",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      pragma: "no-cache",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: chapterUrl,
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const token = response.headers.get("response");
  console.log(`[Chapter]token ${token}`);
}

sorfPage();

/*if (token) {
  const tokenDict = atob(token)
    .split(/[A-Z]+%/)
    .map((v) => parseInt(v));

  const thisBody = doc.querySelector("#content");

  rm(".mask.mask2", false, thisBody);
  let b = 0;
  let star = 0;
  for (let i = 0; i < thisBody.childNodes.length; i++) {
    if (thisBody.childNodes[i].nodeName === "H2") {
      star = i + 1;
    }
  }
}*/
   
