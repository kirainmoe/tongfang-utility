const electronInstaller = require("electron-winstaller");

(async () => {
    try {
        await electronInstaller.createWindowsInstaller({
            appDirectory: "./release/Tongfang Hackintosh Utility-win32-x64",
            outputDirectory: "./release",
            authors: "Ami Technology",
            name: "com.kirainmoe.tongfang.hackintosh.utility",
            exe: "Tongfang Hackintosh Utility.exe"
        });
        console.log("Tongfang Hackintosh Utility for Windows has been build successfully!");
    } catch (e) {
        console.log(`Build error: ${e.message}`);
    }
})();
