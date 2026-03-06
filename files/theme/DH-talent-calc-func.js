function toInt(el) {
    if (typeof(el) == "number")
        return el;
    if (typeof(el) == "string")
        return Number.parseInt(el);
    if (el) {
        if (el.value.length > 0)
            return Number.parseInt(el.value);
        return el.innerText ? Number.parseInt(el.innerText) : 0;
    }
    alert("Error: toInt(): null element when expected some");
    return 0;
}

function isString(val) {
    return typeof val === 'string' || val instanceof String;
}

function isNumber(val) {
    return Number.isInteger(val) || typeof VAL === 'number';
}

function colorExpertClass(sel, lookup) {
    var classes = expertClassReq[sel];
    for (var i = 1; i < classes.length; i++) {
        if (classes[i]["req"].includes(lookup)) return colorMap[i - 1];
    }
    return "none";
}

function isStartSkill(c, s) {
    return s > 100 || expertClassReq[c][0]["skills"].includes(s);
}

function getVal(list, id) {
    var i = 0;
    for (var it in list) {
        if (i == id) return it;
        i++;
    }
    return "";
}

function getID(list, item) {
    if (Array.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
            if (list[i][0] == item) return i;
        }
    } else if (typeof(list) == typeof({})) {
        var i = 0;
        for (var it in list) {
            if (it == item) return i;
            i++;
        }
    } else {
        alert("Neočekávaný typ v 'getID': " + typeof(list));
    }
    return Number.NaN;
}

/**
 * Parses an input string according to a delimiter-based template, splitting the input into variables.
 *
 * @param {string} input
 * @param {string} template
 * @param {string[]} delimiters
 * @returns {Object.<string, string>} - An object mapping variable names to extracted values.
 */
function parseToVars(input, template, delimiters = [","]) {
    const pattern = new RegExp(`[${delimiters.join("")}]`);
    const values = input.split(pattern);
    const keys = template.split(pattern);

    if (values.length !== keys.length) {
        throw new Error(`Input ${values.length} and template ${keys.length} must have the same number of elements.
        Template: ${template}, Input: ${input}
        ${new Error().stack}`);
    }

    const result = {};
    keys.forEach((key, i) => {
        result[key.trim()] = values[i].trim();
    });
    return result;
}

var AttrLists = {
    initialized: false,
    povolani: 0, //SILpov
    rasa: 1, //SILras
    tvorba: 2, //SILkostka
    bonus: 3, //SILkostkaBonus
    total: 4, //SILtotal
    posileni: 5, //SILopravBonus
    oprava: 6, //SILoprav
    ioSufixes: { "kostka": 0, "kostkaBonus": 0, "opravBonus": 0 },
    lists: [
        ["SILpov", "SILras", "SILkostka", "SILkostkaBonus", "SILtotal", "SILopravBonus", "SILoprav"],
        ["OBRpov", "OBRras", "OBRkostka", "OBRkostkaBonus", "OBRtotal", "OBRopravBonus", "OBRoprav"],
        ["ODOpov", "ODOras", "ODOkostka", "ODOkostkaBonus", "ODOtotal", "ODOopravBonus", "ODOoprav"],
        ["INTpov", "INTras", "INTkostka", "INTkostkaBonus", "INTtotal", "INTopravBonus", "INToprav"],
        ["CHApov", "CHAras", "CHAkostka", "CHAkostkaBonus", "CHAtotal", "CHAopravBonus", "CHAoprav"]
    ],
    attrSep: "x",
    defVals: [0, 7, 1, 0, 0, 0, 0],
    types: [0, 0, updateAttrs, updateAttrs, 0, updateAttrs, 0],
    init: function() {
        if (this.initialized) return;
        this.initialized = true;
        for (var attr = 0; attr < this.lists.length; attr++) {
            for (var i = 0; i < this.lists[attr].length; i++) {
                var td = document.createElement("td");
                var inp = document.createElement("input");
                inp.id = this.lists[attr][i];
                inp.value = this.defVals[i];
                switch (this.types[i]) {
                    case 0:
                        inp.disabled = true;
                        break;
                    default:
                        inp.type = "number";
                        inp.onchange = this.types[i];
                }
                this.lists[attr][i] = inp;
                td.appendChild(inp);
                attrTable.rows[attr + 1].appendChild(td);
            }
        }
        this.ioSufixes["kostka"] = this.tvorba;
        this.ioSufixes["kostkaBonus"] = this.bonus;
        this.ioSufixes["opravBonus"] = this.posileni;
    },
    set: function(type, attributes) {
        for (var i = 0; i < this.lists.length; i++) {
            this.lists[i][type].value = attributes[i];
        }
        this.update();
    },
    update: function() {
        for (var attr of this.lists) {
            attr[this.total].value = toInt(attr[this.povolani].value) + toInt(attr[this.rasa].value) + toInt(attr[this.tvorba].value) + toInt(attr[this.bonus].value);
            attr[this.oprava].value = toInt(attr[this.posileni].value) + Math.floor((toInt(attr[this.total].value) - 10) / 2);
        }
        attrCount.value = (toInt(SILkostka.value) + toInt(OBRkostka.value) + toInt(ODOkostka.value) + toInt(INTkostka.value) + toInt(CHAkostka.value)) +
            " z 20";
    },
    reset: function() {
        for (var ll of this.lists)
            for (var i = 0; i < ll.length; i++)
                ll[i].value = 0;
    },
    export: function() {
        var exp = "";
        for (var key of Object.keys(this.ioSufixes)) {
            exp += key + "=";
            for (var i = 0; i < this.lists.length; i++) {
                exp += this.lists[i][this.ioSufixes[key]].value + this.attrSep;
            }
            exp += "&";
        }
        exp.replace(/&$/, "");
        return exp;
    },
    import: function(parsed) {
        for (var key of Object.keys(this.ioSufixes)) {
            var attrs = parsed.get(key).split(this.attrSep);
            if (attrs.length < this.lists.length) return;
            for (var i = 0; i < this.lists.length; i++) {
                this.lists[i][this.ioSufixes[key]].value = attrs[i];
            }
        }
    },
};

