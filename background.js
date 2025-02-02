chrome.tabs.executeScript({
  allFrames: true,
  file: "disable-js.js"
});
let appliedCompanies = [];
chrome.storage.local.get(["appliedCompanies"], (result) => {
  appliedCompanies = result.appliedCompanies || [];
});
// 메시지 리스너 추가
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveData") {
      if (!appliedCompanies.includes(request.company)) {        
          appliedCompanies.push(request.company);
          console.log(appliedCompanies);
          chrome.storage.local.set({ appliedCompanies });
      }
      sendResponse({ success: true });
  } 
  else if (request.action === "checkData") {            
      sendResponse({ exists: appliedCompanies.includes(request.company) });
  }
  return true;  // 비동기 응답을 위해 true 반환
});

