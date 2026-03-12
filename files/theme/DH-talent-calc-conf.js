const contPath = "files/theme/";
//const contPath = "0";

function sumUpTo(x) {
    return x * (x + 1) / 2;
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}
const startSkillLvl = 3; // start skill lvl = 3 for lv1+
const startSkillSP = sumUpTo(startSkillLvl); // start skill lvl = 3 => 1+2+3 = 6
const bonusSP = 3; // free SP to start with at lvl 1
const colorMap = ["expertRed", "expertGre", "expertBlu"]; // nazev css tridy pro obarveni

const skillModifs = { "Válečník": 3, "Hraničář": 5, "Alchymista": 4, "Kouzelník": 3, "Zloděj": 5, "Klerik": 3 }; // kolik dovednostních bodu dana povolani dostanou na lvl

const skills = {
    // skill IDs needs to be persistent and continuous for getSkillById() to work without lookup
    general: [
        { "id": 0, "name": "Akrobacie", "img": "skill/akrobacie.png", "req": -1, "znalostni": false, "atr": ["OBR"] },
        { "id": 1, "name": "Atletika", "img": "skill/atletika.png", "req": -1, "znalostni": false, "atr": ["SIL"] },
        { "id": 2, "name": "Cizí jazyky", "img": "skill/cizi_jazyky.png", "req": -1, "znalostni": true, "atr": ["INT"] },
        { "id": 3, "name": "Čtení a psaní", "img": "skill/cteni_a_psani.png", "req": -1, "znalostni": true, "atr": ["INT"] },
        { "id": 4, "name": "Historie", "img": "skill/historie.png", "req": -1, "znalostni": true, "atr": ["INT"] },
        { "id": 5, "name": "Jízda na zvířeti", "img": "skill/jizda_na_koni.png", "req": -1, "znalostni": false, "atr": ["OBR"] },
        { "id": 6, "name": "Mechanika", "img": "skill/mechanika.png", "req": -1, "znalostni": true, "atr": ["INT", "OBR"] },
        { "id": 7, "name": "Plavání", "img": "skill/plavani.png", "req": -1, "znalostni": true, "atr": ["SIL", "OBR"] },
        { "id": 8, "name": "Plížení", "img": "skill/plizeni.png", "req": -1, "znalostni": false, "atr": ["OBR"] },
        { "id": 9, "name": "Postřeh", "img": "skill/postreh.png", "req": -1, "znalostni": false, "atr": ["INT"] },
        { "id": 10, "name": "První pomoc", "img": "skill/prvni_pomoc.png", "req": -1, "znalostni": false, "atr": ["OBR"] },
        { "id": 11, "name": "Přežití v přírodě", "img": "skill/preziti_v_prirode.png", "req": -1, "znalostni": false, "atr": ["OBR"] },
        { "id": 12, "name": "Reflex", "img": "skill/reflex.png", "req": -1, "znalostni": false, "atr": ["OBR"] },
        { "id": 13, "name": "Řemesla", "img": "skill/remesla.png", "req": -1, "znalostni": false, "atr": ["OBR", "SIL"] },
        { "id": 14, "name": "Umění", "img": "skill/umeni.png", "req": -1, "znalostni": false, "atr": ["CHA", "OBR"] },
        { "id": 15, "name": "Teologie", "img": "skill/teologie.png", "req": -1, "znalostni": true, "atr": ["INT"] },
        { "id": 16, "name": "Vůle", "img": "skill/vule.png", "req": -1, "znalostni": false, "atr": ["CHA"] },
        { "id": 17, "name": "Výdrž", "img": "skill/vydrz.png", "req": -1, "znalostni": false, "atr": ["ODO"] },
        { "id": 18, "name": "Znalost přírody", "img": "skill/priroda.png", "req": -1, "znalostni": false, "atr": ["INT"] },
        { "id": 19, "name": "Zpracování zvěře", "img": "skill/zprac_zvere.png", "req": -1, "znalostni": false, "atr": ["OBR"] },
    ],
    //dovednosti: ID, nazev, hl.atribut, obrazek, IDpozadovane schopnosti (-1 = od lvl 1)
    "Válečník": [],
    "Hraničář": [
        { "id": 200, "name": "Pouto s přírodou", "img": "skill/pouto_s_prirodou.png", "req": -1, "znalostni": true, "atr": ["INT"], "startLvl": 3 },
        { "id": 201, "name": "Lov", "img": "skill/lov.png", "req": -1, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 202, "name": "Orientace", "img": "skill/orientace.png", "req": -1, "znalostni": false, "atr": ["INT"], "startLvl": 3 },
        { "id": 203, "name": "Předpovídání počasí", "img": "skill/predpovidani_pocasi.png", "req": -1, "znalostni": false, "atr": ["INT"], "startLvl": 3 },
        { "id": 204, "name": "Stopování", "img": "skill/stopovani.png", "req": -1, "znalostni": false, "atr": ["INT"], "startLvl": 3 },
        { "id": 205, "name": "Léčitelství", "img": "skill/special/hra/lecitelstvi.png", "req": 2, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 206, "name": "Kamufláž", "img": "skill/special/hra/kamuflaz.png", "req": 6, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 207, "name": "Líčení pastí", "img": "skill/special/hra/liceni_pasti.png", "req": 6, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 208, "name": "Zahlazování stop", "img": "skill/special/hra/zahlazovani_stop.png", "req": 6, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 209, "name": "Ochočování zvířat", "img": "skill/special/hra/ochocovani.png", "req": 3, "znalostni": false, "atr": ["CHA"], "startLvl": 3 },
        { "id": 210, "name": "Pohyb v terénu", "img": "skill/special/hra/pohyb_v_terenu.png", "req": "lv6", "znalostni": false, "atr": ["OBR"], "startLvl": 5 },
        { "id": 211, "name": "Přírodní překážky", "img": "skill/special/hra/prirodni_prekazky.png", "req": "lv6", "znalostni": false, "atr": ["OBR"], "startLvl": 5 },
        { "id": 212, "name": "Výroba šípů", "img": "skill/special/hra/vyroba_sipu.png", "req": "lv6", "znalostni": false, "atr": ["OBR"], "startLvl": 5 },
        { "id": 213, "name": "Znalost místních poměrů", "img": "skill/special/hra/znalost_mistnich_pomeru.png", "req": "Chodec", "znalostni": false, "atr": ["OBR"], "startLvl": 5 },
    ],
    "Alchymista": [
        { "id": 300, "name": "Vidění many", "img": "skill/videni_many.png", "req": -1, "znalostni": true, "atr": ["INT"], "startLvl": 3 },
        { "id": 301, "name": "Destilace", "img": "skill/destilace.png", "req": -1, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 302, "name": "Lučba", "img": "skill/lucba.png", "req": -1, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 303, "name": "Pokročilá identifikace", "img": "skill/special/alc/pokrocila_identifikace.png", "req": 2, "znalostni": true, "atr": ["INT"], "startLvl": 3 },
        { "id": 304, "name": "Výroba svitků", "img": "skill/special/alc/vyroba_svitku.png", "req": 5, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 305, "name": "Chirurgie", "img": "skill/special/alc/chirurgie.png", "req": "Medicus", "znalostni": true, "atr": ["OBR"], "startLvl": 5 },
        { "id": 306, "name": "Pyromancie", "img": "skill/special/alc/pyromancie.png", "req": "Pyromant", "znalostni": true, "atr": ["OBR"], "startLvl": 5 },
        { "id": 307, "name": "Theurgie", "img": "skill/special/alc/theurgie.png", "req": "Theurg", "znalostni": true, "atr": ["INT"], "startLvl": 5 },
    ],
    "Kouzelník": [
        { "id": 400, "name": "Sesílání kouzel", "img": "skill/sesilani_kouzel.png", "req": -1, "znalostni": true, "atr": ["INT"], "startLvl": 3 }
    ],
    "Zloděj": [
        { "id": 500, "name": "Hazardní hry", "img": "skill/hazardni_hry.png", "req": -1, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 501, "name": "Odhad ceny", "img": "skill/odhad_ceny.png", "req": -1, "znalostni": false, "atr": ["INT"], "startLvl": 3 },
        { "id": 502, "name": "Přesvědčování", "img": "skill/presvedcovani.png", "req": -1, "znalostni": false, "atr": ["CHA"], "startLvl": 3 },
        { "id": 503, "name": "Vybírání kapes", "img": "skill/vybirani_kapes.png", "req": -1, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 504, "name": "Umění kočičího pohyb", "img": "skill/special/zlo/kocici_pohyb.png", "req": 6, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 505, "name": "Umění proměn", "img": "skill/special/zlo/promeny.png", "req": 7, "znalostni": true, "atr": ["CHA"], "startLvl": 3 },
        { "id": 506, "name": "Umění skrývání", "img": "skill/special/zlo/skryvani.png", "req": 8, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 507, "name": "Umění šarmu", "img": "skill/special/zlo/sarm.png", "req": 9, "znalostni": true, "atr": ["CHA"], "startLvl": 3 },
        { "id": 508, "name": "Umění rváčů", "img": "skill/special/zlo/rvaci.png", "req": 10, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 509, "name": "Umění železného klíče", "img": "skill/special/zlo/zelezny_klic.png", "req": 11, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 510, "name": "Umění přepadů", "img": "skill/special/zlo/prepady.png", "req": 28, "znalostni": true, "atr": ["OBR"], "startLvl": 5 },
        { "id": 511, "name": "Umění neférového boje", "img": "skill/special/zlo/neferovy_boj.png", "req": 39, "znalostni": true, "atr": ["OBR"], "startLvl": 5 },
        { "id": 512, "name": "Umění boje s pláštěm", "img": "skill/special/zlo/boj_s_plastem.png", "req": 46, "znalostni": true, "atr": ["OBR"], "startLvl": 5 },
    ],
    "Klerik": [
        { "id": 600, "name": "Prosby", "img": "skill/prosby.png", "req": -1, "znalostni": true, "atr": ["CHA"], "startLvl": 3 }
    ]
};

const races = [
    { name: "Barbar", attr: [9, 8, 8, 5, 5], spec: null },
    { name: "Člověk 1.0", attr: [7, 7, 7, 7, 7], spec: "DB+2/lvl" },
    { name: "Člověk 1.1", attr: [7, 7, 7, 7, 7], spec: "DB+2*lvl" },
    { name: "Člověk 1.2", attr: [7, 7, 7, 7, 7], spec: "DB+1*lvl" },
    { name: "Elf", attr: [6, 7, 5, 10, 9], spec: "Skill+2:9 INT;204 INT;300 INT;303 INT;517 OBR;521 OBR" },
    { name: "Gnóm", attr: [3, 10, 5, 9, 5], spec: "Skill+2:6 OBR;10 OBR;13 OBR;14 OBR;19 OBR;205 OBR;206 OBR;207 OBR;208 OBR;301 OBR;302 OBR;304 OBR;500 OBR;503 OBR;519 OBR;520 OBR;521 OBR" },
    { name: "Obr", attr: [12, 3, 12, 3, 3], spec: null },
    { name: "Půlčík", attr: [6, 9, 6, 7, 8], spec: "Skill+2:8 OBR;201 OBR;206 OBR;512 OBR" },
];

const classes = {
    "Válečník": [3, 0, 3, 0, 0],
    "Hraničář": [0, 3, 0, 3, 0],
    "Alchymista": [0, 3, 3, 0, 0],
    "Kouzelník": [0, 0, 0, 3, 3],
    "Zloděj": [0, 3, 0, 0, 3],
    "Klerik": [0, 0, 0, 3, 3],
};


function getSkills(select = false) {
    if (!select) return skills.general;
    if ((select.toLowerCase() == "all")) {
        toRet = [];
        for (arr in skills) toRet = toRet.concat(skills[arr]);
        return toRet;
    }
    return skills.general.concat(skills[select]);
}

function getSkillById(id) {
    if (typeof(id) != "number") id = Number.parseInt(id);
    switch (Math.floor(id / 100)) {
        case 0:
            return skills.general[id];
        case 1:
            return skills["Válečník"][id % 100];
        case 2:
            return skills["Hraničář"][id % 100];
        case 3:
            return skills["Alchymista"][id % 100];
        case 4:
            return skills["Kouzelník"][id % 100];
        case 5:
            return skills["Zloděj"][id % 100];
        case 6:
            return skills["Klerik"][id % 100];
        default:
            alert("ERROR: getSkillById: Neznámý skill s id=" + id);
            return skills.general[0];
    }
}

function getSkillId(skillName) {
    for (j in skills) {
        for (var i = 0; i < skills[j].length; i++) {
            if (skills[j][i]["name"] == skillName) return skills[j][i]["id"];
        }
    }
    return -1;
};

// na kterém lvlu je možné si vzít libovolnou schopnost specializace
const expertClassSkillFreePickLvl = 6;

// povolání, profesní dovednosti a specializace
const expertClassReq = {
    "Válečník": [
        { "name": "Válečník", "img": "class/val.png", "skills": [1, 10, 17], "short": "val" },
        { "name": "Berserker", "img": "class/ber.png", "req": [3, 7, 9], "skills": [], "short": "ber" },
        { "name": "Rytíř", "img": "class/ryt.png", "req": [4, 6, 11], "skills": [], "short": "ryt" },
        { "name": "Šermíř", "img": "class/ser.png", "req": [1, 8, 10], "skills": [], "short": "ser" },
    ],
    "Hraničář": [
        { "name": "Hraničář", "img": "class/hra.png", "skills": [10, 11, 18, 200, 201, 202, 203, 204], "advancedSkills": [210, 211, 212], "short": "hra" },
        { "name": "Chodec", "img": "class/cho.png", "req": [4, 6, 11], "skills": [213], "short": "cho" },
        { "name": "Druid", "img": "class/dru.png", "req": [1, 2, 9], "skills": [], "short": "dru" },
        { "name": "Pán zvířat", "img": "class/pan.png", "req": [0, 3, 10], "skills": [], "short": "pan" },
    ],
    "Alchymista": [
        { "name": "Alchymista", "img": "class/alc.png", "skills": [3, 6, 18, 300, 301, 302], "short": "alc" },
        { "name": "Medicus", "img": "class/med.png", "req": [4, 6, 9], "skills": [305], "short": "med" },
        { "name": "Pyromant", "img": "class/pyr.png", "req": [5, 7, 8], "skills": [306], "short": "pyr" },
        { "name": "Theurg", "img": "class/the.png", "req": [3, 10, 11], "skills": [307], "short": "the" },
    ],
    "Kouzelník": [
        { "name": "Kouzelník", "img": "class/kou.png", "skills": [2, 3, 4, 400], "short": "kou" },
        { "name": "Bojový mág", "img": "class/bma.png", "req": [3, 6, 7], "skills": [], "short": "bma" },
        { "name": "Čaroděj", "img": "class/car.png", "req": [1, 10, 11], "skills": [], "short": "car" },
        { "name": "Nekromant", "img": "class/nek.png", "req": [2, 8, 9], "skills": [], "short": "nek" },
    ],
    "Zloděj": [
        { "name": "Zloděj", "img": "class/zlo.png", "skills": [0, 9, 12, 500, 501, 502, 503], "short": "zlo" },
        { "name": "Assassin", "img": "class/ass.png", "req": [3, 8, 10], "skills": [510], "short": "ass" },
        { "name": "Lupič", "img": "class/lup.png", "req": [0, 6, 11], "skills": [511], "short": "lup" },
        { "name": "Sicco", "img": "class/sic.png", "req": [5, 7, 9], "skills": [512], "short": "sic" },
    ],
    "Klerik": [
        { "name": "Klerik", "img": "class/kle.png", "skills": [3, 15, 16, 600], "short": "kle" },
        { "name": "Bojový mnich", "img": "class/bmn.png", "req": [0, 6, 10], "skills": [], "short": "bmn" },
        { "name": "Exorcista", "img": "class/exo.png", "req": [2, 7, 8], "skills": [], "short": "exo" },
        { "name": "Kněz", "img": "class/kne.png", "req": [4, 9, 11], "skills": [], "short": "kne" },
    ]
};