class LVLHistory {
    constructor() {
        this.reset();
    }

    reset() {
        this.expert = {
            spec: -1, // base class or specialization name
            race: 0, // race
            raceSpec: null,
            lvl: 1,
            tsp: 0,
        };
        this.lvls = {};
        AttrLists.reset();
    }

    // s - class/specialization
    // r - race
    // [num] -
    parse(data) {
        const pars = new URLSearchParams("?" + data);
        this.expert.spec = toInt(pars.get("s"));
        this.expert.race = decodeURI(pars.get("r"));
        for (var i = 1; pars.get("" + i); i++) {
            var lvlPars = pars.get("" + i).split("-");
            var ss = [];
            if (i == 1) {
                lvlPars[0] = getVal(specialSkills, lvlPars[0])
            }
            const intSpecial = toInt(lvlPars[0]);
            if (isNaN(intSpecial) || intSpecial == lvlPars[0]) this.setLvl(i, lvlPars[1], lvlPars[0]);
            else {
                const ext = lvlPars[0].slice(("" + intSpecial).length);
                this.setLvl(i, lvlPars[1], "" + intSpecial, ext);
            }
            for (var j = 2; j < lvlPars.length; j++) {
                var s = lvlPars[j].split("_");
                var skill = getSkillById(s[0]);
                if (skill) {
                    s[0] = skill["name"];
                    s[2] = s[2] == "t";
                    ss.push(s);
                }
            }
            this.lvls[i]["skill"] = ss;
        }

        AttrLists.import(pars);
    }

    setRace(race, bonus) {
        var changeSP = 0;
        var perLvl = false;
        var timesLvl = false;
        if (bonus.startsWith("DB")) {
            changeSP = Number(bonus.charAt(3)) || 0;
            perLvl = bonus.endsWith("/lvl");
            timesLvl = bonus.endsWith("*lvl");
        }

        for (const lvl in this.lvls) {
            this.lvls[lvl]["bonusSp"] = timesLvl * changeSP * toInt(lvl) + perLvl * changeSP;
        }

        this.expert.race = race;
        this.expert.raceSpec = bonus;
    }

    setLvl(lvl, sp, spec, ext = 0) {
        this.lvls[lvl] = {
            "spec": spec,
            "ext": ext,
            "sp": sp,
            "bonusSp": 0,
            "skill": []
        };
        this.expert.lvl = Math.max(this.expert.lvl, lvl);
        if (this.expert.lvl == expertClassSkillFreePickLvl) {
            rememberSkillList(expertClassReq[INPclass.value][0]["advancedSkills"]);
        }
        if (this.expert.lvl >= expertClassSkillFreePickLvl && lvlHistory.expert.spec > 0) {
            rememberSkillList(expertClassReq[INPclass.value][lvlHistory.expert.spec]["skills"]);
        }

    }

    setFirstLvl(sel) {
        this.reset();
        const data = expertClassReq[sel][0];
        this.setLvl(1, toInt(INPskillModif), data["name"]);
        for (var skillId of data["skills"]) {
            this.setSkill(1, getSkillById(skillId)["name"], 3, true);
        }
    }

    subSP(lvl, SP) {
        if (lvl < 1) return SP;
        if (this.lvls[lvl]["sp"] >= SP) {
            this.lvls[lvl]["sp"] -= SP;
            return 0;
        } else if (lvl >= 1) {
            this.subSP(lvl - 1, SP - this.lvls[lvl]["sp"]);
            this.lvls[lvl]["sp"] = 0;
            return 0
        }
        alert("Neznámy stav, kdy v historii není dost SP pro odečet.");
        return -SP;
    }

    setSkill(lvl, skill, step, start) {
        if (lvl < 0) lvl = this.expert.lvl;
        this.lvls[lvl]["skill"].push([skill, step, start]);
        if (!start)
            this.subSP(lvl, step);
    }

    skillAllegeable(lvl, sid) {
        if (sid < 100) return 1;
        var skill = getSkillById(sid);
        if (skill["req"] == -1) return 1;
        for (var l = lvl - 1; l > 0; l--) {
            if (this.lvls[l]["spec"] == skill["req"])
                return l;
        }
        return 0;
    }

