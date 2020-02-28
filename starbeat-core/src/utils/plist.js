export default class Plist {
    raw = null
    json = null
    plist = null

    constructor(raw) {
        this.plist = require('plist');
        this.raw = raw;
        this.json = this.plist.parse(raw);
        return this;
    }

    buildPlist() {
        return this.plist.build(this.json).replace(/<data\/>/g, '<data></data>');
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

    setValue(path, value) {
        let p = path.split('/');
        let ref = this.json;
        for (let i = 0; i < p.length; i++) {
            if (this.isNumeric(p[i]))
                p[i] = parseInt(p[i]);
            if (typeof ref[p[i]] === 'undefined') {
                return false;
            }
            if (i !== p.length - 1)
                ref = ref[p[i]];
            else
                ref[p[i]] = value;
        }
        return true;
    }

    setKext(name, status) {
        this.json.Kernel.Add.forEach(item => {
            if (item.BundlePath.indexOf(name) >= 0)
                item.Enabled = status;
        });
    }

    setProperties(path, key, value) {
        this.json.DeviceProperties.Add[path][key] = value;
    }

    setSSDT(name, value) {
        this.json.ACPI.Add.forEach(item => {
            if (item.Path.indexOf(name) >= 0) {
                item.Enabled = value;
            }
        });
    }

    setACPI(name, value) {
        this.json.ACPI.Patch.forEach(item => {
            if (item.Comment.indexOf(name) >= 0) {
                item.Enabled = value;
            }
        });
    }

    setBootArg(addition) {
        const arg = this.json.NVRAM.Add['7C436110-AB2A-4BBB-A880-FE41995C9F82']['boot-args'];
        this.json.NVRAM.Add['7C436110-AB2A-4BBB-A880-FE41995C9F82']['boot-args'] = arg + ' ' + addition;
    }
}