function IdToExpertSpec(sel, id) {
    if (id < 0) id = 0;
    return expertClassReq[sel][id]["name"];
}

// mapa nazvu povolani na pole schopnosti toho povolani
// kazda schopnost je pole dvou prvku: nazev, obrazek
const specialSkills = {
    "Válečník": [
        { "name": "Mistrovství ve zbrani", "img": "skill/special/val/mistrovstvi_ve_zbrani.png", "skills": [], "req": [], "repetable": ["sečné", "bodné", "drtivé", "?Vlastní typ zbraně"] }, //0
        { "name": "Rozvážnost", "img": "skill/special/val/rozvaznost.png", "skills": [], "req": [] },
        { "name": "Skvělá kondice", "img": "skill/special/val/skvela_kondice.png", "skills": [], "req": [] },
        { "name": "Urputnost", "img": "skill/special/val/urputnost.png", "skills": [], "req": [] },
        { "name": "Velení", "img": "skill/special/val/veleni.png", "skills": [], "req": [] },
        { "name": "Vícenásobný útok", "img": "skill/special/val/vicenasobny_utok.png", "skills": [], "req": [] }, //5
        { "name": "Škola boje s jednoruční zbraní", "img": "skill/special/val/skola_jednorucni.png", "skills": [], "req": [] },
        { "name": "Škola boje s obouruční zbraní", "img": "skill/special/val/skola_dvourucni.png", "skills": [], "req": [] },
        { "name": "Škola boje s bodnou zbraní", "img": "skill/special/val/skola_bodne.png", "skills": [], "req": [] },
        { "name": "Škola boje drtičů kostí", "img": "skill/special/val/skola_drtic_kosti.png", "skills": [], "req": [] },
        { "name": "Škola boje se dvěma zbraněmi", "img": "skill/special/val/skola_dve_zbrane.png", "skills": [], "req": [] }, //10
        { "name": "Škola boje se štítem", "img": "skill/special/val/skola_stit.png", "skills": [], "req": [] },
        { "name": "Bijec", "img": "skill/special/val/PPP0/bijec.png", "skills": [], "req": ["lv6"] },
        { "name": "Drtivý dopad", "img": "skill/special/val/PPP0/drtivy_dopad.png", "skills": [], "req": ["lv6"] },
        { "name": "Drsňák", "img": "skill/special/val/PPP0/drsnak.png", "skills": [], "req": ["lv6"] },
        { "name": "Klidná ruka", "img": "skill/special/val/PPP0/klidna_ruka.png", "skills": [], "req": ["lv6"] }, //15
        { "name": "Nával adrenalinu", "img": "skill/special/val/PPP0/naval_adrenalinu.png", "skills": [], "req": ["lv6"] },
        { "name": "Odhad protivníka", "img": "skill/special/val/PPP0/odhad_protivnika.png", "skills": [], "req": ["lv6"] },
        { "name": "Otloukánek", "img": "skill/special/val/PPP0/otloukanek.png", "skills": [], "req": ["lv6"] },
        { "name": "Práce s těžišťem", "img": "skill/special/val/PPP0/prace_s_tezistem.png", "skills": [], "req": ["lv6"] },
        { "name": "Proměnlivý úchop", "img": "skill/special/val/PPP0/promenlivy_uchop.png", "skills": [], "req": ["lv6"] }, //20
        { "name": "Škola boje na koni", "img": "skill/special/val/PPP0/skola_boje_na_koni.png", "skills": [], "req": ["lv6"] },
        { "name": "Zastrašení", "img": "skill/special/val/PPP0/zastraseni.png", "skills": [], "req": ["lv6"] },
        { "name": "Zručnost se zbraní", "img": "skill/special/val/PPP0/zrucnost_se_zbrani.png", "skills": [], "req": ["lv6"] },
        { "name": "Brutalita", "img": "skill/special/val/PPP1/brutalita.png", "skills": [], "req": [1] },
        { "name": "Cesta krve", "img": "skill/special/val/PPP1/cesta_krve.png", "skills": [], "req": [1] }, //25
        { "name": "Mrštnost", "img": "skill/special/val/PPP1/mrstnost.png", "skills": [], "req": [1] },
        { "name": "Pohled zabijáka", "img": "skill/special/val/PPP1/pohled_zabijaka.png", "skills": [], "req": [1] },
        { "name": "Smysl bestie", "img": "skill/special/val/PPP1/smysl_bestie.png", "skills": [], "req": [1] },
        { "name": "Tuhý kořínek", "img": "skill/special/val/PPP1/tuhy_korinek.png", "skills": [], "req": [1] },
        { "name": "Vražedná zuřivost", "img": "skill/special/val/PPP1/vrazedna_zurivost.png", "skills": [], "req": [1] }, //30
        { "name": "Zjizvená kůže", "img": "skill/special/val/PPP1/zjizvena_kuze.png", "skills": [], "req": [1] },
        { "name": "Bojové rozkazy", "img": "skill/special/val/PPP2/bojove_rozkazy.png", "skills": [], "req": [2] },
        { "name": "Boj štítem", "img": "skill/special/val/PPP2/boj_stitem.png", "skills": [], "req": [2] },
        { "name": "Krupobití", "img": "skill/special/val/PPP2/krupobiti.png", "skills": [], "req": [2] },
        { "name": "Majestát", "img": "skill/special/val/PPP2/majestat.png", "skills": [], "req": [2] }, //35
        { "name": "Mistr boje se dvěma zbraněmi", "img": "skill/special/val/PPP2/mistr_boje_se_dvema_zbranemi.png", "skills": [], "req": [2] },
        { "name": "Sebeobětování", "img": "skill/special/val/PPP2/sebeobetovani.png", "skills": [], "req": [2] },
        { "name": "Zakrytí", "img": "skill/special/val/PPP2/zakryti.png", "skills": [], "req": [2] },
        { "name": "Železný muž", "img": "skill/special/val/PPP2/zelezny_muz.png", "skills": [], "req": [2] },
        { "name": "Boj s přesilou", "img": "skill/special/val/PPP3/boj_s_presilou.png", "skills": [], "req": [3] }, //40
        { "name": "Čtení vzdálenosti", "img": "skill/special/val/PPP3/cteni_vzdalenosti.png", "skills": [], "req": [3] },
        { "name": "Mistr boje se dvěma zbraněmi", "img": "skill/special/val/PPP3/mistr_boje_se_dvema_zbranemi.png", "skills": [], "req": [3] },
        { "name": "Rutina", "img": "skill/special/val/PPP3/rutina.png", "skills": [], "req": [3] },
        { "name": "Rychlý hrot", "img": "skill/special/val/PPP3/rychly_hrot.png", "skills": [], "req": [3] },
        { "name": "Rytmus boje", "img": "skill/special/val/PPP3/rytmus_boje.png", "skills": [], "req": [3] }, //45
        { "name": "Šermířská obratnost", "img": "skill/special/val/PPP3/sermirska_obratnost.png", "skills": [], "req": [3] },
        { "name": "Záměna", "img": "skill/special/val/PPP3/zamena.png", "skills": [], "req": [3] },
    ],
    "Hraničář": [
        { "name": "Boj se zvířaty", "img": "skill/special/hra/boj_se_zviraty.png", "skills": [], "req": [] }, //0
        { "name": "Bojová hůl", "img": "skill/special/hra/bojova_hul.png", "skills": [], "req": [] },
        { "name": "Léčitelství", "img": "skill/special/hra/lecitelstvi.png", "skills": [205], "req": [] },
        { "name": "Ochočování zvířat", "img": "skill/special/hra/ochocovani.png", "skills": [209], "req": [] },
        { "name": "Obratné ostří", "img": "skill/special/hra/obratne_ostri.png", "skills": [], "req": [] },
        { "name": "Přesná střelba", "img": "skill/special/hra/presna_strelba.png", "skills": [], "req": [] }, //5
        { "name": "Průzkumníctví", "img": "skill/special/hra/pruzkumnictvi.png", "skills": [206, 207, 208], "req": [] },
        { "name": "Rychlá střelba", "img": "skill/special/hra/rychla_strelba.png", "skills": [], "req": [] },
        { "name": "Zocelení", "img": "skill/special/hra/zoceleni.png", "skills": [], "req": [] },
        { "name": "Magie přírody", "img": "skill/special/hra/magie_prirody.png", "skills": [], "req": [] },
        { "name": "Magie zvířat", "img": "skill/special/hra/magie_zvirat.png", "skills": [], "req": [] }, //10
        { "name": "Magie pocestných", "img": "skill/special/hra/magie_pocestnych.png", "skills": [], "req": [] },
        { "name": "Bdělý spánek", "img": "skill/special/hra/PPP0/bdely_spanek.png", "skills": [], "req": ["lv6"] },
        { "name": "Hraničářský luk", "img": "skill/special/hra/PPP0/hranicarsky_luk.png", "skills": [], "req": ["lv6"] },
        { "name": "Hraničářův kůň", "img": "skill/special/hra/PPP0/hranicaruv_kun.png", "skills": [], "req": ["lv6"] },
        { "name": "Lovcova kořist", "img": "skill/special/hra/PPP0/lovcova_korist.png", "skills": [], "req": ["lv6"] }, //15
        { "name": "Mluvení se zvířaty", "img": "skill/special/hra/PPP0/mluveni_se_zviraty.png", "skills": [], "req": ["lv6"] },
        { "name": "Moudrost", "img": "skill/special/hra/PPP0/moudrost.png", "skills": [], "req": ["lv6"] },
        { "name": "Ostražitost", "img": "skill/special/hra/PPP0/ostrazitost.png", "skills": [], "req": ["lv6"] },
        { "name": "Spřízněnost se zvířaty", "img": "skill/special/hra/PPP0/spriznenost_se_zviraty.png", "skills": [], "req": ["lv6"] },
        { "name": "Střelba na krátkou vzdálenost", "img": "skill/special/hra/PPP0/strelba_na_kratkou_vzdalenost.png", "skills": [], "req": ["lv6"] }, //20
        { "name": "Světoběžník", "img": "skill/special/hra/PPP0/svetobeznik.png", "skills": [], "req": ["lv6"] },
        { "name": "Urputná střelba", "img": "skill/special/hra/PPP0/urputna_strelba.png", "skills": [], "req": ["lv6"] },
        { "name": "Totem", "img": "skill/special/hra/PPP0/totem.png", "skills": [], "req": ["lv6"] },
        { "name": "Chodcův meč", "img": "skill/special/hra/PPP1/chodcuv_mec.png", "skills": [], "req": [1] },
        { "name": "Chodecká magie", "img": "skill/special/hra/PPP1/chodecka_magie.png", "skills": [], "req": [1] }, //25
        { "name": "Instinkt lovce", "img": "skill/special/hra/PPP1/instinkt_lovce.png", "skills": [], "req": [1] },
        { "name": "Jistá ruka", "img": "skill/special/hra/PPP1/jista_ruka.png", "skills": [], "req": [1] },
        { "name": "Magické pasti", "img": "skill/special/hra/PPP1/magicke_pasti.png", "skills": [], "req": [1] },
        { "name": "Magie lovců monster", "img": "skill/special/hra/PPP1/magie_lovcu_monster.png", "skills": [], "req": [1] },
        { "name": "Požírač", "img": "skill/special/hra/PPP1/pozirac.png", "skills": [], "req": [1] }, //30
        { "name": "Soustředění duševní síly", "img": "skill/special/hra/PPP1/soustredeni_dusevni_sily.png", "skills": [], "req": [1] },
        { "name": "Dary přírody", "img": "skill/special/hra/PPP2/dary_prirody.png", "skills": [], "req": [2] },
        { "name": "Druidova hůl", "img": "skill/special/hra/PPP2/druidova_hul.png", "skills": [], "req": [2] },
        { "name": "Druidské rituály", "img": "skill/special/hra/PPP2/druidske_ritualy.png", "skills": [], "req": [2] },
        { "name": "Magie lesa", "img": "skill/special/hra/PPP2/magie_lesa.png", "skills": [], "req": [2] }, //35
        { "name": "Magie hvozdu", "img": "skill/special/hra/PPP2/magie_hvozdu.png", "skills": [], "req": [2] },
        { "name": "Prostoupení", "img": "skill/special/hra/PPP2/prostoupeni.png", "skills": [], "req": [2] },
        { "name": "Síla přírody", "img": "skill/special/hra/PPP2/sila_prirody.png", "skills": [], "req": [2] },
        { "name": "Vládni přirozeným věcem", "img": "skill/special/hra/PPP2/vladni_prirozenym_vecem.png", "skills": [], "req": [2] },
        { "name": "Bestie", "img": "skill/special/hra/PPP3/bestie.png", "skills": [], "req": [3] }, //40
        { "name": "Boj ve smečce", "img": "skill/special/hra/PPP3/boj_ve_smecce.png", "skills": [], "req": [3] },
        { "name": "Divoké pokřiky", "img": "skill/special/hra/PPP3/divoke_pokriky.png", "skills": [], "req": [3] },
        { "name": "Magie smečky", "img": "skill/special/hra/PPP3/magie_smecky.png", "skills": [], "req": [3] },
        { "name": "Pokročilá magie zvířat", "img": "skill/special/hra/PPP3/pokrocila_magie_zvirat.png", "skills": [], "req": [3] },
        { "name": "Šamanismus", "img": "skill/special/hra/PPP3/samanismus.png", "skills": [], "req": [3] }, //45
        { "name": "Tvaroměnič", "img": "skill/special/hra/PPP3/tvaromenic.png", "skills": [], "req": [3] },
        { "name": "Zvířecí šampión", "img": "skill/special/hra/PPP3/zvireci_sampion.png", "skills": [], "req": [3] },
    ],
    "Alchymista": [
        { "name": "Efektivní výroba", "img": "skill/special/alc/efektivni_vyroba.png", "skills": [], "req": [] }, //0
        { "name": "Odolnost vůči jedům", "img": "skill/special/alc/odolnost_vuci_jedum.png", "skills": [], "req": [] },
        { "name": "Pokročilá identifikace", "img": "skill/special/alc/pokrocila_identifikace.png", "skills": [303], "req": [] },
        { "name": "Precizní výroba", "img": "skill/special/alc/precizni_vyroba.png", "skills": [], "req": [] },
        { "name": "Substituce", "img": "skill/special/alc/substituce.png", "skills": [], "req": [] },
        { "name": "Výroba svitků", "img": "skill/special/alc/vyroba_svitku.png", "skills": [304], "req": [] }, //5
        { "name": "Obor Lektvary a elixíry", "img": "skill/special/alc/lektvary_a_elixiry.png", "skills": [], "req": [] },
        { "name": "Obor Nestabilní substance", "img": "skill/special/alc/nestabilni_substance.png", "skills": [], "req": [] },
        { "name": "Obor Magické předměty", "img": "skill/special/alc/magicke_predmety.png", "skills": [], "req": [] },
        { "name": "Obor Alchymistická anatomie", "img": "skill/special/alc/alchymisticka_anatomie.png", "skills": [], "req": [] },
        { "name": "Obor Hvězdné sestavy", "img": "skill/special/alc/hvezdne_sestavy.png", "skills": [], "req": [] }, //10
        { "name": "Obor krystaly a energie", "img": "skill/special/alc/krystaly_a_energie.png", "skills": [], "req": [] },
        { "name": "Artefakty", "img": "skill/special/alc/PPP0/artefakty.png", "skills": [], "req": ["lv6"], "repetable": ["?Název artefaktu"] },
        { "name": "Bojová konzumace", "img": "skill/special/alc/PPP0/bojova_konzumace.png", "skills": [], "req": ["lv6"] },
        { "name": "Cestovní alchymie", "img": "skill/special/alc/PPP0/cestovni_alchymie.png", "skills": [], "req": ["lv6"] },
        { "name": "Forenzika", "img": "skill/special/alc/PPP0/forenzika.png", "skills": [], "req": ["lv6"] }, //15
        { "name": "Herbalista", "img": "skill/special/alc/PPP0/herbalista.png", "skills": [], "req": ["lv6"] },
        { "name": "Hromadná výroba", "img": "skill/special/alc/PPP0/hromadna_vyroba.png", "skills": [], "req": ["lv6"] },
        { "name": "Koncentrované substance", "img": "skill/special/alc/PPP0/koncentrovane_substance.png", "skills": [], "req": ["lv6"] },
        { "name": "Laboratorní specialista", "img": "skill/special/alc/PPP0/laboratorni_specialista.png", "skills": [], "req": ["lv6"] },
        { "name": "Magické hůlky", "img": "skill/special/alc/PPP0/magicke_hulky.png", "skills": [], "req": ["lv6"] }, //20
        { "name": "Recyklátor", "img": "skill/special/alc/PPP0/recyklator.png", "skills": [], "req": ["lv6"] },
        { "name": "Sabotér", "img": "skill/special/alc/PPP0/saboter.png", "skills": [], "req": ["lv6"] },
        { "name": "Travičství", "img": "skill/special/alc/PPP0/travicstvi.png", "skills": [], "req": ["lv6"] },
        { "name": "Biologická augmentace", "img": "skill/special/alc/PPP1/biologicka_augmentace.png", "skills": [], "req": [1] },
        { "name": "Bojová anatomie", "img": "skill/special/alc/PPP1/bojova_anatomie.png", "skills": [], "req": [1] }, //25
        { "name": "Infuze a inhalace", "img": "skill/special/alc/PPP1/infuze_a_inhalace.png", "skills": [], "req": [1] },
        { "name": "Mechanická augmentace", "img": "skill/special/alc/PPP1/mechanicka_augmentace.png", "skills": [], "req": [1] },
        { "name": "Plastická chirurgie", "img": "skill/special/alc/PPP1/plasticka_chirurgie.png", "skills": [], "req": [1] },
        { "name": "Resuscitace", "img": "skill/special/alc/PPP1/resuscitace.png", "skills": [], "req": [1] },
        { "name": "Sešívanci", "img": "skill/special/alc/PPP1/sesivanci.png", "skills": [], "req": [1] }, //30
        { "name": "Tetování", "img": "skill/special/alc/PPP1/tetovani.png", "skills": [], "req": [1] },
        { "name": "Kapsulační gemy", "img": "skill/special/alc/PPP2/kapsulacni_gemy.png", "skills": [], "req": [2] },
        { "name": "Konstrukty", "img": "skill/special/alc/PPP2/konstrukty.png", "skills": [], "req": [2] },
        { "name": "Mistr nestabilních substancí", "img": "skill/special/alc/PPP2/mistr_nestabilnich_substanci.png", "skills": [], "req": [2] },
        { "name": "Palné zbraně", "img": "skill/special/alc/PPP2/palne_zbrane.png", "skills": [], "req": [2] }, //35
        { "name": "Práce s energií", "img": "skill/special/alc/PPP2/prace_s_energii.png", "skills": [], "req": [2] },
        { "name": "Sapérský výcvik", "img": "skill/special/alc/PPP2/sapersky_vycvik.png", "skills": [], "req": [2] },
        { "name": "Střely a rachejtle", "img": "skill/special/alc/PPP2/strely_a_rachejtle.png", "skills": [], "req": [2] },
        { "name": "Transmutace kovu", "img": "skill/special/alc/PPP2/transmutace_kovu.png", "skills": [], "req": [2] },
        { "name": "Astrální sféry", "img": "skill/special/alc/PPP3/astralni_sfery.png", "skills": [], "req": [3] }, //40
        { "name": "Ovládnutí živlů", "img": "skill/special/alc/PPP3/ovladnuti_zivlu.png", "skills": [], "req": [3] },
        { "name": "Oživlé pomůcky", "img": "skill/special/alc/PPP3/ozivle_pomucky.png", "skills": [], "req": [3] },
        { "name": "Portály a zrcadla", "img": "skill/special/alc/PPP3/portaly_a_zrcadla.png", "skills": [], "req": [3] },
        { "name": "Poslové živlů", "img": "skill/special/alc/PPP3/poslove_zivlu.png", "skills": [], "req": [3] },
        { "name": "Práce s esencemi", "img": "skill/special/alc/PPP3/prace_s_esencemi.png", "skills": [], "req": [3] }, //45
        { "name": "Práce s vichry many", "img": "skill/special/alc/PPP3/prace_s_vichry_many.png", "skills": [], "req": [3] },
        { "name": "Talismany", "img": "skill/special/alc/PPP3/talismany.png", "skills": [], "req": [3] },
    ],
    "Kouzelník": [
        { "name": "Koncentrace many", "img": "skill/special/kou/koncentrace_many.png", "skills": [], "req": [] }, //0
        { "name": "Kouzlení z knih", "img": "skill/special/kou/kouzleni_z_knih.png", "skills": [], "req": [] },
        { "name": "Rituál krve", "img": "skill/special/kou/ritual_krve.png", "skills": [], "req": [] },
        { "name": "Rychlé kouzlení", "img": "skill/special/kou/rychle_kouzleni.png", "skills": [], "req": [] },
        { "name": "Vyvolání přítele", "img": "skill/special/kou/vyvolani_pritele.png", "skills": [], "req": [] },
        { "name": "Paměť na kouzla", "img": "skill/special/kou/pamet_na_kouzla.png", "skills": [], "req": [] }, //5
        { "name": "Obor Divoká magie", "img": "skill/special/kou/divoka_magie.png", "skills": [], "req": [] },
        { "name": "Obor Ochranná magie", "img": "skill/special/kou/ochranna_magie.png", "skills": [], "req": [] },
        { "name": "Obor Magie proměn", "img": "skill/special/kou/magie_promen.png", "skills": [], "req": [] },
        { "name": "Obor Vitální magie", "img": "skill/special/kou/vitalni_magie.png", "skills": [], "req": [] },
        { "name": "Obor Mentální magie", "img": "skill/special/kou/mentalni_magie.png", "skills": [], "req": [] }, //10
        { "name": "Obor Vysoká magie", "img": "skill/special/kou/vysoka_magie.png", "skills": [], "req": [] },
        { "name": "Citlivost na vichry many", "img": "skill/special/kou/PPP0/citlivost_na_vichry_many.png", "skills": [], "req": ["lv6"] },
        { "name": "Magistr magického oboru", "img": "skill/special/kou/PPP0/magistr_magickeho_oboru.png", "skills": [], "req": ["lv6"], "repetable": ["divoká", "ochranná", "proměn", "vitalní", "mentální", "vysoká"] },
        { "name": "Posilování kouzel", "img": "skill/special/kou/PPP0/posilovani_kouzel.png", "skills": [], "req": ["lv6"] },
        { "name": "Precizní kouzlení", "img": "skill/special/kou/PPP0/precizni_kouzleni.png", "skills": [], "req": ["lv6"] }, //15
        { "name": "Pyrokineze", "img": "skill/special/kou/PPP0/pyrokineze.png", "skills": [], "req": ["lv6"] },
        { "name": "Rituální kouzlení", "img": "skill/special/kou/PPP0/ritualni_kouzleni.png", "skills": [], "req": ["lv6"] },
        { "name": "Rychlý odpočinek", "img": "skill/special/kou/PPP0/rychly_odpocinek.png", "skills": [], "req": ["lv6"] },
        { "name": "Telekineze", "img": "skill/special/kou/PPP0/telekineze.png", "skills": [], "req": ["lv6"] },
        { "name": "Telepatie", "img": "skill/special/kou/PPP0/telepatie.png", "skills": [], "req": ["lv6"] }, //20
        { "name": "Transfer many", "img": "skill/special/kou/PPP0/transfer_many.png", "skills": [], "req": ["lv6"] },
        { "name": "Utajené kouzlení", "img": "skill/special/kou/PPP0/utajene_kouzleni.png", "skills": [], "req": ["lv6"] },
        { "name": "Záměna kouzel", "img": "skill/special/kou/PPP0/zamena_kouzel.png", "skills": [], "req": ["lv6"] },
        { "name": "Bitevní trénink", "img": "skill/special/kou/PPP1/bitevni_trenink.png", "skills": [], "req": [1] },
        { "name": "Bojové sesílání", "img": "skill/special/kou/PPP1/bojove_sesilani.png", "skills": [], "req": [1] }, //25
        { "name": "Energetická zbraň", "img": "skill/special/kou/PPP1/energeticka_zbran.png", "skills": [], "req": [1] },
        { "name": "Lámání kouzel", "img": "skill/special/kou/PPP1/lamani_kouzel.png", "skills": [], "req": [1] },
        { "name": "Magická dominance", "img": "skill/special/kou/PPP1/magicka_dominance.png", "skills": [], "req": [1] },
        { "name": "Magická zranitelnost", "img": "skill/special/kou/PPP1/magicka_zranitelnost.png", "skills": [], "req": [1] },
        { "name": "Posílená ochrana", "img": "skill/special/kou/PPP1/posilena_ochrana.png", "skills": [], "req": [1] }, //30
        { "name": "Živlomág", "img": "skill/special/kou/PPP1/zivlomag.png", "skills": [], "req": [1] },
        { "name": "Aura moci", "img": "skill/special/kou/PPP2/aura_moci.png", "skills": [], "req": [2] },
        { "name": "Hromadné sesílání", "img": "skill/special/kou/PPP2/hromadne_sesilani.png", "skills": [], "req": [2] },
        { "name": "Magické obrazce", "img": "skill/special/kou/PPP2/magicke_obrazce.png", "skills": [], "req": [2] },
        { "name": "Mentální souboj", "img": "skill/special/kou/PPP2/mentalni_souboj.png", "skills": [], "req": [2] }, //35
        { "name": "Míchání kouzel", "img": "skill/special/kou/PPP2/michani_kouzel.png", "skills": [], "req": [2] },
        { "name": "Podrobování", "img": "skill/special/kou/PPP2/podrobovani.png", "skills": [], "req": [2] },
        { "name": "Předkouzlení", "img": "skill/special/kou/PPP2/predkouzleni.png", "skills": [], "req": [2] },
        { "name": "Vládce many", "img": "skill/special/kou/PPP2/vladce_many.png", "skills": [], "req": [2] },
        { "name": "Dar noci", "img": "skill/special/kou/PPP3/dar_noci.png", "skills": [], "req": [3] }, //40
        { "name": "Nemrtvý druh", "img": "skill/special/kou/PPP3/nemrtvy_druh.png", "skills": [], "req": [3] },
        { "name": "Nemrtvé spojení", "img": "skill/special/kou/PPP3/nemrtve_spojeni.png", "skills": [], "req": [3] },
        { "name": "Pouto smrti", "img": "skill/special/kou/PPP3/pouto_smrti.png", "skills": [], "req": [3] },
        { "name": "Rituální obětování", "img": "skill/special/kou/PPP3/ritualni_obetovani.png", "skills": [], "req": [3] },
        { "name": "Sběratel duší", "img": "skill/special/kou/PPP3/sberatel_dusi.png", "skills": [], "req": [3] }, //45
        { "name": "Srážlivost krve", "img": "skill/special/kou/PPP3/srazlivost_krve.png", "skills": [], "req": [3] },
        { "name": "Vitální dráhy", "img": "skill/special/kou/PPP3/vitalni_drahy.png", "skills": [], "req": [3] },
    ],
    "Zloděj": [
        { "name": "Improvizace", "img": "skill/special/zlo/improvizace.png", "skills": [], "req": [] }, //0
        { "name": "Odezírání ze rtů", "img": "skill/special/zlo/odezirani_ze_rtu.png", "skills": [], "req": [] },
        { "name": "Vražedné ostří", "img": "skill/special/zlo/vrazedne_ostri.png", "skills": [], "req": [] },
        { "name": "Vrhání dýk", "img": "skill/special/zlo/vrhani_dyk.png", "skills": [], "req": [] },
        { "name": "Zákeřná kuše", "img": "skill/special/zlo/zakerna_kuse.png", "skills": [], "req": [] },
        { "name": "Zlodějská hantýrka", "img": "skill/special/zlo/zlodejska_hantyrka.png", "skills": [], "req": [] }, //5
        { "name": "Umění kočičího pohybu", "img": "skill/special/zlo/kocici_pohyb.png", "skills": [504], "req": [] },
        { "name": "Umění proměn", "img": "skill/special/zlo/promeny.png", "skills": [505], "req": [] },
        { "name": "Umění skrývání", "img": "skill/special/zlo/skryvani.png", "skills": [506], "req": [] },
        { "name": "Umění šarmu", "img": "skill/special/zlo/sarm.png", "skills": [507], "req": [] },
        { "name": "Umění rváčů", "img": "skill/special/zlo/rvaci.png", "skills": [508], "req": [] }, //10
        { "name": "Umění železného klíče", "img": "skill/special/zlo/zelezny_klic.png", "skills": [509], "req": [] },
        { "name": "Boj se dvěma zbraněmi", "img": "skill/special/zlo/PPP0/boj_se_dvema_zbranemi.png", "skills": [], "req": ["lv6"] },
        { "name": "Cílený útok", "img": "skill/special/zlo/PPP0/cileny_utok.png", "skills": [], "req": ["lv6"] },
        { "name": "Citlivá místa", "img": "skill/special/zlo/PPP0/citliva_mista.png", "skills": [], "req": ["lv6"] },
        { "name": "Expertiza", "img": "skill/special/zlo/PPP0/expertiza.png", "skills": [], "req": ["lv6"] }, //15
        { "name": "Mistrovství síly osobnosti", "img": "skill/special/zlo/PPP0/mistrovstvi_sily_osobnosti.png", "skills": [], "req": ["lv6"] },
        { "name": "Mistrovství zlatky", "img": "skill/special/zlo/PPP0/mistrovstvi_zlatky.png", "skills": [], "req": ["lv6"] },
        { "name": "Noční živel", "img": "skill/special/zlo/PPP0/nocni_zivel.png", "skills": [], "req": ["lv6"] },
        { "name": "Obratný bojovník", "img": "skill/special/zlo/PPP0/obratny_bojovnik.png", "skills": [], "req": ["lv6"] },
        { "name": "Rychlé tasení", "img": "skill/special/zlo/PPP0/rychle_taseni.png", "skills": [], "req": ["lv6"] }, //20
        { "name": "Svižné ostří", "img": "skill/special/zlo/PPP0/svizne_ostri.png", "skills": [], "req": ["lv6"] },
        { "name": "Šestý smysl", "img": "skill/special/zlo/PPP0/sesty_smysl.png", "skills": [], "req": ["lv6"] },
        { "name": "Technika zabíjení", "img": "skill/special/zlo/PPP0/technika_zabijeni.png", "skills": [], "req": ["lv6"] },
        { "name": "Assasinace", "img": "skill/special/zlo/PPP1/assasinace.png", "skills": [], "req": [1] },
        { "name": "Mistrovství rváčů", "img": "skill/special/zlo/PPP1/mistrovstvi_rvacu.png", "skills": [], "req": [1] }, //25
        { "name": "Mistrovství skrývání", "img": "skill/special/zlo/PPP1/mistrovstvi_skryvani.png", "skills": [], "req": [1] },
        { "name": "Riskantní útok", "img": "skill/special/zlo/PPP1/riskantni_utok.png", "skills": [], "req": [1] },
        { "name": "Umění přepadů", "img": "skill/special/zlo/PPP1/umeni_prepadu.png", "skills": [], "req": [1] },
        { "name": "Vějíř dýk", "img": "skill/special/zlo/PPP1/vejir_dyk.png", "skills": [], "req": [1] },
        { "name": "Výhodná pozice", "img": "skill/special/zlo/PPP1/vyhodna_pozice.png", "skills": [], "req": [1] }, //30
        { "name": "Výroba jedů", "img": "skill/special/zlo/PPP1/vyroba_jedu.png", "skills": [], "req": [1] },
        { "name": "Bojová kreativita", "img": "skill/special/zlo/PPP2/bojova_kreativita.png", "skills": [], "req": [2] },
        { "name": "Druhá šance", "img": "skill/special/zlo/PPP2/druha_sance.png", "skills": [], "req": [2] },
        { "name": "Lupičská udělátka", "img": "skill/special/zlo/PPP2/lupicska_udelatka.png", "skills": [], "req": [2] },
        { "name": "Lupičův parťák", "img": "skill/special/zlo/PPP2/lupicuv_partak.png", "skills": [], "req": [2] }, //35
        { "name": "Mistr útěku", "img": "skill/special/zlo/PPP2/mistr_uteku.png", "skills": [], "req": [2] },
        { "name": "Mistroství kočičího pohybu", "img": "skill/special/zlo/PPP2/mistrostvi_kociciho_pohybu.png", "skills": [], "req": [2] },
        { "name": "Mistrovství železného klíče", "img": "skill/special/zlo/PPP2/mistrovstvi_zelezneho_klice.png", "skills": [], "req": [2] },
        { "name": "Umění neférového boje", "img": "skill/special/zlo/PPP2/umeni_neferoveho_boje.png", "skills": [], "req": [2] },
        { "name": "Alter ego", "img": "skill/special/zlo/PPP3/alter_ego.png", "skills": [], "req": [3] }, //40
        { "name": "Důvěrník", "img": "skill/special/zlo/PPP3/duvernik.png", "skills": [], "req": [3] },
        { "name": "Mistrovství proměn", "img": "skill/special/zlo/PPP3/mistrovstvi_promen.png", "skills": [], "req": [3] },
        { "name": "Mistrovství šarmu", "img": "skill/special/zlo/PPP3/mistrovstvi_sarmu.png", "skills": [], "req": [3] },
        { "name": "Pověsti a drby", "img": "skill/special/zlo/PPP3/povesti_a_drby.png", "skills": [], "req": [3] },
        { "name": "Šifrování", "img": "skill/special/zlo/PPP3/sifrovani.png", "skills": [], "req": [3] }, //45
        { "name": "Umění boje s pláštěm", "img": "skill/special/zlo/PPP3/umeni_boje_s_plastem.png", "skills": [], "req": [3] },
        { "name": "Zrcadlení", "img": "skill/special/zlo/PPP3/zrcadleni.png", "skills": [], "req": [3] },
    ],
    "Klerik": [
        { "name": "Boží bojovník", "img": "skill/special/kle/bozi_bojovnik.png", "skills": [], "req": [] }, //0
        { "name": "Dar slitování", "img": "skill/special/kle/dar_smilovani.png", "skills": [], "req": [] },
        { "name": "Osvícení", "img": "skill/special/kle/osviceni.png", "skills": [], "req": [] },
        { "name": "Posvátný symbol", "img": "skill/special/kle/posvatny_symbol.png", "skills": [], "req": [] },
        { "name": "Požehnané zdraví", "img": "skill/special/kle/pozehnane_zdravi.png", "skills": [], "req": [] },
        { "name": "Rituály a obřady", "img": "skill/special/kle/ritualy_a_obrady.png", "skills": [], "req": [] }, //5
        { "name": "Náuka Bojovníků víry", "img": "skill/special/kle/bojovniku_viry.png", "skills": [], "req": [] },
        { "name": "Náuka Božích patronů", "img": "skill/special/kle/bozi_patroni.png", "skills": [], "req": [] },
        { "name": "Náuka Démonologie", "img": "skill/special/kle/demonologie.png", "skills": [], "req": [] },
        { "name": "Náuka Milosrdenství", "img": "skill/special/kle/milosrdenstvi.png", "skills": [], "req": [] },
        { "name": "Náuka Svaté pravdy", "img": "skill/special/kle/svate_pravdy.png", "skills": [], "req": [] }, //10
        { "name": "Náuka Žehnání aurami", "img": "skill/special/kle/zehnani_aurami.png", "skills": [], "req": [] },
        { "name": "Asketizmus", "img": "skill/special/kle/PPP0/asketizmus.png", "skills": [], "req": ["lv6"] },
        { "name": "Bohoslužby", "img": "skill/special/kle/PPP0/bohosluzby.png", "skills": [], "req": ["lv6"] },
        { "name": "Božská doména", "img": "skill/special/kle/PPP0/bozska_domena.png", "skills": [], "req": ["lv6"] },
        { "name": "Flagelantství", "img": "skill/special/kle/PPP0/flagelantstvi.png", "skills": [], "req": ["lv6"] }, //15
        { "name": "Nositel slova", "img": "skill/special/kle/PPP0/nositel_slova.png", "skills": [], "req": ["lv6"] },
        { "name": "Mnohoprosby", "img": "skill/special/kle/PPP0/mnohoprosby.png", "skills": [], "req": ["lv6"] },
        { "name": "Požehnání", "img": "skill/special/kle/PPP0/pozehnani.png", "skills": [], "req": ["lv6"] },
        { "name": "Řádový slib", "img": "skill/special/kle/PPP0/radovy_slib.png", "skills": [], "req": ["lv6"] },
        { "name": "Sakrální předměty", "img": "skill/special/kle/PPP0/sakralni_predmety.png", "skills": [], "req": ["lv6"] }, //20
        { "name": "Strážce mystéria", "img": "skill/special/kle/PPP0/strazce_mysteria.png", "skills": [], "req": ["lv6"] },
        { "name": "Svěcení míst", "img": "skill/special/kle/PPP0/sveceni_mist.png", "skills": [], "req": ["lv6"] },
        { "name": "Vzkříšení", "img": "skill/special/kle/PPP0/vzkriseni.png", "skills": [], "req": ["lv6"] },
        { "name": "Boží zbroj", "img": "skill/special/kle/PPP1/bozi_zbroj.png", "skills": [], "req": [1] },
        { "name": "Božské mantry", "img": "skill/special/kle/PPP1/bozske_mantry.png", "skills": [], "req": [1] }, //25
        { "name": "Fanatismus", "img": "skill/special/kle/PPP1/fanatismus.png", "skills": [], "req": [1] },
        { "name": "Inkvizitorský výcvik", "img": "skill/special/kle/PPP1/inkvizitorsky_vycvik.png", "skills": [], "req": [1] },
        { "name": "Lovec čarodejnic", "img": "skill/special/kle/PPP1/lovec_carodejnic.png", "skills": [], "req": [1] },
        { "name": "Paladinský výcvik", "img": "skill/special/kle/PPP1/paladinsky_vycvik.png", "skills": [], "req": [1] },
        { "name": "Posvátný vliv", "img": "skill/special/kle/PPP1/posvatny_vliv.png", "skills": [], "req": [1] }, //30
        { "name": "Posvátná zbraň", "img": "skill/special/kle/PPP1/posvatna_zbran.png", "skills": [], "req": [1] },
        { "name": "Astrální poutník", "img": "skill/special/kle/PPP2/astralni_poutnik.png", "skills": [], "req": [2] },
        { "name": "Děsobijec", "img": "skill/special/kle/PPP2/desobijec.png", "skills": [], "req": [2] },
        { "name": "Exorcismus", "img": "skill/special/kle/PPP2/exorcismus.png", "skills": [], "req": [2] },
        { "name": "Jazyk prastarých", "img": "skill/special/kle/PPP2/jazyk_prastarych.png", "skills": [], "req": [2] }, //35
        { "name": "Kletby", "img": "skill/special/kle/PPP2/kletby.png", "skills": [], "req": [2] },
        { "name": "Mystika", "img": "skill/special/kle/PPP2/mystika.png", "skills": [], "req": [2] },
        { "name": "Nadpřirozený boj", "img": "skill/special/kle/PPP2/nadprirozeny_boj.png", "skills": [], "req": [2] },
        { "name": "Světlonoš", "img": "skill/special/kle/PPP2/svetlonos.png", "skills": [], "req": [2] },
        { "name": "Avatar", "img": "skill/special/kle/PPP3/avatar.png", "skills": [], "req": [3] }, //40
        { "name": "Boží ochrana", "img": "skill/special/kle/PPP3/bozi_ochrana.png", "skills": [], "req": [3] },
        { "name": "Ikony", "img": "skill/special/kle/PPP3/ikony.png", "skills": [], "req": [3] },
        { "name": "Jasnozřivost", "img": "skill/special/kle/PPP3/jasnozrivost.png", "skills": [], "req": [3] },
        { "name": "Oběti", "img": "skill/special/kle/PPP3/obeti.png", "skills": [], "req": [3] },
        { "name": "Výcvik lazaretních léčitelů", "img": "skill/special/kle/PPP3/vycvik_lazaretnich_lecitelu.png", "skills": [], "req": [3] }, //45
        { "name": "Zázraky", "img": "skill/special/kle/PPP3/zazraky.png", "skills": [], "req": [3] },
        { "name": "Zažehnutí aury", "img": "skill/special/kle/PPP3/zazehnuti_aury.png", "skills": [], "req": [3] },
    ],

    findBy: function(sel, key, val) {
        for (let spec of this[sel]) {
            if (spec[key] == val) return spec;
        }
        return false;
    },
};


