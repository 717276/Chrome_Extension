chrome.scripting.executeScript({
    target: { allFrames: true },
    files: ["disable-js.js"]
  });