// js/zip-builder.js - النسخة النهائية
console.log('📁 تحميل zip-builder.js');

window.createWebZip = async function(files, settings) {
    console.log(`🏗️ بناء ZIP من ${files.length} ملف`);
    
    if (typeof JSZip === 'undefined') {
        throw new Error('مكتبة JSZip غير محملة');
    }
    
    const zip = new JSZip();
    
    // إضافة الملفات المرفوعة
    for (const file of files) {
        const fileData = await readFileAsArrayBuffer(file);
        zip.file(file.name, fileData);
    }
    
    // إضافة ملف الإعدادات
    const settingsData = {
        appName: settings.appName || 'Web App',
        packageName: settings.packageName || 'com.web.app',
        version: settings.version || '1.0.0',
        buildDate: new Date().toISOString(),
        filesCount: files.length
    };
    
    zip.file('app-info.json', JSON.stringify(settingsData, null, 2));
    
    // إنشاء ملف README
    const readmeContent = `# ${settingsData.appName}
تم إنشاء هذا الملف بواسطة Web to APK Converter
الملفات: ${settingsData.filesCount}
التاريخ: ${new Date().toLocaleString('ar-SA')}

لإنشاء APK حقيقي:
1. npm install -g cordova
2. cordova create myApp
3. انسخ الملفات إلى myApp/www/
4. cordova build android`;
    
    zip.file('README.txt', readmeContent);
    
    // إنشاء ZIP
    return await zip.generateAsync({ 
        type: 'arraybuffer',
        compression: 'DEFLATE'
    });
};

// دالة مساعدة لقراءة الملف
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

console.log('✅ zip-builder.js جاهز');
