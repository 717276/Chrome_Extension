document.addEventListener('DOMContentLoaded', function () {
    const adText = document.querySelector('.ad');
    
    // 텍스트 클릭 시 실행될 함수
    adText.addEventListener('click', function () {
        // content script로 데이터를 요청하는 메시지 보내기
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getData' });
        });
    });
});