    export () {
        const d = "-";
        const s = "_";
        var out = "s=" + this.expert.spec + "&r=" + encodeURI(this.expert.race);
        for (var i = 1; this.lvls.hasOwnProperty(i); i++) {
            var n = getID(specialSkills, this.lvls[i]["spec"]);
            if (Number.isNaN(n)) n = this.lvls[i]["spec"];
            if (this.lvls[i]["ext"]) n += encodeURI(this.lvls[i]["ext"]);
            out += "&" + i + "=" + n + d + this.lvls[i]["sp"];
            for (const skill of this.lvls[i]["skill"]) {
                var n = getSkillId(skill[0]);
                out += d + n + s + skill[1] + s + (skill[2] ? "t" : "f");
            }
        }
        out += "&" + AttrLists.export();
        return out;
    }

    knownSpec(spec) {
        for (const lvl in this.lvls) {
            if (this.lvls[lvl]["spec"] == spec) {
                return true;
            }
        }
        return false;
    }

    processStrReq(req) {
        // requirement for min lvl
        if (req.startsWith("lv")) {
            var lvl = toInt(req.slice(2)); // expected format "lvXYZ"
            return !Number.isNaN(lvl) && this.expert.lvl >= (lvl - 1); // show skills for next lvl
        }
        alert("Unknown special requirement: " + req);
        return true;
    }

    processIntReq(req) {
        // character have required specialization (expert class)
        if (this.expert.spec == req) {
            return true;
            // show all if char is without specialization at specific lvls
        } else if ((this.expert.lvl + 1) % expertClassSkillFreePickLvl == 0) {
            return this.expert.spec < 0;
        }
        // alert("Unknown special requirement: " + req);
        return false;
    }

    specialsAllegeable() {
        var collection = [];
        const charClass = this.lvls[1]["spec"];
        for (var i = 0; i < specialSkills[charClass].length; i++) {
            var item = specialSkills[charClass][i];
            var add = true;
            if (item["req"].length && !this.knownSpec("" + i)) {
                item["req"].every(req => {
                    if (isString(req)) {
                        add = this.processStrReq(req);
                    } else if (isNumber(req)) {
                        add = this.processIntReq(req);
                    }
                    return add;
                });
            }
            if (add) {
                item.index = i;
                collection.push(item);
            }
        }
        return collection
    }

    haveSpecial(spec) {
        for (var key in this.lvls) {
            if (this.lvls[key]["spec"] == spec) return key;
        }
        return false;
    }

    haveSpecialExtended(spec, ext) {
        for (var key in this.lvls) {
            if (this.lvls[key]["spec"] == spec && this.lvls[key]["ext"] == ext) return key;
        }
        return false;
    }

    haveSkill(skillId) {
        var skillName = getSkillById(skillId).name;
        for (var key in this.lvls) {
            for (var ownSkill of this.lvls[key].skill) {
                if (ownSkill[0] == skillName) return key;
            }
        }
    }

    removeLvl(lvl) {
        const sel = this.lvls[1]["spec"];
        var special = this.lvls[lvl]["spec"];
        if (this.expert.spec >= 0) {
            if (expertClassReq[sel][this.expert.spec]["skills"].includes(special)) {
                this.expert.spec = -1;
            }
        }
        for (var delLvl = this.expert.lvl; delLvl >= lvl; delLvl--) {
            delete this.lvls[delLvl];
        }
        this.expert.lvl = lvl - 1;
    }
};
var lvlHistory = new LVLHistory();

function rememberSkill(skill, skillLvl, sid) {
    var actLvl = toInt(INPlevel);
    var freeSP = 0;
    var skillCost = skillLvl;
    var saved = false;
    for (var lvl = 1; lvl <= actLvl; lvl++) {
        var level = lvlHistory.lvls[lvl];
        freeSP += level["sp"];
        if (freeSP >= skillCost) {
            var present = namePresentInArray(level["skill"], skill);
            if (lvl == 1 && present && present < isStartSkill(lvlHistory.lvls[1]["spec"], getSkillId(skill)) * 3) {
                removeSkillHistory(lvl, skill);
                present = 0;
                skillCost = totalSkillCost(skillLvl);
            }
            if (!present && lvlHistory.skillAllegeable(lvl, sid)) {
                saved = true;
                lvlHistory.setSkill(lvl, skill, skillLvl, false);
                INPskillPoint.value -= skillCost;
                loadChar();
                break;
            }
        }
    }
    return saved;
}

function rememberSkillList(specsList) {
    for (var skillId of specsList || []) {
        let skill = getSkillById(skillId);
        let actualStartSkillLvl = skill["startLvl"] || startSkillLvl;

        lvlHistory.setSkill(-1, skill["name"], actualStartSkillLvl, true);
        var ss = skillTable.querySelectorAll("button.classRestrict");
        for (var s of ss) {
            if (s.index == skill["name"]) {
                s.classList.add("taken");
                s.innerHTML = "<span>" + actualStartSkillLvl + "</span>";
                break;
            }
        }
    }
}