class Action {
    // Base data shared by tricks, spells and recipes.
    constructor(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, actionType, isReadyToUse) {
        this.imagePath = imagePath;
        this.actionName = actionName;
        this.usageCost = usageCost;
        this.requirements = requirements;
        this.checkText = checkText;
        this.descriptionText = descriptionText;
        this.damageText = damageText;
        this.actionType = actionType;
        // True means action is immediately usable without first selecting it.
        this.isReadyToUse = isReadyToUse;
    }
};
class TrickA extends Action {
    // All tricks that are available as soon as the skill is picked.
    constructor(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText) {
        super(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, "trick", true);
    }
};
class TrickW extends Action {
    // Warrior tricks, must be selected first depending on lvlup conditions.
    constructor(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText) {
        super(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, "trick", false);
    }
};
class Spell extends Action {
    // Spell extends action with casting metadata.
    constructor(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, isReadyToUse, castTime, effectDuration, effectRange, effectTarget, checkDifficulty) {
        super(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, "spell", isReadyToUse);
        this.castTime = castTime;
        this.effectDuration = effectDuration;
        this.effectRange = effectRange;
        this.effectTarget = effectTarget;
        this.checkDifficulty = checkDifficulty;
    }
};
class SpellW extends Spell {
    // Wizard spells, must be selected first depending on lvlup conditions.
    constructor(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, castTime, effectDuration, effectRange, effectTarget, checkDifficulty) {
        super(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, false, castTime, effectDuration, effectRange, effectTarget, checkDifficulty);
    }
}
class SpellA extends Spell {
    // Cleric and Ranger spells, are available as soon as the skill is picked.
    constructor(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, castTime, effectDuration, effectRange, effectTarget, checkDifficulty) {
        super(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, true, castTime, effectDuration, effectRange, effectTarget, checkDifficulty);
    }
}
class Recip extends Action {
    // Craftable alchemy entry.
    constructor(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, ingredientCost, baseIngredient, effectFrequency, craftTime, effectDuration, recognitionText, checkDifficulty) {
        super(imagePath, actionName, usageCost, requirements, checkText, descriptionText, damageText, "recip", true);
        this.ingredientCost = ingredientCost;
        this.baseIngredient = baseIngredient;
        this.effectFrequency = effectFrequency;
        this.craftTime = craftTime;
        this.effectDuration = effectDuration;
        this.recognitionText = recognitionText;
        this.checkDifficulty = checkDifficulty;
    }
}

