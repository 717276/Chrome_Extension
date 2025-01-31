// eval() 실행 방지
Object.defineProperty(window, 'eval', { value: () => { throw new Error("eval is disabled"); }, writable: false });

// 모든 <script> 태그 제거
document.querySelectorAll("script").forEach(script => script.remove());

// setTimeout, setInterval 비활성화 (일부 JavaScript 차단)
window.setTimeout = () => {};
window.setInterval = () => {};

// console.log를 통한 디버깅 방지
console.log = () => {};
console.warn = () => {};
console.error = () => {};