function loadChar(data) {
    AttrLists.init();
    if (typeof(data) == "string") {
        lvlHistory.parse(data);
        var sel = setChar();
    } else {
        var sel = lvlHistory.lvls[1]["spec"];
        classSel.querySelectorAll(".taken").forEach(x => x.className = "");
    }

    normalizeHistory();

    const cols = window.innerWidth < 1000 ? 3 : 4;
    createTableStructure(cols, expertTable, expertClassReq[sel], setExpertData, 1);
    createTableStructure(cols, specialTable, lvlHistory.specialsAllegeable(), setSpecialData);
    let skills = getSkills(sel).filter((skill) => requestMet(skill["req"]));
    createTableStructure(cols, skillTable, skills, setSkillData);
    otherSkills = getSkills("all");
    ownSkills = [];

    var search;
    for (var lvl in lvlHistory.lvls) {
        // load class and special
        var special, target;
        if (lvl === "1") {
            INPclass.value = sel;
            special = sel;
            target = classSel;
        } else {
            special = specialSkills[sel][lvlHistory.lvls[lvl]["spec"]]["name"];
            target = specialTable;
        }

        if (special) {
            search = "button[title='" + special + "']";
            var btn = target.querySelector(search);
            if (lvlHistory.lvls[lvl]["ext"])
                btn.classList.add("partial");
            else
                btn.classList.add("taken");
        }

        // load skills
        for (const [s, l] of lvlHistory.lvls[lvl]["skill"]) {
            search = "button[title='" + s + "']";
            var btn = skillTable.querySelector(search);
            btn.innerHTML = "<span>" + Math.max(toInt(btn), l) + "</span>";
            btn.classList.remove("restricted");
        }
    }

    for (var btn of skillTable.querySelectorAll("button")) {
        var skillLvl = toInt(btn);
        if (skillLvl > 0) {
            var index = otherSkills.findIndex(skill => skill["id"] == btn.index);
            otherSkills[index]["lvl"] = skillLvl;
            ownSkills.push(otherSkills[index]);
            otherSkills.splice(index, 1);
        }
    }
    otherSkills = otherSkills.filter(data => !data["znalostni"]);

    createTableStructure(cols, otherSkillsTable, otherSkills, setOtherSkillsData);
    createTableStructure(cols, ownSkillsTable, ownSkills.sort((a, b) => a["name"].localeCompare(b["name"])), setOwnSkillsData);
    createTableStructure(cols, availableActionsTable, availableActions(), setActionsData);

    setAttributes();

    checkSkills();
    for (var type of colorMap) {
        setExpertClass(type);
    }

    if (lvlHistory.expert.spec >= 0) {
        var special = false;
        search = "button[title='" + expertClassReq[sel][lvlHistory.expert.spec]["name"] + "']";
        var btn = expertTable.querySelector(search);
        if (btn) {
            setExpertBtns(btn);
        }
    }

    resetHistory();
}

/** Compute skillpoints granted by class, specialization and training free skills per level
 * @returns {list{number}} - list of skill points per level
 */
function computeGiftedSkillPoints() {
    let spec = lvlHistory.lvls[1]["spec"]
    let keys = expertClassReq[spec][0]["skills"];
    let startingSkills = keys.filter(key => getSkillById(key)["req"] == -1); // skills to have since lv1
    keys = keys.filter(key => !startingSkills.includes(key));
    let specialSkills = keys.filter(key => (typeof(getSkillById(key)["req"])) === "number"); // skills from special training
    keys = keys.filter(key => !specialSkills.includes(key));
    let advancedSkills = keys.filter(key => getSkillById(key)["req"] == "lv6"); // skills from higher lvl and specialization
    keys = keys.filter(key => !advancedSkills.includes(key));
    assert(keys.length == 0);

    let ret = { 1: startingSkills.length * startSkillSP };

    for (key of specialSkills) {
        let skill = getSkillById(key);
        for (let lvl = 1; lvl < lvlHistory.lvls.length; lvl++) {
            if (skill["req"] in lvlHistory.lvls[lvl]) {
                ret[lvl] = skill.startLvl;
                break;
            }
        }
    }
    if (lvlHistory.expert.lvl >= 6) {
        for (let key of advancedSkills) {
            let skill = getSkillById(key);
            ret[6] = (ret[6] || 0) + skill.startLvl;
        }
    }
    return ret;
}

