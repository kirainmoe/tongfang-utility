const electronCompatLayer = () => {
    const isWin = () => process.platform === "win32",
        isMac = () => process.platform === "darwin",
        isLinux = () => process.platform === "linux",
        exec = cmd => {
            const cp = require("child_process");
            return cp.execSync(cmd);
        },
        sudoExec = (cmd, callback) => {
            const sudo = require("sudo-prompt");
            const options = {
                name: "Tongfang Hackintosh Utility"
            };
            sudo.exec(cmd, options, callback);
        };

    const writeFile = (filename, content) => {
        const fs = require("fs");
        fs.writeFileSync(filename, content);
    };

    const readFile = filename => {
        const fs = require("fs");
        return fs.readFileSync(filename).toString();
    };

    const downloadFile = (url, savePath, callback, setPercent) => {
        const fetch = require("node-fetch"),
            fs = require("fs");
        let downloadedSize = 0,
            totalLength = 0;
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/octet-stream" }
        })
            .then(res => {
                const body = res.body;
                totalLength = res.headers.get("content-length");
                
                if (!totalLength) {
                    totalLength = 8642344;      // tmp

                    fetch('https://api.kirainmoe.com/starbeatVersion')
                        .then(res => res.json())
                        .then(res => totalLength = res.fileSize);
                }
                body.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = body.read())) {
                        downloadedSize += chunk.length;
                        const percent = Math.round(downloadedSize / totalLength * 100);

                        if (setPercent)
                            setPercent(percent);
                    }
                });
                return res;
            })
            .then(res => res.buffer())
            .then(data => {
                fs.writeFileSync(savePath, data, "binary");
                callback();
            });
    };

    const getUserDir = () => {
        const os = require("os");
        return os.homedir();
    };

    const mkdir = path => {
        const fs = require("fs");
        if (fs.existsSync(path)) return true;
        return fs.mkdirSync(path);
    };

    const unzip = (file, path) => {
        const adm = require("adm-zip");
        const zip = new adm(file);
        zip.extractAllTo(path, true);
    };

    const zip = (file, path) => {
        const adm = require("adm-zip");
        const zip = new adm();
        zip.addLocalFolder(path);
        zip.writeZip(file);
    };

    const fsopt = () => {
        return require("fs");
    };

    const fs = require("fs");
    const rmDir = function(path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    // recurse
                    rmDir(curPath);
                } else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    const openPage = (url) => {
        const shell = require('electron').shell;
        shell.openExternal(url);
    };

    const getElectron = () => (require('electron'));

    const selfUpdate = (proc, success, error) => {
        const remote = require("electron").remote;
        const appPath = remote.app.getAppPath();
        const fs = require('fs');
        const fetch = require('node-fetch');
        
        const keyFiles = [
            '/build/index.html',
            '/build/electron/electronCompat.js',
            '/build/electron/hidutils.js',
            '/build/service-worker.js',
            '/build/static/css/2.chunk.css',
            '/build/static/css/main.chunk.css',
            '/build/static/js/2.chunk.js',
            '/build/static/js/main.chunk.js',
            '/build/static/js/runtime-main.js'
        ];

        const updateSpecificFile = (index) => {
            const filename = keyFiles[index];
            console.log(`[update] Fetching file ${filename} from remote...`);

            if (proc)
                proc(filename);
            
            fetch('https://kirainmoe.github.io/tongfang-hackintosh-utility/starbeat-client' + filename, {
                method: "GET",
                headers: { "Content-Type": "application/octet-stream" }
            })
                .then(res => res.buffer())
                .then(data => {
                    fs.writeFileSync(appPath + filename, data);
                    if (index + 1 < keyFiles.length)
                        updateSpecificFile(index + 1);
                    else {
                        if (success)
                            success();
                    }
                })
                .catch(err => {
                    console.error(`Error occurred while updating file ${filename}`);
                    console.log(err);
                    if (error)
                        error(err);
                });
        };
        updateSpecificFile(0);
    };

    return {
        getPlatform: () => process.platform,
        isWin,
        isMac,
        isLinux,
        exec,
        sudoExec,
        getMacSerial: () => {
            if (!isMac()) return false;
            const remote = require("electron").remote;
            const p = remote.app.getAppPath();

            let macserialPath = (p + "/macserial/macserial").replace(/ /g, "\\ ");
            const output = exec(macserialPath).toString();

            let result = {};
            try {
                const model = output.match(/Model:\s(.*)/),
                    sn = output.match(/Serial\sNumber:\s(.*)/),
                    smuuid = output.match(/System\sID:\s(.*)/),
                    mlb = output.match(/MLB:\s(.*)/);

                result = {
                    model: model[1],
                    sn: sn[1],
                    smuuid: smuuid[1],
                    mlb: mlb[1]
                };
            } catch(err) {
                result = null;
            }
            return result;
        },
        generateMacSerial: () => {
            let macserial;
            const remote = require("electron").remote;
            
            const p = remote.app.getAppPath();
            if (isMac()) {
                macserial = p + "/macserial/macserial";
            } else
                macserial = isLinux()
                    ? p + "/macserial/macserial-linux"
                    : isWin()
                    ? "\"" + p + "\\macserial\\macserial32.exe\""
                    : "";

            if (!isWin())
                macserial = macserial.replace(/ /g, "\\ ");

            const uuidGen = require("node-uuid");
            const output = exec(macserial + " --model 43 --generate --num 1").toString();
            const uuid = uuidGen.v4();

            const res = output.split("|");
            return {
                model: "MacBookPro15,3",
                sn: res[0],
                mlb: res[1].trim(),
                smuuid: uuid.toUpperCase()
            };
        },
        writeFile,
        readFile,
        downloadFile,
        getUserDir,
        mkdir,
        unzip,
        zip,
        fs: fsopt,
        rmdir: rmDir,
        openPage,
        getElectron,
        selfUpdate
    };
};

window.electron = electronCompatLayer();
window.browserWindow = require('electron').remote;