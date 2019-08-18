/* init materialize library components */
M.AutoInit();

/* arrays */
const brightness = [0x00, 0x08, 0x16, 0x24, 0x32];
const speeds = [0x0a, 0x07, 0x05, 0x03, 0x01];

/* init device controller */
const initColorUtils = require('../colorUtils');
const utils = initColorUtils();
if (!utils) {
    alert("无法在该设备上检测到兼容的设备。请确认您的系统能识别出 ITE 设备后重试。");
    document.getElementById('keyboard-light').innerHTML = `
    <p>不支持您的设备。请确认你的系统能识别到 制造商 ID 为0x048d，产品 ID 为 0xce00 的 ITE Devices(8291)，且版本为 0.02.</p>
    <p>如果你有任何问题，请与开发者联系：<a href="mailto:i@kirainmoe.com">i@kirainmoe.com</a></p>
    `;

}

/* general functions */
const toggleMonoColorPicker = (state) => {
    const element = document.querySelector('.monoColor-preview');
    if (state) {
        element.style.visibility = 'visible';
        element.style.pointerEvents = 'auto';
    } else {
        element.style.visibility = 'hidden';
        element.style.pointerEvents = 'none';
    }
};
const getSpeed = () => {
    return speeds[Math.max(0, Math.ceil(parseInt(document.getElementById('keyboard-light-speed').value) / 20) - 1)];
};
const getBrightness = () => {
    return brightness[Math.max(0, Math.ceil(parseInt(document.getElementById('keyboard-light-brightness').value) / 20) - 1)];
};
const getDirection = () => {
    return document.getElementById('keyboard-light-direction').checked ? 0x01 : 0x02;
};
const setMonoColor = (mode, bt) => {
    for (let i = 1; i <= 4; i++) {
        const block = document.querySelector('#colorblock-' + i);
        let color = block.value,
            r = parseInt(color.substr(1, 2), 16),
            g = parseInt(color.substr(3, 2), 16),
            b = parseInt(color.substr(5, 2), 16);
        utils.monoColor(r, g, b, mode, i, bt);
    }
};
const setIt = (mode) => {
    const bt = getBrightness(),
        sp = getSpeed(),
        dir = getDirection(),
        value = parseInt(document.querySelector('#color-mode').value),
        status = document.getElementById('keyboard-light-switch').checked;
    if (!status) {
        utils.disabler();
        return;
    }
    switch (value) {
        case 1:
            setMonoColor(mode, bt);
            break;
        case 2:
            utils.breathing(mode, sp, bt);
            break;
        case 3:
            utils.wave(mode, sp, bt, dir);
            break;
        case 4:
            utils.rainbow(mode, bt);
            break;
        case 5:
            utils.flash(mode, sp, bt, dir);
            break;
        case 6:
            utils.mix(mode, sp, bt);
            break;
        default:
            break;
    }
};

if (utils) {
    /* event bind */
    document.getElementById('color-mode').addEventListener('change', function(e) {
        const value = parseInt(e.target.value);
        if (value != 1)
            toggleMonoColorPicker(false);
        else
            toggleMonoColorPicker(true);
        setIt(false);
    });

    const pickerBlocks = document.querySelectorAll('input[type="color"]');
    for (let i in pickerBlocks) {
        if (pickerBlocks[i] instanceof HTMLElement) {
            pickerBlocks[i].addEventListener('change', function(e) {
                setIt(false);
            });
        }
    }

    document.querySelector('.apply').addEventListener('click', () => {
        const value = document.getElementById('color-mode').value;
        if (value == 0) {
            alert("请选择一种有效的颜色模式~");
            return;
        }
        setIt(true);
        alert("设置已保存~");
    });

    document.querySelectorAll('input[type=range], input[type=checkbox]').forEach(ele => {
        ele.addEventListener('change', () => {
            setIt(false);
        });
    });
}