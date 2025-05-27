// ==UserScript==
// @name         Keep Tab Alive with Silent Audio
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prevent Chrome from suspending tab by playing infinite silent audio with speaker icon
// @author       You
// @match        https://sangtacviet.vip/truyen/fanqie/*/*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Prevent multiple instances
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
})();