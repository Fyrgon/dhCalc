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
        { "id": 200, "name": "Pouto s přírodou", "img": "skill/Pouto_s_prirodou.png", "req": -1, "znalostni": true, "atr": ["INT"], "startLvl": 3 },
        { "id": 201, "name": "Lov", "img": "skill/Lov.png", "req": -1, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 202, "name": "Orientace", "img": "skill/Orientace.png", "req": -1, "znalostni": false, "atr": ["INT"], "startLvl": 3 },
        { "id": 203, "name": "Předpovídání počasí", "img": "skill/Predpovidani_pocasi.png", "req": -1, "znalostni": false, "atr": ["INT"], "startLvl": 3 },
        { "id": 204, "name": "Stopování", "img": "skill/Stopovani.png", "req": -1, "znalostni": false, "atr": ["INT"], "startLvl": 3 },
        { "id": 205, "name": "Léčitelství", "img": "skill/special/hra/Lecitelstvi.png", "req": 2, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
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
        { "id": 300, "name": "Vidění many", "img": "skill/Videni_many.png", "req": -1, "znalostni": true, "atr": ["INT"], "startLvl": 3 },
        { "id": 301, "name": "Destilace", "img": "skill/Destilace.png", "req": -1, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 302, "name": "Lučba", "img": "skill/Lucba.png", "req": -1, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 303, "name": "Pokročilá identifikace", "img": "skill/special/alc/pokrocila_identifikace.png", "req": 2, "znalostni": true, "atr": ["INT"], "startLvl": 3 },
        { "id": 304, "name": "Výroba svitků", "img": "skill/special/alc/vyroba_svitku.png", "req": 5, "znalostni": true, "atr": ["OBR"], "startLvl": 3 },
        { "id": 305, "name": "Chirurgie", "img": "skill/special/alc/chirurgie.png", "req": "Medicus", "znalostni": true, "atr": ["OBR"], "startLvl": 5 },
        { "id": 306, "name": "Pyromancie", "img": "skill/special/alc/pyromancie.png", "req": "Pyromant", "znalostni": true, "atr": ["OBR"], "startLvl": 5 },
        { "id": 307, "name": "Theurgie", "img": "skill/special/alc/theurgie.png", "req": "Theurg", "znalostni": true, "atr": ["INT"], "startLvl": 5 },
    ],
    "Kouzelník": [
        { "id": 400, "name": "Sesílání kouzel", "img": "skill/Sesilani_kouzel.png", "req": -1, "znalostni": true, "atr": ["INT"], "startLvl": 3 }
    ],
    "Zloděj": [
        { "id": 500, "name": "Hazardní hry", "img": "skill/Hazardni_hry.png", "req": -1, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
        { "id": 501, "name": "Odhad ceny", "img": "skill/Odhad_ceny.png", "req": -1, "znalostni": false, "atr": ["INT"], "startLvl": 3 },
        { "id": 502, "name": "Přesvědčování", "img": "skill/Presvedcovani.png", "req": -1, "znalostni": false, "atr": ["CHA"], "startLvl": 3 },
        { "id": 503, "name": "Vybírání kapes", "img": "skill/Vybirani_kapes.png", "req": -1, "znalostni": false, "atr": ["OBR"], "startLvl": 3 },
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
        { "id": 600, "name": "Prosby", "img": "skill/Prosby.png", "req": -1, "znalostni": true, "atr": ["CHA"], "startLvl": 3 }
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
        for (spec of this[sel]) {
            if (spec[key] == val) return spec;
        }
        return false;
    },
};