function normalizeHistory() {
    let spMod = skillModifs[lvlHistory.lvls[1]["spec"]];
    let totalSkillPoints = 0;
    let giftedSP = computeGiftedSkillPoints();

    for (let lvl = 1; lvlHistory.lvls.hasOwnProperty(lvl); lvl++) {
        let actLvl = lvlHistory.lvls[lvl];
        let basp = toInt(actLvl["bonusSp"]); // bonus asp per lvl
        if (lvl == "1") {
            var allegeableSkillPoints = basp + bonusSP;
        } else {
            var allegeableSkillPoints = spMod * lvl + basp;
        }
        allegeableSkillPoints += giftedSP[lvl] || 0;

        let ss = actLvl["skill"];
        let usp = 0; // total used skill points for lvl
        for (const [_ /*sName*/ , sLvl, sStarting] of ss) {
            usp += sStarting ? totalSkillCost(sLvl) : toInt(sLvl);
        }
        if (usp > allegeableSkillPoints + totalSkillPoints) alert("Pro lvl " + lvl + " byl překročen limit využitelných dovednostních bodů o " + (usp - allegeableSkillPoints - totalSkillPoints));
        allegeableSkillPoints -= usp;
        actLvl["sp"] = allegeableSkillPoints;
        totalSkillPoints += allegeableSkillPoints;
    }
    INPskillModif.value = spMod;
    INPskillPoint.value = totalSkillPoints;
    lvlHistory.expert.tsp = totalSkillPoints;
}

function totalSkillCost(lvl) {
    lvl = toInt(lvl);
    var cost = 0
    for (var i = 1; i <= lvl; i++) cost += i;
    return cost;
}

function checkSkills() {
    var allow = false;
    var list = skillTable.querySelectorAll("button");
    const lvl = lvlHistory.expert.lvl;
    for (var btn of list) {
        const SP = lvlHistory.expert.tsp;
        const starter = isStartSkill(lvlHistory.lvls[1]["spec"], btn.index) ? 2 : 0;
        const spNeeded = toInt(btn) + 1;
        if (starter) {
            allow = spNeeded <= SP && spNeeded - starter <= lvl;
        } else {
            allow = spNeeded <= SP && namePresentInArray(lvlHistory.lvls[lvl]["skill"], btn.title) == 0;
        }
        const ll = lvlHistory.lvls[lvl]["skill"];
        const l = getID(ll, btn.title);
        if (l >= 0) {
            if (lvl > 1 || !starter || ll[l][1] >= (lvl - lvlHistory.skillAllegeable(lvl + 1, btn.index) + 3)) {
                btn.classList.add("restricted");
            }
            btn.classList.add("taken");
        } else if (!allow) {
            btn.classList.add("restricted");
        }
    }
}

function removeHist(el) {
    lvlHistory.removeLvl(el.parentElement.index);
    INPlevel.value = lvlHistory.expert.lvl;
    if (lvlHistory.expert.spec > 0) { // reset specialization if not available at current lvl
        if (!setExpertClass(colorMap[lvlHistory.expert.spec])) lvlHistory.expert.spec = -1;
    }
    loadChar();
}

function removeSkillHistory(lvl, skill) {
    var lls = lvlHistory.lvls;
    for (var l = lvl; lls.hasOwnProperty(l); l++) {
        for (var i = 0; i < lls[l]["skill"].length; i++) {
            if (lls[l]["skill"][i][0] == skill) {
                var skillCost = lls[l]["skill"][i][1];
                if (l == 1) {
                    skillCost = skillCost > 1 ? 6 : 1;
                }
                lls[l]["sp"] += skillCost;
                lls[l]["skill"].splice(i, 1);
                break;
            }
        }
    }
    loadChar();
}

function removeOneHistory(nobrEl) {

    var skill = nobrEl.innerText.split(":")[0];
    var lvl = nobrEl.parentElement.parentElement.firstChild.innerText.split(" ")[1];

    if (nobrEl.nextSibling) nobrEl.nextSibling.remove();
    nobrEl.remove();

    removeSkillHistory(lvl, skill);
}

function resetHistory() {
    clearTable(historyTable);
    const sel = lvlHistory.lvls[1]["spec"];
    const actLvl = lvlHistory.expert.lvl;
    var tdBtn = document.createElement("td");
    tdBtn.innerHTML = "<button class='taken' onclick='removeHist(this)'>X</button>";
    tdBtn.style.width = "auto";
    tdBtn.style.lineHeight = "100%";
    for (var lvl = 1; lvl <= actLvl; lvl++) {
        if (lvl == 1) {
            var spec = lvlHistory.lvls[lvl]["spec"];
        } else {
            var spec = specialSkills[sel][lvlHistory.lvls[lvl]["spec"]]["name"];
        }
        const extended = (lvlHistory.lvls[lvl]["ext"] != 0) ? (": " + lvlHistory.lvls[lvl]["ext"]) : "";
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = "<div class='histHead'>Level " + lvl + "</div>";
        td1.innerHTML += "<div class='histSpec'>Schopnost: " + spec + extended + "</div>";
        td1.innerHTML += "<div class='histSkills'>Dovednosti: " + lvlHistory.lvls[lvl]["skill"].map(x => "<nobr class='histAttr removable' onclick='removeOneHistory(this)'>" + x[0] + ": " + x[1] + "</nobr>").join(", ") + "</div>";
        td1.colSpan = "3";
        if (lvl > 1) {
            var td2 = tdBtn.cloneNode(true);
            td2.index = lvl;
            tr.appendChild(td1);
            tr.appendChild(td2);
        } else {
            tr.appendChild(td1);
        }
        historyTable.firstElementChild.appendChild(tr);
    }
}

