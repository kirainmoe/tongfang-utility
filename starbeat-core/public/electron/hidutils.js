const initColorUtils = () => {
    const hid = require('node-hid');
    const isWin = () => process.platform === "win32";
    const isMac = () => process.platform === "darwin";

    let revision = 2;

    Array.prototype.zeroFill = function (len) {
        if (isWin()) {
            for (let i = this.length - 1; i >= 0; i--)
                this[i+1] = this[i];
            this[0] = 0;
        }
        return this;
    };

    const vendorId = 0x048d, productId = 0xce00;
    const generic = [
        [0xff, 0x00, 0x00],
        [0xff, 0x5a, 0x00],
        [0xff, 0xb4, 0x00],
        [0x00, 0xb4, 0x00],
        [0x00, 0x00, 0xff],
        [0x00, 0xb4, 0xff],
        [0xff, 0x00, 0xff]
    ];
    const rainbowColor = [
        [0xff, 0x00, 0x00],
        [0x00, 0xb4, 0x00],
        [0x00, 0x00, 0xff],
        [0xff, 0x00, 0xff]
    ];
    
    let device;
    try {
        device = new hid.HID(vendorId, productId);
    } catch (e) {
        console.error(e);
        device = null;
    }
    if (device == null) {
        console.error("No compatible device found!");
        return false;
    }

    try {
        if (isMac()) {
            const cp = require("child_process");
            const stdout = cp.execSync("ioreg -c IOUSBDevice | grep -A 10 ITE | grep bcdDevice").toString();
            if (stdout.indexOf("\"bcdDevice\" = 3") >= 0)
                revision = 3;
        }
    } catch (e) {}

    console.log(`[Info] ITE revision is 0.0${revision}`);
    
    const sendGenericPacket = () => {
        for (let i = 1; i <= 7; i++)
            device.sendFeatureReport([ 0x14, 0x00, i, ...generic[i-1], 0x00, 0x00 ].zeroFill(16));
    };

    const getITErevision = () => {
        return revision;
    };

    const monoColor = (red, green, blue, save, block, brightness) => {
        if (getITErevision() === 2) {
            const packet = [0x14, 0x00, 0x01, red, green, blue, 0x00, 0x00],
                endPacket = [0x08, 0x02, 0x01, 0x05, brightness, 0x08, 0x00, save ? 0x01 : 0x00];
            if (block) {        // set specific block
                packet[2] = block;
                device.sendFeatureReport(packet.zeroFill(16));
            } else {
                // keyboard has 4 discrete color areas
                for (let i = 1; i <= 4; i++) {
                    device.sendFeatureReport(packet.zeroFill(16));
                    packet[2]++;
                }
            }
            // send ending packet
            device.sendFeatureReport(endPacket.zeroFill(16));
        } else {
            const commandPacket = [0x08, 0x02, 0x33, 0x0, 0x32, 0x0, 0x0, 0x0];
            device.sendFeatureReport(commandPacket);

            const endPacket = [0x12, 0x00, 0x00, 0x08, save ? 0x01 : 0x00, 0x00, 0x00, 0x00];
            device.sendFeatureReport(endPacket);

            let colorPacket = [];
            for (let i = 0; i < 16; i++) {
                colorPacket.push(red);
                colorPacket.push(green);
                colorPacket.push(blue);
            }
            device.sendFeatureReport(colorPacket);
        }
    };
    
    const breathing = (save, speed, brightness) => {
        const endPacket = [0x08, 0x02, 0x02, speed, brightness, 0x08, 0x00, save ? 0x01 : 0x00];
        if (getITErevision() === 2) {
            sendGenericPacket();
            device.sendFeatureReport(endPacket.zeroFill(16));
        } else {
            device.sendFeatureReport(endPacket);
        }
    };

    const wave = (save, speed, brightness, direction) => {
        const endPacket = [0x08, 0x02, 0x03, speed, brightness, 0x08, direction, save ? 0x01 : 0x00];
        if (getITErevision() === 2) {
            sendGenericPacket();
            device.sendFeatureReport(endPacket.zeroFill(16));
        } else {
            device.sendFeatureReport(endPacket);
        }
    };
    
    const rainbow = (save, brightness) => {
        if (getITErevision() === 2) {
            const endPacket = [0x08, 0x02, 0x05, 0x05, brightness, 0x08, 0x00, save ? 0x01 : 0x00];
            for (let i = 1; i <= 4; i++)
                device.sendFeatureReport([0x14, 0x00, i, ...rainbowColor[i-1], 0x00, 0x00].zeroFill(9));
            device.sendFeatureReport(endPacket.zeroFill(9));
        } else {
            const endPacket = [0x08, 0x02, 0x05, 0x05, brightness, 0x00, 0x00, save ? 0x01 : 0x00];
            device.sendFeatureReport(endPacket);
        }
    };
    
    const flash = (save, speed, brightness, direction) => {
        const endPacket = [0x08, 0x02, 0x12, speed, brightness, 0x08, direction, save ? 0x01 : 0x00];
        if (getITErevision() === 2) {
            sendGenericPacket();
            device.sendFeatureReport(endPacket.zeroFill(16));
        } else {
            device.sendFeatureReport(endPacket);
        }
    };
    
    const mix = (save, speed, brightness) => {
        const endPacket = [0x08, 0x02, 0x13, speed, brightness, 0x08, 0x00, save ? 0x01 : 0x00];
        if (getITErevision() === 2) {
            sendGenericPacket();
            device.sendFeatureReport(endPacket.zeroFill(16));
        } else {
            device.sendFeatureReport(endPacket);
        }
    };

    const disabler = () => {
        const endPacket = [0x08, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        if (getITErevision() === 2) 
            device.sendFeatureReport(endPacket.zeroFill(16));
        else
            device.sendFeatureReport(endPacket);
    }

    return {
        monoColor,
        breathing,
        rainbow,
        wave,
        flash,
        mix,
        device,
        disabler,
        getITErevision
    };
};

window.initColorUtils = initColorUtils;