let url = window.location.href;
    url = url.replace(/^https?:\/\/www./, "");  
    url = url.replace(/\.co.*/, "");
let companyText;
window.onload = ()=>{
    if (url==="jobkorea"){        
        const btn = document.querySelector('.tplBtn_1');
        const company = document.querySelector('.coName');
        if (company) {
            companyText = company.textContent.trim();
            findCompanyInStorage(companyText).then((exists) => {                                         
                if (exists) {
                    alert("이미 지원한 회사입니다.");
                } else {
                    alert("미지원 회사입니다");
                }                
            });            
        }
        btn.addEventListener('click',()=>{        
            if (companyText){            
                saveToChromeStorage(companyText);
            }        
        })     
    }else if(url === "saramin"){                
        waitForCompanies().then(company=>{
            companyText = company.innerText.trim();        
            findCompanyInStorage(companyText).then((exists) => {             
                if (exists) {                                                        
                    alert("이미 지원한 회사입니다.");            
                } else {
                    alert("미지원 회사입니다.");
                }
            });
        });
        let btn;
        btn = document.querySelector('.sri_btn_lg');        
        btn.addEventListener('click',()=>{            
            saveToChromeStorage(companyText);  // 저장
        });            
    }
};
function waitForCompanies() {
    return new Promise((resolve)=>{
        let company = document.querySelector('.company');
        resolve(company);
    })    
}
function saveToChromeStorage(text) {    
    const fileKey = "company_data"; 

    chrome.storage.local.get([fileKey], (result) => {
        // 기존 데이터 확인 (없으면 빈 문자열)
        let existingData = result[fileKey] || ""; 

        // 기존 데이터에 새 텍스트 추가 (줄바꿈 포함)        
        const updatedData = existingData ? existingData + "\n" + text : text;
        
        // 저장        
        chrome.storage.local.set({ [fileKey]: updatedData }, () => {
            console.log("데이터 저장 완료:", updatedData);
        });
    });
}

function findCompanyInStorage(companyName) {
    const fileKey = "company_data";    

    return new Promise((resolve, reject) => {
        chrome.storage.local.get([fileKey], (result) => {
            let companies = result[fileKey] ? result[fileKey].split("\n") : [];        
            if (companies.includes(companyName)) {                   
                resolve(true); // 회사명이 이미 있으면 true
            } else {
                console.log(`회사명 "${companyName}" 없음.`);
                resolve(false); // 회사명이 없으면 false
            }
        });
    });
}


