function I(i) {
    return document.getElementById(i);
  }
  
  var s = new Speedtest();
  
  var meterBk = /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
    ? "#EAEAEA"
    : "#80808040";
  var dlColor = "#000000",
    ulColor = "#8E8E8E",
    miscColor = "#18C9E1";
  var progColor = meterBk;
  
  function drawMeter(c, amount, bk, fg, progress, prog) {
    var ctx = c.getContext("2d");
    var dp = window.devicePixelRatio || 1;
    var cw = c.clientWidth * dp,
      ch = c.clientHeight * dp;
    var sizScale = ch * 0.0055;
    if (c.width == cw && c.height == ch) {
      ctx.clearRect(0, 0, cw, ch);
    } else {
      c.width = cw;
      c.height = ch;
    }
    ctx.beginPath();
    ctx.strokeStyle = bk;
    ctx.lineWidth = 12 * sizScale;
    ctx.arc(
      c.width / 2,
      c.height - 58 * sizScale,
      c.height / 1.8 - ctx.lineWidth,
      -Math.PI * 1.1,
      Math.PI * 0.1
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = fg;
    ctx.lineWidth = 12 * sizScale;
    ctx.arc(
      c.width / 2,
      c.height - 58 * sizScale,
      c.height / 1.8 - ctx.lineWidth,
      -Math.PI * 1.1,
      amount * Math.PI * 1.2 - Math.PI * 1.1
    );
    ctx.stroke();
    if (typeof progress !== "undefined") {
      ctx.fillStyle = prog;
      ctx.fillRect(
        c.width * 0.3,
        c.height - 16 * sizScale,
        c.width * 0.4 * progress,
        4 * sizScale
      );
    }
  }
  
  function mbpsToAmount(s) {
    return 1 - 1 / Math.pow(1.3, Math.sqrt(s));
  }
  
  function format(d) {
    d = Number(d);
    if (d < 10) return d.toFixed(2);
    if (d < 100) return d.toFixed(1);
    return d.toFixed(0);
  }
  
  var uiData = null;
  function startStop() {
    if (s.getState() == 3) {
      //speedtest is running, abort
      s.abort();
      data = null;
      I("startStopBtn").classList.remove("running");
      I("startStopBtn").textContent = "запустить";
      initUI();
    } else {
      //test is not running, begin
      I("startStopBtn").classList.add("running");
      I("startStopBtn").textContent = "остановить";
      s.onupdate = function (data) {
        uiData = data;
      };
      s.onend = function (aborted) {
        I("startStopBtn").classList.remove("running");
        I("startStopBtn").textContent = "запустить";
        updateUI(true);
      };
      s.start();
    }
  }
  
  function updateUI(forced) {
    if (!forced && s.getState() != 3) return;
    if (uiData == null) return;
    var status = uiData.testState;
    I("dlText").textContent =
      status == 1 && uiData.dlStatus == 0 ? "..." : format(uiData.dlStatus);
    drawMeter(
      I("dlMeter"),
      mbpsToAmount(Number(uiData.dlStatus * (status == 1 ? oscillate() : 1))),
      meterBk,
      dlColor,
      Number(uiData.dlProgress),
      progColor
    );
    I("ulText").textContent =
      status == 3 && uiData.ulStatus == 0 ? "..." : format(uiData.ulStatus);
    drawMeter(
      I("ulMeter"),
      mbpsToAmount(Number(uiData.ulStatus * (status == 3 ? oscillate() : 1))),
      meterBk,
      ulColor,
      Number(uiData.ulProgress),
      progColor
    );
    drawMeter(
      I("pingMeter"),
      mbpsToAmount(Number(uiData.pingStatus * (status == 3 ? oscillate() : 1))),
      meterBk,
      miscColor,
      Number(uiData.pingProgress),
      progColor
    );
    drawMeter(
      I("jitMeter"),
      mbpsToAmount(Number(uiData.jitterStatus * (status == 3 ? oscillate() : 1))),
      meterBk,
      miscColor,
      Number(uiData.pingProgress),
      progColor
    );
    I("pingText").textContent = format(uiData.pingStatus);
    I("jitText").textContent = format(uiData.jitterStatus);
  }
  
  function oscillate() {
    return 1 + 0.02 * Math.sin(Date.now() / 100);
  }
  
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, element) {
      setTimeout(callback, 1000 / 60);
    };
  
  function frame() {
    requestAnimationFrame(frame);
    updateUI();
  }
  
  frame();
  
  function initUI() {
    drawMeter(I("dlMeter"), 0, meterBk, dlColor, 0);
    drawMeter(I("ulMeter"), 0, meterBk, ulColor, 0);
    drawMeter(I("pingMeter"), 0, meterBk, miscColor, 0);
    drawMeter(I("jitMeter"), 0, meterBk, miscColor, 0);
  }
  
  const files = {
    dlURL: "speedtest/garbage",
    ulURL: "speedtest/empty",
    pingURL: "speedtest/empty",
    getIpURL: "info",
  };
  
  window.servers = [
    {
      name: "msk",
      server: "https://msk.lg.aeza.net/",
      ...files,
    },
    {
      name: "at",
      server: "https://at.lg.aeza.net/",
      ...files,
    },
    {
      name: "de",
      server: "https://de.lg.aeza.net/",
      ...files,
    },
  ];
  
  window.onload = function () {
    s.addTestPoints(window.servers);
  
    s.setSelectedServer(window.servers[0]);
  };
  