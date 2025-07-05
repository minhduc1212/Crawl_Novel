// ==UserScript==
// @name         STV DLD
// @namespace    https://your-namespace.com
// @version      1.2
// @description  Script to send a request and get the response without causing page refresh issues, prevents tab discarding.
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
    // Call the function to keep the tab active

    runButton.onclick = async function() {
        runButton.disabled = true;
        runButton.innerText = 'Initializing...';
        statusDiv.innerText = 'Starting download...';
        statusDiv.style.display = 'block';

        // Start the silent audio loop when download begins

        var urls_to_fetch =[
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197668296160707107/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197668482564457018/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197668980025197114/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197669144865702459/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197669475636740619/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197669736606335525/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197670079612666423/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197670320306979328/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197670633424208445/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7197670839641342525/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7199491129681969703/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7199491313668981263/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7199491745518879247/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7199491946576871991/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7199492467606225465/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7199492714315186743/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7199822339318645260/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7199822808762253862/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7200199730956075580/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7200199947507991052/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7200634381038420514/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7200634603927765538/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7201023922513543692/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7201024066902458937/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202069024610452000/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202104986669417000/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202159882194453048/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202239705679823375/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202257504007356986/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202450509930856963/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202478490371916321/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202569102999847436/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202792268879790632/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202817083766374952/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202864456194327055/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7202887755607900710/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7203187539048399398/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7203230107014693432/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7203280474133922362/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7203307663789130251/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7203564342318072376/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7203604974092648997/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7204032913594122790/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7204033053386244668/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7204444769756545540/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7204444928263979520/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7204748432081486375/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7204748970994696715/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7205101712166617604/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7205102006783083047/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7205492715855806980/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7205493150692049469/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7205852642416230971/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7205853013209317891/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7206223801804128827/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7206224143400829497/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7206674354133074469/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7206674622707106342/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7207042139614609976/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7207042759973470778/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7207336801248379424/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7207337040625533472/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7207782083962503713/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7207782201776308736/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7208078533514986016/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7208078917931008515/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7208153845132853794/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7208498647309550132/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7208498883863773696/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7208821137164861987/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7208821413438816823/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7209185314265694777/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7209185561956287033/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7209592170456875576/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7209592456919286332/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7209959063545872952/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7209959293284680252/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7210392302861320736/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7210393657784926755/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7210708758144811560/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7210708950084223525/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7211071048605925888/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7211071456884163127/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7211444638337466891/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7211444883674890807/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7211830951587152444/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7211831117065028129/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7212246854086427195/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7212247146441998906/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7212648225893941795/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7212648439102833152/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7212945079512924733/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7212945339840463416/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7213288285668377121/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7213288611800842812/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7213631252170179133/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7213631528062943800/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7214062065961402937/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7214062199503847968/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7214062445252313611/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7214404380273934882/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7214404585287320097/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7214830312956953121/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7214830481911579194/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7215127736103371319/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7215128034146255415/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7215496218078937658/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7215496533519630909/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7215925469219619340/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7215925848656839203/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7216279645115646503/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7216279826859688452/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7216682351500362296/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7216682641888641547/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7217023087416443427/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7217023325317366309/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7217431164208808506/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7217431398515212838/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7217732139465310735/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7217732852770439740/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7218126934977610298/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7218127244517245499/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7218515396876304907/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7218515618885337600/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7218875366138610237/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7218875579435581955/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7219265287227769379/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7219265501988553276/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7219625060120658464/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7219625387028906500/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7220038521732465186/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7220038845872964111/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7220388333447283258/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7220388727376314917/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7220778087158383162/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7220778299881062970/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7221161747237831171/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7221162106308330042/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7221560722877219384/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7221561627299021352/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7221864763029258810/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7221865047503405626/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7222216620054643252/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7222216788937966092/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7222645341567484455/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7222645550783398440/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7222963366686523938/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7222963627962139168/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7223368270710374946/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7223368594451595788/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7223760419516023333/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7223760841282159165/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7224133269875327488/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7224133573807342120/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7224487751939424803/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7224487965475799586/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7224837797641716239/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7224838047454626338/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7225186949366186529/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7225187199850185248/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7225532029570548285/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7225532317509353984/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7225897838230798909/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7225898056158446139/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7226279784123204096/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7226280038298354213/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7226718169363120643/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7226720390385500732/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7227044210317361668/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7227044444250636835/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7227469899755913788/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7227470304644334080/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7227867390518755877/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7227867600095707686/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7228194413389251131/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7228194634500211200/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7228895208740815392/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7228895356434678324/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7229344140876579360/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7229344318342103587/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7229656437209694778/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7229656736922075648/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7229994376930755128/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7229994578495930883/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7230394152888992311/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7230394366496342586/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7230787931345322554/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7230788188309029391/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7231114317528039939/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7231114691312321085/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7231567454932533818/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7231567781848842813/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7231829128197079586/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7231829389305086525/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7232302099940409867/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7232302299388117564/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7232684789088649740/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7232684952612143650/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7233058597368758822/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7233058858129129984/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7233426148783456772/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7233426448084632079/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7233804111454896680/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7233804479005950503/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7234167865983631904/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7234168299993924111/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7234536881860542988/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7234537055189991975/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7234917533474619936/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7234917858222965251/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7235274184031633932/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7235274489322603065/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7235647884366971407/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7235648200424555048/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7235937427800457783/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7235937646369997324/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7236397070700315188/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7236397455372190260/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7236679005548577319/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7236679327843418681/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7237127802087178792/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7237128112046408192/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7237504367983591995/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7237504587367318053/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7237884494164787751/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7237884872285815333/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7238256451893461519/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7238257078723150339/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7238555819141562891/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7238556484232512058/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7238973508456284731/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7238973802476995075/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7239362679318512162/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7239362904514888230/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7239738943464276495/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7239739338509156864/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7240080051143148089/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7240080204126028346/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7240402790617776701/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7240403329858142759/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7240831758126547513/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7240832011693359649/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7241153698373173817/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7241154130679431739/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7241502315797021199/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7241502984420065848/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7241899598183301667/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7241900010718429756/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7242320851004195365/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7242321183415206439/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7242707559100973568/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7242707789015941669/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7243027358192501305/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7243028028215788067/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7243436958733566468/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7243437165315621428/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7243826512531554854/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7243826721235927592/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7244167732151714366/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7244168281567789630/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7244557232225190458/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7244557576627552826/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7245271481058656828/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7245272254584619558/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7245634401198375456/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7245634664638087739/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7245984902464668175/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7245985074393383439/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7246304414800675386/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7246304824378327556/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7246794381011878460/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7246794728291697189/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7247141182709432890/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7247141337798017571/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7247472007556792843/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7247472424395112992/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7247541523259064864/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7247542019327951421/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7248239849432416825/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7248240027824882232/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7248627706903527976/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7248627906468184613/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7248999275819401788/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7248999417595265593/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7249316660811678270/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7249316933437227582/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7249747408387572259/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7249747801708593701/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7250091858871714307/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7250092088656658947/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7250462744024416828/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7250463148678119997/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7250836912733487656/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7250837072398221881/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7251183041601765949/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7251183479323361795/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7251589229325746748/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7251589992559378983/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7252302003655836200/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7252302250553868859/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7252710905044009507/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7252711085974028860/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7253074597258789387/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7253074915711320635/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7253475979711283768/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7253476355138912800/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7253828096938705448/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7253828468310278696/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7254595494297797152/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7254927298469003832/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7255330380495258169/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7255330565267259963/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7255699661430882852/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7255699963026670117/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7256067278771651087/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7256067554865742370/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7256443219172000297/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7256446684341731895/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7256801269216444947/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7256801654803169850/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7257185485095698984/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7257185693779100200/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7257555526593839677/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7257869039820046888/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7257869564992881209/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7258671663032730175/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7258683182323597883/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7259054938561610259/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7261264723520422460/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7261265004974834233/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7261599483757888019/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7261599694907376169/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7261982268775006739/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7261982500925375017/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7262354467075392036/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7262354611087147583/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7262714578000151079/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7262714743465443876/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7263059882763354678/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7263060936448016915/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7263105781254816295/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7263106100738654759/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7263779992515904011/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7263780255037555254/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7264217709171343913/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7264218320390324799/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7264581252698210852/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7264581452338364967/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7264921041418322495/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7264922329191285259/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7265639487462605331/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7265639657110274623/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7265976168334459404/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7265976394281124391/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7266397619440747047/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7266397925675434537/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7266750737500078611/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7266750876218458665/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7267078929373430326/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7267079221632041526/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7267578911746163262/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7267579028528185918/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7267928235143496255/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7267928430732116491/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7268281508249469479/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7268281846881124876/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7268571947318182436/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7268572170945724939/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7268973479955956236/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7268973648847831593/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7269426960630186533/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7269427076661412412/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7269792014135362084/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7269792221350593036/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7270161655466885668/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7270161865358082623/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7270546971427881534/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7270547128248713790/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7270909399160324619/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7270909720218010131/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7271287952058253864/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7271288187660534287/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7271660433793417768/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7271660862325293602/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7271980086528737833/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7271980326581174795/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7272313745479729700/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7272313902761771556/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7272695065213370943/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7272695216187179561/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7273111022615921204/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7273111677778788926/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7273437029319639587/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7273437305048662543/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7273792460357108239/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7273792616964031016/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7274183577879708195/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7274183769429705256/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7274888559297987112/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7274888762616873507/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7275329033254994466/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7275329459446612514/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7275724311204528640/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7275724450853716480/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7276094956471599678/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7276095074457371198/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7276460610907275776/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7276461034259350031/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7276846679540793891/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7276846807450124835/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7277227144843887104/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7277227273487385122/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7277592030619009573/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7277592364250563131/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7277958649908036158/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7277959157955707454/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7278316570114277950/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7278316820208026174/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7278668725727806014/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7278669093341774398/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7279049072479371810/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7279049679533408768/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7279426547390513704/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7279426931324518952/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7279820218866598415/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7279820409103450664/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7280209059368665662/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7280924760186618423/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7280925011181830714/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7282793126581043771/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7282793297423761976/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7284275763615007271/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7284656799439929918/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7286726384657908286/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7286726635930255934/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7289461935861416510/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7289463078867976766/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7289841735004324408/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7290213127323386408/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7290213374942675490/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7290497652284883519/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7290498327529914892/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7291310437524734464/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7291310819655025192/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7291682132068401698/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7291682321667719720/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7292434110335681076/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7292434457016041984/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7292807542277685822/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7292807802748142142/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7293166899142066728/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7293167869532537378/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7293530195066421760/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7293530338213823016/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7293920187877687871/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7293920478899634699/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7294294439160349247/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7294294597331911207/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7294667897816023602/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7294668099125674522/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7295035092894745107/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7295035295177802303/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7295401690813956643/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7295401949136945664/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7295757607799620158/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7295758504969634366/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7296146812241609227/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7299119568188867134/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7299119943633601086/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7299491477980185150/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7299491822806499902/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7299860939795350078/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7299861429924938302/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7300234178069529150/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7300234455543726654/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7300590134351643198/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7300590382281146942/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7300936846362559038/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7300936976012689982/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7301296118908846632/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7301296270717485603/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7301632561996890686/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7301632908463194686/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7301962916008297000/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7301963613353607680/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7302390921201779235/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7302391081562767887/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7302830347211768382/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7302830571443454526/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7303167478799172137/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7303167849986523687/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7303558150211240460/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7303558286148633124/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7303945252149297690/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7303945364699578918/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7304311682354922046/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7304329301418050110/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7304686380586631690/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7304708087838376458/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7305054813572579902/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7305072806348210750/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7305423568135782974/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7305424156475015742/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7305800557510279742/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7305800945068163646/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7306163098174358078/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7306163392610304574/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7306881556142883390/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7306881816164565566/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7306913885972349502/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7307265847058252350/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7307266917796938302/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7307267138811609662/",
    "https://sangtacviet.vip/truyen/fanqie/1/7197644196444900409/7308191355711750706/"
];

        var responses = [];
        var failedUrls = [];
        var totalUrls = urls_to_fetch.length;

        function updateStatus(message) {
            statusDiv.innerText = message;
        }

        function sendRequest(url, index) {
            return new Promise((resolve, reject) => {
                var parts = url.split('/');
                var chapterId = parts[parts.length - 2]; // Get the chapter ID (e.g., 7303349912383521321)

                // The actual endpoint for the POST request
                const requestUrl = 'https://sangtacviet.vip/index.php';

                // Parameters to be sent in the POST body (form-urlencoded)
                const postData = new URLSearchParams({
                    bookid: '7197644196444900409', // This seems constant for the book
                    h: 'fanqie',
                    c: chapterId,
                    ngmar: 'readc',
                    sajax: 'readchapter',
                    sty: '1',
                    exts: ''
                }).toString();

                var xhttp = new XMLHttpRequest();

                // Define headers
                const headers = {
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'vi',
                    'Content-type': 'application/x-www-form-urlencoded', // Crucial for POST data
                    'Origin': 'https://sangtacviet.vip',
                    'Referer': url, // Referer should be the chapter page URL
                    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
                };

                var successIndicator = '"code":"0"'; // Server response indicating success

                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState === 4) {
                        if (xhttp.status === 200 && xhttp.responseText.includes(successIndicator)) {
                            console.log(`[${index + 1}/${totalUrls}] Successfully fetched: ${url}`);
                            responses.push(xhttp.responseText);
                            resolve(xhttp.responseText);
                        } else {
                            console.error(`[${index + 1}/${totalUrls}] Failed to fetch ${url}. Status: ${xhttp.status}. Response: ${xhttp.responseText.substring(0, 200)}...`);
                            failedUrls.push(url);
                            reject(new Error(`Request failed for ${url} with status ${xhttp.status}`));
                        }
                    }
                };

                xhttp.open('POST', requestUrl, true);
                xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhttp.send(postData); // Send the form-urlencoded data as the POST body
            });
        }

        function saveResponses() {
            if (responses.length === 0) {
                console.log("No responses to save.");
                return;
            }
            var combinedResponse = responses.join('\n\n'); // Combine all responses with a double newline for readability
            var blob = new Blob([combinedResponse], { type: "text/plain" });
            var url_txt = window.URL.createObjectURL(blob);

            var link = document.createElement("a");
            link.href = url_txt;
            link.download = "combined_responses.txt";
            document.body.appendChild(link); // Append to body to make it clickable
            link.click();
            document.body.removeChild(link); // Clean up
            window.URL.revokeObjectURL(url_txt);
            console.log("Combined responses saved to combined_responses.txt");
        }

        function saveFailedUrls() {
            if (failedUrls.length === 0) {
                console.log("No failed URLs.");
                return;
            }
            var combinedFailedUrls = failedUrls.join('\n');

            var blob = new Blob([combinedFailedUrls], { type: "text/plain;charset=utf-8" });
            var url_txt = window.URL.createObjectURL(blob);

            var link = document.createElement("a");
            link.href = url_txt;
            link.download = "failed_urls.txt";
            document.body.appendChild(link); // Append to body to make it clickable
            link.click();
            document.body.removeChild(link); // Clean up
            window.URL.revokeObjectURL(url_txt);
            console.log("Failed URLs saved to failed_urls.txt");
        }

        // Send the requests one by one
        for (var i = 0; i < totalUrls; i++) {
            updateStatus(`Downloading chapter ${i + 1} of ${totalUrls}...`);
            try {
                await sendRequest(urls_to_fetch[i], i);
                // Wait for 1.5 seconds before the next request to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 10000));
            } catch (error) {
                console.error(`Overall error for URL ${urls_to_fetch[i]}:`, error);
                console.log(`Retrying URL ${urls_to_fetch[i]}...`);
                // Optionally, add a longer delay after a failed request before retrying or moving on
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
        }

        updateStatus('All requests completed. Saving files...');

        // Save the responses after all requests are done
        saveResponses();

        // Save the failed URLs after all requests are done
        saveFailedUrls();

        // Change the button state and text
        runButton.disabled = false;
        runButton.innerText = 'Download Complete!';
        updateStatus('Download complete!');
        setTimeout(() => {
            statusDiv.style.display = 'none'; // Hide status after a few seconds
        }, 5000);

        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang? Quá trình tải có thể bị mất.';
        });
    };

    // Add the button to the webpage
    document.body.appendChild(runButton);
    
    
})();