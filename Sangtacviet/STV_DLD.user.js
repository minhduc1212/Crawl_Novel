// ==UserScript==
// @name         STV DLD
// @namespace    https://your-namespace.com
// @version      1.0
// @description  Script to send a request and get the response
// @match        https://sangtacviet.vip/truyen/fanqie/1/7144984768625511460/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var runButton = document.createElement('button');
    runButton.innerText = 'Download';
    runButton.style.position = 'fixed';
    runButton.style.top = '50%';
    runButton.style.right = '10px';
    runButton.style.transform = 'translateY(-50%)';
    runButton.onclick = function() {
         var urls = [
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7356964470213919294/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7356964670806180414/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7356964773033935422/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7356964901706809918/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7356965158117196350/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7356965323431477822/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357717809570267672/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357718186042606104/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357718419493356056/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357718556601303576/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357718930799985176/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357719120638378520/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357719284530807320/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357719501724467736/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357719742997594648/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357719991283614232/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357720175480685080/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357720366321517080/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357720520567030296/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357720926617616920/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357721178510737944/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357721444802904600/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357721627997504024/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7357721752010490392/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7359591656485569049/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7359591882998956569/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7359592055347102233/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7360208992594838078/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7360209210170163774/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7360209347596517950/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7360709525428503065/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7360709929088320025/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7360712395171316249/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361080794980287038/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361081385806725694/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361081538273870398/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361470602537861694/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361470792955085374/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361470925071450686/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361969886764991001/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361970089299542553/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361970231918461465/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7361973839598715417/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362193441519829528/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362193635732881944/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362193831074218520/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362378828808733208/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362544843446288920/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362545009326834200/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362545197663650328/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362545361581244952/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362545578166714904/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362546058141909528/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362546182360416792/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362546364212855320/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362546535831192088/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362546683378401816/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362546908570599960/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362547058634392088/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362547261701636632/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7362547399845216792/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7363991953987338776/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7363992164071653912/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7363992448512557592/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7364384735260312088/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7364384990869602840/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7364385184008897048/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7364385395766723096/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7364385656262361624/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7364385965059621400/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7364759351849927192/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365338134168486424/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365338422174564888/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365338570334159384/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365338773967618584/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365338955304141336/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365784360949137945/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365784684610994713/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365784954497679897/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365785110223798809/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365785529041814041/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7365785771539710489/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367022501328585240/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367022710670492184/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367022836428325400/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367381021337076249/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367381341769302553/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367381519477768729/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367785884407562814/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367786088892482110/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7367786202637812286/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368115479187046974/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368115750118113854/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368115858738004542/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368511788712739353/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368512001250705945/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368512149812937241/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368876776606417432/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368877062364348952/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7368877223027163672/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7369409712132997657/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7369409901904282137/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7369410004773782041/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7369620655282586174/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7369620903971258942/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7369625507769369150/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370014408510030398/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370014773011825214/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370015241721102910/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370381751127900734/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370381916668691006/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370382258219254334/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370736068481516094/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370736371327058494/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7370736650529292862/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371082950705676862/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371083261801415230/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371083387039121982/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371482650810253848/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371482982151881240/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371483094148203032/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371854080978715161/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371854277020484121/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7371854420595704345/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372200838384599577/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372201036569641497/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372201272700584473/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372578391578395161/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372578635552653849/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372578859432034841/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372918169985352254/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372918433127612990/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7372918586303595070/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7373465170007294526/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7373465342007329342/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7373465594005291582/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7373465738473898558/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7373689796700422680/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7373690077311943192/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7373690208925008408/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374051198489346585/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374051396221403673/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374051567701344793/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374051730641650201/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374051898237665817/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374052136369275417/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374052306171462169/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374052435305693721/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7374052544995131929/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375161543681393176/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375161732899013144/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375161892123197976/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375674087433060888/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375674301267051032/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375674423661036056/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375908570954465816/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375908833257849368/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7375909001319432728/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7376277091307766296/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7376277447039255064/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7376277667118580248/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7376554369963000382/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7376554851284550206/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7376555162703249982/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377021131124916761/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377021758194336281/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377022280053834265/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377024426237231641/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377024757998305817/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377025430458466841/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377026170367263257/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377026663109902873/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7377026901241496089/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378131880870167064/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378132342029681176/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378132524326715928/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378132660415103512/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378132812840305176/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378133087856640536/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378861347750035992/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378861541526880792/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7378861701594104344/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379236769012646462/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379237040660939326/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379237210505101886/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379616552062026302/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379616691904332350/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379616903284671038/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379998612136149529/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379999259707327001/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7379999417568346649/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380351476784185881/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380351718665503257/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380351905278460441/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380352138901193241/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380352395936547353/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380352652019761689/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380352841543582233/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380353021374366233/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380353159073382937/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380353478452855321/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380353767943717401/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380353914442351129/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380354114938470937/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380354268483568153/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380354410590765593/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380354705572315710/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380354815643091518/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380355084984533566/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380355324407988798/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380355617942159934/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7380355760913383998/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7382957815544955417/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7382958313836659225/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7382958433126842905/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7383463823618884120/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7383464010714202648/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7383464167199474200/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7383700113148871192/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7383700319185666584/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7383700436454212120/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384075797679587902/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384076088072225342/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384076256297353790/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384427311967257150/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384427555073311294/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384427794832310846/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384845209558860312/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384845423065711128/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384845585871798808/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7384998659240247833/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7385338687988433432/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7385338840086495768/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7385713233866261017/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7385713464699781657/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7385713589237056025/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7385926370804630041/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7385926531043820057/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7385926659125297689/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7386249146807632409/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7386249454459814425/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7386249794974384665/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7386672565827142206/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7386672723134530110/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7386672939367678526/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387058998043755032/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387059470955725336/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387059752875852312/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387059982463681048/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387060116677214744/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387060402774868504/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387060707788866072/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387060916514210328/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387061110337176088/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387061387186422296/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387061765101601304/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387062013886726680/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387062511851291160/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387062733738344984/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387062901657305624/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387063342331855384/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387063680258540056/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387064410197459480/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387064655752987160/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387064784979493400/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387064934024102424/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387065213226336792/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387065557914223128/",
            "https://sangtacviet.vip/truyen/fanqie/1/7158752613117201419/7387066203522482712/"
        ]

    var responses = [];

    function sendRequest(url) {
        var parts = url.split('/');
        var lastPart = parts[parts.length - 2]; // -2 because the URL ends with a '/', so the last element is an empty string
        var url_content = 'https://sangtacviet.vip/index.php?bookid=7144984768625511460&h=fanqie&c=' + lastPart + '&ngmar=readc&sajax=readchapter&sty=1&exts=';

        var xhttp = new XMLHttpRequest();
        var payload = {
            initiator: 'https://sangtacviet.vip',
            method: 'POST',
            url: url_content,
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

        var queryString = Object.keys(payload).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
        }).join('&');

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                console.log('Response of url', url);
                responses.push(xhttp.responseText);

                if (responses.length === urls.length) {
                    saveResponses();
                }
            }
        };

        xhttp.open(payload.method, payload.url, true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send(queryString);
    }

    function saveResponses() {
        var combinedResponse = responses.join('\n\n');

        var blob = new Blob([combinedResponse], { type: "text/plain" });
        var url_txt = window.URL.createObjectURL(blob);

        var link = document.createElement("a");
        link.href = url_txt;
        link.download = "combined_responses.txt";
        link.click();

        window.URL.revokeObjectURL(url_txt);
    }

    // Gửi các yêu cầu
        for (var i = 0; i < urls.length; i++) {
            sendRequest(urls[i]);
        }

        // Thay đổi trạng thái và văn bản của nút
        runButton.disabled = true;
        runButton.innerText = 'Downloading...';
    };

    // Thêm nút vào trang web
    document.body.appendChild(runButton);
})();