function setClasses() {
    for (var prop in expertClassReq) {
        var clas = expertClassReq[prop];
        var btn = document.createElement("button");
        btn.value = prop;
        btn.title = clas[0]["name"];
        btn.style.backgroundImage = "url(" + contPath + clas[0]["img"] + ")";
        btn.onclick = function(e) {
            reset(e.target.value);
        }
        classSel.appendChild(btn);
    }
}

function setGenericBtnTile(btn, data, index) {
    btn.tabindex = -1;
    btn.title = data["name"];
    btn.style.backgroundImage = "url(" + contPath + data["img"] + ")";
    btn.index = index;
}

function setExpertData(btn, data, i) {
    setGenericBtnTile(btn, data, i);
    btn.onclick = expertUp;
    btn.className = colorMap[i - 1];
    btn.classList.add("restricted");
    btn.innerHTML = "<hr/>";
}

function setSpecialData(btn, data, i) {
    setGenericBtnTile(btn, data, data.index);
    btn.className = colorExpertClass(INPclass.value, i);
    if (data.repetable != undefined && data.repetable.length > 0) {
        var options = document.createElement("select");
        var option = document.createElement("option");
        option.innerText = "---";
        options.appendChild(option);
        for (var opt of data.repetable) {
            option = document.createElement("option");
            if (opt.startsWith("?")) {
                option.innerText = "vlastní";
                option.value = opt.slice(1);
            } else {
                option.innerText = opt;
                option.value = opt;
            }
            if (lvlHistory.haveSpecialExtended(i, option.value)) continue;
            options.appendChild(option);
        }
        options.className = "hiddenSpecialOption";
        options.selectedIndex = 0;
        options.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        options.onchange = specialUpExtended;
        btn.appendChild(options);
    } else {
        btn.onclick = specialUp;
    }
}

function setSkillData(btn, data, _) {
    setGenericBtnTile(btn, data, data["id"]);
    btn.onclick = skillUp;
    btn.innerHTML = "<span>0</span>";
    btn.className = "";
    for (var attr of data["atr"]) {
        btn.classList.add("skill" + attr);
    }
    if (data["znalostni"] === true) {
        btn.classList.add("znalsotni");
    }
}

function setOtherSkillsData(btn, data, _) {
    setGenericBtnTile(btn, data, data["id"]);
    btn.className = "";
    for (var attr of data["atr"]) {
        btn.classList.add("skill" + attr);
    }
    var imgSrc = data["img"];
}

function setOwnSkillsData(btn, data, _) {
    setGenericBtnTile(btn, data, data["id"]);
    btn.innerHTML = "<span>" + data["lvl"] + "</span>";
    btn.className = "";
    for (var attr of data["atr"]) {
        btn.classList.add("skill" + attr);
    }
    btn.classList.add("taken");
}

function showHint() {
    var hint = document.getElementById("actionHint");
    hint.style.display = "block";
    const data = this.actionData

    function timeIt(val) {
        if (val == pul) return "půl kola";
        if (val == 1) return "1 kolo";
        if (val >= 2 && val <= 4) return val + " kola";
        if (val % minuta) return val + " kol";
        if (val == minuta) return "1 minuta";
        if (val % hodina && val >= 2 * minuta && val <= 4 * minuta) return (val / minuta) + " minuty";
        if (val % hodina) return (val / minuta) + " minut";
        if (val == hodina) return "1 hodina";
        if (val % den && val >= 2 * hodina && val <= 4 * hodina) return (val / hodina) + " hodiny";
        if (val % den) return (val / hodina) + " hodin";
        if (val == den) return "1 den";
        if (val % mesic && val >= 2 * den && val <= 4 * den) return (val / den) + " dny";
        if (val % mesic) return (val / den) + " dnů";
        if (val == mesic) return "1 měsíc";
        if (val % rok && val >= 2 * mesic && val <= 4 * mesic) return (val / hodina) + " měsíce";
        if (val % rok) return (val / mesic) + " měsíců";
        if (val == rok) return "1 rok";
        if (val % stoleti && val >= 2 * rok && val <= 4 * rok) return (val / rok) + " roky";
        if (val % stoleti) return (val / rok) + " let";
        return "";
    }

    function n(val) { if (Number.isNaN(val) || isString(val)) { return val; } else if (val == 0) { return "-"; } else { return timeIt(val); } }

    function t(val) { if (Number.isNaN(val) || isString(val)) { return val; } else if (val == 0) { return "ihned"; } else { return timeIt(val); } }

    if (data.type == "trick") {
        hint.innerHTML = `<table class="skillHint"><tr><th title="Jméno">${n(data.name)}</th></tr><tr><td title="Podmínka užití">${n(data.cost)}</td></tr><tr><td title="Ověření">${n(data.check)}</td></tr><tr><td title="Popis">${n(data.text)}</td></tr><tr><td title="Efekt na životy">${n(data.dmg)}</td></tr></table>`;
    }
    if (data.type == "spell") {
        hint.innerHTML = `<table class="skillHint"><tr><th colspan="3" title="Jméno">${n(data.name)}</th></tr><tr><td title="Cena">${n(data.cost)}</td><td title="Dosah">${n(data.range)}</td><td title="Rozsah">${n(data.target)}</td></tr><tr><td title="Vyvolávání">${t(data.cTime)}</td><td title="Trvání">${t(data.duration)}</td><td title="Obtížnost">${n(data.difficulty)}</td></tr><tr><td colspan="3" title="Ověření">${n(data.check)}</td></tr><tr><td colspan="3" title="Popis">${n(data.text)}</td></tr><tr><td colspan="3" title="Efekt na životy">${n(data.dmg)}</td></tr></table>`;
    }
    if (data.type == "recip") {
        var senses = data.recognition.split("/");
        var sens = `<td colspan="3" title="Vzhled">${n(data.recognition)}</td>`;
        if (senses.length == 3) {
            sens = `<td title="Barva">${n(senses[0])}</td><td title="Chuť">${n(senses[1])}</td><td title="Vůně">${n(senses[2])}</td>`
        }
        hint.innerHTML = `<table class="skillHint"><tr><th colspan="3" title="Jméno">${n(data.name)}</th></tr><tr><td title="Mana">${n(data.cost)}</td><td title="Suroviny">${n(data.ingredients)}</td><td title="Základ">${n(data.mainIng)}</td></tr><tr><td title="Doba výroby">${t(data.cTime)}</td><td title="Trvání efektu">${t(data.duration)}</td><td title="Obtížnost">${n(data.difficulty)}</td></tr><tr>${sens}</tr><tr><td colspan="3" title="Ověření">${n(data.check)}</td></tr><tr><td colspan="3" title="Popis">${n(data.text)}</td></tr><tr><td colspan="3" title="Efekt na životy">${n(data.dmg)}</td></tr></table>`;
    }

    var rectBtn = this.getBoundingClientRect();
    var rectHin = hint.getBoundingClientRect();
    hint.style.left = (rectBtn.left - rectHin.width - 5) + "px";
    hint.style.top = (rectBtn.top - 5) + "px";
}