class Action {
    constructor(img, name, cost, req, check, text, dmg, type, free) {
        this.img = img;
        this.name = name
        this.cost = cost;
        this.req = req;
        this.check = check;
        this.text = text;
        this.dmg = dmg;
        this.type = type;
        this.free = free;
    }
};
class TrickA extends Action {
    constructor(img, name, cost, req, check, text, dmg) {
        super(img, name, cost, req, check, text, dmg, "trick", true);
    }
};
class TrickV extends Action {
    constructor(img, name, cost, req, check, text, dmg) {
        super(img, name, cost, req, check, text, dmg, "trick", false);
    }
};
class Spell extends Action {
    constructor(img, name, cost, req, check, text, dmg, free, cTime, duration, range, target, difficulty) {
        super(img, name, cost, req, check, text, dmg, "spell", free);
        this.cTime = cTime;
        this.duration = duration;
        this.range = range;
        this.target = target;
        this.difficulty = difficulty;
    }
};
class SpellV extends Spell {
    constructor(img, name, cost, req, check, text, dmg, ingredients, mainIng, frequency, cTime, duration, recognition, difficulty) {
        super(img, name, cost, req, check, text, dmg, false, ingredients, mainIng, frequency, cTime, duration, recognition, difficulty);
    }
}
class SpellA extends Spell {
    constructor(img, name, cost, req, check, text, dmg, ingredients, mainIng, frequency, cTime, duration, recognition, difficulty) {
        super(img, name, cost, req, check, text, dmg, true, ingredients, mainIng, frequency, cTime, duration, recognition, difficulty);
    }
}
class Recip extends Action {
    constructor(img, name, cost, req, check, text, dmg, ingredients, mainIng, frequency, cTime, duration, recognition, difficulty) {
        super(img, name, cost, req, check, text, dmg, "recip", true);
        this.ingredients = ingredients;
        this.mainIng = mainIng;
        this.frequency = frequency;
        this.cTime = cTime;
        this.duration = duration;
        this.recognition = recognition;
        this.difficulty = difficulty;
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
    "opr": new TrickV("action.png", "Odražení projektilu", "1 A", ["Válečník", "lv 2"], 0, "Obrana proti projektilům +5", 0),
    "rpr": new TrickV("action.png", "Rychlý přesun", "1 A", ["Válečník", "lv 2"], 0, "Okamžitá akce krok má 2x dosah", 0),
    "rud": new TrickV("action.png", "Rychlý úder", "1 A", ["Válečník", "lv 2"], 0, "Iniciatíva +5", 0),
    "tkr": new TrickV("action.png", "Tvrdý kryt", "1 A", ["Válečník", "sp 6"], 0, "Obrana +2", 0),
    "uhl": new TrickV("action.png", "Úder hlavicí", "2 A", ["Válečník", "sp 6"], 0, "Při zásahu +1k6+2 zranění", 0),
    "uas": new TrickV("action.png", "Úhyb a sek", "3 A", ["Válečník", "sp 6"], 0, "Při ubránění se 1 volný útok proti ZO", 0),
    "but": new TrickV("action.png", "Bezhlavý útok", "1 A", ["Válečník", "sp 7"], 0, "Útok +5; nemožnost se bránit v tomto kole", 0),
    "dut": new TrickV("action.png", "Drtivý útok", "2 A", ["Válečník", "sp 7"], 0, "Zranění útoku +5", 0),
    "kse": new TrickV("action.png", "Kruhový sek", "3 A", ["Válečník", "sp 7"], 0, "Zásah kolem sebe -2UČ kumulativně", 0),
    "usk": new TrickV("action.png", "Úskok", "1 A", ["Válečník", "sp 8"], 0, "Obrana +2 do konce kola", 0),
    "uzo": new TrickV("action.png", "Útok z obrany", "2 A", ["Válečník", "sp 8"], 0, "Zraní útočníka za Obrana-Útok životů", 0),
    "vyp": new TrickV("action.png", "Výpad", "3 A", ["Válečník", "sp 8"], 0, "Zranění +1k6 krvácení", 0),
    "tpo": new TrickV("action.png", "Trpasličí polibek", "1 A", ["Válečník", "sp 9"], "SIL vs OBR", "Útok čelem za SIL zranění", 0),
    "snz": new TrickV("action.png", "Stržení na zem", "2 A", ["Válečník", "sp 9"], "SIL vs OBR -> OBR vs SIL", "Místo útoku povalí a drží cíl na zemi", 0),
    "nkl": new TrickV("action.png", "Nordický klíč", "3 A", ["Válečník", "sp 9"], "SIL vs OBR", "Automatická obrana + pohmoždění ruky (-5), jinak jen ZO", 0),
    "uav": new TrickV("action.png", "Útok a vrh", "1 A", ["Válečník", "sp 10"], 0, "Útok vrhací zbraní po hlavním útoku navíc", 0),
    "dob": new TrickV("action.png", "Dvojitá obrana", "2 A", ["Válečník", "sp 10"], 0, "Jedna obrana navíc", 0),
    "vut": new TrickV("action.png", "Vířivý útok", "3 A", ["Válečník", "sp 10"], 0, "Útok +5", 0),
    "sst": new TrickV("action.png", "Sražení štítem", "1 A", ["Válečník", "sp 11"], "SIL vs OBR", "Zranění +1k6 + povalení + otřesení", 0),
    "uss": new TrickV("action.png", "Útok spoza štítu", "2 A", ["Válečník", "sp 11"], 0, "Útok +2", 0),
    "zam": new TrickV("action.png", "Zámek", "3 A", ["Válečník", "sp 11"], "SIL vs OBR -> OBR vs SIL", "Obránce uzamkne útočníkovu zbraň", 0),
    //hra
    "nuk": new SpellA("spell.png", "Najdi úkryt", "3 DS", ["Hraničář", "sk 200"], 0, "Nalezne přírodní úkryt (převis, dutý kmen, jeskyni)", 0, 1, 1, "-", "1 míle", "8"),
    "nvo": new SpellA("spell.png", "Najdi vodu", "3 DS", ["Hraničář", "sk 200"], 0, "Nalezne přírodní zdroj pitné vody", 0, 1, 1, "-", "1 míle", "6"),
    "roh": new SpellA("spell.png", "Rozdělej oheň", "2 DS", ["Hraničář", "sk 200"], 0, "Zapálí i zcela mookré dřevo", 0, 1 * minuta, 0, "půl sáhu", "zápalný materiál", "6"),
    "zna": new SpellA("spell.png", "Znamení", "1 DS", ["Hraničář", "sk 200"], 0, "Vytvoří až 10 umistitelných značek", 0, 1, 1 * den, "-", "dotek", "6"),
    "uzl": new SpellA("spell.png", "Úder zloby", "4 DS", ["Hraničář", "sk 200", "sp 9"], 0, "Mentální útok", "1k10 psychycké", 1, 0, "20 sáhů", "1 tvor", "10"),
    "vlz": new SpellA("spell.png", "Vyléč lehká zranění", "4 DS", ["Hraničář", "sk 200", "sp 10"], 0, "Vyléči zranění", "1k6+2 léčení", 1, 0, "dotek", "1 tvor", "8"),
    //alc
    "bom": new Recip("recip.png", "Bomba", "0 MP", ["Alchymista", "sk 302"], 0, "Železná koule s knotem (10 coulů / kolo)", "2k6+4 výbuch a střepy 5 sáhů kolem", "35 sur", "žel.koule, zap.šňůra", 0, 10 * minuta, 0, "železná koule s knotem", "8"),
    "dym": new Recip("recip.png", "Dýmovnice", "0 MP", ["Alchymista", "sk 302"], 0, "Zapálitelná trubička, nebo koule", "Dusivý dým do poloměru 10 sáhů", "25 sur", "listí (záp.šňůra)", 0, 10 * minuta, 5 * minuta, "Zapálitelná trubička, nebo koule", "6"),
    "kin": new Recip("recip.png", "Kouzelný inkoust", "4 MP", ["Alchymista", "sk 302"], 0, "Neviditelný / Světélkující / Mizející inkoust na 5 stran pergamenu", 0, "6 sur", "olej, flakón", 0, 5 * minuta, 0, "flakón oleje libovolné barvy", "6"),
    "lpa": new Recip("recip.png", "Lakmusový papírek", "1 MP", ["Alchymista", "sk 302"], 0, "Ze vzorku lektvaru nebo krve dokáže identigikovat o co jde", 0, "5 sur", "pergamen", 0, 10 * minuta, 0, "10 bílých proužků pergamenu 10 coulů", "6"),
    "lms": new Recip("recip.png", "Lektvar Medvdí síly", "30 MP", ["Alchymista", "sk 302"], 0, "Napumpování svaůl a krv. oběhu:SIL+3", "5 BÚ", "35 sur", "krev šelmy", 1 * den, 10 * minuta, 30 * minuta, "hustá hnědá tek. / odporně sladná / smrdí", "6"),
    "lmu": new Recip("recip.png", "Lektvar Mucholapka", "15 MP", ["Alchymista", "sk 302"], 0, "Umožní lézt po zdech a stropě rychlostí 2-6 sáhů/kolo (A-C)", 0, "10 sur", "pivo, pryskyřice", 12 * hodina, 5 * minuta, 15 * minuta, "zlatavá/sladká/voní po medu a borovici", "8"),
    "lne": new Recip("recip.png", "Lektvar Neutralizace", "5 MP", ["Alchymista", "sk 302"], 0, "Ruší aktivní efekty jiných lektvarů a četnosti", 0, "10 sur", "3dcl lihu", 0, 5 * kolo, 0, "jasně oranžová,bublá/-/-", "8"),
    "lra": new Recip("recip.png", "Lektvar Ranhojič", "5 MP", ["Alchymista", "sk 302"], 0, "Léčivý lektvar", "1k6+2 léčení", "15 sur", "víno", 12, 5 * minuta, 0, "rudá tekutina / chuť i vůně po skořici, hrebícku a víne", "6"),
    "lry": new Recip("recip.png", "Lektvar Rychlost", "12 MP", ["Alchymista", "sk 302"], 0, "+1 útok/obrana +2 OČ/init/dovednosti(OBR) pohyblivost*2", 0, "20 sur", "voda, ještěrčí ocásky", 1 * den, 2 * minuta, 10 * kolo, "bledě modrá/nasládlá/máta", "8"),
    "lzv": new Recip("recip.png", "Lektvar Změna velikosti", "25 MP", ["Alchymista", "sk 302"], 0, "Koňská ↑, Oslí ↓ o 1 třídu velikosti", 0, "30 sur", "koňská/oslí moč", 1 * den, 10 * minuta, 30 * minuta, "oranžová/octová kyselá/pach moči", "8"),
    "upr": new Recip("recip.png", "Univerzální protijed", "5 MP", ["Alchymista", "sk 302"], 0, "Neutralizuje jedy s nebezpečností 6-, silnější oslabí na 1/2", 0, "10 sur", "voda, uhlí", 2 * hodina, 10 * kolo, 0, "tmavě šedá/hořká/-", "6"),
    "zsn": new Recip("recip.png", "Zápalná šňůra", "0 MP", ["Alchymista", "sk 302"], 0, "60 coulů hoří/jiskří 6 kol", 0, "5 sur", "60 coulů lana", 0, 5 * minuta, 0, "hořlavý provaz", "6"),
    "zli": new Recip("recip.png", "Zředěný líh", "0 MP", ["Alchymista", "sk 302"], 0, "Líh k čištění / dezinfekci až 10x, hořlavý", "0", "10 sur", "alkohol", 0, 30 * minuta, 0, "čirý/denaturák/denaturák", "6"),
    "jvz": new Recip("recip.png", "Jed Vosí žihadlo", "10 MP", ["Alchymista", "lv 2", "sk 302"], "ODO vs 6", "Plná dávka na ostří zbraně, nebo 1/5 dávky na střely", "10/2 jedem", "20 sur", "jedovaté byliny", 0, 10 * minuta, 0, "zelená/sladká/čáranky", "8"),
    "klu": new Recip("recip.png", "Kouzelný luk", "30 MP", ["Alchymista", "lv 2", "sk 302"], 0, "Vylepšení luku o +1+1/0 +30 sáhů dostřel", 0, "40 sur", "luk, žíně, lepidlo", 0, 1 * den, 2 * rok, "-", "9"),
    "kos": new Recip("recip.png", "Krvavé ostří", "20 MP", ["Alchymista", "lv 2", "sk 302"], 0, "Vylepšení čepele o +1+1/0", 0, "30 sur", "čepel", 0, 2 * hodina, 2 * rok, "-", "8"),
    "vbe": new Recip("recip.png", "Vak beztíže", "100 MP", ["Alchymista", "sp 10", "sk 302"], 0, "Vak o objemu 20 l, cokoliv plně uvnitř nic neváží", 0, "200 sur", "vak, démon z poledne", 0, 2 * den, 2 * rok, "vak", "14"),
    "lsi": new Recip("recip.png", "Lektvar Sibériův", "X MP", ["Alchymista", "sp 9", "sk 302"], 0, "Zvýší atribut +Y dle dodané many a základu", 0, "80 sur", "svaly/šlechy/játra/mozek/oči", 1 * den, 12 * hodina, 10 * minuta, "žlutá tekutina", "12"),
    //kou
    "mtr": new SpellV("spell.png", "Magický trik", "1 MP", ["Kouzelník", "sk 400"], 0, "Iluze ve vzduchu, zvuky, obrázky, změna chuti/barvy", 0, 1 * kolo, "ihned/záleží", "4+lvl sáhů", "1 objekt", 0),
    "bza": new SpellV("spell.png", "Bertolduv zámek", "1+X MP", ["Kouzelník", "sk 400"], "Atletika(SIL) vs dveře+X", "Zamkne a zvyšuje odolnost dveří, oken, brány, truhly, ... i bez zámku", 0, 2 * kolo, 1 * hodina, "dotek", "1 otevíratelný objekt", "6"),
    "ble": new SpellV("spell.png", "Blesk", "1+2X MP", ["Kouzelník", "sk 400"], 0, "Výboj energie", "Xk6 magické", pul, 0, "20 sáhů", "1 tvor", "4+2X"),
    "kuk": new SpellV("spell.png", "Kukátko", "2 MP", ["Kouzelník", "sk 400"], 0, "Prohlédne přes pevnou překážku", 0, 1 * kolo, 1 * minuta, "dotek", "zeď/dveře 1x1x1 sáh", "6"),
    "lev": new SpellV("spell.png", "Levitace", "4+X MP", ["Kouzelník", "sk 400"], 0, "Levitace nad zemí předmětů/tvorů do hmotnosti 100 +20*X lb", 0, 1 * kolo, 15 * minuta, "dotek", "1 tvor/předmět", "6"),
    "mst": new SpellV("spell.png", "Magická střela", "1+7*X MP", ["Kouzelník", "sk 400"], 0, "Výboj explodující energie proti magickým tvorům", "2k6 *X magické v rozsahu", 1 * kolo, 0, "100 sáhů", "mag.bystosti do 3+X*2 sáhů", "6+X*2"),
    "msi": new SpellV("spell.png", "Magický štít", "1+XMP", ["Kouzelník", "sk 400"], 0, "Magická bariéra +5 ZO", 0, pul, "X", "dotek", "1 tvor", "6"),
    "npr": new SpellV("spell.png", "Najdi předmět", "4 MP", ["Kouzelník", "sk 400"], 0, "Vycítí pozici hledaného předmětu", 0, 5 * kolo, 15 * kolo, "50 sáhů", "1 předmět", "6/11"),
    "nev": new SpellV("spell.png", "Neviditelnost", "6 MP", ["Kouzelník", "sk 400"], 0, "Neviditelnost do vyprchání, promluvení, útoku, či náročnější akce", 0, 1 * kolo, 15 * minuta, "50 sáhů", "1 tvor/předmět max C", "6"),
    "ozb": new SpellV("spell.png", "Očaruj zbraň", "4 MP", ["Kouzelník", "sk 400"], 0, "Zbraň se stává magickou", 0, 2 * kolo, 15 * minuta, "dotek", "1 zbraň", 6),
    "ohe": new SpellV("spell.png", "Oheň", "2 MP", ["Kouzelník", "sk 400"], 0, "Oheň magicky hořící v prostoru do zásahu živé tvory", "1-3 ohněm", 1 * kolo, 15 * minuta, "10 sáhů", "-", "6"),
    "ryc": new SpellV("spell.png", "Rychlost", "1+X MP", ["Kouzelník", "sk 400"], 0, "+1 útok/obrana +2 OČ/init/dovednosti(OBR) pohyblivost*2", 0, 1 * kolo, "X kol", "10 sáhů", "1 tvor", "6"),
    "sve": new SpellV("spell.png", "Světlo", "X MP", ["Kouzelník", "sk 400"], 0, "Drobná koule s jasným světlem vybrané barvy do 2*X sáhů", 0, 1 * kolo, 1 * hodina, "30 sáhů", "-", "6"),
    "tel": new SpellV("spell.png", "Teleport", "4 MP", ["Kouzelník", "sk 400"], 0, "Přesun jednoho tvora do vel C max na 60 sáhů", 0, 1 * kolo, 0, "dotek", "1 tvor", "6"),
    "oko": new SpellV("spell.png", "Ohnivá koule", "4+4*X MP", ["Kouzelník", "sk 400", "sp 6"], 0, "Zapalujicí ohnivá koule jako projektil", "2*Xk10 mag.ohněm v rozsahu 3+X sáhů", 1 * kolo, 0, "120 sáhů", "přímá linka / výbuch", "4+4*X"),
    "dvo": new SpellV("spell.png", "Dvojník", "3*X MP", ["Kouzelník", "sk 400", "sp 10"], "Vůle(CHA) vs Vůle(CHA) cílů", "Zasaženým vnutí imaginární obraz tvora, která může mluvit, nutné soustředění", 0, 1, "5*X minut", "60 sáhů", "tvorové do 20 sáhů", "8"),
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
    //kne
    "poz": new TrickA("spell.png", "Svěcení", "1 BP, 1 minuta", ["Klerik", "sk 600"], 0, "Klerik vytvoří až 1l svěcené vody, nebo posvětí 1 zbraň", 0),
    "lru": new SpellA("spell.png", "Léčivé ruce", "3 BP", ["Klerik", "sk 600"], 0, "Přiložením rukou léčí", "1k6 léčení", 1 * kolo, 0, "dotek", "1 tvor", "6"),
    "oci": new SpellA("spell.png", "Očištění", "3 MP", ["Klerik", "sk 600"], 0, "Poorci jídla zbaví jedů a nákaz", 0, 10 * kolo, 0, "dotek", "1 porce jídla / 1l pití", "6"),
    "svi": new SpellA("spell.png", "Štít víry", "1+2*X MP", ["Klerik", "sk 600"], 0, "+5 ZO vybraným tvorům v rozsahu", 0, 0, "X kol", 0, "tvorové do 2 sáhů", "6"),
    "umo": new SpellA("spell.png", "Úder moci", "5 BP", ["Klerik", "sk 600"], 0, "Mentální útok", "1k10 psychycké", 1 * kolo, 0, "20 sáhů", "1 tvor", "6"),
    "uot": new SpellA("spell.png", "Uzdrav otravu", "X MP", ["Klerik", "sk 600"], 0, "Ruší otravu a jedy s nebezpečností X-", 0, 3 * kolo, 0, "dotek", "1 tvor", "6"),
    "hvi": new SpellA("spell.png", "Hlas víry", "3 BP", ["Klerik", "lv 2", "sk 600"], 0, "Zvýší hlasitost, +5 zastrašování", 0, 2 * kolo, 5 * minuta, "-", "-", "8"),
    "ntm": new SpellA("spell.png", "Najdi temnotu", "4 BP", ["Klerik", "sk 200", "sp 8"], 0, "Uvidí neviděné, nemrtvé a temné a nadpozemské tvory, požehnání i kletby", 0, 3 * kolo, 1 * minuta, "-", "-", "8"),
    "nte": new SpellA("spell.png", "Napravení těla", "5 BP", ["Klerik", "sk 200", "sp 9"], "Vůle(CHA) vs Vůle(CHA)", "Vyléčí / poraní končetinu", "1k6 léčení / nic", 2 * kolo, "0/1 minuta", "dotek", "1 tvor", "10"),
    //"": new Trick("action.png","name","A", [""], 0, "0", 0),
    //"": new Recep("recipe.png","name", , ["Alchymista"], 0, "0", "0", "0", "0", 0, , , "0", ),
    //"": new Spell("spell.png","name", " MP", [""], 0, "text", dmg, cTime, duration, "range", "target", diff),
    // "zkratka": new Recip("název", "XYZ MP - cena", ["kódPovolání","omezení lvlu","kód potřebné schopnosti"], "Ověření účinku Vůle(CHA) vs Reflex(OBR)", "popis", "účinek na životy", "mn.surovin: 50 sur", "výrobní základ", "četnost v h", "doba výroby", "dobatrvání efektu", "vzhled/popis", "obtížnost"),
    // "zkratka": new Spell("název", "cena", ["kódPovolání","omezení lvlu","kód potřebné schopnosti"], "Ověření účinku Vůle(CHA) vs Reflex(OBR)", "popis", "účinek na životy", "doba kouzelní", "dobatrvání efektu", "dosah", "rozsah", "obtížnost"),
    // "zkratka": new Trick("název", "cena/podmínky", ["kódPovolání","omezení lvlu","kód potřebné schopnosti"], "Ověření účinku Vůle(CHA) vs Reflex(OBR)", "popis", "účinek na životy"),
};