// js/main.js - النسخة النهائية
console.log('🚀 تحميل main.js');

const appSettings = {
    appName: 'تطبيق الويب',
    packageName: 'com.webbuilder.app',
    version: '1.0.0'
};

let uploadedFiles = [];

function handleFileUpload(files) {
    uploadedFiles = Array.from(files);
    console.log(`📁 رفع ${uploadedFiles.length} ملف`);
    updateUI();
}

async function buildZIP() {
    if (uploadedFiles.length === 0) {
        alert('⚠️ الرجاء رفع ملفات أولاً');
        return;
    }
    
    console.log('🏗️ بدأ بناء ZIP...');
    
    try {
        const zipData = await window.createWebZip(uploadedFiles, appSettings);
        console.log(`✅ ZIP جاهز (${zipData.byteLength} بايت)`);
        downloadZIP(zipData);
        
    } catch (error) {
        console.error('❌ خطأ:', error);
        alert('خطأ: ' + error.message);
    }
}

function downloadZIP(zipData) {
    const blob = new Blob([zipData], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appSettings.appName}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log('📥 بدأ التنزيل');
}

function updateUI() {
    const btn = document.getElementById('buildBtn');
    if (btn) btn.disabled = uploadedFiles.length === 0;
}

window.uploadedFiles = uploadedFiles;
window.handleFileUpload = handleFileUpload;
window.buildZIP = buildZIP;

console.log('✅ main.js جاهز');