const pul = 0.5; // půl kola
const kolo = 1; // 6s
const minuta = 10 * kolo;
const hodina = 60 * minuta;
const den = 24 * hodina;
const tyden = 7 * den;
const mesic = 30 * den;
const rok = 12 * mesic;
const stoleti = 100 * rok;

const tricksAndMagic = {
    //general
    "zol": new TrickA("action.png", "Zapálení oleje", "hořící olej z flakónu", [], "Reflex(OBR) vs X", "Reflex při úhybu před zápalnou lahví. Cíl je potřísněn hořícím olejem.", "1k6 ohněm každé kolo po dobu 1k6 kol"),
    //val
    "lvz": new TrickA("action.png", "Léčba vlastních zranění", "1 A/kolo", ["Válečník"], 0, "Vyléčí 2 životy za kolo", 0),
    "bpr": new TrickA("action.png", "Bojová připravenost", "0 A", ["Válečník"], 0, "Bonus +2 k UČ/OČ jako první akci boje", 0),
    "zut": new TrickA("action.png", "Zuřivý útok", "2 A", ["Válečník"], 0, "Bonus +3 UČ do jednoho útoku", 0),
    "opr": new TrickW("action.png", "Odražení projektilu", "1 A", ["Válečník", "lv 2"], 0, "Obrana proti projektilům +5", 0),
    "rpr": new TrickW("action.png", "Rychlý přesun", "1 A", ["Válečník", "lv 2"], 0, "Okamžitá akce krok má 2x dosah", 0),
    "rud": new TrickW("action.png", "Rychlý úder", "1 A", ["Válečník", "lv 2"], 0, "Iniciatíva +5", 0),
    "tkr": new TrickW("skill/special/val/skola_jednorucni.png", "Tvrdý kryt", "1 A", ["Válečník", "sp 6"], 0, "Obrana +2", 0),
    "uhl": new TrickW("skill/special/val/skola_jednorucni.png", "Úder hlavicí", "2 A", ["Válečník", "sp 6"], 0, "Při zásahu +1k6+2 zranění", 0),
    "uas": new TrickW("skill/special/val/skola_jednorucni.png", "Úhyb a sek", "3 A", ["Válečník", "sp 6"], 0, "Při ubránění se 1 volný útok proti ZO", 0),
    "but": new TrickW("skill/special/val/skola_dvourucni.png", "Bezhlavý útok", "1 A", ["Válečník", "sp 7"], 0, "Útok +5; nemožnost se bránit v tomto kole", 0),
    "dut": new TrickW("skill/special/val/skola_dvourucni.png", "Drtivý útok", "2 A", ["Válečník", "sp 7"], 0, "Zranění útoku +5", 0),
    "kse": new TrickW("skill/special/val/skola_dvourucni.png", "Kruhový sek", "3 A", ["Válečník", "sp 7"], 0, "Zásah kolem sebe -2UČ kumulativně", 0),
    "usk": new TrickW("skill/special/val/skola_bodne.png", "Úskok", "1 A", ["Válečník", "sp 8"], 0, "Obrana +2 do konce kola", 0),
    "uzo": new TrickW("skill/special/val/skola_bodne.png", "Útok z obrany", "2 A", ["Válečník", "sp 8"], 0, "Zraní útočníka za Obrana-Útok životů", 0),
    "vyp": new TrickW("skill/special/val/skola_bodne.png", "Výpad", "3 A", ["Válečník", "sp 8"], 0, "Zranění +1k6 krvácení", 0),
    "tpo": new TrickW("skill/special/val/skola_drtic_kosti.png", "Trpasličí polibek", "1 A", ["Válečník", "sp 9"], "SIL vs OBR", "Útok čelem za SIL zranění", 0),
    "snz": new TrickW("skill/special/val/skola_drtic_kosti.png", "Stržení na zem", "2 A", ["Válečník", "sp 9"], "SIL vs OBR -> OBR vs SIL", "Místo útoku povalí a drží cíl na zemi", 0),
    "nkl": new TrickW("skill/special/val/skola_drtic_kosti.png", "Nordický klíč", "3 A", ["Válečník", "sp 9"], "SIL vs OBR", "Automatická obrana + pohmoždění ruky (-5), jinak jen ZO", 0),
    "uav": new TrickW("skill/special/val/skola_dve_zbrane.png", "Útok a vrh", "1 A", ["Válečník", "sp 10"], 0, "Útok vrhací zbraní po hlavním útoku navíc", 0),
    "dob": new TrickW("skill/special/val/skola_dve_zbrane.png", "Dvojitá obrana", "2 A", ["Válečník", "sp 10"], 0, "Jedna obrana navíc", 0),
    "vut": new TrickW("skill/special/val/skola_dve_zbrane.png", "Vířivý útok", "3 A", ["Válečník", "sp 10"], 0, "Útok +5", 0),
    "sst": new TrickW("skill/special/val/skola_stit.png", "Sražení štítem", "1 A", ["Válečník", "sp 11"], "SIL vs OBR", "Zranění +1k6 + povalení + otřesení", 0),
    "uss": new TrickW("skill/special/val/skola_stit.png", "Útok spoza štítu", "2 A", ["Válečník", "sp 11"], 0, "Útok +2", 0),
    "zam": new TrickW("skill/special/val/skola_stit.png", "Zámek", "3 A", ["Válečník", "sp 11"], "SIL vs OBR -> OBR vs SIL", "Obránce uzamkne útočníkovu zbraň", 0),
    //hra
    "nuk": new SpellA("spell.png", "Najdi úkryt", "3 DS", ["Hraničář", "sk 200"], 0, "Nalezne přírodní úkryt (převis, dutý kmen, jeskyni)", 0, 1, 1, "-", "1 míle", "8"),
    "nvo": new SpellA("spell.png", "Najdi vodu", "3 DS", ["Hraničář", "sk 200"], 0, "Nalezne přírodní zdroj pitné vody", 0, 1, 1, "-", "1 míle", "6"),
    "roh": new SpellA("spell.png", "Rozdělej oheň", "2 DS", ["Hraničář", "sk 200"], 0, "Zapálí i zcela mookré dřevo", 0, 1 * minuta, 0, "půl sáhu", "zápalný materiál", "6"),
    "zna": new SpellA("spell.png", "Znamení", "1 DS", ["Hraničář", "sk 200"], 0, "Vytvoří až 10 umistitelných značek", 0, 1, 1 * den, "-", "dotek", "6"),
    "bds": new SpellA("skill/special/hra/magie_pocestnych.png", "Bdělý spánek", "1 DS / 2 hodiny", ["Hraničář", "sp 11"], 0, "Polobdělý spánek; pokud se v dosahu objeví cizí osoba, hraničář se probudí s varovným pocitem. Spánek neobnovuje DS.", 0, 0, "6 kol", "30 sáhů", "dle množství DS", "10"),
    "naz": new SpellA("skill/special/hra/magie_zvirat.png", "Najdi zvíře", "3 DS", ["Hraničář", "sp 10"], 0, "Najde nejbližší zvíře daného druhu v dosahu a po dobu trvání ukazuje směr a hrubou vzdálenost; lze zacílit i na konkrétní jedince. Nepůsobí na hmyz ani mytické tvory.", 0, "2 kola", "15 minut (1 směna)", "kruh o poloměru 1 míle", "1 tvor", "6"),
    "nej": new SpellA("skill/special/hra/magie_prirody.png", "Neutralizuj jed", "3 DS", ["Hraničář", "sp 9"], 0, "Okamžitě zneutralizuje všechny nemagické jedy v těle cíle.", 0, "1 kolo", "ihned", "dotek", "1 tvor", "8"),
    "opb": new SpellA("skill/special/hra/magie_pocestnych.png", "Ochrana před bouří", "3 DS", ["Hraničář", "sp 11"], 0, "Neviditelná aura pohybující se s hraničářem: nepropustí sníh, déšť, písek apod., chrání i před nemagickým bleskem; účinkuje na všechny uvnitř.", 0, "3 kola", "8 hodin", "-", "kruh o poloměru 2 sáhy", "6"),
    "prz": new SpellA("skill/special/hra/magie_zvirat.png", "Přivolej zvíře", "3 DS", ["Hraničář", "sp 10"], 0, "Hlasitým vřísknutím napodobí hlas druhu a přivábí jedno zvíře (nebo konkrétního jedince). Neúčinkuje na tvory, kteří neslyší; může selhat u posedlých/prokletých.", 0, "4 kola", "ihned", "kruh o poloměru 1 míle", "1 tvor", "8"),
    "rch": new SpellA("skill/special/hra/magie_pocestnych.png", "Rychlost chodce", "3 DS", ["Hraničář", "sp 11"], 0, "Cíl putuje o polovinu rychleji bez zvýšené únavy (jako spěšná chůze bez zadýchání).", 0, "3 kola", "1 hodina (4 směny)", "dotek", "1 tvor", "8"),
    "vlz": new SpellA("skill/special/hra/magie_prirody.png", "Uzdrav lehká zranění", "3 DS", ["Hraničář", "sp 9"], 0, "Vyléčí drobná zranění do maxima životů cíle.", "1k6+2 léčení", "1 kolo", "ihned", "dotek", "1 živý tvor", "6"),
    "udv": new SpellA("skill/special/hra/magie_prirody.png", "Úder varování", "4 DS", ["Hraničář", "sp 9"], 0, "Mentální úder způsobující šok/překvapení; zranění je psychického rázu, výjimečně krvácení z nosu/uší.", "1k10 psychické", "půl kola", "ihned", "10 sáhů", "1 tvor", "8"),
    "zvs": new SpellA("skill/special/hra/magie_zvirat.png", "Zvířecí smysly", "4 DS", ["Hraničář", "sp 10"], 0, "Hraničář si na omezený čas „vypůjčí“ smysly zvoleného zvířete (např. noční vidění sovy, echolokace netopýra, čich vlka, vnímání chvění jako hadi).", 0, "3 kola", "1 hodina (4 směny)", "-", "hraničář", "10"),
    //alc
    "bom": new Recip("skill/special/alc/nestabilni_substance.png", "Bomba", "0 MP", ["Alchymista", "sk 302"], 0, "Železná koule s knotem (10 coulů / kolo)", "2k6+4 výbuch a střepy 5 sáhů kolem", "35 sur", "žel.koule, zap.šňůra", 0, 10 * minuta, 0, "železná koule s knotem", "8"),
    "dym": new Recip("skill/special/alc/nestabilni_substance.png", "Dýmovnice", "0 MP", ["Alchymista", "sk 302"], 0, "Zapálitelná trubička, nebo koule", "Dusivý dým do poloměru 10 sáhů", "25 sur", "listí (záp.šňůra)", 0, 10 * minuta, 5 * minuta, "Zapálitelná trubička, nebo koule", "6"),
    "kin": new Recip("skill/special/alc/nestabilni_substance.png", "Kouzelný inkoust", "4 MP", ["Alchymista", "sk 302"], 0, "Neviditelný / Světélkující / Mizející inkoust na 5 stran pergamenu", 0, "6 sur", "olej, flakón", 0, 5 * minuta, 0, "flakón oleje libovolné barvy", "6"),
    "lpa": new Recip("recip.png", "Lakmusový papírek", "1 MP", ["Alchymista", "sk 302"], 0, "Ze vzorku lektvaru nebo krve dokáže identigikovat o co jde", 0, "5 sur", "pergamen", 0, 10 * minuta, 0, "10 bílých proužků pergamenu 10 coulů", "6"),
    "lms": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Medvdí síly", "30 MP", ["Alchymista", "sk 302"], 0, "Napumpování svaůl a krv. oběhu:SIL+3", "5 BÚ", "35 sur", "krev šelmy", 1 * den, 10 * minuta, 30 * minuta, "hustá hnědá tek. / odporně sladná / smrdí", "6"),
    "lmu": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Mucholapka", "15 MP", ["Alchymista", "sk 302"], 0, "Umožní lézt po zdech a stropě rychlostí 2-6 sáhů/kolo (A-C)", 0, "10 sur", "pivo, pryskyřice", 12 * hodina, 5 * minuta, 15 * minuta, "zlatavá/sladká/voní po medu a borovici", "8"),
    "lne": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Neutralizace", "5 MP", ["Alchymista", "sk 302"], 0, "Ruší aktivní efekty jiných lektvarů a četnosti", 0, "10 sur", "3dcl lihu", 0, 5 * kolo, 0, "jasně oranžová,bublá/-/-", "8"),
    "lra": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Ranhojič", "5 MP", ["Alchymista", "sk 302"], 0, "Léčivý lektvar", "1k6+2 léčení", "15 sur", "víno", 12, 5 * minuta, 0, "rudá tekutina / chuť i vůně po skořici, hrebícku a víne", "6"),
    "lry": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Rychlost", "12 MP", ["Alchymista", "sk 302"], 0, "+1 útok/obrana +2 OČ/init/dovednosti(OBR) pohyblivost*2", 0, "20 sur", "voda, ještěrčí ocásky", 1 * den, 2 * minuta, 10 * kolo, "bledě modrá/nasládlá/máta", "8"),
    "lzv": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Změna velikosti", "25 MP", ["Alchymista", "sk 302"], 0, "Koňská ↑, Oslí ↓ o 1 třídu velikosti", 0, "30 sur", "koňská/oslí moč", 1 * den, 10 * minuta, 30 * minuta, "oranžová/octová kyselá/pach moči", "8"),
    "upr": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Univerzální protijed", "5 MP", ["Alchymista", "sk 302"], 0, "Neutralizuje jedy s nebezpečností 6-, silnější oslabí na 1/2", 0, "10 sur", "voda, uhlí", 2 * hodina, 10 * kolo, 0, "tmavě šedá/hořká/-", "6"),
    "zsn": new Recip("skill/special/alc/nestabilni_substance.png", "Zápalná šňůra", "0 MP", ["Alchymista", "sk 302"], 0, "60 coulů hoří/jiskří 6 kol", 0, "5 sur", "60 coulů lana", 0, 5 * minuta, 0, "hořlavý provaz", "6"),
    "zli": new Recip("recip.png", "Zředěný líh", "0 MP", ["Alchymista", "sk 302"], 0, "Líh k čištění / dezinfekci až 10x, hořlavý", "0", "10 sur", "alkohol", 0, 30 * minuta, 0, "čirý/denaturák/denaturák", "6"),
    "bvo": new Recip("skill/special/alc/magicke_predmety.png", "Boty vodoměrky", "85 MP", ["Alchymista", "–"], 0, "Nositel chodí po vodě, sněhu, blátě či sypkém povrchu; chůze je nestabilní a o 50 % pomalejší.", 0, "200 sur", "boty + 10 vodoměrek", 0, 2 * den, 0, "boty s upravenou podrážkou", "10"),
    "cst": new Recip("skill/special/alc/magicke_predmety.png", "Čarovný štít", "80 MP", ["Alchymista", "–"], 0, "Speciální ochranný nátěr zvyšuje kvalitu štítu o +1 oproti běžné verzi.", 0, "45 sur", "štít", 0, 2 * den, 0, "jakýkoliv štít s magickým nátěrem", "8"),
    "chp": new Recip("skill/special/alc/magicke_predmety.png", "Chodecký plášť", "40 MP", ["Alchymista", "–"], 0, "Dokonale nepromokavý; v zimě hřeje, v létě větrá a mírně chladí.", 0, "50 sur", "plášť", 0, 24 * hodina, 0, "běžný plášť s kapucí", "8"),
    "jds": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Jed Dorfův spánek", "5 + X MP", ["Alchymista", "–"], "Odolnost (ODO) vs. 1 (+1 za každých 5 MP)", "Po 15 min uspí cíl hlubokým spánkem; ve stresu/boji do odeznění situace ztrácí iniciativu a má Nevýhodu (-5), poté usíná.", 0, "30 sur", "voda, makovice", 0, 20 * minuta, 4 * hodina, "černá tekutina, lehká maková vůně/chuť", "8"),
    "jvz": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Jed Vosí žihadlo", "10 MP", ["Alchymista", "lv 2", "sk 302"], "ODO vs 6", "Plná dávka na ostří zbraně, nebo 1/5 dávky na střely", "10/2 jedem", "20 sur", "jedovaté byliny", 0, 10 * minuta, 0, "zelená/sladká/čáranky", "8"),
    "klu": new Recip("skill/special/alc/magicke_predmety.png", "Kouzelný luk", "40 MP", ["Alchymista", "–"], 0, "Magický olej a tětiva: Útočnost i Zranění +1; dostřel delší o 30 sáhů oproti nemagické verzi.", 0, "100 sur", "luk, koňské žíně, olej", 0, 2 * den, 0, "luk napuštěný magickým olejem se zvláštní tětivou", "8"),
    "kos": new Recip("skill/special/alc/magicke_predmety.png", "Krvavé ostří", "30 MP", ["Alchymista", "–"], 0, "Dýka s trvale ostrým, zoubkovaným ostřím; Útočnost i Zranění +1 oproti původu.", 0, "30 sur", "dýka", 0, 3 * hodina, 0, "věčně ostrá dýka", "8"),
    "lam": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Améba", "30 MP", ["Alchymista", "–"], 0, "Promění pijáka v průhledný rosol; protékaní škvírami, lepení na stěny/strop, limitovaná síla, obyč. zbraně dávají 1/4 Ž, kouzelné plně, oheň dvojnásobně.", 0, "20 sur", "vaječný bílek, mléko", 24 * hodina, 10 * minuta, 30 * minuta, "průsvitná vazká tekutina bez chuti a zápachu", "12"),
    "lmz": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Mrazužár", "35 MP", ["Alchymista", "–"], 0, "Dočasná ochrana proti žáru nebo chladu (dle základu); běžný oheň/mráz neubližuje, kouzla/dech půlí zranění; extrémy (láva) stále smrtelné.", 0, "60 sur", "líh/olej + květ divizny (chlad) nebo heřmánku (žár)", 12 * hodina, 5 * minuta, 15 * minuta, "čirá hořká tekutina, slabá vůně citronu", "8"),
    "lzb": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Životabudič", "40 MP", ["Alchymista", "–"], 0, "Na 2 hodiny necítí únavu; poté dvojnásobná vyčerpanost a o 50 % delší spánek pro léčení/meditaci.", 0, "15 sur", "rum, býčí žlázy", 5 * den, 5 * minuta, 2 * hodina, "černá tekutina, bylinná vůně, sladká karamelová chuť", "8"),
    "sli": new Recip("recip.png", "Sliz", "5 MP", ["Alchymista", "–"], 0, "Po 5 kolech na vzduchu ztvrdne v extrémně odolné lepidlo (udrží tah koně); povolí mrazem nebo čistým lihem; odtržení: SIL vs. 20 (s pomocí přičti SIL a Výhodu).", 0, "10 sur", "pryskyřice", 0, 2 * minuta, 0, "zlatavá slizká hmota", "8"),
    "prv": new Recip("skill/special/alc/hvezdne_sestavy.png", "Prsten varování", "40 MP", ["Alchymista", "sp 10 / v poledne"], 0, "Varuje na blízkost zvoleného tvora/druhu (do ~100 sáhů), zahřívá se/chvěje/světélkuje – lze s ním i stopovat.", 0, "35 sur", "prsten, sklíčko, fetiš", 0, 24 * hodina, 0, "prsten se skleněným očkem", "8"),
    "amu": new Recip("skill/special/alc/krystaly_a_energie.png", "Amulet many", "140 MP (+ až 20 MP přídavně)", ["Alchymista", "sp 11"], 0, "Umožní kouzelníkovi čerpat manu z krystalu (1 MP/kolo se soustředěním) do vyčerpání přídavné many.", 0, "148 sur", "přívěsek a ametyst", 0, 2 * den, 0, "amulet s modrým ametystem", "12"),
    "cam": new Recip("skill/special/alc/magicke_predmety.png", "Caldorova maska", "90 MP (+ až 30 MP přídavně)", ["Alchymista", "sp 8"], 0, "Změní vzhled obličeje (i vlasy) na někoho, koho nositel viděl; každá proměna stojí 2 MP příd., trvá 1 směnu; lze prodlužovat.", 0, "60 sur", "libovolná maska", 0, 2 * den, 15 * minuta, "běžná maska, papír/dřevo", "14"),
    "cpr": new Recip("skill/special/alc/hvezdne_sestavy.png", "Čelenka porozumění", "50 MP", ["Alchymista", "sp 10 / v poledne"], 0, "Nositel rozumí cizí řeči i písmu (INT 2+), sám ale tím jazykem komunikovat neumí.", 0, "100 sur", "čelenka", 0, 24 * hodina, 0, "tenká stříbrná čelenka/diadém", "10"),
    "csv": new Recip("skill/special/alc/nestabilni_substance.png", "Černé světlo", "15 MP", ["Alchymista", "sp 7"], 0, "Po vytažení zátky za 3 kola dojde k oslepujícímu záblesku, který v okruhu 15 sáhů zraňuje nemrtvé a neviděné za 3k10 Ž.", "3k10 (nemrtví/nevidění v okruhu)", "20 sur", "fosfor, skleněná koule", 0, 2 * hodina, 0, "skleněná koule s prachem", "10"),
    "cnv": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Čočky nočního vidění", "60 + 5 MP", ["Alchymista", "sp 9"], 0, "Umožní vidět ve tmě v odstínech šedi; v úplné tmě vidět obrysy, v matném světle jako ve dne; nutná regenerace v roztoku many.", 0, "30 sur", "oči nočního tvora", 0, 3 * hodina, 0, "čočky v nádobce s roztokem many", "10"),
    "elm": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Elixír metamorfózy", "70 MP", ["Alchymista", "sp 6"], 24 * hodina, "Promění uživatele na tvora dle vzorku (podobná velikost); přebírá fyzické proporce, Ž a nemagické přirozené schopnosti; neovlivní mysl/dovednosti/kouzla.", 0, "12 sur", "0,1 l lihu, vzorek cíle", 24 * hodina, 2 * minuta, 6 * hodina, "žluto‑žlutá hustá tekutina, vůně/chuť po ostružinách", "12"),
    "ell": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Elixír proti lykantropii", "40 MP", ["Alchymista", "sp 6"], 0, "Vyléčí nákazu před prvním úplňkem; jinak na 24 h potlačí projevy a zabrání proměně.", 0, "35 sur", "0,1 l lihu, vlčí mor", 24 * hodina, 30 * minuta, 0, "hnědá průhledná tekutina, sladkokyselá chuť", "14"),
    "els": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Elixír sedmibylí", "18 MP", ["Alchymista", "sp 6"], 0, "Okamžitě léčí zranění a tlumí bolest; zastaví otravu krve.", "3k6+6 léčení", "22 sur", "0,1 l lihu, byliny", 24 * hodina, 20 * minuta, 0, "zlatavá tekutina, vůně/chuť sušených bylin", "10"),
    "eza": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Elixír zapomnění", "35 MP", ["Alchymista", "sp 6"], 0, "Okamžitá otupělost; 1 směnu nekomunikuje/nevnímá; po skončení zapomene vše z předchozí směny.", 0, "10 sur", "0,1 l lihu, makovice", 0, 5 * kolo, 15 * minuta, "světle šedá, lehce hořká tekutina", "8"),
    "gal": new Recip("skill/special/alc/magicke_predmety.png", "Gaistova lampa", "60 MP (+ až 100 MP přídavně)", ["Alchymista", "sp 8"], 0, "V šeru/tmě odhaluje dutiny a tajné prostory (ne kov); v 1 kole prozkoumá 2×2 sáhy; každé kolo 5 MP příd.; po vyčerpání příd. many schopnost zaniká.", 0, "60 sur", "broušená čočka a lucerna", 0, 2 * hodina, 1 * kolo, "stíněná lucerna s čočkou", "10"),
    "kvr": new Recip("skill/special/alc/nestabilni_substance.png", "Kovožrout", "45 MP", ["Alchymista", "sp 7"], 0, "Po kontaktu s kovem jej rychle leptá (meč ~1 min, těžký řetěz ~5 min); neutralizace 2 l vody; bez kontaktu s kovem neškodný; po 1 směně sám přestane působit.", 0, "40 sur", "kyselina", 0, 30 * minuta, 0, "flakón s narůžovělou tekutinou, oříšková vůně", "8"),
    "kvt": new Recip("skill/special/alc/krystaly_a_energie.png", "Kvantogen", "40 MP (+ až 90 MP přídavně)", ["Alchymista", "sp 11"], 0, "Krystal taví materiály v místě dotyku; spotřeba 3 MP/kolo, hloubka 1 coul a délka 10 coulů za kolo; povrch chladne 10 kol.", 0, "80 sur", "drahokam v kovovém jehlanu", 0, 24 * hodina, 0, "krystal v jehlanu", "12"),
    "lko": new Recip("skill/special/alc/hvezdne_sestavy.png", "Létající koště", "315 MP", ["Alchymista", "sp 10 / slunovrat"], 0, "Koště s démonem; let ~60 sáhů/kolo; unese ~130 liber; přetížení snižuje výkon nebo brání vzletu (dle PJ).", 0, "15 sur", "koště", 0, 24 * hodina, 0, "běžné koště se schopností létat", "14"),
    "mpd": new Recip("skill/special/alc/hvezdne_sestavy.png", "Meč požírač duší", "110 MP", ["Alchymista", "sp 10 / půlnoc / úplněk"], 0, "Meč s démonem: při zásahu vysaje oběti +3 Ž; musí být krmen 3 Ž každých 24 h, jinak bledne a 3. den praskne a je zničen.", 0, "80 sur", "meč", 0, 24 * hodina, 0, "meč rudé až bronzové barvy", "12"),
    "nas": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Naslouchátko", "112 MP", ["Alchymista", "sp 9"], 0, "Slyší šepot až na 50 sáhů a přes překážky; často bez ověření, jinak dává Výhodu (+5) na Postřeh.", 0, "60 sur", "ucho/sluchovod, kovový trychtýřek", 0, 2 * den, 0, "trychtýř k nasazení do ucha", "8"),
    "nek": new Recip("skill/special/alc/magicke_predmety.png", "Nekrozor", "50 MP (+ až 60 MP přídavně)", ["Alchymista", "sp 8"], 0, "Dalekohled zvýrazní tepelnou stopu (živí červeně, mrtví modře); aktivně do 100 sáhů; spotřeba 3 MP/kolo.", 0, "90 sur", "čočky, krystal, dva tubusy", 0, 2 * den, 1 * kolo, "dva tubusy s čočkami", "10"),
    "plm": new Recip("skill/special/alc/nestabilni_substance.png", "Plamenný meč", "130 MP", ["Alchymista", "sp 7"], 0, "Krystalky soli: po škrtnutí plameny na ostří (~5 coulů, svit do 2 sáhů) ~1 den; lze uhasit vodou/bez vzduchu; v boji dodává +1–3 Ž (1k6/2).", "+1–3 (1k6/2)", "70 sur", "meč", 0, 24 * hodina, 0, "meč se zelenými krystalky na čepeli", "12"),
    "plc": new Recip("skill/special/alc/magicke_predmety.png", "Plášť chameleon", "30 MP (+ až 120 MP přídavně)", ["Alchymista", "sp 8"], 0, "Maskuje nositele zrcadlením pozadí; v klidu dokonalé, při chůzi může prozradit lom světla; spotřeba 2 MP/min.", 0, "100 sur", "plášť s kapucí", 0, 2 * den, 10 * kolo, "běžný plášť s kapucí", "12"),
    "prb": new Recip("skill/special/alc/krystaly_a_energie.png", "Prsten blesku", "100 MP (+ až 40 MP přídavně)", ["Alchymista", "sp 11"], 0, "Sevřením pěsti vyšle blesk do 20 sáhů za 2k6 Ž; každé použití 5 MP příd.; max 1 blesk/kolo.", "2k6", "120 sur", "prsten, krystal", 0, 2 * den, 0, "prsten s vybroušeným krystalem", "10"),
    "res": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Respirátor", "40 MP", ["Alchymista", "sp 9"], 0, "Poskytne vzduch na 1 směnu; lze během 1 kola znovu naplnit na místě se vzduchem.", 0, "185 sur", "plíce (A+), kožená torna", 0, 24 * hodina, 15 * minuta, "kožená maska s hadičkou do torny", "8"),
    "sib": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Sibériovy posilující lektvary", "dle síly MP", ["Alchymista", "sp 9"], 0, "Dočasně zvýší opravu zvoleného atributu (+1 až +6) dle many a základu; úměrně roste i max. Ž/Mana a související vlastnosti.", 0, "65 sur", "alkohol, vnitřní orgány (dle tabulky)", "1 týden", 15 * minuta, 2 * hodina, "různé barvy/druhy dle atributu", "10"),
    "svp": new Recip("skill/special/alc/krystaly_a_energie.png", "Světloprach", "5 MP", ["Alchymista", "sp 11"], 0, "Po 5 kolech na vzduchu jemně září (síla pochodně na 1/10 váčku) až 2 hodiny; bez tepla, lehký, sírový pach.", 0, "20 sur", "drcený drahokam (nejčastěji opál)", 0, 10 * minuta, 2 * hodina, "jemný zlatý prášek ve váčku s bílou stuhou", "6"),
    "vbz": new Recip("skill/special/alc/hvezdne_sestavy.png", "Vak beztíže", "45 MP", ["Alchymista", "sp 10 / úplněk"], 0, "Vak (30×60 coulů) s démonem: vše plně uvnitř nic neváží; nesmí obsahovat jiné magické předměty; na živé tvory nepůsobí.", 0, "90 sur", "pytel/vak", 0, 24 * hodina, 0, "běžný cestovní vak", "14"),
    "vyh": new Recip("skill/special/alc/nestabilni_substance.png", "Výbušná hlína", "12 MP", ["Alchymista", "sp 7"], 0, "Lze vtlačit do zámků/spár; exploduje ohněm při zápalu nebo nárazu, zraňuje v okruhu r=3 sáhy za 2k6 Ž; trvanlivost ~1 měsíc, poté riziko samovznícení.", "2k6 (plošně ohněm)", "15 sur", "hlína", 0, 10 * minuta, 0, "hliněná koule velikosti pěsti", "10"),
    //kou
    "mtr": new SpellA("spell.png", "Magický trik", "1 MP", ["Kouzelník", "sk 400"], 0, "Iluze ve vzduchu, zvuky, obrázky, změna chuti/barvy", 0, 1 * kolo, "ihned/záleží", "4+lvl sáhů", "1 objekt", 0),
    "bza": new SpellW("skill/special/kou/ochranna_magie.png", "Bertolduv zámek", "1+X MP", ["Kouzelník", "sk 400"], "Atletika(SIL) vs dveře+X", "Zamkne a zvyšuje odolnost dveří, oken, brány, truhly, ... i bez zámku", 0, 2 * kolo, 1 * hodina, "dotek", "1 otevíratelný objekt", "6"),
    "ble": new SpellW("skill/special/kou/divoka_magie.png", "Blesk", "1+2X MP", ["Kouzelník", "sk 400"], 0, "Výboj energie", "Xk6 magické", pul, 0, "20 sáhů", "1 tvor", "4+2X"),
    "kuk": new SpellW("skill/special/kou/magie_promen.png", "Kukátko", "2 MP", ["Kouzelník", "sk 400"], 0, "Prohlédne přes pevnou překážku", 0, 1 * kolo, 1 * minuta, "dotek", "zeď/dveře 1x1x1 sáh", "6"),
    "lev": new SpellW("skill/special/kou/vysoka_magie.png", "Levitace", "4+X MP", ["Kouzelník", "sk 400"], 0, "Levitace nad zemí předmětů/tvorů do hmotnosti 100 +20*X lb", 0, 1 * kolo, 15 * minuta, "dotek", "1 tvor/předmět", "6"),
    "mst": new SpellW("skill/special/kou/divoka_magie.png", "Magická střela", "1+7*X MP", ["Kouzelník", "sk 400"], 0, "Výboj explodující energie proti magickým tvorům", "2k6 *X magické v rozsahu", 1 * kolo, 0, "100 sáhů", "mag.bystosti do 3+X*2 sáhů", "6+X*2"),
    "msi": new SpellW("skill/special/kou/ochranna_magie.png", "Magický štít", "1+XMP", ["Kouzelník", "sk 400"], 0, "Magická bariéra +5 ZO", 0, pul, "X", "dotek", "1 tvor", "6"),
    "npr": new SpellW("skill/special/kou/vysoka_magie.png", "Najdi předmět", "4 MP", ["Kouzelník", "sk 400"], 0, "Vycítí pozici hledaného předmětu", 0, 5 * kolo, 15 * kolo, "50 sáhů", "1 předmět", "6/11"),
    "nev": new SpellW("skill/special/kou/magie_promen.png", "Neviditelnost", "6 MP", ["Kouzelník", "sk 400"], 0, "Neviditelnost do vyprchání, promluvení, útoku, či náročnější akce", 0, 1 * kolo, 15 * minuta, "50 sáhů", "1 tvor/předmět max C", "6"),
    "ozb": new SpellW("skill/special/kou/magie_promen.png", "Očaruj zbraň", "4 MP", ["Kouzelník", "sk 400"], 0, "Zbraň se stává magickou", 0, 2 * kolo, 15 * minuta, "dotek", "1 zbraň", 6),
    "ohe": new SpellW("skill/special/kou/divoka_magie.png", "Oheň", "2 MP", ["Kouzelník", "sk 400"], 0, "Oheň magicky hořící v prostoru do zásahu živé tvory", "1-3 ohněm", 1 * kolo, 15 * minuta, "10 sáhů", "-", "6"),
    "ryc": new SpellW("skill/special/kou/vitalni_magie.png", "Rychlost", "1+X MP", ["Kouzelník", "sk 400"], 0, "+1 útok/obrana +2 OČ/init/dovednosti(OBR) pohyblivost*2", 0, 1 * kolo, "X kol", "10 sáhů", "1 tvor", "6"),
    "sve": new SpellW("skill/special/kou/divoka_magie.png", "Světlo", "X MP", ["Kouzelník", "sk 400"], 0, "Drobná koule s jasným světlem vybrané barvy do 2*X sáhů", 0, 1 * kolo, 1 * hodina, "30 sáhů", "-", "6"),
    "tel": new SpellW("skill/special/kou/vysoka_magie.png", "Teleport", "4 MP", ["Kouzelník", "sk 400"], 0, "Přesun jednoho tvora do vel C max na 60 sáhů", 0, 1 * kolo, 0, "dotek", "1 tvor", "6"),
    "amb": new SpellW("skill/special/kou/ochranna_magie.png", "Antimagická bariéra", "3 + X MP", ["Kouzelník", "sp 7"], 0, "Aura chrání kouzelníka dle dodané many. Cizí cílené kouzla odčerpaji svou cenu, plošné 1/4 své ceny.", 0, "půl kola", "2 hodiny", "–", "kouzelník", "10"), 
    "ber": new SpellW("skill/special/kou/divoka_magie.png", "Beranidlo", "dle cíle (viz tabulka) MP", ["Kouzelník", "sp 6"], "Sesílání kouzel (INT) vs. Atletika (SIL) cíle (pro úhyb)", "Průrazná vlna do překážky (dveře/stěna); tvory odhodí/povalí (neubližuje).", 0, "2 kola", "ihned", "10 sáhů", "1 překážka", "8"), 
    "brc": new SpellW("skill/special/kou/mentalni_magie.png", "Břichomluvectví", "3 MP za 10 sáhů", ["Kouzelník", "sp 10"], "Vůle (CHAR) kouzelníka vs. Vůle (CHAR) cílů", "Vkládá zvuky/hlas do vybraného místa v dosahu; slyší je jen živí inteligentní tvorové (lze měnit zdroj přidáním 1 MP).", 0, "1 kolo", "15 minut (1 směna)", "dle dodané many", "koule o poloměru dle many", "6"), 
    "ciz": new SpellW("skill/special/kou/vysoka_magie.png", "Cizí jazyk", "9 MP", ["Kouzelník", "sp 11"], 0, "Sesilatel rozumí a mluví cizí řečí (neplatí na psaný text).", 0, "2 kola", "15 minut (1 směna)", "–", "kouzelník", "8"), 
    "dlr": new SpellW("skill/special/kou/magie_promen.png", "Dlouhá ruka", "2 MP", ["Kouzelník", "sp 8"], 0, "Ruka se protáhne až na 10 sáhů (plazí se po povrchu, neumí útočit; lze brát věci, odemykat, spouštět pasti).", 0, "3 kola", "15 kol", "–", "kouzelník", "8"), 
    "dup": new SpellW("skill/special/kou/vitalni_magie.png", "Dotek upíra", "5 MP", ["Kouzelník", "sp 9"], 0, "Při zásahu vysaje 1k6 životů a polovinu si kouzelník hned přidá (jen na živé).", "1k6 (polovina léčí sesilatele)", "1 kolo", "5 kol", "–", "kouzelník", "10"), 
    "dvo": new SpellW("skill/special/kou/mentalni_magie.png", "Dvojník", "3 MP za směnu", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Vsugeruje dokonalou mentální iluzi tvora; nehmotná, vyžaduje soustředění.", 0, "1 kolo", "15 minut (1 směna)", "100 sáhů", "kruh o poloměru 10 sáhů", "8"), 
    "let": new SpellW("skill/special/kou/vysoka_magie.png", "Leť", "1 MP za 2 kola", ["Kouzelník", "sp 11"], 0, "Cíl umí létat (max ~30 sáhů/kolo), ale musí se soustředit a nemůže dělat jiné akce.", 0, "2 kola", "dle dodané many", "dotek", "1 tvor", "8"), 
    "mgz": new SpellW("skill/special/kou/ochranna_magie.png", "Magická zbroj", "3 + X MP", ["Kouzelník", "sp 7"], 0, "Neviditelná aura zvyšuje ZO: za každé +4 MP navíc +1 k obraně (kombinovatelná se zbrojí/kouzly).", 0, "půl kola", "15 minut (1 směna)", "dotek", "1 tvor", "8"), 
    "met": new SpellW("skill/special/kou/magie_promen.png", "Metamorfóza", "6 MP", ["Kouzelník", "sp 8"], 0, "Promění sesilatele v živou bytost podobné velikosti; přebírá fyzické rysy a nemagické přirozené schopnosti.", 0, "2 kola", "15 minut (1 směna)", "40 sáhů", "kouzelník", "10"), 
    "mlh": new SpellW("skill/special/kou/magie_promen.png", "Mlha", "1 MP za 10 sáhů poloměru", ["Kouzelník", "sp 8"], 0, "Hustá nejedovatá mlha, viditelnost v ní max 2 sáhy; může se vázat na místo nebo se sesilatelem.", 0, "2 kola", "15 minut (1 směna)", "30 sáhů", "kruh o poloměru dle many", "8"), 
    "mrs": new SpellW("skill/special/kou/divoka_magie.png", "Mrazivá střela", "7 MP za první, 6 MP za každou další", ["Kouzelník", "sp 6"], 0, "Ledová střela vybuchne do krystalů; více střel v kole se spojí (větší rozsah i zranění).", "2k10 (plošně)", "1 kolo", "ihned", "120 sáhů", "koule o poloměru 5 sáhů (+2/s další)", "8 (+2/každá další)"), 
    "nkj": new SpellW("skill/special/kou/vysoka_magie.png", "Najdi kouzla", "3 MP", ["Kouzelník", "sp 11"], 0, "Zviditelní magická rezidua a aktivní kouzla v okolí (identifikace přesná jen pro známá kouzla).", 0, "3 kola", "10 kol (1 minuta)", "–", "magická rezidua v okruhu 30 sáhů", "8"), 
    "npo": new SpellW("skill/special/kou/ochranna_magie.png", "Naruš pozornost", "4 + X MP", ["Kouzelník", "sp 7"], 0, "Bolest hlavy, pískot v uších; +5 k obtížnosti akcí vyžadujících soustředění (lze dál zvyšovat za MP navíc).", 0, "půl kola", "1 kolo", "40 sáhů", "1 tvor", "8"), 
    "noc": new SpellW("skill/special/kou/mentalni_magie.png", "Noční můra", "4 MP", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Postihuje spánek děsy; po probuzení se léčí jen 1 Ž, opakování přidává únavu a ztráty Ž.", 0, "5 kol", "1 hodina", "30 sáhů", "1 tvor", "10"), 
    "ohc": new SpellW("skill/special/kou/divoka_magie.png", "Ohnivá čepel", "5 MP", ["Kouzelník", "sp 6"], 0, "Čepel planoucí magickým ohněm; každý zásah +1–3 Ž (1k6/2), může zapalovat.", "+1–3 k zásahu (1k6/2)", "1 kolo", "10 kol (1 minuta)", "dotek", "1 zbraň", "8"), 
    "ohk": new SpellW("skill/special/kou/divoka_magie.png", "Ohnivá koule", "5 MP za každou kouli", ["Kouzelník", "sp 6"], 0, "Letící plamenná koule exploduje; více koulí v kole se spojí (větší rozsah i zranění), zapaluje hořlaviny.", "2k6 (plošně)", "1 kolo", "ihned", "60 sáhů", "koule o poloměru 5 sáhů (+2/s další)", "10 (+2/každá další)"), 
    "ops": new SpellW("skill/special/kou/ochranna_magie.png", "Ochrana před střelami", "3 + X MP", ["Kouzelník", "sp 7"], 0, "Kupole zastavuje rychlé střely; každá střela odčerpá z dodatečné many (nelze střílet ven, magie prochází).", 0, "půl kola", "2 hodiny", "dotek", "koule kolem cíle, r=2 sáhy", "8"), 
    "och": new SpellW("skill/special/kou/mentalni_magie.png", "Ochromení", "3× úroveň cíle MP", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Paralyzuje cíl (strnulý, nemůže mluvit/mrkat); vyžaduje soustředění sesilatele.", 0, "1 kolo", "15 minut (1 směna)", "30 sáhů", "1 tvor", "12"), 
    "okz": new SpellW("skill/special/kou/vysoka_magie.png", "Oko zření", "8 MP", ["Kouzelník", "sp 11"], 0, "Sesilatel vidí neviditelné tvory/předměty; mají pro něj slabou zářící auru.", 0, "2 kola", "15 minut (1 směna)", "–", "kouzelník", "10"), 
    "plr": new SpellW("skill/special/kou/divoka_magie.png", "Plamenné ruce", "4 MP", ["Kouzelník", "sp 6"], 0, "Z rukou šlehají plameny (šířka ~30 coulů, dosah 2 sáhy); při útoku celé kolo 1k6 Ž a snadno zapaluje.", "1k6", "1 kolo", "3 kola", "2 sáhy", "kouzelník", "8"), 
    "pov": new SpellW("skill/special/kou/divoka_magie.png", "Poryv větru", "2 MP", ["Kouzelník", "sp 6"], 0, "Náhlý poryv větru (typicky nepohne >5 lb); pás 1 sáh × 10 sáhů.", 0, "1 kolo", "1 kolo", "50 sáhů", "pás 1×10 sáhů", "8"), 
    "pos": new SpellW("skill/special/kou/vitalni_magie.png", "Posílení smyslu", "2 MP", ["Kouzelník", "sp 9"], 0, "Zvýší citlivost vybraného smyslu (zrak/sluch/čich/hmat/chuť); dává Výhodu (+5) na hody s tímto smyslem.", 0, "1 kolo", "15 minut (1 směna)", "dotek", "1 tvor", "8"), 
    "pzl": new SpellW("skill/special/kou/vitalni_magie.png", "Pouto života", "3 MP za kolo", ["Kouzelník", "sp 9"], 0, "Sdílí zranění mezi cílem a sesilatelem (rovnoměrně). Vyžaduje soustředění; vyrušení/bezvědomí ruší efekt.", 0, "půl kola", "dle dodané many", "20 sáhů", "1 tvor", "12"), 
    "ptp": new SpellW("skill/special/kou/magie_promen.png", "Protoplazma", "4 MP", ["Kouzelník", "sp 8"], "Sesílání kouzel (INT) vs. Reflex", "Lepivý sliz omezuje pohyb (poloviční rychlost, Nevýhoda -5 na obratnostní akce/obranu/iniciativu/kouzlení); do velikosti C.", 0, "1 kolo", "4 kola", "15 sáhů", "1 tvor", "10"), 
    "prn": new SpellW("skill/special/kou/vitalni_magie.png", "Přivolej nemrtvé", "4 MP", ["Kouzelník", "sp 9"], 0, "Vábí nemrtvé v širokém okolí na vybrané místo (ignorují bojující; inteligentní s podezřením mohou odolat).", 0, "1 kolo", "ihned", "100 sáhů", "kruh o poloměru 50 sáhů", "12"), 
    "rzk": new SpellW("skill/special/kou/ochranna_magie.png", "Rozptyl kouzlo", "3 + X MP (X = cena rušeného kouzla)", ["Kouzelník", "sp 7"], "Sesílání kouzel (INT) vs. obtížnost rušeného kouzla", "Zruší cizí kouzlo, pokud je vloženo dost MP a padne hod přes obtížnost původního kouzla.", 0, "3 kola", "ihned", "10 sáhů", "1 kouzlo", "dle cíle"), 
    "sch": new SpellW("skill/special/kou/ochranna_magie.png", "Schránka", "2 MP", ["Kouzelník", "sp 7"], 0, "Černá neprůhledná aura hermeticky chrání předmět velikosti hlávky zelí; nelze ji otevřít dřív.", 0, "1 kolo", "1 hodina (4 směny)", "dotek", "1 předmět (vel. hlávky zelí)", "10"), 
    "sug": new SpellW("skill/special/kou/mentalni_magie.png", "Sugesce", "3 + úroveň cíle MP", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Vsugeruje cítění/pocit (hlad, vztek, bolest atd.).", 0, "2 kola", "30 minut (2 směny)", "30 sáhů", "1 tvor", "10"), 
    "tad": new SpellW("skill/special/kou/magie_promen.png", "Tajemné dveře (Porta Arcánum)", "5 MP", ["Kouzelník", "sp 8"], 0, "Dveře vypadají jako stěna a dočasně se chovají jako skutečná zeď; nejdou otevřít/odemknout.", 0, "1 kolo", "10 kol (1 minuta)", "10 sáhů", "1 dveře", "10"), 
    "tlk": new SpellW("skill/special/kou/vysoka_magie.png", "Telekineze", "3 MP za libru", ["Kouzelník", "sp 11"], 0, "Na dálku pohybuje jedním viděným předmětem (rychlost 6 sáhů/kolo); přímé držení předmětu kouzlo nepřetlačí.", 0, "1 kolo", "6 kol", "30 sáhů", "1 předmět", "8"), 
    "tem": new SpellW("skill/special/kou/magie_promen.png", "Temnota", "1 MP za 2 sáhy poloměru (2× cena = viditelnost uvnitř)", ["Kouzelník", "sp 8"], 0, "Prostor uvnitř je neproniknutelně tmavý (ruší i noční vidění); lze vázat na místo nebo na sesilatele.", 0, "1 kolo", "10 kol (1 minuta)", "30 sáhů", "koule o poloměru dle many", "8"), 
    "tic": new SpellW("skill/special/kou/vysoka_magie.png", "Ticho", "2 MP za sáh poloměru (2× cena = slyší se uvnitř)", ["Kouzelník", "sp 11"], 0, "V oblasti je absolutní ticho (uvnitř neslyší nic; zvenku dovnitř slyšet je). Lze navázat na sesilatele.", 0, "1 kolo", "1 hodina (4 směny)", "20 sáhů", "koule o poloměru dle many", "8"), 
    "vtr": new SpellW("skill/special/kou/vitalni_magie.png", "Vitální transfer (Trans Vitális)", "1 + X MP", ["Kouzelník", "sp 9"], 0, "Sesilatel přenáší své životy do cíle (za každý MP navíc si 1 Ž odečte a cíl 1 Ž získá; max polovina vlastního maxima).", "léčí: X (za cenu vlastních Ž)", "2 kola", "ihned", "dotek", "1 tvor", "8"), 
    "viz": new SpellW("skill/special/kou/mentalni_magie.png", "Vize", "3 MP za každých 5 minut", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Vsugeruje obraz/scénu, kterou cíl vidí jako skutečnou (i místa, která sesilatel nezná).", 0, "2 kola", "dle dodané many", "100 sáhů", "1 tvor", "10"), 
    "vod": new SpellW("skill/special/kou/vitalni_magie.png", "Voodoo", "5 MP (10 MP bez figurky s částí těla)", ["Kouzelník", "sp 9"], "Vůle (CHAR) vs. Vůle", "Po přípravě a úspěchu způsobuje bodnutí do figurky nesnesitelnou bolest a dočasné postihy v odpovídající části těla.", 0, "2 kola (+5 minut příprava)", "4 kola", "40 sáhů", "1 tvor", "12"),
    //zlo
    "bbz": new TrickA("action.png", "Boj beze zbraně", "volné ruce", ["Zloděj"], 0, "Bonus +3/3 pro boj beze zbraně (max.okov. rukavice)", 0),
    "lez": new TrickA("skill/special/zlo/lezeni.png", "Lezení", "", ["Zloděj", "sp 6"], "U.Kočičího pohybu(OBR) vs X", "Lezení 2 sáhy za kolo jednou za 5/10 sáhů", 0),
    "ohb": new TrickA("skill/special/zlo/ohebnost.png", "Ohebnost", "", ["Zloděj", "sp 6"], "U.Kočičího pohybu(OBR) vs X", "Ohýbání se, protažení se", 0),
    "pzv": new TrickA("skill/special/zlo/pad_z_vysky.png", "Pád z výšky", "", ["Zloděj", "sp 6"], "U.Kočičího pohybu(OBR) vs X", "Žádné, nebo 1/2 zranění z pádu", 0),
    "mim": new TrickA("skill/special/zlo/mimika.png", "Mimika", "", ["Zloděj", "sp 7"], "U.Proměn(CHA) vs Postřeh(INT)", "Kontrola nad obličejem", 0),
    "pre": new TrickA("skill/special/zlo/prevleky.png", "Převleky", "herecké rekvizity", ["Zloděj", "sp 7"], "U.Proměn(CHA) vs Postřeh(INT)", "Vyrobení převleku / masky", 0),
    "imi": new TrickA("skill/special/zlo/imitace.png", "Imitace", "zaslechnutí / 5 min", ["Zloděj", "sp 7"], "U.Proměn(CHA) vs Postřeh(INT)", "Imitace hlasů", 0),
    "svs": new TrickA("skill/special/zlo/schovani_ve_stinu.png", "Schovávání se ve stínu", "stín / tma, 1 kolo", ["Zloděj", "sp 8"], "U.Skrývání(OBR) vs X", "Nesmí být spatřen cílem v době skrývání. Pohyb krok / kolo", 0),
    "ssd": new TrickA("skill/special/zlo/splynuti_s_davem.png", "Splynutí s davem", "10+ lidí, 1 kolo", ["Zloděj", "sp 8"], "U.Skrývání(OBR/CHA) vs Postřeh(INT)", "Splynutí s davem před pronásledovateli", 0),
    "tph": new TrickA("skill/special/zlo/tichy_pohyb.png", "Tichý pohyb", "5 minut balení", ["Zloděj", "sp 8"], "U.Skrývání(OBR) vs Postřeh(INT)", "Látkou znehluční své vybavení a pohybuje se tiše", 0),
    "oli": new TrickA("skill/special/zlo/odhad_lidi.png", "Odhad lidí", "1 min až 5 min", ["Zloděj", "sp 9"], "U.Šarmu(CHA/INT) vs Vůle(CHA)", "INT pozorování CHA mluvení", 0),
    "zdu": new TrickA("skill/special/zlo/ziskani_duvery.png", "Získání důvěry", "1 min rozhovor", ["Zloděj", "sp 9"], "U.Šarmu(CHA) vs Vůle(CHA)", "Získá důvěru jako starý známý", 0),
    "opo": new TrickA("skill/special/zlo/odvedeni_pozornosti.png", "Odvedení pozornosti", "Aktivní akce", ["Zloděj", "sp 9"], "U.Šarmu(CHA) vs Vůle(CHA)", "Upoutání pozornosti / odvedení tématu => -5 postřeh", 0),
    "fut": new TrickA("skill/special/zlo/falesny_utok.png", "Falešný útok", "Jednou za nepřítele", ["Zloděj", "sp 10"], "U.Rváčů(OBR) vs Reflex(OBR)", "Obchází obranu -> ZO", 0),
    "ost": new TrickA("skill/special/zlo/oko_strelce.png", "Oko střelce", "Příprava 3 kola", ["Zloděj", "sp 10"], "U.Rváčů(OBR) vs X", "Neživé cíle = zásah, živé = útok +5", 0),
    "omr": new TrickA("skill/special/zlo/omraceni.png", "Omráčení", "Cíl nečeká útok", ["Zloděj", "sp 10"], "U.Rváčů(OBR) vs Výdrž(ODO)", "Cíl má 0 životů a je v bezvědomí", 0),
    "opa": new TrickA("skill/special/zlo/odstraneni_pasti.png", "Odstranění pastí", "1 min až 1 směna", ["Zloděj", "sp 11"], "U.Železného klíče(OBR) vs X", "Odstranění nemagických pastí", 0),
    "oza": new TrickA("skill/special/zlo/otevirani_zamku.png", "Otevírání zámků", "", ["Zloděj", "sp 11"], "U.Železného klíče(OBR) vs X", "Zloděj.vybavení, nebo -5 => odemkne / zamkne", 0),
    "pad": new TrickA("skill/special/zlo/padelani.png", "Padělání", "", ["Zloděj", "sp 11"], "U.Železného klíče(OBR) vs X", "Dokonalý/částečný padělek, bez vybavení X*2, psaní pro dokumenty", 0),
    //kle
    "poz": new TrickA("spell.png", "Svěcení", "1 BP, 1 minuta", ["Klerik", "sk 600"], 0, "Klerik vytvoří až 1l svěcené vody, nebo posvětí 1 zbraň", 0),
    "zvo": new TrickA("spell.png", "Zvolání", "-", ["Klerik", "sk 600"], 0, "Zvolá o pomoc svého boha, ", 0, 0, 0, "různé", "různé", "0"),
    "lru": new SpellA("spell.png", "Léčivé ruce", "3 BP", ["Klerik", "sk 600"], 0, "Přiložením rukou léčí", "1k6 léčení", 1 * kolo, 0, "dotek", "1 tvor", "6"),
    "oci": new SpellA("spell.png", "Očištění", "3 MP", ["Klerik", "sk 600"], 0, "Poorci jídla zbaví jedů a nákaz", 0, 10 * kolo, 0, "dotek", "1 porce jídla / 1l pití", "6"),
    "svi": new SpellA("spell.png", "Štít víry", "1+2*X MP", ["Klerik", "sk 600"], 0, "+5 ZO vybraným tvorům v rozsahu", 0, 0, "X kol", 0, "tvorové do 2 sáhů", "6"),
    "umo": new SpellA("spell.png", "Úder moci", "5 BP", ["Klerik", "sk 600"], 0, "Mentální útok", "1k10 psychycké", 1 * kolo, 0, "20 sáhů", "1 tvor", "6"),
    "uot": new SpellA("spell.png", "Uzdrav otravu", "X MP", ["Klerik", "sk 600"], 0, "Ruší otravu a jedy s nebezpečností X-", 0, 3 * kolo, 0, "dotek", "1 tvor", "6"),
    "hvi": new SpellA("spell.png", "Hlas víry", "2 BP", ["Klerik", "lv 2", "sk 600"], 0, "Zesílí hlas 3×, umožňuje přehlušit dav; +3 k CHAR zastrašování", 0, 1 * kolo, 15 * minuta, "-", "klerik", "8"),
    "ksp": new SpellA("spell.png", "Klidný spánek", "4 BP", ["Klerik", "lv 2", "sk 600"], 0, "Zajistí klidný spánek bez nočních můr; cíl se probudí odpočatý a uzdraví o +2 Ž navíc", 0, 1 * kolo, 8 * hodina, "dotek", "1 tvor", "8"),
    "kps": new SpellA("spell.png", "Kopí pravého světla", "3 BP", ["Klerik", "lv 2", "sk 600"], 0, "Vyšle paprsek světla zraňující nemrtvé, neviděné a nadpozemské bytosti", "1k6+2", 1 * kolo, 0, "100 sáhů", "tvorové v cestě", "8"),
    "opt": new SpellA("spell.png", "Ochrana před temnotou", "4 BP", ["Klerik", "lv 2", "sk 600"], 0, "Nemrtví, nevidění a nadpřirozené bytosti mají vůči cíli Nevýhodu (-5); chrání před kletbami a posedlostí", 0, 1 * kolo, 10 * kolo, "dotek", "1 tvor", "8"),
    "poz": new SpellA("spell.png", "Požehnání zdaru", "3 BP", ["Klerik", "lv 2", "sk 600"], 0, "Cíl získá Výhodu (+5) k dalšímu hodu v následujících 24 h", 0, 2 * kolo, 1 * kolo, "dotek", "1 tvor", "8"),
    "vnk": new SpellA("spell.png", "Vnuknutí", "5 BP", ["Klerik", "lv 2", "sk 600"], 0, "Odešle emocionální poselství s obrazem, dorazí okamžitě; funguje i ve spánku", 0, 0, 0, "kdekoliv", "1 tvor", "8"),
    "aop": new SpellA("skill/special/kle/zehnani_aurami.png", "Aura ocelové pěsti", "6 + 2*X BP", ["Klerik", "sp 11"], 0, "+2 k útoku pro všechny spojence v dosahu aury", 0, 1 * kolo, 3 * kolo, "-", "koule 5 sáhů, všichni tvorové", "8"),
    "apt": new SpellA("skill/special/kle/zehnani_aurami.png", "Aura proti temnotě", "6 + 2*X BP", ["Klerik", "sp 11"], 0, "Do aury nemohou vstoupit nemrtví, nevidění, posedlí a nadpřirozené bytosti; chrání také proti zastrašení", 0, 1 * kolo, 3 * kolo, "-", "koule 5 sáhů, všichni tvorové", "8"),
    "ass": new SpellA("skill/special/kle/zehnani_aurami.png", "Aura svatého štítu", "6 + 2*X BP", ["Klerik", "sp 11"], 0, "+2 k obraně pro všechny spojence uvnitř aury", 0, 1 * kolo, 3 * kolo, "-", "koule 5 sáhů, všichni tvorové", "8"),
    "doz": new SpellA("skill/special/kle/svate_pravdy.png", "Doznání", "3 BP", ["Klerik", "sp 10"], "Vůle(CHA) vs Výdrž(ODO)", "Sníží ODO i CHAR cíle o 1 na 1 směnu; může vést k vynucenému přiznání", 0, 1 * kolo, 15 * minuta, "dotek", "1 tvor", "12"),
    "fpr": new SpellA("skill/special/kle/svate_pravdy.png", "Falešné přátelství", "3 + úroveň cíle BP", ["Klerik", "sp 10"], "Vůle(CHA) vs Vůle(CHA)", "Cíl považuje klerika za přítele, pomáhá mu, neudělá ale nic životu nebezpečného", 0, 2 * kolo, 1 * hodina, "10 sáhů", "1 tvor", "12"),
    "lau": new SpellA("skill/special/kle/zehnani_aurami.png", "Léčivá aura", "10 BP", ["Klerik", "sp 11"], 0, "Uzdraví spojence v dosahu za 1k10 životů", "1k10", 1 * kolo, 0, "-", "koule 5 sáhů, všichni tvorové", "8"),
    "nte": new SpellA("skill/special/kle/demonologie.png", "Najdi temnotu", "3 BP", ["Klerik", "sp 8"], 0, "Umožní vidět aury temných bytostí, prokletých předmětů a neviděných", 0, 3 * kolo, 10 * kolo, "klerik", "všichni temní tvorové v dosahu", "8"),
    "npt": new SpellA("skill/special/kle/milosrdenstvi.png", "Napravení těla", "10 BP", ["Klerik", "sp 9"], 0, "Léčí zlomeniny, šlachy, cévy, bubínek; vyléčí 2k6 životů", "2k6", 2 * kolo, 0, "dotek", "1 tvor", "12"),
    "okl": new SpellA("skill/special/kle/demonologie.png", "Odstraň kletbu", "13 BP", ["Klerik", "sp 8"], "Vůle(CHA) vs X", "Odstraní kletbu z osoby, místa či předmětu", 0, 10 * kolo, 0, "dotek", "1 cíl", "12"),
    "opa": new SpellA("skill/special/kle/milosrdenstvi.png", "Odstraň paralýzu", "5 BP", ["Klerik", "sp 9"], 0, "Odstraní ne‑fyzickou paralýzu (strach, kouzla, kletby)", 0, 3 * kolo, 0, "dotek", "1 tvor", "12"),
    "odt": new SpellA("skill/special/kle/demonologie.png", "Odvrácení temnoty", "3 BP", ["Klerik", "sp 8"], "Vůle(CHA) vs Moc monstra", "Odvrací nemrtvé, neviděné a nadpřirozené bytosti; prchají 24 hodin", 0, 2 * kolo, 0, "-", "koule 5 sáhů, temní tvorové", "10"),
    "osa": new SpellA("skill/special/kle/demonologie.png", "Ošálení temnoty", "4 BP", ["Klerik", "sp 8"], 0, "Klerik je pro temné bytosti neviditelný a neslyšitelný; ruší se útokem nebo prosbou", 0, 1 * kolo, 15 * minuta, "klerik", "1 tvor", "8"),
    "pbo": new SpellA("skill/special/kle/bozi_patroni.png", "Posel bojovník", "2 + X BP", ["Klerik", "sp 7"], 0, "Přivolá bojového posla se 30 Ž; X bodů rozdělí do útoku/obrany", 0, 1 * kolo, 3 * kolo, "20 sáhů", "posel", "10"),
    "prv": new SpellA("skill/special/kle/bozi_patroni.png", "Posel rovnováhy", "12 BP", ["Klerik", "sp 7"], "Vůle(CHA) vs 14", "Posel vysává manu kouzelníků (1k10/ kolo)", "1k10 many", 2 * kolo, 6 * kolo, "30 sáhů", "1 cíl", "10"),
    "pst": new SpellA("skill/special/kle/bozi_patroni.png", "Posel stezky", "5 BP", ["Klerik", "sp 7"], 0, "Posel ukazuje směr hledanému místu, drží se max 10 sáhů od klerika", 0, 5 * kolo, 1 * hodina, "-", "posel", "8"),
    "pum": new SpellA("skill/special/kle/bozi_patroni.png", "Posel umlčení", "12 BP", ["Klerik", "sp 7"], 0, "Narušuje prosby ostatních; při zjevení určuje hodnotu postihu 1k10", 0, 2 * kolo, 6 * kolo, "30 sáhů", "cílová postava", "12"),
    "svz": new SpellA("skill/special/kle/bojovniku_viry.png", "Svatá zbroj", "3 BP", ["Klerik", "sp 6"], 0, "Pohltí veškeré zranění z jednoho útoku v daném kole", 0, 0, 0, "klerik", "klerik", "8"),
    "udz": new SpellA("skill/special/kle/milosrdenstvi.png", "Udržení života", "3 BP", ["Klerik", "sp 9"], 0, "Na 10 kol zastaví účinky jedů, krvácení a kleteb u umírajícího tvora", 0, 1 * kolo, 10 * kolo, "10 sáhů", "1 tvor", "8"),
    "uts": new SpellA("skill/special/kle/bojovniku_viry.png", "Útok štěstěny", "2 BP", ["Klerik", "sp 6"], 0, "Umožní hodit útok 2× a vzít lepší výsledek", 0, 0, 1 * kolo, "-", "klerik", "8"),
    "une": new SpellA("skill/special/kle/milosrdenstvi.png", "Uzdrav nemocného", "5 BP", ["Klerik", "sp 9"], 0, "Léčí běžné nemoci a symptomy; vážné nemoci pouze potlačí na 24 hodin", 0, 3 * kolo, 0, "dotek", "1 tvor", "10"),
    "vip": new SpellA("skill/special/kle/svate_pravdy.png", "Vidění pravdy", "3 BP", ["Klerik", "sp 10"], "Vůle(CHA) vs Vůle(CHA)", "Odhalí lháře — nemůže při přímém pohledu lhát", 0, 1 * kolo, 3 * kolo, "-", "klerik", "11"),
    "vru": new SpellA("skill/special/kle/bojovniku_viry.png", "Vrácení úderu", "4 BP", ["Klerik", "sp 6"], 0, "Útočník utrpí polovinu životů, které způsobil klerikovi", 0, 0, 1 * kolo, "-", "klerik", "10"),
    "zap": new SpellA("skill/special/kle/svate_pravdy.png", "Zapomnění", "8 BP", ["Klerik", "sp 10"], "Vůle(CHA) vs Vůle(CHA)", "Vymaže vzpomínky cíle na poslední hodinu", 0, 3 * kolo, 0, "dotek", "1 tvor", "10"),
    "zzr": new SpellA("skill/special/kle/bojovniku_viry.png", "Zesil zranění", "2 BP", ["Klerik", "sp 6"], 0, "Zranění způsobené klerikem je v tomto kole dvojnásobné", 0, 0, 1 * kolo, "-", "klerik", "10"),

    //"": new TrickA("action.png", "name", "A", [""], 0, "0", 0),
    //"": new TrickW("action.png", "name", "A", [""], 0, "0", 0),
    //"": new SpellA("spell.png", "name", " MP", [""], 0, "text", dmg, castTime, effectDuration, "effectRange", "effectTarget", checkDifficulty),
    //"": new SpellW("spell.png", "name", " MP", [""], 0, "text", dmg, castTime, effectDuration, "effectRange", "effectTarget", checkDifficulty),
    // "zkratka": new Recip("název", "XYZ MP - cena", ["kódPovolání","omezení lvlu","kód potřebné schopnosti"], "Ověření účinku Vůle(CHA) vs Reflex(OBR)", "popis", "účinek na životy", "mn.surovin: 50 sur", "výrobní základ", "četnost v h", "doba výroby", "dobatrvání efektu", "vzhled/popis", "obtížnost"),
    // "zkratka": new SpellA("název", "cena", ["kódPovolání","omezení lvlu","kód potřebné schopnosti"], "Ověření účinku Vůle(CHA) vs Reflex(OBR)", "popis", "účinek na životy", "doba kouzlení", "dobatrvání efektu", "dosah", "rozsah", "obtížnost"),
    // "zkratka": new SpellW("název", "cena", ["kódPovolání","omezení lvlu","kód potřebné schopnosti"], "Ověření účinku Vůle(CHA) vs Reflex(OBR)", "popis", "účinek na životy", "doba kouzlení", "dobatrvání efektu", "dosah", "rozsah", "obtížnost"),
    // "zkratka": new TrickA("název", "cena/podmínky", ["kódPovolání","omezení lvlu","kód potřebné schopnosti"], "Ověření účinku Vůle(CHA) vs Reflex(OBR)", "popis", "účinek na životy"),
    // "zkratka": new TrickW("název", "cena/podmínky", ["kódPovolání","omezení lvlu","kód potřebné schopnosti"], "Ověření účinku Vůle(CHA) vs Reflex(OBR)", "popis", "účinek na životy"),
};