function hideHint() {
    var hint = document.getElementById("actionHint");
    hint.style.display = "none";
}

function setActionsData(btn, data, _) {
    setGenericBtnTile(btn, data, data.id);
    btn.actionData = data;
    btn.className = "action taken hiddenTitle";
    if (data.free) {
        btn.classList.add("free");
        btn.classList.add("selected");
    }
    btn.onclick = selectAction;
    btn.onmouseenter = showHint;
    btn.onmouseout = hideHint;
}

function requestMet(req) {
    var val;
    const regexLvl = /lv ?(\d+)/;
    const regexSkill = /sk ?(\d+)/;
    const regexSpecial = /sp ?(\d+)/;

    if (isNumber(req)) {
        if (req == -1) return true;
        return lvlHistory.haveSpecial(req);
    }

    if (lvlHistory.haveSpecial(req)) return true;

    function MatchReg(val, reg) { var regMatch = val.match(reg); return regMatch ? toInt(regMatch[1]) : 0; }

    val = MatchReg(req, regexLvl);
    if (val && lvlHistory.expert.lvl >= val) return true;

    val = MatchReg(req, regexSpecial);
    if (val && lvlHistory.haveSpecial(val)) return true;

    val = MatchReg(req, regexSkill);
    if (val && lvlHistory.haveSkill(val)) return true;

    return IdToExpertSpec(lvlHistory.lvls[1]["spec"], lvlHistory.expert.spec) == req;
}

function availableActions() {
    var data = [];
    for (var key in tricksAndMagic) {
        const val = tricksAndMagic[key];
        var add = true;
        for (var i = 0; i < val.req.length; i++) {
            if (!requestMet(val.req[i])) {
                add = false;
                break;
            }
        }
        if (add) {
            var item = JSON.parse(JSON.stringify(val));
            item.id = key;
            data.push(item);
        }
    }
    return data;
}

function clearTable(tbl) {
    while (tbl.firstElementChild.childNodes.length > 2) {
        tbl.firstElementChild.removeChild(tbl.firstElementChild.lastChild);
    }
}

function createTableStructure(cols, target, data, setBtn, firstItem = 0) {
    clearTable(target);
    var tr = document.createElement("tr");
    for (var i = firstItem; i < data.length; i++) {
        var td = document.createElement("td");
        var btn = document.createElement("button");
        setBtn(btn, data[i], i);
        // btn.style.zIndex = cols - (i % cols);
        td.appendChild(btn)
        tr.appendChild(td);
        if (tr.children.length >= cols) {
            target.firstElementChild.appendChild(tr);
            tr = document.createElement("tr");
        }
    }
    if (tr.children.length > 0) {
        target.firstElementChild.appendChild(tr);
    }
}

function setChar() {
    const sel = lvlHistory.lvls[1]["spec"];
    INPclass.value = sel;
    INPlevel.value = Object.keys(lvlHistory.lvls).length;
    INPskillPoint.value = Object.values(lvlHistory.lvls).reduce((t, ss) => t + ss["sp"]);
    INPskillModif.value = skillModifs[sel];
    return sel;
}

