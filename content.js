let url = window.location.href;
    url = url.replace(/^https?:\/\/www./, "");  
    url = url.replace(/\.co.*/, "");
let companyText = null;
window.onload = () => {
    if (url === "jobkorea") {            
        const btn = document.querySelector('.tplBtn_1');
        const company = document.querySelector('.coName');
        if (company) {
            companyText = company.textContent.trim();
            companyText = companyText.replace(/\(주\)|㈜/g, "");   
            console.log(companyText);
            
            // 비동기 처리 후 checkCompany 실행
            checkCompany(companyText).then(isValid => {                
            }).catch(err => {
                console.error("Error in checkCompany: ", err);
            });
        }
        
        btn.addEventListener('click', () => {        
            if (companyText) {            
                saveCompany(companyText);
            }
        });
    } else if (url === "saramin") {                
        waitForCompany().then(company => {
            companyText = company.innerText.trim();
            companyText = companyText.replace(/\(주\)|㈜/g, "");              
            console.log(companyText);

            // 비동기 처리 후 checkCompany 실행
            checkCompany(companyText).then(isValid => {                
            }).catch(err => {
                console.error("Error in checkCompany: ", err);
            });
        });

        let btn = document.querySelector('.sri_btn_lg');
        btn.addEventListener('click', () => {           
            if (companyText) {                           
                saveCompany(companyText);
            } 
        });      
    }
};
function waitForCompany() {
    return new Promise((resolve) => {
        let company = document.querySelector('.company');
        resolve(company);
    });
}
function saveCompany(companyName) {
    chrome.runtime.sendMessage({ action: "saveData", company: companyName }, (response) => {
        if (response.success) {
            alert("데이터 저장");
        }
    });
}

// function checkCompany(companyName) {    
//     chrome.runtime.sendMessage({ action: "checkData", company: companyName }, (response) => {        
//         if (response.exists) {            
//             alert("이미 지원한 회사입니다.");
//             return false;
//         } else {            
//             alert("미지원 회사입니다.");
//             return true;
//         }
//     });
// }
// checkCompany 함수는 Promise를 반환해야 함
function checkCompany(companyName) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "checkData", company: companyName }, (response) => {
            if (response.exists) {
                alert("이미 지원한 회사입니다.");
                resolve(false);  // 지원한 회사일 경우 false 반환
            } else {
                alert("미지원 회사입니다.");
                resolve(true);  // 미지원 회사일 경우 true 반환
            }
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if (request.action === 'getData'){
        if (url==="jobkorea"){            
            const btn = document.querySelector('.tplBtn_1');
            const company = document.querySelector('.coName');
            if (company) {
                companyText = company.textContent.trim();            
                companyText = companyText.replace(/\(주\)|㈜/g, "");   
                console.log(companyText);           
                
                checkCompany(companyText).then(isValid=>{
                    if (isValid){
                        saveCompany(companyText);
                    }
                }).catch(err => {
                    console.error("Error in checkCompany: ", err);
                });
            }            
        }else if(url === "saramin"){                
            waitForCompany().then(company => {
                companyText = company.innerText.trim();            
                companyText = companyText.replace(/\(주\)|㈜/g, "");              
                console.log(companyText);          
                checkCompany(companyText).then(isValid=>{
                    if (isValid){
                        saveCompany(companyText);
                    }
                }).catch(err => {
                    console.error("Error in checkCompany: ", err);
                });
            });  
        }
    }
});