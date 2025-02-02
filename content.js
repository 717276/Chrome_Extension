let url = window.location.href;
    url = url.replace(/^https?:\/\/www./, "");  
    url = url.replace(/\.co.*/, "");
let companyText = null;
window.onload = ()=>{
    if (url==="jobkorea"){            
        const btn = document.querySelector('.tplBtn_1');
        const company = document.querySelector('.coName');
        if (company) {
            companyText = company.textContent.trim();
            companyText = companyText.replace("(주)", "");           
            checkCompany(companyText);
        }
        btn.addEventListener('click', () => {        
            if (companyText) {            
                saveCompany(companyText);
            }        
        });
    }else if(url === "saramin"){                
        waitForCompany().then(company => {
            companyText = company.innerText.trim();            
            companyText = companyText.replace("(주)", "");          
            checkCompany(companyText);
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

function checkCompany(companyName) {    
    chrome.runtime.sendMessage({ action: "checkData", company: companyName }, (response) => {        
        if (response.exists) {            
            alert("이미 지원한 회사입니다.");
        } else {            
            alert("미지원 회사입니다.");
        }
    });
}