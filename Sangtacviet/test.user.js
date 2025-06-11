// ==UserScript==
// @name         STV DLD (Enhanced)
// @namespace    https://your-namespace.com
// @version      1.3
// @description  Script to send a request and get the response without causing page refresh issues, prevents tab discarding. Now with retry logic for failed URLs.
// @match        https://sangtacviet.vip/truyen/fanqie/*/*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ensure the script runs only on chapter pages
    if (!window.location.pathname.includes('/truyen/fanqie/')) {
        return;
    }

    var runButton = document.createElement('button');
    runButton.innerText = 'Download Chapters';
    runButton.style.position = 'fixed';
    runButton.style.top = '50%';
    runButton.style.right = '10px';
    runButton.style.transform = 'translateY(-50%)';
    runButton.style.padding = '10px 15px';
    runButton.style.backgroundColor = '#4CAF50';
    runButton.style.color = 'white';
    runButton.style.border = 'none';
    runButton.style.borderRadius = '5px';
    runButton.style.cursor = 'pointer';
    runButton.style.zIndex = '9999'; // Ensure button is on top
    runButton.style.opacity = '0.9';

    // Add hover effect
    runButton.onmouseover = function() {
        this.style.opacity = '1';
    };
    runButton.onmouseout = function() {
        this.style.opacity = '0.9';
    };

    var statusDiv = document.createElement('div');
    statusDiv.style.position = 'fixed';
    statusDiv.style.bottom = '10px';
    statusDiv.style.left = '10px';
    statusDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
    statusDiv.style.color = 'white';
    statusDiv.style.padding = '10px';
    statusDiv.style.borderRadius = '5px';
    statusDiv.style.zIndex = '9999';
    statusDiv.style.display = 'none'; // Hidden by default
    document.body.appendChild(statusDiv);

    if (window.__silentAudioStarted) return;
    window.__silentAudioStarted = true;

    const audio = new Audio();
    // A short silent audio file in base64 (1 second of silence)
    audio.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YRAAAAD//w==";
    audio.loop = true;
    audio.volume = 1;

    // Create indicator
    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.zIndex = '9999';
    indicator.style.display = 'flex';
    indicator.style.alignItems = 'center';
    indicator.style.fontSize = '16px';
    indicator.style.background = 'rgba(0,0,0,0.7)';
    indicator.style.color = 'white';
    indicator.style.padding = '6px 12px';
    indicator.style.borderRadius = '6px';
    indicator.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    indicator.style.display = 'none';
    indicator.innerHTML = '<span style="display:inline-block;width:12px;height:12px;background:#4CAF50;border-radius:50%;margin-right:8px;"></span>Tab alive';

    document.body.appendChild(indicator);

    // Create button
    const btn = document.createElement('button');
    btn.textContent = 'Keep Tab Alive';
    btn.style.position = 'fixed';
    btn.style.top = '50px';
    btn.style.right = '10px';
    btn.style.zIndex = '9999';
    btn.style.padding = '10px 18px';
    btn.style.background = '#2196F3';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.fontSize = '16px';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';

    btn.onclick = function() {
        audio.play().then(() => {
            indicator.style.display = 'flex';
            btn.disabled = true;
            btn.textContent = 'Tab Alive!';
            btn.style.background = '#4CAF50';
        }).catch(err => {
            alert('Please interact with the page (click or press a key) before starting.');
            console.error("Audio play failed:", err);
        });
    };

    document.body.appendChild(btn);

    runButton.onclick = async function() {
        runButton.disabled = true;
        runButton.innerText = 'Initializing...';
        statusDiv.innerText = 'Starting download...';
        statusDiv.style.display = 'block';

        // Start the silent audio loop when download begins, if not already playing
        if (audio.paused) {
            audio.play().then(() => {
                indicator.style.display = 'flex';
                btn.disabled = true;
                btn.textContent = 'Tab Alive!';
                btn.style.background = '#4CAF50';
            }).catch(err => {
                console.warn("Could not auto-play audio. Please click 'Keep Tab Alive' button if tab discarding is an issue.", err);
            });
        }


        // List of URLs to fetch
        var urls_to_fetch = [
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447301706894361150/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447301926875578942/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447302149937054270/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447302322494915134/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447302551222895166/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447302752289423934/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447302904928535102/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447311346674172478/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447311464332788286/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447311639713432126/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447311929070060094/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447855337798894142/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447312035768975934/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447403212610486809/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447403323012940313/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447403440713515545/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447403688970175001/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447404033255408153/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447404185907118617/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447404648597553689/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7449944820715356734/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7449957009929028121/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7450320543846236696/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7450670186710958616/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7451046756839604760/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7451061160939373080/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447405271594304025/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7451529940295500313/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447405452360417817/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7451621567735267864/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7451621995617206808/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7452269666870755865/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7451622232977048088/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7451622370843836952/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7451623606775202328/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7452996302574469657/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447405668888822297/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447406138955399705/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447406369537278489/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447406867388580377/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447407172872323609/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447407935690375705/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447408270458749465/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447408562503959065/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447408916142490137/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447411096631132697/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447412587974640153/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7456701401767363097/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7456778229454488089/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7457010292287865369/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7447412829864329753/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7449762038810690073/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7449762183312851481/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7455870525110223385/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458120024234918462/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458120355593323070/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458120610229535294/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458120857064309310/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458121277639770686/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458121539301409342/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458595997556408856/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458596867631219224/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7459688991902679576/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7459782859574755864/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7459783357711270424/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7459937800129872408/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7460320337763238424/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7460437960450638360/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7459938218890822168/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7459938479149957656/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7461121716987642392/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7461122484507509272/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7461122595744645656/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7461122889069101592/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7461123466494738968/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458597262113899032/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458598267111096856/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458600856699552280/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458601131736826392/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458601214826005016/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458609873509417496/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458610010466042392/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458686292331610648/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458688967190250008/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458689157452284440/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458689457282105880/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7463959009163215384/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7463961745917231640/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458689549519045144/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7464445128854225470/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7464870547583664665/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458689786589495832/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458691090581832216/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7465911648889356825/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7466017328946233881/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7466078124862603801/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7466391849507242521/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7466614939881308697/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7467062178164507160/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7467062704537092632/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7467063421477847576/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458691402126344728/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7467767134706221593/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458692910645527064/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458693376775291416/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458695429287313944/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458695563018502680/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458695955336938008/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458696362184409624/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458696475230929432/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7469306861842334233/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458697340837167640/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458697569401586200/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7469768727089644057/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7470056706844672537/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7470322361363874329/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7470432287423742489/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7458697950730928664/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7459334980452237848/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468306188417892889/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468306346576708121/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468309289854059033/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7471181581982368281/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468309753714704921/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7471444256880607769/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7471444410647970329/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7471466982760514073/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7471467195105542681/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7471467329184858649/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7472653949430940185/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7472726468456350233/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7472756665155076633/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7472756878355743257/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7472757115828847129/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7473317307335328281/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7473323912768520729/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7473324141987250713/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7473326831324643865/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7473327101483958809/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7473327239510098457/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7473327452085813785/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7473328685374784025/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468310077926015513/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7474807916319490584/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7474899110638649880/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7474902247562822168/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7474902433844445720/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7474902589163700760/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7474902936384963096/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7474903470600880664/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7475895343754789400/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7475923720712749592/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7474903681486307864/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7475555200246235672/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7476656824700109336/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7476663221865169432/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7476765658626130456/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7477023649107542552/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7477026692003807768/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7477027217784979992/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7477027402598597144/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7477028375589044760/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7477543500574097945/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468315948928205336/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478213741025165849/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468316095309414936/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478598370211136025/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478637156857037337/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478862456123556377/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478899521838121497/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478899723881955865/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478900164086743577/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478901043284165145/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478901436785361433/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478901584789766681/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478901766239568409/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478901940118618649/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478902101528035865/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478902490088342041/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478902689200341529/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7478902944033669657/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7481450696953315864/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7481450823197671960/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7481452033241793048/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7481452253350478360/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7481452521580413464/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7482694575539110462/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7482725638047007294/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468317383417938456/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7483083369903817241/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7483120139240473113/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7483120429775733273/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7483120857728959001/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468317507825173016/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7468317678675952152/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7475555458455978520/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7475556271736046104/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7475556442510983704/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7475556811471340056/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7484625728353337881/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7484836801333445145/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7485018004107837977/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7485168754960106009/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7485274854774555161/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7485358567835304473/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7485560609216414233/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7485560754733597209/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7485702542882505241/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486071250192695870/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486071544054022718/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7482726354161517118/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7482726657090929214/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486667417762939454/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486773172474233406/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486817210330006078/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486823220792803902/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486823580781527614/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486823833903579710/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7486825728021905982/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488251197841736254/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488251407754084926/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488251666815255102/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488252607828345406/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488253067867980350/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488253812918993470/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488254018356003390/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488255600908845630/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488255926458122814/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488256135208649278/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7488256430500233790/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7490893934890074686/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491110348963971646/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491110528991887934/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491110780796928574/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491110951962280510/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491111140513022526/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491111444327449150/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491111610065355326/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491111778055619134/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491111937279803966/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7491112097162478142/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7482727070666064446/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7482727227260404286/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7482727630270104126/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493360873545679422/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493456983152919102/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493814151190430270/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493814766570308158/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493814860120064574/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493814977426358846/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493815138965783102/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493815326832853566/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493815835002159678/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493816010420519486/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7493816180407271998/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495549887304434238/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495550193836769854/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495550458736411198/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495550647295541822/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495550942553588286/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495551064406508094/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495561427130778174/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495561840261333566/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495562250774659646/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495565425019716158/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495565623531946558/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495565870580630078/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495566122259857982/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495566382768063038/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495567864879923774/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495568417928249918/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495569039834481214/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495569317942002238/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495569541368382014/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7495569727410946622/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497277546975740440/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497277852312666648/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497278062862549528/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497278407856620056/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497278612651917848/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497278842541703704/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497280220139880984/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497280443570455064/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497280668305474072/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497280889571787288/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497281080812700184/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497281233118822936/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497281626490028568/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497282230885024280/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497282550612640280/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497282870377972248/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497283707531690520/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497284078027145752/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497284248743723544/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497284378255426072/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497284845656097304/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497285032059355672/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497285155216687640/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497285351451394584/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497285517558415896/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497286399855444504/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497286989251609112/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497287724584419864/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497288221642998296/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497288547901112856/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497289055776817688/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497289725233857048/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497290114964390424/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497290497442972184/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497291440339288600/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497291596317082136/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497291699329188376/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497292039218790936/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497292447643353624/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497292630112338456/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7497293413876777496/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503169676558483992/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503169844930413080/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503170371579822616/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503171117100565016/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503180437036991000/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503181399210328600/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503181548129108504/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503181708330533400/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503181866044768792/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503182468690739736/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503182635133305368/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503183440255140376/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503185805439943192/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7503186130414617112/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7509400280518099518/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7509449548289294910/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7509450478028063294/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7509453256100151870/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510045280906003006/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510045421750731326/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510045585303405118/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510051601428529726/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510051858879103550/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510052039636812350/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510052507079410238/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510052908285575742/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7511649373852271166/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7511656410078249534/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7512441395290849817/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7512441835466261017/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7511656831622595134/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7510053132622103102/",
            "https://sangtacviet.vip/truyen/fanqie/1/7447300816429403161/7513471679570395673/"
        ];

        var successfulInitialResponses = []; // Responses from first successful fetches
        var initialFailedUrls = [];        // URLs that failed during the initial attempt
        var retriedResponses = [];         // Responses from URLs that succeeded on retry
        var finalFailedUrls = [];          // URLs that failed even after retry

        var totalUrls = urls_to_fetch.length;

        function updateStatus(message) {
            statusDiv.innerText = message;
        }

        // Modified sendRequest to return the response directly or reject,
        // and take an optional 'isRetry' flag for logging purposes.
        function sendRequest(url, index, isRetry = false) {
            return new Promise((resolve, reject) => {
                var parts = url.split('/');
                var chapterId = parts[parts.length - 2]; // Get the chapter ID

                const requestUrl = 'https://sangtacviet.vip/index.php';
                const postData = new URLSearchParams({
                    bookid: '7447300816429403161',
                    h: 'fanqie',
                    c: chapterId,
                    ngmar: 'readc',
                    sajax: 'readchapter',
                    sty: '1',
                    exts: ''
                }).toString();

                var xhttp = new XMLHttpRequest();

                // Define headers (unchanged)
                const headers = {
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'vi',
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Origin': 'https://sangtacviet.vip',
                    'Referer': url,
                    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
                };

                var successIndicator = '"code":"0"';

                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState === 4) {
                        const logPrefix = isRetry ? `[Retry ${index + 1}/${initialFailedUrls.length}]` : `[${index + 1}/${totalUrls}]`;
                        if (xhttp.status === 200 && xhttp.responseText.includes(successIndicator)) {
                            console.log(`${logPrefix} Successfully fetched: ${url}`);
                            resolve(xhttp.responseText);
                        } else {
                            console.error(`${logPrefix} Failed to fetch ${url}. Status: ${xhttp.status}. Response: ${xhttp.responseText.substring(0, 200)}...`);
                            reject(new Error(`Request failed for ${url} with status ${xhttp.status}`));
                        }
                    }
                };

                xhttp.open('POST', requestUrl, true);
                xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhttp.send(postData);
            });
        }

        // Helper function to save text to a file
        function saveTextToFile(content, filename) {
            if (content.length === 0) {
                console.log(`No content to save for ${filename}.`);
                return;
            }
            var combinedContent = Array.isArray(content) ? content.join('\n\n') : content; // Join if array, else use as is
            var blob = new Blob([combinedContent], { type: "text/plain;charset=utf-8" });
            var url_txt = window.URL.createObjectURL(blob);

            var link = document.createElement("a");
            link.href = url_txt;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url_txt);
            console.log(`${filename} saved.`);
        }

        // --- Main download process ---

        // 1. Initial download attempt
        for (var i = 0; i < totalUrls; i++) {
            updateStatus(`Downloading chapter ${i + 1} of ${totalUrls}...`);
            try {
                const response = await sendRequest(urls_to_fetch[i], i, false);
                successfulInitialResponses.push(response);
            } catch (error) {
                initialFailedUrls.push(urls_to_fetch[i]);
            }
            await new Promise(resolve => setTimeout(resolve, 10000)); // Delay for initial requests
        }

        updateStatus(`Initial download complete. Found ${initialFailedUrls.length} failed URLs. Starting retries...`);

        // 2. Retry failed URLs
        if (initialFailedUrls.length > 0) {
            let retryCount = 0;
            const totalRetries = initialFailedUrls.length;
            for (const urlToRetry of initialFailedUrls) {
                retryCount++;
                updateStatus(`Retrying failed URL ${retryCount} of ${totalRetries}...`);
                try {
                    const response = await sendRequest(urlToRetry, retryCount - 1, true); // Pass true for isRetry
                    retriedResponses.push(response);
                } catch (error) {
                    finalFailedUrls.push(urlToRetry); // This URL failed even after retry
                }
                await new Promise(resolve => setTimeout(resolve, 5000)); // Shorter delay for retries
            }
        }

        updateStatus('All requests and retries completed. Saving files...');

        // 3. Save results
        saveTextToFile(successfulInitialResponses, "combined_responses.txt");
        saveTextToFile(retriedResponses, "combine_failed_response.txt");
        saveTextToFile(finalFailedUrls.join('\n'), "failed_urls.txt"); // Save list of URLs that failed twice

        // --- Final UI update ---
        runButton.disabled = false;
        runButton.innerText = 'Download Complete!';
        updateStatus('Download complete! Check your downloads folder.');
        setTimeout(() => {
            statusDiv.style.display = 'none'; // Hide status after a few seconds
        }, 8000);

        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang? Quá trình tải có thể bị mất.';
        });
    };

    // Add the button to the webpage
    document.body.appendChild(runButton);

})();