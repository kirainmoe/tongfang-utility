const electronCompatLayer = () => {
    const isWin = () => process.platform === "win32",
        isMac = () => process.platform === "darwin",
        isLinux = () => process.platform === "linux",
        exec = (cmd) => {
            const cp = require("child_process");
            return cp.execSync(cmd);
        },
        sudoExec = (cmd, callback) => {
            const sudo = require("sudo-prompt");
            const options = {
                name: "Tongfang Hackintosh Utility",
            };
            sudo.exec(cmd, options, callback);
        };

    const writeFile = (filename, content) => {
        const fs = require("fs");
        fs.writeFileSync(filename, content);
    };

    const readFile = (filename) => {
        const fs = require("fs");
        return fs.readFileSync(filename).toString();
    };

    const normalDownload = async (url, savePath) => {
        const fs = require("fs"),
            util = require("util"),
            streamPipeline = util.promisify(require("stream").pipeline);
        fetch = require("node-fetch");
        const resp = await fetch(url);
        await streamPipeline(resp.body, fs.createWriteStream(savePath));
    };

    const downloadFile = async (url, savePath, callback, setPercent) => {
        const fs = require("fs"),
            fetch = require("node-fetch");
        let totalLength = 0;

        const doFetch = () => {
            let downloadedSize = 0;

            return fetch(url)
                .then((res) => {
                    resolved = true;
                    retry = 0;
                    let speed = 0,
                        lastUpdate = 0,
                        cur = 0;
                    const body = res.body;
                    totalLength = res.headers.get("content-length");
                    resolved = true;

                    if (!totalLength) {
                        totalLength = 8642344; // tmp
                        fetch("https://api-aliyun.kirainmoe.com:2333/tongfang/version")
                            .then((res) => res.json())
                            .then((res) => (totalLength = res.fileSize));
                    }
                    body.on("readable", () => {
                        let chunk;
                        retry = 0;
                        while (null !== (chunk = body.read())) {
                            downloadedSize += chunk.length;
                            cur += chunk.length;

                            const percent = Math.round((downloadedSize / totalLength) * 100);
                            const curTime = Date.parse(new Date());
                            if (curTime - lastUpdate >= 1000) {
                                lastUpdate = curTime;
                                speed = cur;
                                cur = 0;
                            }

                            if (setPercent) setPercent(percent, speed);
                        }
                    });
                    return res;
                })
                .then((res) => res.buffer())
                .then((data) => {
                    done = true;
                    fs.writeFileSync(savePath, data, "binary");
                    callback();
                })
                .catch((err) => {
                    alert(err);
                });
        };
        doFetch();
    };

    const getUserDir = () => {
        const os = require("os");
        return os.homedir();
    };

    const mkdir = (path) => {
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
    const rmDir = function (path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
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
        const shell = require("electron").shell;
        shell.openExternal(url);
    };

    const getElectron = () => require("electron");

    const selfUpdate = (proc, version, success, error) => {
        const remote = require("electron").remote;
        const appPath = remote.app.getAppPath();
        const fs = require("fs");
        const fetch = require("node-fetch");

        if (appPath.indexOf("/private") >= 0) {
            alert(
                "检测到你正在 macOS 的 Sandbox 环境下运行 Tongfang Hackintosh Utility，程序无法自动更新。这可能是程序位于 ~/Downloads 目录下，请将程序移动到其它位置（如“应用程序”）下后重试更新。\n\n" +
                    "Tongfang Hackintosh Utility is currently running on macOS sandbox environment, which will forbid the update. This may because that app is running on ~/Downloads directory. Please move Tongfang Hackintosh Utility to somewhere else and retry."
            );
            return;
        }

        const keyFiles = [
            "/build/index.html",
            "/build/electron/electronCompat.js",
            "/build/electron/hidutils.js",
            "/build/service-worker.js",
            "/build/static/css/2.chunk.css",
            "/build/static/css/main.chunk.css",
            "/build/static/js/2.chunk.js",
            "/build/static/js/main.chunk.js",
            "/build/static/js/runtime-main.js",
        ];

        const updateSpecificFile = (index, version) => {
            const filename = keyFiles[index];
            console.log(`[update] Fetching file ${filename} from remote...`);

            if (proc) proc(filename);

            fetch(
                "https://cdn.jsdelivr.net/gh/kirainmoe/tongfang-hackintosh-utility@" +
                    version +
                    "/starbeat-client" +
                    filename,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/octet-stream" },
                }
            )
                .then((res) => res.buffer())
                .then((data) => {
                    fs.writeFileSync(appPath + filename, data);
                    if (index + 1 < keyFiles.length) updateSpecificFile(index + 1, version);
                    else {
                        if (success) success();
                    }
                })
                .catch((err) => {
                    console.error(`Error occurred while updating file ${filename}`);
                    console.log(err);
                    if (error) error(err);
                });
        };
        updateSpecificFile(0, version);
    };

    const getWMIC = () => {
        const cp = require("child_process");
        const res = cp.execSync('echo "csproduct" | wmic').toString(),
            tmp = res.split("\n");
        let wmic = "";

        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].indexOf("SKUNumber") >= 0) {
                wmic = tmp[i + 1];
                break;
            }
        }
        wmic = wmic.replace(/\s\s+/g, "/");

        const smbiosinfo = wmic.split("/");
        return {
            sn: smbiosinfo[2],
            model: smbiosinfo[3],
            uuid: smbiosinfo[4],
        };
    };

    const copyDir = (src, dist, callback) => {
        const fs = require("fs");
        fs.access(dist, function (err) {
            if (err) {
                // 目录不存在时创建目录
                fs.mkdirSync(dist);
            }
            _copy(null, src, dist);
        });

        function _copy(err, src, dist) {
            if (err) {
                callback(err);
            } else {
                fs.readdir(src, function (err, paths) {
                    if (err) {
                        callback(err);
                    } else {
                        paths.forEach(function (path) {
                            var _src = src + "/" + path;
                            var _dist = dist + "/" + path;
                            fs.stat(_src, function (err, stat) {
                                if (err) {
                                    callback(err);
                                } else {
                                    // 判断是文件还是目录
                                    if (stat.isFile()) {
                                        fs.writeFileSync(_dist, fs.readFileSync(_src));
                                    } else if (stat.isDirectory()) {
                                        // 当是目录是，递归复制
                                        copyDir(_src, _dist, callback);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        }
    };

    return {
        getPlatform: () => process.platform,
        isWin,
        isMac,
        isLinux,
        exec,
        sudoExec,
        getMacSerial: () => {
            // macOS
            if (isMac()) {
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
                        mlb: mlb[1],
                    };
                } catch (err) {
                    result = null;
                }
                return result;
            }
            return false;
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
                    ? '"' + p + '\\macserial\\macserial32.exe"'
                    : "";

            if (!isWin()) macserial = macserial.replace(/ /g, "\\ ");

            const uuidGen = require("node-uuid");
            const output = exec(macserial + " --model 43 --generate --num 1").toString();
            let uuid = uuidGen.v4();

            if (isWin()) {
                const wmic = getWMIC();
                if (wmic.uuid) uuid = wmic.uuid;
            }

            const res = output.split("|");
            return {
                model: "MacBookPro15,3",
                sn: res[0],
                mlb: res[1].trim(),
                smuuid: uuid.toUpperCase(),
            };
        },
        writeFile,
        readFile,
        normalDownload,
        downloadFile,
        getUserDir,
        mkdir,
        copyDir,
        unzip,
        zip,
        fs: fsopt,
        rmdir: rmDir,
        openPage,
        getElectron,
        selfUpdate,
    };
};

window.electron = electronCompatLayer();
window.browserWindow = require("electron").remote;