function reset(sel) {
    if (sel === undefined) sel = INPclass.value;
    raceSelect.selectedIndex = 0;
    lvlHistory.setLvl(1, toInt(INPskillModif), expertClassReq[sel][0]["name"]);
    lvlHistory.setFirstLvl(sel);
    setChar();
    loadChar();
}

function setExpertClass(type) {
    var possibleClass = expertTable.querySelector("button:not(.forsaken)." + type);
    if (!possibleClass) return false;
    var classInfo = expertClassReq[INPclass.value];
    var special = specialTable.querySelectorAll("button.taken." + type);
    for (var i = 1; i < classInfo.length; i++) {
        if (INPlevel.value >= (expertClassSkillFreePickLvl - 1) && colorMap[i - 1] == type && special.length == classInfo[i]["req"].length) {
            possibleClass.classList.remove("restricted");
            possibleClass.classList.add("pulsate");
            return true;
        }
    }
    return false;
}

function namePresentInArray(array, skill) {
    for (const [s, l] of array) {
        if (s == skill)
            return l;
    }
    return 0;
}

function setExpertBtns(el) {
    el.classList.add("taken");
    el.classList.remove("restricted");
    var list = expertTable.querySelectorAll("button:not(taken)");
    for (var btn of list) {
        if (btn != el) {
            btn.classList.add("forsaken");
            btn.classList.remove("pulsate");
        }
    }
}

function expertUp() {
    if (this.classList.contains("taken") || this.classList.contains("forsaken") || this.classList.contains("restricted")) return;
    lvlHistory.expert.spec = this.index;
    setExpertBtns(this);
    loadChar();
}

function specialUp() {
    if (this.classList.contains("taken")) return;
    var cName = this.className; // className would change next line
    setExpertClass(cName);
    var lvl = toInt(INPlevel) + 1;
    INPlevel.value = lvl;
    lvlHistory.setLvl(lvl, 0, this.index);
    rememberSkillList(specialSkills[INPclass.value][this.index]["skills"]);
    loadChar();
}

function specialUpExtended() {
    var option = this.options[this.selectedIndex].text;
    if (option == "vlastní") option = prompt(this.options[this.selectedIndex].value);
    if (!option) return;
    var lvl = toInt(INPlevel) + 1;
    INPlevel.value = lvl;
    lvlHistory.setLvl(lvl, 0, this.parentElement.index, option);
    loadChar();
}

function skillUp() {
    if (this.classList.contains("restricted")) return;
    this.classList.add("taken");
    skillCost = toInt(this) + 1;
    this.innerHTML = "<span>" + skillCost + "</span>";
    if (!rememberSkill(this.title, skillCost, this.index)) {
        this.innerHTML = "<span>" + (skillCost - 1) + "</span>";
        this.classList.add("restricted");
        alert("skillUp error: Pokus o uložení dovednosti, na kterou nebyl nárok: " + this.title + " na stup. " + skillCost);
    }
}

function selectAction() {
    if (tricksAndMagic[this.index].free) return;
    this.classList.toggle("selected");
}

function myImport() {
    var encoded = prompt("Vlož kód pro postavu");
    if (encoded)
        loadChar(encoded);
}

function myExport() {
    var newAdr = location.href.split("?")[0] + "?" + lvlHistory.export();
    cpyClip(newAdr);
}

function setWeebly() {
    mw = document.getElementById("main-wrap");
    if (mw) {
        mw.style.padding = "30px 0";
        cs = mw.firstElementChild.style;
        cs.padding = 0;
        cs.minHeight = 0;
        cs.width = "100%";
        cs.border = "none";
    }
}

function cpyClip(text) {
    INPcpyClip.value = text;
    INPcpyClip.select();
    INPcpyClip.setSelectionRange(0, 99999);
    document.execCommand("copy");
    INPcpyClip.value = "";
    alert("Adresa postavy zkopírována do paměti zařízení: " + text);
}

function updateAttrs() {
    AttrLists.update();
}

function setAttributes() {
    raceSelect.innerHTML = "";
    for (var race of races) {
        var option = document.createElement("option");
        option.innerHTML = race.name;
        option.value = race.attr + "|" + race.spec;
        raceSelect.appendChild(option);
        if (race.name == lvlHistory.expert.race) {
            raceSelect.selectedIndex = raceSelect.children.length - 1;
        }
    }
    var takenClasses = classSel.querySelectorAll(".taken");
    AttrLists.set(AttrLists.povolani, classes[takenClasses[0].value]);
    raceChangeEvent(raceSelect);
}

function raceChangeEvent(el) {
    const template = "sil,obr,odo,int,cha|specialRace";
    const { sil, obr, odo, int, cha, specialRace } = parseToVars(el.value, template, [",", "|"]);
    AttrLists.set(AttrLists.rasa, [sil, obr, odo, int, cha]);
    var raceOption = el.children[el.selectedIndex];
    lvlHistory.setRace(raceOption.innerText, specialRace);
    AttrLists.update();
    normalizeHistory();
}