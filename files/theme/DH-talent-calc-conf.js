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
        { "name": "Berserkr", "img": "class/ber.png", "req": [3, 7, 9], "skills": [], "short": "ber" },
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
        { "name": "Assassin", "img": "class/ass.png", "req": [3, 8, 10], "skills": [], "short": "ass" },
        { "name": "Lupič", "img": "class/lup.png", "req": [0, 6, 11], "skills": [], "short": "lup" },
        { "name": "Sicco", "img": "class/sic.png", "req": [5, 7, 9], "skills": [], "short": "sic" },
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
        { "name": "Kapsulační gemy", "img": "skill/special/alc/PPP2/kapsulacni_gemy.png", "skills": [5], "req": [2] },
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
        { "name": "Umění přepadů", "img": "skill/special/zlo/PPP1/umeni_prepadu.png", "skills": [510], "req": [1] },
        { "name": "Vějíř dýk", "img": "skill/special/zlo/PPP1/vejir_dyk.png", "skills": [], "req": [1] },
        { "name": "Výhodná pozice", "img": "skill/special/zlo/PPP1/vyhodna_pozice.png", "skills": [], "req": [1] }, //30
        { "name": "Výroba jedů", "img": "skill/special/zlo/PPP1/vyroba_jedu.png", "skills": [], "req": [1] },
        { "name": "Bojová kreativita", "img": "skill/special/zlo/PPP2/bojova_kreativita.png", "skills": [], "req": [2] },
        { "name": "Druhá šance", "img": "skill/special/zlo/PPP2/druha_sance.png", "skills": [], "req": [2] },
        { "name": "Lupičská udělátka", "img": "skill/special/zlo/PPP2/lupicska_udelatka.png", "skills": [], "req": [2] },
        { "name": "Lupičův parťák", "img": "skill/special/zlo/PPP2/lupicuv_partak.png", "skills": [], "req": [2] }, //35
        { "name": "Mistr útěku", "img": "skill/special/zlo/PPP2/mistr_uteku.png", "skills": [], "req": [2] },
        { "name": "Mistrovství kočičího pohybu", "img": "skill/special/zlo/PPP2/mistrostvi_kociciho_pohybu.png", "skills": [], "req": [2] },
        { "name": "Mistrovství železného klíče", "img": "skill/special/zlo/PPP2/mistrovstvi_zelezneho_klice.png", "skills": [], "req": [2] },
        { "name": "Umění neférového boje", "img": "skill/special/zlo/PPP2/umeni_neferoveho_boje.png", "skills": [511], "req": [2] },
        { "name": "Alter ego", "img": "skill/special/zlo/PPP3/alter_ego.png", "skills": [], "req": [3] }, //40
        { "name": "Důvěrník", "img": "skill/special/zlo/PPP3/duvernik.png", "skills": [], "req": [3] },
        { "name": "Mistrovství proměn", "img": "skill/special/zlo/PPP3/mistrovstvi_promen.png", "skills": [], "req": [3] },
        { "name": "Mistrovství šarmu", "img": "skill/special/zlo/PPP3/mistrovstvi_sarmu.png", "skills": [], "req": [3] },
        { "name": "Pověsti a drby", "img": "skill/special/zlo/PPP3/povesti_a_drby.png", "skills": [], "req": [3] },
        { "name": "Šifrování", "img": "skill/special/zlo/PPP3/sifrovani.png", "skills": [], "req": [3] }, //45
        { "name": "Umění boje s pláštěm", "img": "skill/special/zlo/PPP3/umeni_boje_s_plastem.png", "skills": [512], "req": [3] },
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
        this.imagePath = imagePath; // path to displayable icon
        this.actionName = actionName; // display name shown in UI
        this.usageCost = usageCost; // how much mana/resources/actions are required
        this.requirements = requirements; // class/level/skill prerequisites to use the action
        this.checkText = checkText; // rule text for roll/check verification
        this.descriptionText = descriptionText; // human-readable effect description
        this.damageText = damageText; // damage/heal expression shown to player
        this.actionType = actionType; // action category (trick, spell, recip)
        this.isReadyToUse = isReadyToUse; // T/F = immediately available / must be picked/unlocked
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
        this.castTime = castTime; // time needed to cast/activate the spell
        this.effectDuration = effectDuration; // how long the spell effect lasts
        this.effectRange = effectRange; // maximum distance where spell can be applied
        this.effectTarget = effectTarget; // what/whom the spell can affect
        this.checkDifficulty = checkDifficulty; // target difficulty for the spell check
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
        this.ingredientCost = ingredientCost; // required amount/cost of ingredients
        this.baseIngredient = baseIngredient; // primary ingredient or crafting base
        this.effectFrequency = effectFrequency; // how often the effect can trigger/repeat
        this.craftTime = craftTime; // time needed to craft the item
        this.effectDuration = effectDuration; // how long the crafted effect lasts
        this.recognitionText = recognitionText; // how the item looks/smells/tastes for identification
        this.checkDifficulty = checkDifficulty; // target difficulty for successful crafting/use
    }
}

const pul = 0.5;
const kolo = 1;
const minuta = 10 * kolo;
const smena = 15 * minuta;
const hodina = 4 * smena;
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
    "tvk": new TrickW("skill/special/val/skola_jednorucni.png", "Tvrdý kryt", "1 A", ["Válečník", "sp 6"], 0, "Obrana +2", 0),
    "uhl": new TrickW("skill/special/val/skola_jednorucni.png", "Úder hlavicí", "2 A", ["Válečník", "sp 6"], 0, "Při zásahu +1k6+2 zranění", 0),
    "uas": new TrickW("skill/special/val/skola_jednorucni.png", "Úhyb a sek", "3 A", ["Válečník", "sp 6"], 0, "Při ubránění se 1 volný útok proti ZO", 0),
    "but": new TrickW("skill/special/val/skola_dvourucni.png", "Bezhlavý útok", "1 A", ["Válečník", "sp 7"], 0, "Útok +5; nemožnost se bránit v tomto kole", 0),
    "dut": new TrickW("skill/special/val/skola_dvourucni.png", "Drtivý útok", "2 A", ["Válečník", "sp 7"], 0, "Zranění útoku +5", 0),
    "kse": new TrickW("skill/special/val/skola_dvourucni.png", "Kruhový sek", "3 A", ["Válečník", "sp 7"], 0, "Zásah kolem sebe -2UČ kumulativně", 0),
    "us1": new TrickW("skill/special/val/skola_bodne.png", "Úskok", "1 A", ["Válečník", "sp 8"], 0, "Obrana +2 do konce kola", 0),
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
    "bls": new TrickW("skill/special/val/skola_stit.png","Bleskový kryt","1 A",["Válečník", "lv 6", "sp 11"],"—", "Získáš extra obranu, kterou můžeš použít i pro ochranu spojence.", 0),
    "bnc": new TrickW("skill/special/val/skola_bodne.png","Bodnutí na chodidlo","3 A",["Válečník", "lv 6", "sp 8"],"ODO vs způsobené zranění","Útok cílí nízko; pokud nezvládne zátěž, přichází o část mobility a přesnosti.", 0),
    "bno": new TrickW("skill/special/val/skola_bodne.png","Bodnutí na obličej","1 A",["Válečník", "lv 6", "sp 8"],"—","Pouze naznačená rána rozhodí protivníka; další útok má zvýšenou přesnost (výhoda).", 0),
    //val lv6+
    "cnc": new TrickW("class/ser.png","Cit na čepeli","2 A / kolo",["Šermíř", "lv6"],"SIL vs INT","Při kontaktu čepelí získáš výhodu v útoku, obraně i rychlosti, dokud spojení trvá.", 0),
    "cuk": new TrickW("class/ser.png","Cuknutí","3 A",["Šermíř", "lv6"],"—","Úhybný pohyb ti umožní okamžitý protiútok způsobený čistě rozdílem mezi obranou a útokem nepřítele.", 0),
    "dzb": new TrickW("class/ryt.png","Do zbraně!","3 A",["Rytíř", "lv6"],"—","Když družinu někdo překvapí, krátkým povelem jim umožníš okamžité přezbrojení a plnou obranu.", 0),
    "drk": new TrickW("skill/special/val/skola_dvourucni.png","Druhý konec","3 A",["Válečník", "lv 6", "sp 7"],"—","Po úspěšném zásahu okamžitě přidáš svižný úder opačným koncem zbraně.", 0),
    "dkt": new TrickW("skill/special/val/skola_dve_zbrane.png","Druhý kryt","1 A",["Válečník", "lv 6", "sp 10"],"—","Když tě někdo zasáhne mimo připravený kryt, použiješ sekundární zbraň jako nouzovou obranu.", 0),
    "dts": new TrickW("action.png","Druhý / třetí šíp","1–2 A",["Válečník", "lv 6"],"—","Rychlá technika střelby: vložíš více projektilů a vystřelíš 2–3 rány za kolo, ale s rostoucím postihem.", 0),
    "dzk": new TrickW("skill/special/val/skola_drtic_kosti.png","Držení za krk","3 A",["Válečník", "lv 6", "sp 9"],"SIL vs OBR","Chopíš protivníka pod krkem a dramaticky zvýšíš účinnost svého následujícího zranění. Otřesení roste po každém kole.", 0),
    "dup": new TrickW("skill/special/val/skola_drtic_kosti.png", "Dupnutí", "1 A", ["Válečník","lv 6", "sp 9"], "SIL vs síla zbraně / SIL vs ODO", "Zničí ležící zbraň nebo vážně poraní ležící cíl a znevýhodní jeho končetinu.", 0),
    "dvk": new TrickW("skill/special/val/skola_dve_zbrane.png", "Dvojitý kryt", "1 A", ["Válečník","lv 6", "sp 10"], 0, "Zpevní obranu překřížením obou zbraní proti silnému útoku.", 0),
    "hak": new TrickW("skill/special/val/skola_dvourucni.png", "Hákování", "2 A", ["Válečník","sp —"], "SIL + zranění vs SIL", "Zachytí a vytrhne soupeřovu zbraň či štít, nebo je aspoň vyřadí z další akce.", 0),
    "har": new TrickW("skill/special/val/PPP0/skola_boje_na_koni.png", "Harcovnictví", "1 A", ["Válečník","sp 21"], 0, "Zvyšuje dostřel střelných a vrhacích zbraní při střelbě ze sedla.", 0),
    "hrz": new TrickW("skill/special/val/skola_dvourucni.png", "Hrozba", "1 A", ["Válečník","lv 6", "sp 7"], "SIL + zranění vs CHAR", "Naznačeným útokem psychicky rozhodí nepřítele a vnucuje mu nevýhodu.", 0),
    "imp": new TrickW("class/ryt.png", "Impozantní", "2 A/kolo", ["Rytíř", "lv6"], "SIL + KZ vs CHAR", "Přitáhne na sebe pozornost nepřátel; ti mají nevýhodu při boji s jinými cíli.", 0),
    "jsp": new TrickW("class/ryt.png", "Jasný povel", "2 A + X", ["Rytíř", "lv6"], 0, "Povzbudí družinu, zvýší efekt velení a odolnost proti zastrašení.", 0),
    "jdu": new TrickW("skill/special/val/skola_dvourucni.png", "Jeden úder", "2 A", ["Válečník","lv 6", "sp 7"], 0, "Odehraje pouze jediný útok, ale extrémně posílený podle počtu nevyužitých útoků.", 0),
    "kav": new TrickW("skill/special/val/skola_bodne.png", "Kavace", "2 A", ["Válečník","lv 6", "sp 8"], "SIL vs INT", "Odsune soupeřovu čepel stranou a otevře ho pro protiútok do jeho ZO.", 0),
    "klu": new TrickW("skill/special/val/skola_jednorucni.png", "Klamný útok", "1 A", ["Válečník","lv 6", "sp 6"], 0, "První falešný úder navýší sílu skutečného následujícího útoku.", 0),
    "kal": new TrickW("skill/special/val/skola_drtic_kosti.png", "Kolena a lokty", "1 A", ["Válečník","lv 6", "sp 9"], "ODO vs utržené zranění", "V boji beze zbraně zasadíš tvrdý úder, který může přerušit soupeřovu akci.", 0),
    "kop": new TrickW("skill/special/val/skola_drtic_kosti.png", "Kop", "1 A", ["Válečník","lv 6", "sp 9"], 0, "Silný výpad nohou s bonusem k útoku i zranění, vhodný v dostatečném prostoru.", 0),
    "les": new TrickW("action.png", "Lehká spoušť", "1 A", ["Válečník", "lv 6"], 0, "Umožní vystřelit připravenou kuší jako reakci na libovolný podnět, i pro zahájení boje.", 0),
    "lou": new TrickW("class/ber.png", "Louskáček", "2 A", ["Berserkr", "lv6"], 0, "Mocným úderem snížíš efektivitu protivníkovy zbroje proti tvému zásahu.", 0),
    "mis": new TrickW("class/ser.png", "Mistrovský sek", "4 A", ["Šermíř", "lv6"], "SIL vs INT / ODO vs SIL", "Sek či bod, který prorazí kryt, způsobí krvácení a může zmrzačit končetinu.", 0),
    "mvr": new TrickW("action.png", "Mocný vrh", "2 A", ["Válečník", "lv 6"], 0, "Vrhneš zbraň s extrémní silou, zvýšíš dosah, přesnost i zranění dle bonusu za sílu.", 0),
    "mdu": new TrickW("skill/special/val/skola_jednorucni.png", "Mordýřský úder", "2 A", ["Válečník","sp —"], "ODO vs způsobené zranění", "Úder hlavicí či příčkou meče snižuje efekt zbroje a může protivníka otřást.", 0),
    "mrh": new TrickW("class/ber.png", "Mrtvá váha", "0 A", ["Berserkr", "lv6"], "SIL vs OBR", "Při znehybnění padneš na vybraného protivníka a výrazně omezíš jeho soustředění.", 0),
    "nah": new TrickW("skill/special/val/skola_stit.png", "Nastav hranu", "3 A", ["Válečník","lv 6", "sp 11"], "SIL vs INT", "Zasekneš soupeřovu čepel do štítu a vyřadíš mu zbraň, dokud se nevyprostí.", 0),
    "nau": new TrickW("skill/special/val/skola_dve_zbrane.png", "Naznačený útok", "3 A", ["Válečník","lv 6", "sp 10"], "SIL vs INT", "Naznačíš úder jednou zbraní a druhou zasadíš skutečný útok přímo proti ZO soupeře.", 0),
    "obr": new TrickW("class/ryt.png", "Obrněný", "1 A", ["Rytíř", "lv6"], 0, "Pokud k ubránění stačí ZO, proměníš obranu ve svižný protiútok do nepřipravené strany.", 0),
    "odh": new TrickW("skill/special/val/skola_dvourucni.png", "Odhození", "2 A", ["Válečník","lv 6", "sp 7"], "SIL + zranění vs OBR", "Silný náraz kladivem odhodí cíl, povalí ho a může ho na kolo vyřadit.", 0),
    "os1": new TrickW("skill/special/val/skola_stit.png", "Odklonění štítu", "2–3 A", ["Válečník","lv 6", "sp 11"], "SIL + KZ vs OBR", "Zablokuješ soupeřovy zbraně štítem a získáš prostor pro okamžitý bonusový útok.", 0),
    "odo": new TrickW("class/ryt.png", "Odolání", "2 A", ["Rytíř", "lv6"], 0, "Krátce zatneš vůli a získáš silný bonus k hodu na odolnost proti strachu či nátlaku.", 0),
    "os2": new TrickW("skill/special/val/skola_stit.png", "Odražení střely", "1 A", ["Válečník","lv 6", "sp 11"], 0, "Vhodně natočeným štítem odrazíš letící projektil na libovolného protivníka.", 0),
    "oz1": new TrickW("skill/special/val/skola_dvourucni.png", "Odražení zbraně", "1 A", ["Válečník","lv 6", "sp 7"], 0, "Proti sekům použiješ protiúder; rozhodíš soupeřovu zbraň a snížíš mu účinnost příští akce.", 0),
    "od2": new TrickW("skill/special/val/skola_dvourucni.png", "Odstrčení", "1 A/cíl", ["Válečník","lv 6", "sp 7"], "SIL vs SIL", "Silovým tlakem odsunuješ až tři postavy o vzdálenost dle rozdílu hodů.", 0),
    "odv": new TrickW("action.png", "Odvalení", "1 A", ["Válečník", "lv 6"], 0, "Když jsi sražen či odhozen, skutálíš se stranou a změníš pozici ještě v rámci reakce.", 0),
    "odz": new TrickW("skill/special/val/skola_dve_zbrane.png", "Odzbrojení", "3 A", ["Válečník","lv 6", "sp 10"], "SIL vs OBR", "Místo zásahu provedeš páku na soupeřovu zbraň a vytrhneš mu ji z úchopu.", 0),
    "pna": new TrickW("skill/special/val/skola_jednorucni.png", "Páka na ruku", "2 A", ["Válečník","lv 6", "sp 6"], "SIL vs OBR", "Po neúspěšném útoku přejdeš do sevření soupeřovy ruky a vyrveš mu zbraň.", 0),
    "pod": new TrickW("class/ser.png", "Podmetení", "2 A", ["Šermíř", "lv6"], "SIL + rozdíl ÚČ vs OBR", "Využiješ protivníkovy kroky k podhození – povalíš ho, zraníš a zbavíš ho jednoho kola.", 0),
    "pvl": new TrickW("skill/special/val/skola_jednorucni.png", "Povol", "2 A", ["Válečník","lv 6", "sp 6"], "SIL + rozdíl OČ vs OBR", "Necháš úder sklouznout po čepeli; útočník promáchne a ztratí jednu svou další akci.", 0),
    "ppb": new TrickW("class/ryt.png", "Proslov před bitvou", "6 A", ["Rytíř", "lv6"], 0, "Motivační řeč odstraní únavu, posílí útok, obranu i iniciativu celé družiny a posune hranici smrti.", 0),
    "put": new TrickW("skill/special/val/skola_dve_zbrane.png", "Protiútok", "3 A", ["Válečník","lv 6", "sp 10"], 0, "Při obraně jednou zbraní ihned zasadíš úder druhou proti soupeřově ZO.", 0),
    "pbh": new TrickW("skill/special/val/skola_bodne.png", "Průbojný hrot", "2 A", ["Válečník","lv 6", "sp 8"], 0, "Úchop posuneš ke středu čepele a ignoruješ až 5 bodů kvality zbroje.", 0),
    "psr": new TrickW("skill/special/val/skola_jednorucni.png", "Předsek na ruce", "2 A", ["Válečník","lv 6", "sp 6"], "ÚČ vs ÚČ", "Rychlým seknutím do zbraně či ruky překazíš útočníkův výpad a způsobíš mu postih.", 0),
    "phm": new TrickW("action.png", "Přehmátnutí", "1 A", ["Válečník","zrucnost_se_zbrani"], 0, "Rychlou změnou úchopu zvýšíš obranu zbraně o +3.", 0),
    "pho": new TrickW("skill/special/val/skola_drtic_kosti.png", "Přehození", "2–3 A", ["Válečník","lv 6", "sp 9"], "SIL vs OBR", "Využiješ protivníkův pohyb, přehodíš ho přes rameno, povalíš a na kolo vyřadíš.", 0),
    "prs": new TrickW("skill/special/val/skola_stit.png", "Překlopení štítu", "1–2 A", ["Válečník","lv 6", "sp 11"], 0, "Po obraně odtlačíš soupeři ruce štítem a na otevření navážeš silným útokem.", 0),
    "pku": new TrickW("skill/special/val/skola_dve_zbrane.png", "Překvapivý útok", "1–2 A", ["Válečník","lv 6", "sp 10"], 0, "Sekundární zbraň využiješ k nečekanému dodatečnému úderu; levnější, pokud nepoužíváš jiné triky.", 0),
    "psk": new TrickW("class/ryt.png", "Přeskupení", "3 A", ["Rytíř","sp —"], 0, "Obnovíš nebo prodloužíš platnost zvolené bojové strategie družiny.", 0),
    "pru": new TrickW("skill/special/val/skola_jednorucni.png", "Převrácený útok", "1 A", ["Válečník","lv 6", "sp 6"], 0, "Pokud útok mine, okamžitě ho zopakuješ novým sekem z opačné strany.", 0),
    "pse": new TrickW("class/ser.png", "Přišermování", "4 A", ["Šermíř", "lv6"], 0, "Kombinací kroků a úhybů donutíš protivníka spotřebovat všechny útoky naprázdno.", 0),
    "psm": new TrickW("skill/special/val/skola_drtic_kosti.png", "Přišlápnutí meče", "2 A", ["Válečník","lv 6", "sp 9"], "SIL vs INT", "Srazíš soupeřův meč k zemi a dočasně mu zablokuješ zbraň včetně možnosti obrany.", 0),
    "rez": new TrickW("skill/special/val/skola_dve_zbrane.png", "Rezerva", "3 A", ["Válečník","lv 6", "sp 10"], 0, "Sekundární zbraní vytváříš tlak, aby finální úder hlavní zbraní získal násobné bonusy.", 0),
    "rzn": new TrickW("skill/special/val/skola_jednorucni.png", "Rychlá zbraň", "2 A + X", ["Válečník","lv 6", "sp 6"], 0, "Přerušíš nevyhovující techniku a plynule přejdeš do jiného triku v rámci téhož útoku.", 0),
    "rnr": new TrickW("class/ser.png", "Řez na ruce", "2 A", ["Šermíř", "lv6"], 0, "Zmaříš pokus o zápas či uchopení tím, že při vzdoru způsobíš cíli zranění a přerušíš akci.", 0),
    "sut": new TrickW("skill/special/val/skola_dve_zbrane.png", "Série útoků", "1 A/útok", ["Válečník","lv 6", "sp 10"], 0, "Za každý bod Adrenalinu přidáš další úder; každý však nese postih rovný celkovému počtu útoků.", 0),
    "sdr": new TrickW("class/ryt.png", "Skočit do rány", "2 A", ["Rytíř", "lv6"], 0, "Na krátký pohyb převezme útok na sebe a svou ZO. Ubrání i efekt kouzla, pak od zranění odečte KZ.", 0),
    "sko": new TrickW("class/ber.png", "Skok", "1 A", ["Berserkr", "lv6"], 0, "Mocný skok do dálky, nebo i výšky. Akce se počítá jako krátký pohyb. Následný útok má +1 k Útoku a +3 ke Zranění, pro trik k útoku +2 SIL.", 0),
    "srk": new TrickW("skill/special/val/PPP0/skola_boje_na_koni.png", "Sražení koněm", "3 A", ["Válečník", "sp 21"], "SIL vs OBR", "Silným jízdním nájezdem srazíš cíl, odhodíš jej a způsobíš mu zranění dle rozdílu hodů.", 0),
    "szk": new TrickW("skill/special/val/PPP0/skola_boje_na_koni.png", "Sražení z koně", "2–3 A", ["Válečník", "sp 21"], "SIL vs Jízda(OBR)", "Strhneš jezdce ze sedla; při vyšší ceně můžeš naskočit za něj do sedla.", 0),
    "svh": new TrickW("skill/special/val/skola_bodne.png", "Svěšený hrot", "2 A", ["Válečník","lv 6", "sp 8"], "SIL vs OBR", "Neúspěšný útok okamžitě opravíš změnou vedení čepele a zvýšíš si přesnost dle rozdílu hodů.", 0),
    "tlr": new TrickW("action.png", "Tlačený řez", "2–3 A", ["Válečník", "lv 6"], "SIL + zranění vs ODO", "Po zásahu pokračuješ řezem, čímž navýšíš zranění a můžeš způsobit krvácení.", 0),
    "trr": new TrickW("skill/special/val/skola_bodne.png", "Tržná rána", "3 A", ["Válečník","lv 6", "sp 8"], 0, "Rychlým řezem způsobíš lehké, ale silně krvácející zranění, které dává protivníkovi nevýhodu.", 0),
    "tvy": new TrickW("class/ber.png", "Tři výkřiky", "1 A", ["Berserkr", "lv6"], "SIL vs CHAR", "Výkřik naruší soupeřovu koncentraci a udělí mu postih úměrný převaze v hodu.", 0),
    "uhr": new TrickW("skill/special/val/skola_stit.png", "Úder hranou štítu", "2 A", ["Válečník","lv 6", "sp 11"], "SIL + KZ vs OBR", "Silou štítu vyrážíš soupeřovu zbraň; pokud převýšíš její parametry, zbraň se zničí.", 0),
    "uok": new TrickW("action.png", "Úder „oheň a kameny“", "2 A", ["Válečník", "lv 6"], "SIL vs OBR", "Silným úderem na protivníkovu zbraň ji vyrazíš z ruky a při velké převaze ji zlomíš.", 0),
    "udp": new TrickW("skill/special/val/skola_drtic_kosti.png", "Úder pěstí", "1–2 A", ["Válečník","lv 6", "sp 9"], "SIL + zranění vs ODO", "Zasáhneš pěstí i v těsném boji; silnější varianta může protivníka otřást na 1 kolo.", 0),
    "udr": new TrickW("skill/special/val/skola_drtic_kosti.png", "Úder ramenem", "2–3 A", ["Válečník","lv 6", "sp 9"], "SIL vs OBR", "Vrazíš ramenem do soupeře; při úspěchu ho srazíš, odhodíš a způsobíš mu zranění dle rozdílu hodů.", 0),
    "ust": new TrickW("skill/special/val/skola_stit.png", "Úder štítem", "2 A", ["Válečník","lv 6", "sp 11"], 0, "Při úspěšné obraně narazíš štítem a způsobíš zranění dle převahy v hodech; proti zápasu přičítáš KZ i sílu.", 0),
    "utl": new TrickW("class/ryt.png", "Úder tělem", "2 A", ["Rytíř", "lv6"], 0, "Vrazíš celou vahou do protivníka, čímž zmaříš jeho pokus o zápas a způsobíš mu zranění dle převahy.", 0),
    "uhb": new TrickW("skill/special/val/skola_bodne.png", "Úhyb", "1 A", ["Válečník","lv 6", "sp 8"], 0, "Donutíš protivníka zopakovat jeho útok; tvá obrana zůstává původní.", 0),
    "uzk": new TrickW("skill/special/val/skola_kopi.png", "Úchop za konec", "2 A", ["Válečník","sp —"], 0, "Chopíš dřevcovou zbraň za konec, získáš +5 k útoku a dosah navíc.", 0),
    "ukr": new TrickW("action.png", "Úkrok", "2 A", ["Válečník", "lv 6"], 0, "Během jiné akce uskočíš stranou a zvýšíš svou ZO o hod k6 proti přicházejícímu útoku.", 0),
    "us2": new TrickW("class/ber.png", "Úskok", "2 A", ["Berserkr", "lv6"], 0, "Berserkr se vrhne stranou a automaticky se přesune krátkým pohybem; získá bonus +5 k reflexu.", 0),
    "ush": new TrickW("skill/special/val/PPP0/skola_boje_na_koni.png", "Útok shora", "1 A", ["Válečník", "lv 6", "sp 21"], 0, "Z výšky v sedle zasadíš silnější úder a zvýšíš zranění kontaktní zbraně o +5.", 0),
    "uzp": new TrickW("skill/special/val/skola_dvourucni.png", "Útok z prázdnoty", "1 A", ["Válečník","lv 6", "sp 7"], 0, "Vyrazíš vpřed dříve než soupeř stihne zaútočit a donutíš ho se nejdříve bránit.", 0),
    "uzz": new TrickW("skill/special/val/skola_jednorucni.png", "Útok ze zápěstí", "3 A", ["Válečník","lv 6", "sp 6"], 0, "Rychle otočíš zbraň v zápěstí a přidáš dodatečný úder proti soupeřově ZO s postihem k přesnosti.", 0),
    "vlp": new TrickW("action.png", "Válečný pokřik", "1 A", ["Válečník", "lv 6"], 0, "Strhneš spojence do boje a všichni získají +1 k útoku na začátku kola.", 0),
    "var": new TrickW("class/ser.png", "Variabilita", "1 A/akci", ["Šermíř", "lv6"], 0, "Umožní libovolně měnit útočné a obranné akce; první výměna je zdarma při schopnosti Rutina.", 0),
    "vro": new TrickW("action.png", "Vrácení oštěpu", "1 A", ["Válečník", "lv 6"], "OČ vs ÚČ", "Při obraně proti vržené zbrani ji zachytíš a okamžitě vrhneš zpět jako svůj útok.", 0),
    "vpu": new TrickW("skill/special/val/skola_jednorucni.png", "Vypuštěný útok", "1 A", ["Válečník","lv 6", "sp 6"], 0, "Povoleným úchopem zvýšíš hybnost čepele a získáš +3 ke způsobenému zranění.", 0),
    "vzs": new TrickW("skill/special/val/skola_dvourucni.png", "Vzteklý sek", "3 A (Obrana) / 2 A (Útok)", ["Válečník","lv 6"], "ÚČ vs ÚČ", "V jediném pohybu srazíš soupeřovu zbraň a zasadíš úder; blokuje většinu obranných triků.", 0),
    "vzt": new TrickW("action.png", "Vztyk", "1 A", ["Válečník", "lv 6"], 0, "Okamžitě vstaneš ze země; jako reakce po útoku zůstaneš stát, ale přijdeš o jednu Obranu.", 0),
    "zst": new TrickW("class/ber.png", "Zastrašení", "3 A", ["Berserkr", "lv6"], "SIL vs CHAR", "Vyděsíš protivníky natolik, že se rozprchnou nebo mají výraznou nevýhodu v boji.", 0),
    "zat": new TrickW("class/ber.png", "Zatvrzení", "1 A", ["Berserkr", "lv6"], 0, "Při obraně ZO si přičteš bonus za Sílu a případně i za Odolnost, pokud ovládáš Otloukánka.", 0),
    "zud": new TrickW("skill/special/val/skola_dvourucni.png", "Zdrcující úder", "2 A", ["Válečník","lv 6", "sp 7"], "SIL + zranění vs ODO", "Mocným úderem na štít zmrzačíš ruku, která jej drží; cíl získá nevýhodu na její použití.", 0),
    "zne": new TrickW("class/ser.png", "Znejistění", "X A", ["Šermíř", "lv6"], "SIL vs CHAR", "Narušíš protivníkovu psychiku rychlými změnami střehu; udělíš mu postih na ÚČ i OČ dle převahy v hodu.", 0),
    "zpr": new TrickW("class/ber.png", "Železné pracky", "3 A", ["Berserkr", "lv6"], "SIL vs SIL", "Chytneš protivníka pod krkem, začneš ho dusit a způsobuješ průběžné zranění podle pravidel udušení.", 0),
    //hra
    "nuk": new SpellA("spell.png", "Najdi úkryt", "3 DS", ["Hraničář", "sk 200"], 0, "Nalezne přírodní úkryt (převis, dutý kmen, jeskyni)", 0, 1, 1, "-", "1 míle", "8"),
    "nvo": new SpellA("spell.png", "Najdi vodu", "3 DS", ["Hraničář", "sk 200"], 0, "Nalezne přírodní zdroj pitné vody", 0, 1, 1, "-", "1 míle", "6"),
    "roh": new SpellA("spell.png", "Rozdělej oheň", "2 DS", ["Hraničář", "sk 200"], 0, "Zapálí i zcela mookré dřevo", 0, 1 * minuta, 0, "půl sáhu", "zápalný materiál", "6"),
    "zna": new SpellA("spell.png", "Znamení", "1 DS", ["Hraničář", "sk 200"], 0, "Vytvoří až 10 umistitelných značek", 0, 1, 1 * den, "-", "dotek", "6"),
    "bds": new SpellA("skill/special/hra/magie_pocestnych.png", "Bdělý spánek", "1 DS / 2 hodiny", ["Hraničář", "sp 11"], 0, "Polobdělý spánek; pokud se v dosahu objeví cizí osoba, hraničář se probudí s varovným pocitem. Spánek neobnovuje DS.", 0, 0, 6 * kolo, "30 sáhů", "dle množství DS", "10"),
    "naz": new SpellA("skill/special/hra/magie_zvirat.png", "Najdi zvíře", "3 DS", ["Hraničář", "sp 10"], 0, "Najde nejbližší zvíře daného druhu v dosahu a po dobu trvání ukazuje směr a hrubou vzdálenost; lze zacílit i na konkrétní jedince. Nepůsobí na hmyz ani mytické tvory.", 0, 2 * kolo, 1 * smena, "kruh o poloměru 1 míle", "1 tvor", "6"),
    "nej": new SpellA("skill/special/hra/magie_prirody.png", "Neutralizuj jed", "3 DS", ["Hraničář", "sp 9"], 0, "Okamžitě zneutralizuje všechny nemagické jedy v těle cíle.", 0, 1 * kolo, 0, "dotek", "1 tvor", "8"),
    "opb": new SpellA("skill/special/hra/magie_pocestnych.png", "Ochrana před bouří", "3 DS", ["Hraničář", "sp 11"], 0, "Neviditelná aura pohybující se s hraničářem: nepropustí sníh, déšť, písek apod., chrání i před nemagickým bleskem; účinkuje na všechny uvnitř.", 0, 3 * kolo, 8 * hodina, "-", "kruh o poloměru 2 sáhy", "6"),
    "pzr": new SpellA("skill/special/hra/magie_zvirat.png", "Přivolej zvíře", "3 DS", ["Hraničář", "sp 10"], 0, "Hlasitým vřísknutím napodobí hlas druhu a přivábí jedno zvíře (nebo konkrétního jedince). Neúčinkuje na tvory, kteří neslyší; může selhat u posedlých/prokletých.", 0, 4 * kolo, 0, "kruh o poloměru 1 míle", "1 tvor", "8"),
    "rch": new SpellA("skill/special/hra/magie_pocestnych.png", "Rychlost chodce", "3 DS", ["Hraničář", "sp 11"], 0, "Cíl putuje o polovinu rychleji bez zvýšené únavy (jako spěšná chůze bez zadýchání).", 0, 3 * kolo, 1 * hodina, "dotek", "1 tvor", "8"),
    "vlz": new SpellA("skill/special/hra/magie_prirody.png", "Uzdrav lehká zranění", "3 DS", ["Hraničář", "sp 9"], 0, "Vyléčí drobná zranění do maxima životů cíle.", "1k6+2 léčení", 1 * kolo, 0, "dotek", "1 živý tvor", "6"),
    "udv": new SpellA("skill/special/hra/magie_prirody.png", "Úder varování", "4 DS", ["Hraničář", "sp 9"], 0, "Mentální úder způsobující šok/překvapení; zranění je psychického rázu, výjimečně krvácení z nosu/uší.", "1k10 psychické", pul, 0, "10 sáhů", "1 tvor", "8"),
    "zvs": new SpellA("skill/special/hra/magie_zvirat.png", "Zvířecí smysly", "4 DS", ["Hraničář", "sp 10"], 0, "Hraničář si na omezený čas „vypůjčí“ smysly zvoleného zvířete (např. noční vidění sovy, echolokace netopýra, čich vlka, vnímání chvění jako hadi).", 0, 3 * kolo, 1 * hodina, "-", "hraničář", "10"),
    //hra 6+
    "ops": new SpellA("skill/special/hra/magie_zvirat.png","Ochrana před smečkou","2 DS / osoba",["Hraničář","lv 6","sp 10"],"-","Zanechá pach rozzuřené šelmy, který u zvířat vyvolává strach a obvykle je odradí od pronásledování.","0",1 * kolo,1 * den,"kruh 2 sáhy","dle many","8"),
    "opz": new SpellA("skill/special/hra/magie_pocestnych.png","Ochrana před zimou","3 DS",["Hraničář","lv 6","sp 11"],"-","Chráněný tvor necítí chlad a neutrpí přirozené mrazové zranění, nikoli však magické účinky zimy.","0",1 * kolo,1 * den,"dotyk","1 tvor","8"),
    "ozv": new SpellA("skill/special/hra/magie_zvirat.png","Odvracení zvířat","3 DS",["Hraničář","lv 6","sp 10"],"-","Zvířata si hraničáře přestanou všímat a neútočí, dokud nejsou napadena nebo provokována; nefunguje na magicky ovládaná.","0",1 * kolo,1 * smena,"-","kruh 2 sáhy","12"),
    "sld": new SpellA("skill/special/hra/magie_pocestnych.png","Sledování","4 DS",["Hraničář","lv 6","sp 11"],"-","Očarovaný předmět slouží jako mentální maják, jehož polohu hraničář instinktivně cítí s přesností na několik sáhů.","0",1 * kolo,1 * tyden,"5 mil","1 předmět","14"),
    "unv": new SpellA("skill/special/hra/magie_prirody.png","Úder nenávisti","10 DS",["Hraničář","lv 6","sp 9"],"-","Silný mentální útok rozdělí 3k10 zranění mezi až tři cíle a může u nich vyvolat krvácení, paniku a psychický otřes.","3k10",0,0,"10 sáhů","1 tvor","15"),
    "utz": new SpellA("skill/special/hra/magie_prirody.png","Uzdrav těžká zranění","6 DS",["Hraničář","lv 6","sp 9"],"-","Dotekem uzdraví 3k6+4 životů, nejvýše však do plného maxima cíle; silné, spolehlivé léčení.","3k6+4",1 * kolo,0,"dotyk","1 živý tvor","12"),    
    "ops": new SpellA("skill/special/hra/magie_zvirat.png","Ochrana před smečkou","2 DS / osoba",["Hraničář","lv 6","sp 10"],"-","Zanechá pach rozzuřené šelmy, který u zvířat vyvolává strach a obvykle je odradí od pronásledování.","0",1 * kolo,1 * den,"kruh 2 sáhy","dle many","8"),
    "opz": new SpellA("skill/special/hra/magie_pocestnych.png","Ochrana před zimou","3 DS",["Hraničář","lv 6","sp 11"],"-","Chráněný tvor necítí chlad a neutrpí přirozené mrazové zranění, nikoli však magické účinky zimy.","0",1 * kolo,1 * den,"dotyk","1 tvor","8"),
    "ozv": new SpellA("skill/special/hra/magie_zvirat.png","Odvracení zvířat","3 DS",["Hraničář","lv 6","sp 10"],"-","Zvířata si hraničáře přestanou všímat a neútočí, dokud nejsou napadena nebo provokována; nefunguje na magicky ovládaná.","0",1 * kolo,1 * smena,"-","kruh 2 sáhy","12"),
    "sld": new SpellA("skill/special/hra/magie_pocestnych.png","Sledování","4 DS",["Hraničář","lv 6","sp 11"],"-","Očarovaný předmět slouží jako mentální maják, jehož polohu hraničář instinktivně cítí s přesností na několik sáhů.","0",1 * kolo,1 * tyden,"5 mil","1 předmět","14"),
    "unv": new SpellA("skill/special/hra/magie_prirody.png","Úder nenávisti","10 DS",["Hraničář","lv 6","sp 9"],"-","Silný mentální útok rozdělí 3k10 zranění mezi až tři cíle a může u nich vyvolat krvácení, paniku a psychický otřes.","3k10",0,0,"10 sáhů","1 tvor","15"),
    "utz": new SpellA("skill/special/hra/magie_prirody.png","Uzdrav těžká zranění","6 DS",["Hraničář","lv 6","sp 9"],"-","Dotekem uzdraví 3k6+4 životů, nejvýše však do plného maxima cíle; silné, spolehlivé léčení.","3k6+4",1 * kolo,0,"dotyk","1 živý tvor","12"),
    "nzd": new SpellA("skill/special/hra/PPP0/hranicaruv_kun.png","Nezdolnost","3 DS",["Hraničář","sp 14"],"-","Očarované jezdecké zvíře po 1 hodinu ignoruje únavu a má zvýšenou mez vyřazení o 20; po skončení se únava vrátí.","0",1 * kolo,1 * hodina,"dotyk","zvíře","12"),
    "pvk": new SpellA("skill/special/hra/PPP0/hranicaruv_kun.png","Přivolej koně","2 DS",["Hraničář","sp 14"],"-","Hraničář vyšle tichý mentální signál; kůň dorazí, pokud mu nic nebrání, a reaguje podle naléhavosti výzvy.","0",1 * kolo,0,"5 mil","zvíře","12"),
    "svz": new SpellA("skill/special/hra/PPP0/hranicaruv_kun.png","S větrem o závod","4 DS",["Hraničář","sp 14"],"-","Kůň získá dvojnásobnou rychlost i délku skoku; lze seslat nejvýše tolikrát, kolik činí bonus za ODO.","0",1 * kolo,1 * smena,"dotyk","zvíře","10"),
    "ukz": new SpellA("skill/special/hra/PPP0/hranicaruv_kun.png","Uklidni zvíře","2 DS",["Hraničář","sp 14"],"-","Zvíře potlačí strach, uklidní se a odolá panice; také tlumí negativní efekty stresu a magie.","0",1 * kolo,1 * smena,"dotyk","zvíře","10"),
    "zvp": new SpellA("skill/special/hra/PPP0/hranicaruv_kun.png","Zvířecí posel","3 DS",["Hraničář","sp 14"],"-","Kůň je vyslán na známé nebo popsané místo; instinktivně najde cestu a obvykle se po splnění vrátí.","0",1 * kolo,0,"10 sáhů","zvíře","12"),
    //hra chodec
    "fst": new SpellA("skill/special/hra/PPP1/chodecka_magie.png","Falešná stopa","3 DS",["Hraničář","sp 25"],"-","Očarovaný přírodní předmět se kutálí 500 sáhů a vytváří věrohodnou falešnou stopu, kterou lze odhalit pouze úspěšným stopováním.","0",3 * kolo,1 * smena,"500 sáhů","kámen/větev/předmět","8"),
    "mpc": new SpellA("skill/special/hra/PPP1/chodecka_magie.png","Matení pachů","2 DS",["Hraničář","sp 25"],"-","Kouzlo změní nebo přenese pach sesilatele; mate tvory spoléhající na čich, zejména šelmy, a umožňuje falešné stopy.","0",2 * kolo,1 * hodina,"dotyk","1 tvor","12"),
    "msp": new SpellA("skill/special/hra/PPP1/chodecka_magie.png","Matení stop","2 DS",["Hraničář","sp 25"],"-","Změní vzhled stop, aby připomínaly jiného tvora či osobu; vhodné pro únik, matení pronásledovatelů i kladení stop.","0",2 * kolo,1 * hodina,"dotyk","1 tvor","12"),
    "ocp": new SpellA("skill/special/hra/PPP1/chodecka_magie.png","Oči přírody","2 DS",["Hraničář","sp 25"],"-","Očarovaný kámen umožňuje celodenní pozorování okolí na dálku; sesilatel zůstává v transu, dokud sledování trvá.","0",10 * kolo,1 * den,"1 míle","kámen","12"),
    "uhp": new SpellA("skill/special/hra/PPP1/chodecka_magie.png","Uhrančivý pohled","5 DS",["Hraničář","sp 25"],"CHAR vs CHAR","Uhrančující pohled vyvolá strach; oběť má silnou nevýhodu k útoku, obraně i sesílání proti chodci.","0",1 * kolo,3 * kolo,"10 sáhů","1 tvor","16"),
    "ocs": new SpellA("skill/special/hra/PPP1/soustredeni_dusevni_sily.png","Očištění","3 DS",["Hraničář","sp 31"],"-","Zesílí mysl proti psychickým útokům; poskytuje výhodu +5 ke všem hodům na Vůli po dobu 10 kol.","0",0.5 * kolo,10 * kolo,"-","chodec","10"),
    "prz": new SpellA("skill/special/hra/PPP1/soustredeni_dusevni_sily.png","Přizpůsobení","3 DS",["Hraničář","sp 31"],"-","Chodec krátce odolává extrémním podmínkám, jako je oheň, mráz či otravy; získá výhodu +5 k ODO.","0",0,10 * kolo,"-","chodec","10"),
    "utu": new SpellA("skill/special/hra/PPP1/soustredeni_dusevni_sily.png","Utužení","3 DS",["Hraničář","sp 31"],"-","Zpevní část těla a sníží zranění v tomto kole o 8 životů (minimálně však 1); lze použít v každé obraně.","0",0,0,"-","chodec","10"),
    "uvl": new SpellA("skill/special/hra/PPP1/soustredeni_dusevni_sily.png","Uvolnění","3 DS",["Hraničář","sp 31"],"-","Krátké soustředění poskytne +2 k SIL, +2 k OBR a v rozšířeném boji také +2 k iniciativě na 10 kol.","0",0.5 * kolo,10 * kolo,"-","chodec","10"),
    "zcl": new SpellA("skill/special/hra/PPP1/soustredeni_dusevni_sily.png","Zacelení","1 DS",["Hraničář","sp 31"],"-","Na 10 kol zastaví krvácení, pokud není rána léčena, po skončení efektu krvácení pokračuje plnou silou.","0",0,10 * kolo,"-","chodec","10"),
    "odk": new SpellA("skill/special/hra/PPP1/chodcuv_mec.png","Odražení kouzla","3+X DS",["Hraničář","sp 24"],"INT vs INT","Meč odrazí cílené kouzlo; při velkém úspěchu lze určit směr odrazu; vyžaduje 1 aktivní obranu.","0",0,0,"dotyk","chodcova zbraň","16"),
    "psz": new SpellA("skill/special/hra/PPP1/chodcuv_mec.png","Posílení zbraně","X DS",["Hraničář","sp 24"],"-","Zvýší ÚČ nebo OZ zbraně; každé posílení stojí 1 DS z meče, celkově až na dvojnásobek jejího základu.","0",1 * kolo,3 * kolo,"dotyk","chodcova zbraň","8"),
    "tmz": new SpellA("skill/special/hra/PPP1/chodcuv_mec.png","Transmutace zbraně","2 DS",["Hraničář","sp 24"],"-","Promění ostří na stříbro, zlato či meteorit; vlastnosti zbraně zůstanou, ale nový materiál překoná odolnosti monster.","0",1 * kolo,0,"dotyk","chodcova zbraň","10"),
    "zbl": new SpellA("skill/special/hra/PPP1/chodcuv_mec.png","Záblesk","3 DS",["Hraničář","sp 24"],"-","Meč zesílí zdroj světla do oslnivého záblesku; cíl má 1k6 kol nevýhodu k obnově, útokům i vnímání.","1k6 kol",0,0,"dotyk","chodcova zbraň","12"),
    "zos": new SpellA("skill/special/hra/PPP1/chodcuv_mec.png","Živelná ostří","3 DS / kolo",["Hraničář","sp 24"],"-","Ostří obalí oheň nebo led; každý zásah uděluje dodatečné zranění 1k6, dokud je udržováno.","1k6",1 * kolo,0,"dotyk","chodcova zbraň","14"),
    "blv": new SpellA("skill/special/hra/PPP1/magie_lovcu_monster.png","Bleskový výpad","4 DS",["Hraničář","sp 29"],"OBR vs INT","Extrémně rychlý výpad zaskočí nepřítele; pokud neuspěje v OBR vs INT, brání se jen základní obranou.","0",0,0,"dotyk","chodcova zbraň","14"),
    "dvs": new SpellA("skill/special/hra/PPP1/magie_lovcu_monster.png","Dvojitý švih","4 DS",["Hraničář","sp 29"],"-","Chodec ve stejném kole provede o jeden útok navíc zbraní na blízko; ideální pro ofenzivní tlak.","0",0,0,"dotyk","chodcova zbraň","14"),
    "pkz": new SpellA("skill/special/hra/PPP1/magie_lovcu_monster.png","Poškození zbraně","4 DS",["Hraničář","sp 29"],"-","Místo zranění způsobí trvalé poškození nemagické zbraně protivníka; její ÚČ i OZ klesají podle síly útoku.","0",0,1 * kolo,"dotyk","chodcova zbraň","14"),
    "srr": new SpellA("skill/special/hra/PPP1/magie_lovcu_monster.png","Sražení projektilu","2 DS",["Hraničář","sp 29"],"-","Automaticky odkloní drobné letící projektily, pokud má chodec aktivní obranu; nevyžaduje hod na obranu.","0",0,0,"dotyk","chodcova zbraň","10"),
    "vos": new SpellA("skill/special/hra/PPP1/magie_lovcu_monster.png","Vířivé ostří","3 DS",["Hraničář","sp 29"],"-","Kouzlo rozkmitá čepel do rozmazané stopy; útok získává výhodu +5 a je obtížně předvídatelný.","0",0,0,"dotyk","chodcova zbraň","12"),
    "jdp": new Recip("skill/special/hra/PPP1/magicke_pasti.png","Jedová past","2 DS",["Hraničář","sp 28"],"ODO vs 8","Oblak spor otráví oběť za 1k6 životů; účinek trvá další 3 kola. Past je ukrytá pod listím či hlínou.","1k6","-","houby",0,8 * kolo,0,"-","14"),
    "svp": new Recip("skill/special/hra/PPP1/magicke_pasti.png","Svazující past","6 DS",["Hraničář","sp 28"],"OBR vs 10","Rostlinné či pavučinové vlákno lapí oběť a znehybní ji na 10 kol; v dalších kolech se může pokusit uniknout.","0","-","lano/pavučina",0,5 * kolo,0,"-","14"),
    "vrp": new Recip("skill/special/hra/PPP1/magicke_pasti.png","Varovná past","1 DS",["Hraničář","sp 28"],"Postřeh vs 15","Silný praskot slyšitelný až na 100 sáhů; velmi nenápadná past zakrytá větvičkami.","0","-","větvičky",0,1 * minuta,0,"-","14"),
    "vrt": new Recip("skill/special/hra/PPP1/magicke_pasti.png","Vřeštík","5 DS",["Hraničář","sp 28"],"OBR vs 10 / OBR vs 12","Přilnavé rostliny se zachytí na oběti a vyvolají extrémní pálení bez skutečného zranění; drží až hodinu.","0","-","bodláky",0,5 * kolo,0,"-","14"),
    "vbp": new Recip("skill/special/hra/PPP1/magicke_pasti.png","Výbušná past","7 DS",["Hraničář","sp 28"],"-","Pryskyřice po aktivaci exploduje a zraní všechny v oblasti za 2k6 životů; může zapálit hořlaviny.","2k6","-","pryskyřice",0,1 * minuta,0,"-","14"),
    "vks": new Recip("skill/special/hra/PPP1/magicke_pasti.png","Vyskakující kolíky","6 DS",["Hraničář","sp 28"],"-","Maskované kolíky prudce vyletí vzhůru a zasáhnou všechny uvnitř kruhu za 2k6 životů.","2k6","-","větve",0,1 * minuta,0,"-","14"),    
    //hra druid
    "oru": new SpellA("class/dru.png","Obří růst","2 DS / sáh velikosti",["Druid","sp 9"],"-","Druid během vyvolání nechá rostlinu vyrůst do její maximální velikosti a může ji tvarovat jako překážku či úkryt.","0",10 * kolo,0,"dotyk","1 rostlina","10"),
    "ppy": new SpellA("class/dru.png","Poskytni příbytek","3+X DS",["Druid","sp 9"],"-","Z rostlin vytvoří kopulovitý příbytek o poloměru 3 sáhů, trvající 6+X hodin dle vložené síly.","0",10 * kolo,6 * hodina,"dotyk","1 strom","10"),
    "ppd": new SpellA("class/dru.png","Požehnání přírody","4 DS",["Druid","sp 9"],"-","Dotekem udělí tvorovi +2 k SIL, OBR, ODO nebo CHAR podle typu použité ratolesti.","0",1 * kolo,1 * smena,"dotyk","1 bytost","12"),
    "prh": new SpellA("class/dru.png","Probuzení hvozdu","X DS",["Druid","sp 9"],"-","Zvýší probouzecí energii hvozdu; při překročení prahu může dojít k probuzení vyššího stupně.","0",1 * smena,0,"dotyk","hvozd","12"),
    "plb": new SpellA("class/dru.png","Přilnavost břečťanu","3 DS",["Druid","sp 9"],"-","Z rozdrceného listu vyraší až 50 sáhů lián, které lze využít k lezení, spojování či konstrukci.","0",1 * kolo,1 * smena,"dotyk","50 sáhů lián","8"),
    "prd": new SpellA("class/dru.png","Přivolej Druida","4 DS",["Druid","sp 9"],"-","Magický signál přivolá Druidy v okruhu 50 mil a může jim předat krátké poselství jedné věty.","0",1 * smena,0,"50 mil","Druidi","12"),
    "spl": new SpellA("class/dru.png","Splynutí","3 DS",["Druid","sp 9"],"-","Cíl splyne s přírodní překážkou a stane se téměř neviditelným; odhalit jej lze jen úspěšným postřehem.","0",0.5 * kolo,0,"dotyk","1 tvor","10"),
    "trs": new SpellA("class/dru.png","Trnový štít","5 DS",["Druid","sp 9"],"-","Předmět obroste trny; štít získá +1 KZ, zbroj omezuje obratnost a obrana způsobí 1k6 zranění útočníkovi.","1k6",1 * kolo,1 * smena,"dotyk","1 předmět","10"),
    "ukh": new SpellA("class/dru.png","Uklidnění hvozdu","X DS",["Druid","sp 9"],"-","Snižuje probouzecí energii hvozdu; ke snížení stupně probuzení je nutných alespoň 5 Druidů.","0",1 * smena,0,"dotyk","hvozd","12"),
    "uvd": new SpellA("class/dru.png","Uvadni","1 DS / sáh velikosti",["Druid","sp 9"],"-","Druid nechá rostlinu rychle uschnout a ztratit životní sílu; cena závisí na její velikosti.","0",10 * kolo,0,"dotyk","1 rostlina","10"),
    "dzl": new SpellA("skill/special/hra/PPP2/druidske_ritualy.png","Dar života","Veškerá DS",["Hraničář","sp 34"],"-","Mocný obřad trvající 3 hodiny vrací život zemřelému, pokud nebyl mrtvý déle než měsíc a tělo je zachované.","0",3 * hodina,0,"dotyk","1 tvor","31"),
    "lsh": new SpellA("skill/special/hra/PPP2/druidske_ritualy.png","Láska hvozdu","Veškerá DS",["Hraničář","sp 34"],"-","Trvalé požehnání chrání cíl před útoky bytostí hvozdu; efekt trvá, dokud sám cíli neublíží.","0",3 * hodina,0,"50 sáhů","1 tvor","26"),
    "nnh": new SpellA("skill/special/hra/PPP2/druidske_ritualy.png","Nenávist hvozdu","Veškerá DS",["Hraničář","sp 34"],"-","Temný rituál označí cíl jako nepřítele hvozdu; les jej aktivně napadá a způsobuje mu neustálé nebezpečí.","0",3 * hodina,0,"hvozd","1 tvor","36"),
    "ulk": new SpellA("skill/special/hra/PPP2/druidske_ritualy.png","Uzdrav lykantropii","40 DS",["Hraničář","sp 34"],"-","Obřad během úplňku trvá 12 hodin; cíl musí uspět ve Vůli proti obtížnosti nákazy, k hodu má výhodu +5.","0",12 * hodina,0,"dotyk","1 tvor","25"),
    "uzm": new SpellA("skill/special/hra/PPP2/druidske_ritualy.png","Uzdrav zmrzačení","Veškerá DS",["Hraničář","sp 34"],"-","Rituál obnoví těžká zranění, včetně amputovaných částí těla, a navíc vyléčí 3k6+ODO životů.","3k6+ODO",1 * hodina,0,"dotyk","1 tvor","31"),
    "zzk": new SpellA("skill/special/hra/PPP2/druidske_ritualy.png","Zruš zkamenění","Veškerá DS",["Hraničář","sp 34"],"-","Denní rituál za slunečného světla odstraní zkamenění, paralýzu i některé kletby; obnovuje přirozený stav těla.","0",1 * hodina,0,"dotyk","1 tvor","20"),
    "blk": new SpellA("skill/special/hra/PPP2/magie_lesa.png","Bludný kořen","5 DS",["Hraničář","sp 35"],"Orientace vs 15","Očarovaný kořen mate cestující; kdo selže v orientaci, chodí v kruhu a každou hodinu zkouší snazší hod.","0",1 * kolo,1 * den,"dotyk","1 kořen","10"),
    "lsb": new SpellA("skill/special/hra/PPP2/magie_lesa.png","Listová bouře","6 DS / kolo",["Hraničář","sp 35"],"SIL vs INT","Vítr s listím a úlomky uděluje 2k6 zranění a zpomaluje ty, kteří selžou v ověření; uvnitř je obtížný pohyb.","2k6",1 * kolo,0,"40 sáhů","kruh 5 sáhů","16"),
    "onl": new SpellA("skill/special/hra/PPP2/magie_lesa.png","Otevřená náruč lesa","3 DS",["Hraničář","sp 35"],"-","Les se rozestoupí a vytvoří cestu; družina se pohybuje hustým porostem jako po kvalitní cestě.","0",5 * kolo,1 * den,"Druid","kruh 15 sáhů","10"),
    "pvv": new SpellA("skill/special/hra/PPP2/magie_lesa.png","Povolej víly","4 DS / vílu",["Hraničář","sp 35"],"-","Druid přivolá víly v okruhu 5 mil; chrání sesilatele a mohou seslat léčivá kouzla jednou denně.","0",10 * kolo,1 * den,"Druid","5 mil","12"),
    "pbl": new SpellA("skill/special/hra/PPP2/magie_lesa.png","Přivolej bludičky","6+6 DS",["Hraničář","sp 35"],"-","Očarované místo přivolá 2k6 bludiček; za další sílu lze určit místo shromažďování i cíl jejich vábení.","0",5 * kolo,1 * den,"dotyk","5 mil","10"),
    "psy": new SpellA("skill/special/hra/PPP2/magie_lesa.png","Procházení stromy","4 DS",["Hraničář","sp 35"],"-","Sesilatel může vstoupit do stromu a pohybovat se v jeho hmotě pomaleji, ale skrytě a bezpečně.","0",0.5 * kolo,20 * kolo,"Druid","stromy","14"),
    "snm": new SpellA("skill/special/hra/PPP2/magie_lesa.png","Snový mrak","8 DS",["Hraničář","sp 35"],"ODO vs 8","Obří květy vypustí pyl vyvolávající halucinace; účinky se určují hodem 1k10 a trvají 3 kola.","0",2 * kolo,3 * kolo,"50 sáhů","kruh 3 sáhy","14"),
    "zmp": new SpellA("skill/special/hra/PPP2/magie_lesa.png","Změna počasí","10 DS",["Hraničář","sp 35"],"-","Druid změní počasí v okruhu 1 míle o jeden stupeň; v zimě se déšť mění na sněžení.","0",1 * smena,1 * hodina,"1 míle","kruh 1 míle","14"),
    "hnv": new SpellA("skill/special/hra/PPP2/magie_hvozdu.png","Hněv hvozdu","22 DS",["Hraničář","sp 36"],"INT vs CHAR","Hvozd se zahalí temnotou; kdo selže v ověření, propadá panice na 5 kol, ostatní trpí nevýhodou.","0",1 * kolo,5 * kolo,"kruh 100 sáhů","tvorové","22"),
    "krz": new SpellA("skill/special/hra/PPP2/magie_hvozdu.png","Koroze","10 DS",["Hraničář","sp 36"],"-","Magický pyl rozkládá kov; každý tah snižuje ÚČ, OZ nebo kvalitu zbroje o 1, až do úplného rozpadnutí.","0",1 * kolo,3 * kolo,"10 sáhů","1 tvor","16"),
    "njb": new SpellA("skill/special/hra/PPP2/magie_hvozdu.png","Najdi bytost","8 DS",["Hraničář","sp 36"],"-","Druid skrze duchy přírody zjistí přesnou polohu hledané bytosti v okruhu 5 mil; pokud tam není, duchové mlčí.","0",1 * smena,0,"5 mil","Druid","14"),
    "ppl": new SpellA("skill/special/hra/PPP2/magie_hvozdu.png","Probuzení Pastýře lesa","20 DS",["Hraničář","sp 36"],"-","Oživí prastarý strom v inteligentního Pastýře lesa; sesilatel trvale obětuje 2 body maxima DS.","0",1 * smena,0,"dotyk","1 strom","22"),
    "psu": new SpellA("skill/special/hra/PPP2/magie_hvozdu.png","Probuzení stromu","8 DS",["Hraničář","sp 36"],"-","Dočasně oživí běžný strom v agresivní dřevěnou bytost, která bojuje instinktivně.","0",1 * kolo,1 * smena,"dotyk","1 strom","18"),
    "tvs": new SpellA("skill/special/hra/PPP2/magie_hvozdu.png","Trnová stěna","6+X DS",["Hraničář","sp 36"],"-","Vyvolá hustou trnovou stěnu o výšce 3 sáhy; každý sáh navíc stojí +1 DS; trvá celý den.","1k6/2",2 * kolo,1 * den,"30 sáhů","6+X sáhů","16"),
    "zpl": new SpellA("skill/special/hra/PPP2/magie_hvozdu.png","Zapletení","6+2 DS / sáh",["Hraničář","sp 36"],"OBR vs INT","Oživené kořeny polapí tvory do velikosti C; útoky proti nim mají výhodu +5 díky odkrytým zádům.","0",1 * kolo,3 * kolo,"30 sáhů","kruh 3+X sáhy","18"),
    "zvl": new SpellA("skill/special/hra/PPP2/magie_hvozdu.png","Zestromovatění","18 DS",["Hraničář","sp 36"],"INT vs CHAR","Pomalu mění živou bytost ve strom; proces trvá několik hodin a bez zásahu je výsledek trvalý.","0",3 * kolo,0,"dotyk","1 tvor","20"),
    //hra PZ
    "bor": new SpellA("skill/special/hra/PPP3/divoke_pokriky.png","Bojovný řev","5 DS",["Hraničář","sp 42"],"-","Mocný řev povzbudí spojence smečky; na 3 kola získají +1 k ÚČ i OČ a bojují odhodlaněji.","0",0,3 * kolo,"kruh 10 sáhů","zvířata smečky","12"),
    "der": new SpellA("skill/special/hra/PPP3/divoke_pokriky.png","Děsivý řev","5 DS",["Hraničář","sp 42"],"Vůle vs INT","Děsivý zvířecí řev zastraší všechny kromě smečky; kdo neuspěje, má k iniciativě, ÚČ i sesílání 1 kolo nevýhodu.","0",0,1 * kolo,"kruh 5 sáhů","vše živé","14"),
    "plv": new SpellA("skill/special/hra/PPP3/divoke_pokriky.png","Pokřik lovu","3 DS",["Hraničář","sp 42"],"-","Pán zvířat vyburcuje smečku k šílenému tempu; po 1 kolo se jejich pohyblivost zdvojnásobí.","0",0,1 * kolo,"kruh 10 sáhů","smečka","10"),
    "vbk": new SpellA("skill/special/hra/PPP3/divoke_pokriky.png","Vábivý křik","3 DS",["Hraničář","sp 42"],"-","Napodobí hlas konkrétního druhu a přiláká ho, pokud je v okruhu 5 mil; lze volat jednotlivce či celý druh.","0",0,0,"5 mil","vybraný druh","10"),
    "vvk": new SpellA("skill/special/hra/PPP3/divoke_pokriky.png","Varovný výkřik","3 DS",["Hraničář","sp 42"],"OBR vs OBR","Včasným varováním umožní zvířeti reflexivně uskočit, pokud uspěje v OBR vs OBR nepřítele.","0",0,0,"30 sáhů","zvíře smečky","12"),
    "chr": new SpellA("skill/special/hra/PPP3/magie_smecky.png","Chraň","3 DS",["Hraničář","sp 42"],"-","Smečka instinktivně kryje slabší členy; útoky mířené na ně jsou převedeny na silnějšího spojence.","0",0.5 * kolo,10 * kolo,"30 sáhů","smečka","10"),
    "stv": new SpellA("skill/special/hra/PPP3/magie_smecky.png","Štvi","3 DS + 2 DS/zvíře",["Hraničář","sp 42"],"-","Smečka žene protivníka k vybranému místu a zastrašuje jej, aniž by šla do přímého boje.","0",0.5 * kolo,1 * smena,"1 míle","smečka","14"),
    "trh": new SpellA("skill/special/hra/PPP3/magie_smecky.png","Trhej","2 DS / zvíře",["Hraničář","sp 42"],"-","Vybraná zvířata získají jeden útok navíc, ale přijdou o jednu obranu; lze seslat na více členů smečky.","0",0.5 * kolo,0,"30 sáhů","zvířata","12"),
    "zdr": new SpellA("skill/special/hra/PPP3/magie_smecky.png","Zadrž","3 DS / zvíře",["Hraničář","sp 42"],"SIL vs SIL","Zvíře se zakousne do cíle a znehybní jej; útoky proti uvězněnému mají výhodu +5 díky odkrytým zádům.","0",0.5 * kolo,0,"30 sáhů","1 cíl","14"),
    "zch": new SpellA("skill/special/hra/PPP3/magie_smecky.png","Zachraň","5 DS",["Hraničář","sp 42"],"-","Pán zvířat předá část svých životů tvorovi smečky; množství závisí na vložené síle.","0",0.5 * kolo,0,"30 sáhů","zvíře smečky","14"),
    "mmk": new SpellA("skill/special/hra/PPP3/pokrocila_magie_zvirat.png","Mimikry","3 DS",["Hraničář","sp 44"],"-","Tvor splyne s okolní přírodou a získá výhodu +5 k plížení, kamufláži a dalším dovednostem vyžadujícím skrytí.","0",3 * kolo,1 * hodina,"dotyk","1 tvor","12"),
    "nkz": new SpellA("skill/special/hra/PPP3/pokrocila_magie_zvirat.png","Nakrm zvíře","1 DS",["Hraničář","sp 44"],"-","Očarované jídlo výrazně zvýší regeneraci; během spánku zvíře uzdraví trojnásobek běžné hodnoty.","0",3 * kolo,0,"dotyk","zvíře","10"),
    "ocz": new SpellA("skill/special/hra/PPP3/pokrocila_magie_zvirat.png","Oči zvířete","2 DS",["Hraničář","sp 44"],"-","Sesilatel vnímá svět očima zvířete, pokud ví, kde se nachází; nelze však ovládat jeho činy.","0",1 * kolo,1 * smena,"1 míle","zvíře","12"),
    "pch": new SpellA("skill/special/hra/PPP3/pokrocila_magie_zvirat.png","Pochvala","3 DS",["Hraničář","sp 44"],"-","Chvála posílí motivaci zvířete; jeho další zvolený hod (boj či dovednost) má výhodu +5.","0",1 * kolo,1 * den,"dotyk","zvíře","12"),
    "psl": new SpellA("skill/special/hra/PPP3/pokrocila_magie_zvirat.png","Poslouchej","4 DS",["Hraničář","sp 44"],"CHAR vs CHAR","Sesilatel získá telepatické spojení se zvířetem; při úspěchu ho může dočasně ovládat.","0",0.5 * kolo,1 * smena,"30 sáhů","zvíře","10"),
    //alc
    "bom": new Recip("skill/special/alc/nestabilni_substance.png", "Bomba", "0 MP", ["Alchymista", "sk 302"], 0, "Železná koule s knotem (10 coulů / kolo)", "2k6+4 výbuch a střepy 5 sáhů kolem", "35 sur", "žel.koule, zap.šňůra", 0, 10 * minuta, 0, "železná koule s knotem", "8"),
    "dym": new Recip("skill/special/alc/nestabilni_substance.png", "Dýmovnice", "0 MP", ["Alchymista", "sk 302"], 0, "Zapálitelná trubička, nebo koule", "Dusivý dým do poloměru 10 sáhů", "25 sur", "listí (záp.šňůra)", 0, 10 * minuta, 5 * minuta, "Zapálitelná trubička, nebo koule", "6"),
    "kin": new Recip("skill/special/alc/nestabilni_substance.png", "Kouzelný inkoust", "4 MP", ["Alchymista", "sk 302"], 0, "Neviditelný / Světélkující / Mizející inkoust na 5 stran pergamenu", 0, "6 sur", "olej, flakón", 0, 5 * minuta, 0, "flakón oleje libovolné barvy", "6"),
    "lpa": new Recip("recip.png", "Lakmusový papírek", "1 MP", ["Alchymista", "sk 302"], 0, "Ze vzorku lektvaru nebo krve dokáže identigikovat o co jde", 0, "5 sur", "pergamen", 0, 10 * minuta, 0, "10 bílých proužků pergamenu 10 coulů", "6"),
    "lms": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Medvdí síly", "30 MP", ["Alchymista", "sk 302"], 0, "Napumpování svaůl a krv. oběhu:SIL+3", "5 BÚ", "35 sur", "krev šelmy", 1 * den, 10 * minuta, 2 * smena, "hustá hnědá tek. / odporně sladná / smrdí", "6"),
    "lmu": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Mucholapka", "15 MP", ["Alchymista", "sk 302"], 0, "Umožní lézt po zdech a stropě rychlostí 2-6 sáhů/kolo (A-C)", 0, "10 sur", "pivo, pryskyřice", 12 * hodina, 5 * minuta, 1 * smena, "zlatavá/sladká/voní po medu a borovici", "8"),
    "lne": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Neutralizace", "5 MP", ["Alchymista", "sk 302"], 0, "Ruší aktivní efekty jiných lektvarů a četnosti", 0, "10 sur", "3dcl lihu", 0, 5 * kolo, 0, "jasně oranžová,bublá/-/-", "8"),
    "lra": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Ranhojič", "5 MP", ["Alchymista", "sk 302"], 0, "Léčivý lektvar", "1k6+2 léčení", "15 sur", "víno", 12, 5 * minuta, 0, "rudá tekutina / chuť i vůně po skořici, hrebícku a víne", "6"),
    "lry": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Rychlost", "12 MP", ["Alchymista", "sk 302"], 0, "+1 útok/obrana +2 OČ/init/dovednosti(OBR) pohyblivost*2", 0, "20 sur", "voda, ještěrčí ocásky", 1 * den, 2 * minuta, 10 * kolo, "bledě modrá/nasládlá/máta", "8"),
    "lzv": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Změna velikosti", "25 MP", ["Alchymista", "sk 302"], 0, "Koňská ↑, Oslí ↓ o 1 třídu velikosti", 0, "30 sur", "koňská/oslí moč", 1 * den, 10 * minuta, 2 * smena, "oranžová/octová kyselá/pach moči", "8"),
    "upr": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Univerzální protijed", "5 MP", ["Alchymista", "sk 302"], 0, "Neutralizuje jedy s nebezpečností 6-, silnější oslabí na 1/2", 0, "10 sur", "voda, uhlí", 2 * hodina, 10 * kolo, 0, "tmavě šedá/hořká/-", "6"),
    "zsn": new Recip("skill/special/alc/nestabilni_substance.png", "Zápalná šňůra", "0 MP", ["Alchymista", "sk 302"], 0, "60 coulů hoří/jiskří 6 kol", 0, "5 sur", "60 coulů lana", 0, 5 * minuta, 0, "hořlavý provaz", "6"),
    "zli": new Recip("recip.png", "Zředěný líh", "0 MP", ["Alchymista", "sk 302"], 0, "Líh k čištění / dezinfekci až 10x, hořlavý", "0", "10 sur", "alkohol", 0, 2 * smena, 0, "čirý/denaturák/denaturák", "6"),
    //alc lv2+
    "bvo": new Recip("skill/special/alc/magicke_predmety.png", "Boty vodoměrky", "85 MP", ["Alchymista", "–"], 0, "Nositel chodí po vodě, sněhu, blátě či sypkém povrchu; chůze je nestabilní a o 50 % pomalejší.", 0, "200 sur", "boty + 10 vodoměrek", 0, 2 * den, 0, "boty s upravenou podrážkou", "10"),
    "cst": new Recip("skill/special/alc/magicke_predmety.png", "Čarovný štít", "80 MP", ["Alchymista", "–"], 0, "Speciální ochranný nátěr zvyšuje kvalitu štítu o +1 oproti běžné verzi.", 0, "45 sur", "štít", 0, 2 * den, 0, "jakýkoliv štít s magickým nátěrem", "8"),
    "chp": new Recip("skill/special/alc/magicke_predmety.png", "Chodecký plášť", "40 MP", ["Alchymista", "–"], 0, "Dokonale nepromokavý; v zimě hřeje, v létě větrá a mírně chladí.", 0, "50 sur", "plášť", 0, 24 * hodina, 0, "běžný plášť s kapucí", "8"),
    "jds": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Jed Dorfův spánek", "5 + X MP", ["Alchymista", "–"], "Odolnost (ODO) vs. 1 (+1 za každých 5 MP)", "Po 15 min uspí cíl hlubokým spánkem; ve stresu/boji do odeznění situace ztrácí iniciativu a má Nevýhodu (-5), poté usíná.", 0, "30 sur", "voda, makovice", 0, 20 * minuta, 4 * hodina, "černá tekutina, lehká maková vůně/chuť", "8"),
    "jvz": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Jed Vosí žihadlo", "10 MP", ["Alchymista", "lv 2", "sk 302"], "ODO vs 6", "Plná dávka na ostří zbraně, nebo 1/5 dávky na střely", "10/2 jedem", "20 sur", "jedovaté byliny", 0, 10 * minuta, 0, "zelená/sladká/čáranky", "8"),
    "kol": new Recip("skill/special/alc/magicke_predmety.png", "Kouzelný luk", "40 MP", ["Alchymista", "–"], 0, "Magický olej a tětiva: Útočnost i Zranění +1; dostřel delší o 30 sáhů oproti nemagické verzi.", 0, "100 sur", "luk, koňské žíně, olej", 0, 2 * den, 0, "luk napuštěný magickým olejem se zvláštní tětivou", "8"),
    "kro": new Recip("skill/special/alc/magicke_predmety.png", "Krvavé ostří", "30 MP", ["Alchymista", "–"], 0, "Dýka s trvale ostrým, zoubkovaným ostřím; Útočnost i Zranění +1 oproti původu.", 0, "30 sur", "dýka", 0, 3 * hodina, 0, "věčně ostrá dýka", "8"),
    "lam": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Améba", "30 MP", ["Alchymista", "–"], 0, "Promění pijáka v průhledný rosol; protékaní škvírami, lepení na stěny/strop, limitovaná síla, obyč. zbraně dávají 1/4 Ž, kouzelné plně, oheň dvojnásobně.", 0, "20 sur", "vaječný bílek, mléko", 24 * hodina, 10 * minuta, 2 * smena, "průsvitná vazká tekutina bez chuti a zápachu", "12"),
    "lmz": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Mrazužár", "35 MP", ["Alchymista", "–"], 0, "Dočasná ochrana proti žáru nebo chladu (dle základu); běžný oheň/mráz neubližuje, kouzla/dech půlí zranění; extrémy (láva) stále smrtelné.", 0, "60 sur", "líh/olej + květ divizny (chlad) nebo heřmánku (žár)", 12 * hodina, 5 * minuta, 1 * smena, "čirá hořká tekutina, slabá vůně citronu", "8"),
    "lzb": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Lektvar Životabudič", "40 MP", ["Alchymista", "–"], 0, "Na 2 hodiny necítí únavu; poté dvojnásobná vyčerpanost a o 50 % delší spánek pro léčení/meditaci.", 0, "15 sur", "rum, býčí žlázy", 5 * den, 5 * minuta, 2 * hodina, "černá tekutina, bylinná vůně, sladká karamelová chuť", "8"),
    "sli": new Recip("recip.png", "Sliz", "5 MP", ["Alchymista", "–"], 0, "Po 5 kolech na vzduchu ztvrdne v extrémně odolné lepidlo (udrží tah koně); povolí mrazem nebo čistým lihem; odtržení: SIL vs. 20 (s pomocí přičti SIL a Výhodu).", 0, "10 sur", "pryskyřice", 0, 2 * minuta, 0, "zlatavá slizká hmota", "8"),
    //alc skills
    "prv": new Recip("skill/special/alc/hvezdne_sestavy.png", "Prsten varování", "40 MP", ["Alchymista", "sp 10 / v poledne"], 0, "Varuje na blízkost zvoleného tvora/druhu (do ~100 sáhů), zahřívá se/chvěje/světélkuje – lze s ním i stopovat.", 0, "35 sur", "prsten, sklíčko, fetiš", 0, 24 * hodina, 0, "prsten se skleněným očkem", "8"),
    "amu": new Recip("skill/special/alc/krystaly_a_energie.png", "Amulet many", "140 MP (+ až 20 MP přídavně)", ["Alchymista", "sp 11"], 0, "Umožní kouzelníkovi čerpat manu z krystalu (1 MP/kolo se soustředěním) do vyčerpání přídavné many.", 0, "148 sur", "přívěsek a ametyst", 0, 2 * den, 0, "amulet s modrým ametystem", "12"),
    "cam": new Recip("skill/special/alc/magicke_predmety.png", "Caldorova maska", "90 MP (+ až 30 MP přídavně)", ["Alchymista", "sp 8"], 0, "Změní vzhled obličeje (i vlasy) na někoho, koho nositel viděl; každá proměna stojí 2 MP příd., trvá 1 směnu; lze prodlužovat.", 0, "60 sur", "libovolná maska", 0, 2 * den, 1 * smena, "běžná maska, papír/dřevo", "14"),
    "cpr": new Recip("skill/special/alc/hvezdne_sestavy.png", "Čelenka porozumění", "50 MP", ["Alchymista", "sp 10 / v poledne"], 0, "Nositel rozumí cizí řeči i písmu (INT 2+), sám ale tím jazykem komunikovat neumí.", 0, "100 sur", "čelenka", 0, 24 * hodina, 0, "tenká stříbrná čelenka/diadém", "10"),
    "csv": new Recip("skill/special/alc/nestabilni_substance.png", "Černé světlo", "15 MP", ["Alchymista", "sp 7"], 0, "Po vytažení zátky za 3 kola dojde k oslepujícímu záblesku, který v okruhu 15 sáhů zraňuje nemrtvé a neviděné za 3k10 Ž.", "3k10 (nemrtví/nevidění v okruhu)", "20 sur", "fosfor, skleněná koule", 0, 2 * hodina, 0, "skleněná koule s prachem", "10"),
    "cnv": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Čočky nočního vidění", "60 + 5 MP", ["Alchymista", "sp 9"], 0, "Umožní vidět ve tmě v odstínech šedi; v úplné tmě vidět obrysy, v matném světle jako ve dne; nutná regenerace v roztoku many.", 0, "30 sur", "oči nočního tvora", 0, 3 * hodina, 0, "čočky v nádobce s roztokem many", "10"),
    "elm": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Elixír metamorfózy", "70 MP", ["Alchymista", "sp 6"], 24 * hodina, "Promění uživatele na tvora dle vzorku (podobná velikost); přebírá fyzické proporce, Ž a nemagické přirozené schopnosti; neovlivní mysl/dovednosti/kouzla.", 0, "12 sur", "0,1 l lihu, vzorek cíle", 24 * hodina, 2 * minuta, 6 * hodina, "žluto‑žlutá hustá tekutina, vůně/chuť po ostružinách", "12"),
    "epl": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Elixír proti lykantropii", "40 MP", ["Alchymista", "sp 6"], 0, "Vyléčí nákazu před prvním úplňkem; jinak na 24 h potlačí projevy a zabrání proměně.", 0, "35 sur", "0,1 l lihu, vlčí mor", 24 * hodina, 2 * smena, 0, "hnědá průhledná tekutina, sladkokyselá chuť", "14"),
    "els": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Elixír sedmibylí", "18 MP", ["Alchymista", "sp 6"], 0, "Okamžitě léčí zranění a tlumí bolest; zastaví otravu krve.", "3k6+6 léčení", "22 sur", "0,1 l lihu, byliny", 24 * hodina, 20 * minuta, 0, "zlatavá tekutina, vůně/chuť sušených bylin", "10"),
    "eza": new Recip("skill/special/alc/lektvary_a_elixiry.png", "Elixír zapomnění", "35 MP", ["Alchymista", "sp 6"], 0, "Okamžitá otupělost; 1 směnu nekomunikuje/nevnímá; po skončení zapomene vše z předchozí směny.", 0, "10 sur", "0,1 l lihu, makovice", 0, 5 * kolo, 1 * smena, "světle šedá, lehce hořká tekutina", "8"),
    "gal": new Recip("skill/special/alc/magicke_predmety.png", "Gaistova lampa", "60 MP (+ až 100 MP přídavně)", ["Alchymista", "sp 8"], 0, "V šeru/tmě odhaluje dutiny a tajné prostory (ne kov); v 1 kole prozkoumá 2×2 sáhy; každé kolo 5 MP příd.; po vyčerpání příd. many schopnost zaniká.", 0, "60 sur", "broušená čočka a lucerna", 0, 2 * hodina, 1 * kolo, "stíněná lucerna s čočkou", "10"),
    "kvr": new Recip("skill/special/alc/nestabilni_substance.png", "Kovožrout", "45 MP", ["Alchymista", "sp 7"], 0, "Po kontaktu s kovem jej rychle leptá (meč ~1 min, těžký řetěz ~5 min); neutralizace 2 l vody; bez kontaktu s kovem neškodný; po 1 směně sám přestane působit.", 0, "40 sur", "kyselina", 0, 2 * smena, 0, "flakón s narůžovělou tekutinou, oříšková vůně", "8"),
    "kvt": new Recip("skill/special/alc/krystaly_a_energie.png", "Kvantogen", "40 MP (+ až 90 MP přídavně)", ["Alchymista", "sp 11"], 0, "Krystal taví materiály v místě dotyku; spotřeba 3 MP/kolo, hloubka 1 coul a délka 10 coulů za kolo; povrch chladne 10 kol.", 0, "80 sur", "drahokam v kovovém jehlanu", 0, 24 * hodina, 0, "krystal v jehlanu", "12"),
    "lko": new Recip("skill/special/alc/hvezdne_sestavy.png", "Létající koště", "315 MP", ["Alchymista", "sp 10 / slunovrat"], 0, "Koště s démonem; let ~60 sáhů/kolo; unese ~130 liber; přetížení snižuje výkon nebo brání vzletu (dle PJ).", 0, "15 sur", "koště", 0, 24 * hodina, 0, "běžné koště se schopností létat", "14"),
    "mpd": new Recip("skill/special/alc/hvezdne_sestavy.png", "Meč požírač duší", "110 MP", ["Alchymista", "sp 10 / půlnoc / úplněk"], 0, "Meč s démonem: při zásahu vysaje oběti +3 Ž; musí být krmen 3 Ž každých 24 h, jinak bledne a 3. den praskne a je zničen.", 0, "80 sur", "meč", 0, 24 * hodina, 0, "meč rudé až bronzové barvy", "12"),
    "nas": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Naslouchátko", "112 MP", ["Alchymista", "sp 9"], 0, "Slyší šepot až na 50 sáhů a přes překážky; často bez ověření, jinak dává Výhodu (+5) na Postřeh.", 0, "60 sur", "ucho/sluchovod, kovový trychtýřek", 0, 2 * den, 0, "trychtýř k nasazení do ucha", "8"),
    "nek": new Recip("skill/special/alc/magicke_predmety.png", "Nekrozor", "50 MP (+ až 60 MP přídavně)", ["Alchymista", "sp 8"], 0, "Dalekohled zvýrazní tepelnou stopu (živí červeně, mrtví modře); aktivně do 100 sáhů; spotřeba 3 MP/kolo.", 0, "90 sur", "čočky, krystal, dva tubusy", 0, 2 * den, 1 * kolo, "dva tubusy s čočkami", "10"),
    "plm": new Recip("skill/special/alc/nestabilni_substance.png", "Plamenný meč", "130 MP", ["Alchymista", "sp 7"], 0, "Krystalky soli: po škrtnutí plameny na ostří (~5 coulů, svit do 2 sáhů) ~1 den; lze uhasit vodou/bez vzduchu; v boji dodává +1–3 Ž (1k6/2).", "+1–3 (1k6/2)", "70 sur", "meč", 0, 24 * hodina, 0, "meč se zelenými krystalky na čepeli", "12"),
    "plc": new Recip("skill/special/alc/magicke_predmety.png", "Plášť chameleon", "30 MP (+ až 120 MP přídavně)", ["Alchymista", "sp 8"], 0, "Maskuje nositele zrcadlením pozadí; v klidu dokonalé, při chůzi může prozradit lom světla; spotřeba 2 MP/min.", 0, "100 sur", "plášť s kapucí", 0, 2 * den, 10 * kolo, "běžný plášť s kapucí", "12"),
    "prb": new Recip("skill/special/alc/krystaly_a_energie.png", "Prsten blesku", "100 MP (+ až 40 MP přídavně)", ["Alchymista", "sp 11"], 0, "Sevřením pěsti vyšle blesk do 20 sáhů za 2k6 Ž; každé použití 5 MP příd.; max 1 blesk/kolo.", "2k6", "120 sur", "prsten, krystal", 0, 2 * den, 0, "prsten s vybroušeným krystalem", "10"),
    "res": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Respirátor", "40 MP", ["Alchymista", "sp 9"], 0, "Poskytne vzduch na 1 směnu; lze během 1 kola znovu naplnit na místě se vzduchem.", 0, "185 sur", "plíce (A+), kožená torna", 0, 24 * hodina, 1 * smena, "kožená maska s hadičkou do torny", "8"),
    "sib": new Recip("skill/special/alc/alchymisticka_anatomie.png", "Sibériovy posilující lektvary", "dle síly MP", ["Alchymista", "sp 9"], 0, "Dočasně zvýší opravu zvoleného atributu (+1 až +6) dle many a základu; úměrně roste i max. Ž/Mana a související vlastnosti.", 0, "65 sur", "alkohol, vnitřní orgány (dle tabulky)", 1 * tyden, 1 * smena, 2 * hodina, "různé barvy/druhy dle atributu", "10"),
    "spr": new Recip("skill/special/alc/krystaly_a_energie.png", "Světloprach", "5 MP", ["Alchymista", "sp 11"], 0, "Po 5 kolech na vzduchu jemně září (síla pochodně na 1/10 váčku) až 2 hodiny; bez tepla, lehký, sírový pach.", 0, "20 sur", "drcený drahokam (nejčastěji opál)", 0, 10 * minuta, 2 * hodina, "jemný zlatý prášek ve váčku s bílou stuhou", "6"),
    "vbz": new Recip("skill/special/alc/hvezdne_sestavy.png", "Vak beztíže", "45 MP", ["Alchymista", "sp 10 / úplněk"], 0, "Vak (30×60 coulů) s démonem: vše plně uvnitř nic neváží; nesmí obsahovat jiné magické předměty; na živé tvory nepůsobí.", 0, "90 sur", "pytel/vak", 0, 24 * hodina, 0, "běžný cestovní vak", "14"),
    "vhl": new Recip("skill/special/alc/nestabilni_substance.png", "Výbušná hlína", "12 MP", ["Alchymista", "sp 7"], 0, "Lze vtlačit do zámků/spár; exploduje ohněm při zápalu nebo nárazu, zraňuje v okruhu r=3 sáhy za 2k6 Ž; trvanlivost ~1 měsíc, poté riziko samovznícení.", "2k6 (plošně ohněm)", "15 sur", "hlína", 0, 10 * minuta, 0, "hliněná koule velikosti pěsti", "10"),
    //alc lv6+
    "jec": new Recip("skill/special/alc/PPP0/cestovni_alchymie.png","Ječák","10 MP",["Alchymista", "sp 14"],"-","Zatlučený kolík začne ječet, když se ve 10 sázích objeví tvor, před kterým byl nastaven varovat.","-","13 sur","dřevěný kolík","-","1 * hodina","6 * měsíc","malý dřevěný kolík s vyřezanou ošklivou hlavičkou","10"),
    "kts": new Recip("skill/special/alc/PPP0/cestovni_alchymie.png","Kotlík samovar","100 MP",["Alchymista", "sp 14"],"-","Kovová nádoba se po tření dlaní sama ohřívá a přivede obsah k varu bez světla a dýmu; při vaření lektvarů ušetří 5 surovin.","-","40 sur","kovová nádoba","-","1 * den","3 * hodina","malý kovový rendlík či hrnek, který se sám rozehřeje","16"),
    "mgk": new Recip("skill/special/alc/PPP0/cestovni_alchymie.png","Magický kompas","100 MP",["Alchymista", "sp 14"],"-","Kompas v páru — jedna střelka ukazuje sever, druhá směr k druhému kompasu; umožňuje sledování osob či družiny.","-","10 sur","4× kovová jehla","-","1 * den","2 * rok","dva malé kompasy se dvěma střelkami","18"),
    "plp": new Recip("skill/special/alc/PPP0/cestovni_alchymie.png","Plátěný palác","400 MP",["Alchymista", "sp 14"],"-","Stan se rozvine do prostoru cca 5×5 sáhů; odolný, chrání před útoky, nelze sbalit, pokud uvnitř leží jiné předměty.","-","100 sur","malý stan","-","5 * den","2 * rok","malý stan, uvnitř mnohem větší a vybavený","22"),
    "nbe": new Recip("skill/special/alc/PPP0/cestovni_alchymie.png","Neúnavné boty","100 MP",["Alchymista", "sp 14"],"-","Boty brání únavě z chůze, tlumí nárazy, nekloužou a při běhu snižují únavu; zmírňují postih za obtížný terén o 2.","-","50 sur","polovysoké boty","-","12 * hodina","2 * rok","pevné kožené boty","16"),
    "aka": new Recip("skill/special/alc/PPP0/forenzika.png","Akustický kalich","100 MP",["Alchymista", "sp 15"],"-","Zachycuje zvuky v okruhu 5 sáhů po dobu 3 hodin a později je přehraje.","-","30 sur","tenký kovový plátek","-","1 * den","2 * rok","malý kovový kalíšek","15"),
    "pdl": new Recip("skill/special/alc/PPP0/forenzika.png","Prášek Deletorium","20 MP",["Alchymista", "sp 15"],"-","Po rozprášení odstraní všechny stopy v prostoru 5×5 sáhů.","-","10 sur","šedivý prášek","-","10 * kolo","2 * rok","nenápadný šedivý prášek","13"),
    "krv": new Recip("skill/special/alc/PPP0/forenzika.png","Krevní lampa","30 + 10 MP",["Alchymista", "sp 15"],"-","Světlem odhalí zaschlé stopy krve; každá směna provozu spotřebuje 1 přídavnou manu.","-","50 sur","kovová trubka, čočka, krev","10 * použití","1 * hodina","1 * hodina","trubička s namodralou září","16"),
    "pje": new Recip("skill/special/alc/PPP0/forenzika.png","Protijedová esence","10 MP",["Alchymista", "sp 15"],"-","Neutralizuje jed v tekutinách a jídle až do objemu dvou litrů.","-","50 sur","cukr","-","2 * smena","2 * rok","nenápadný bílý prášek","14"),
    "zor": new Recip("skill/special/alc/PPP0/forenzika.png","Zornítko","30 + 10 MP",["Alchymista", "sp 15"],"-","Magická lupa zobrazující drobné detaily; poskytuje +10 k Postřehu při odhalování padělků.","-","80 sur","skleněná čočka","10 * minuta","1 * den","10 * minuta","tlustá lupa v kovové obroučce","14"),
    "hyd": new Recip("skill/special/alc/PPP0/herbalista.png","Hydroponický nálev","5 MP",["Alchymista", "sp 16"],"-","Konzervuje rostliny, cibule i semena a brání jejich rozkladu.","-","20 sur","alkohol","-","1 * smena","10 * rok","flakón s čirou tekutinou","13"),
    "lhv": new Recip("skill/special/alc/PPP0/herbalista.png","Lektvar Houbovrah","15 MP",["Alchymista", "sp 16"],"-","Likviduje běžné i obří houby; při polití působí zranění rostlinným tvorům.","4k10","30 sur","ocet","-","1 * smena","1 * kolo","flakón s oranžovou tekutinou","13"),
    "lli": new Recip("skill/special/alc/PPP0/herbalista.png","Lektvar Likvidátor","20 MP",["Alchymista", "sp 16"],"-","Likviduje plevel i oživlé rostliny, plná dávka způsobuje výrazné poškození.","4k10","20 sur","voda a sůl","-","1 * smena","1 * kolo","flakón s čirou slanou tekutinou","13"),
    "lma": new Recip("skill/special/alc/PPP0/herbalista.png","Lektvar Manamutace","50 MP",["Alchymista", "sp 16"],"-","Zvyšuje obsah many a surovin v rostlinách; při opakování způsobuje mutace.","-","30 sur","voda, drcené kosti","-","1 * smena","1 * růstový cyklus","flakón se šedivou tekutinou","18"),
    "pry": new Recip("skill/special/alc/PPP0/herbalista.png","Prášek Rychlorůst","20 MP",["Alchymista", "sp 16"],"-","Hnojivo obnovující sílu půdy a zdvojnásobující rychlost růstu rostlin.","-","120 sur","kompost, rašelina","-","1 * smena","1 * rok","černý kysele čpící prášek","14"),
    "kzm": new Recip("skill/special/alc/PPP0/laboratorni_specialista.png","Kukátko zření many","20 + 20 MP",["Alchymista", "sp 19"],"-","Umožňuje vidět manu jako auru a dává +5 k Vidění many.","-","20 sur","kovová obroučka a sklíčko","1 * použiti","3 * hodina","-" ,"malé kukátko bez zvětšení","13"),
    "pda": new Recip("skill/special/alc/PPP0/laboratorni_specialista.png","Pokročilá destilační aparatura","50 MP",["Alchymista", "sp 19"],"-","Zdvojnásobuje efektivitu destilace many z předmětů.","-","85 sur","soubor misek, trubiček a baněk","-","12 * hodina","-" ,"křehká aparatura v truhle","15"),
    "krm": new Recip("skill/special/alc/PPP0/laboratorni_specialista.png","Křišťálová mísa","50 / 150 MP",["Alchymista", "sp 19"],"-","Louhuje manu z předmětů rychlostí 10 nebo 20 bodů za hodinu.","-","100 / 200 sur","broušená křišťálová mísa","1 * den","24 * hodina / 7 * den","-" ,"velká křišťálová mísa","15 / 24"),
    "psf": new Recip("skill/special/alc/PPP0/laboratorni_specialista.png","Postříbřený flakón","10 MP",["Alchymista", "sp 19"],"-","Uloží až 100 many tak, že při Vidění many působí, jako by obsahoval pouze 1 bod.","-","5 sur","flakón + mince stříbra","-","1 * hodina","2 * rok","flakón pokrytý jemnou kovovou mřížkou","12"),
    "ebh": new Recip("skill/special/alc/PPP0/magicke_hulky.png","Ebonitová hůlka","50 MP",["Alchymista", "sp 20"],"-","Po nabití třením vystřelí elektrický výboj do 20 sáhů.","2k6","50 sur","dřevěná hůlka, liščí ohon","30 * použití","2 * hodina","1 * měsíc","hladká hůlka s kovovou špicí","15"),
    "hlv": new Recip("skill/special/alc/PPP0/magicke_hulky.png","Hůlka vzduchu","10 + X MP",["Alchymista", "sp 20"],"-","Vytváří kolem držitele vzdušnou bariéru, která odvádí plyny a nečistoty.","-","20 sur","dřevěná hůlka","dle many","1 * den","dle many","dutá hůlka s proudícím vzduchem","12"),
    "hlz": new Recip("skill/special/alc/PPP0/magicke_hulky.png","Hůlka země","80 + X MP",["Alchymista", "sp 20"],"-","Dotykem vytvrdí povrch na tenkou kamennou vrstvu, nosnou až 200 liber.","-","20 sur","dřevěná hůlka, prach","dle many","5 * hodina","1 * smena","hůlka s drsným pískovým povrchem","15"),
    "hlo": new Recip("skill/special/alc/PPP0/magicke_hulky.png","Ohnivá hůlka","5 + X MP",["Alchymista", "sp 20"],"-","Rozžhaví hrot a zapálí materiál; při zničení exploduje podle zbylé many.","Xk?","10 sur","dřevěná hůlka, popel","dle many","1 * hodina","dle many","dřevěná hůlka teplá na dotek","20"),
    "hlw": new Recip("skill/special/alc/PPP0/magicke_hulky.png","Vodní hůlka","20 + X MP",["Alchymista", "sp 20"],"-","Stříká 5 litrů vody za kolo až na 10 sáhů, dokud má přídavnou manu.","-","20 sur","dřevěná hůlka, voda","dle many","3 * hodina","dle many","vlhká hůlka s kapkami vody","13"),
    "ant": new Recip("skill/special/alc/PPP0/travicstvi.png","Antisérum","30 MP",["Alchymista", "sp 23"],"-","Neutralizuje jakýkoliv jed, vyžaduje vzorek původního jedu.","-","30 sur","neutralizovaný jed","-","10 * kolo","ihned","tmavě fialová trpká tekutina","X"),
    "jar": new Recip("skill/special/alc/PPP0/travicstvi.png","Arzaharův jed","50 MP",["Alchymista", "sp 23"],"Past dle druhé složky","Dvousložkový jed aktivovaný specifickou podmínkou.","-","20 sur","základní jed, spouštěcí doplněk","2 * smena","4 * smena","2 * smena","čirá sladce vonící tekutina","18"),
    "jbl": new Recip("skill/special/alc/PPP0/travicstvi.png","Jed Bolehlav","- MP",["Alchymista", "sp 23"],"ODO vs. 10","Způsobuje silnou migrénu a znemožňuje soustředění.","Migréna(-5)","30 sur","voda, bolehlav","2 * smena","15 * minuta","2 * smena","světle zelená tekutina","14"),
    "jps": new Recip("skill/special/alc/PPP0/travicstvi.png","Jed Post Scriptum","- MP",["Alchymista", "sp 23"],"ODO vs. 15","Dlouhodobá otrava způsobující denní ztrátu životů.","degenerace","50 sur","olovo","-","15 * minuta","10 * den","čirá vodnatá tekutina","13"),
    "jte": new Recip("skill/special/alc/PPP0/travicstvi.png","Jed Temnota","10 MP",["Alchymista", "sp 23"],"ODO vs. 13","Rychle způsobuje slepotu po pozření.","slepota","15 sur","voda, ptačí oko","2 * smena","1 * hodina","2 * smena","lehce růžová tekutina","14"),
    //alc medicus
    "prt": new Recip("class/med.png","Paralyzující tinktura","15 MP",["Medicus", "sp 6"],"ODO vs. 15","Po 10 kolech způsobí úplnou paralýzu při neúspěchu v hodu, při úspěchu jen závratě.","paralyza","25 sur","alkohol, kůže jedovaté žáby","-","5 * minuta","6 * hodina","světle hnědá hořká tekutina","17"),
    "tpb": new Recip("class/med.png","Tinktura proti bolesti","5 MP",["Medicus", "sp 6"],"-","Dočasně odstraní bolest; při častém užití se trvání zkracuje.","-","20 sur","alkohol, mák","-","5 * minuta","6 * hodina","černá hořká tekutina","15"),
    "usp": new Recip("class/med.png","Uspávací tinktura","15 MP",["Medicus", "sp 6"],"ODO vs. 10","Po 10 kolech uvede cíl do hlubokého spánku, při úspěchu vyvolává ospalost a zmatení.","spanek","30 sur","alkohol, byliny","-","5 * minuta","6 * hodina","čirá sladce vonící tekutina","15"),
    "knl": new Recip("class/med.png","Konzervační lák","10 MP",["Medicus", "sp 6"],"-","Chrání organické tkáně před rozkladem až na 2 roky.","-","20 sur","sůl, líh","-","1 * smena","2 * rok","slabě zelená tekutina","10"),
    "ell": new Recip("skill/special/alc/PPP1/infuze_a_inhalace.png","Elixír lásky","80 MP",["Alchymista", "sp 6", "sp 26"],"Vůle(INT) vs. 18","Při neúspěchu v hodu vyvolá nekritické zamilování do první bytosti, kterou cíl spatří.","-","30 sur","voda, žlutý lotos, med","1 * rok","1 * den","1 * den","hnědá po medu vonící tekutina","18"),
    "lbr": new Recip("skill/special/alc/PPP1/infuze_a_inhalace.png","Lektvar Berserkr","30 MP",["Alchymista", "sp 6", "sp 26"],"-","Vyvolá prudký adrenalin; může probudit z bezvědomí nebo dodat bojovou sílu, ale hrozí smrt při zneužití.","-","30 sur","alkohol, jedovaté houby","1 * týden","5 * minuta","5 * minuta","zlatavá skořicově vonící tekutina","18"),
    "pur": new Recip("skill/special/alc/PPP1/infuze_a_inhalace.png","Lektvar Purpurových řek","20 MP",["Alchymista", "sp 6", "sp 26"],"-","Cévy cíle se rozzáří a zjednoduší způsobení krvácivého zranění při hodu na útok.","-","20 sur","krev","1 * týden","1 * smena","1 * smena","rudá zlatě světélkující tekutina","17"),
    "zme": new Recip("skill/special/alc/PPP1/infuze_a_inhalace.png","Lektvar Změny osobnosti","30 MP",["Alchymista", "sp 6", "sp 26"],"Vůle(INT) vs. 15","Změní jeden charakterový rys postavy na jeho přesný opak po dobu trvání.","-","20 sur","alkohol","1 * týden","12 * hodina","12 * hodina","čirá kyselá tekutina","16"),
    "ser": new Recip("skill/special/alc/PPP1/infuze_a_inhalace.png","Sérum pravdy","40 MP",["Alchymista", "sp 6", "sp 26"],"Vůle(INT) vs. 15","Způsobí, že cíl nedokáže lhát a musí říkat pouze pravdu.","-","30 sur","alkohol","1 * týden","10 * kolo","10 * kolo","čirá pálivě chutnající tekutina","17"),
    "ukv": new Recip("skill/special/alc/PPP1/infuze_a_inhalace.png","Umělá krev","1 MP",["Alchymista", "sp 6", "sp 26"],"-","Slouží k transfuzi; odstraní ztrátu životů z krvácení a uzdraví navíc 1k10.","1k10","10 sur","krev","-","1 * smena","3 * den","rudá tekutina","17"),
    "bir": new Recip("skill/special/alc/PPP1/mechanicka_augmentace.png","Bio-rozhraní","50 MP",["Alchymista", "sp 27"],"-","Speciální tkáňový štěp umožňující připojení mechanické augmentace bez infekce či odmítnutí.","-","40 sur","tkáň, případně chrupavka","-","4 * smena","2 * rok","růžová prokrvená tkáň s jemnými cévkami","15"),
    "exo": new Recip("skill/special/alc/PPP1/mechanicka_augmentace.png","Exoskelet","100 MP",["Alchymista", "sp 27"],"-","Zvyšuje ZO o 3 body a umožňuje jeden útok navíc díky kovovým končetinám.","-","600 sur","silné kovové dráty","-","1 * týden","2 * rok","obrys kovové zbroje připevněný k tělu","16"),
    "mko": new Recip("skill/special/alc/PPP1/mechanicka_augmentace.png","Mechanické oko","80 MP",["Alchymista", "sp 27"],"-","Umožňuje noční vidění, tepelnou stopu a dohled jako elfí zrak.","-","20 sur","broušené čočky, kovová kolečka","-","2 * den","2 * rok","skleněná bulva v kovovém mechanismu","14"),
    "umn": new Recip("skill/special/alc/PPP1/mechanicka_augmentace.png","Umělá noha","300 MP",["Alchymista", "sp 27"],"-","Zvyšuje rychlost pohybu a skok na dvojnásobek běžné hodnoty.","-","300 sur","kovové dráty a pružiny","-","1 * týden","2 * rok","noha z pružných kovových plátů","15"),
    "ump": new Recip("skill/special/alc/PPP1/mechanicka_augmentace.png","Umělá paže","300 MP",["Alchymista", "sp 27"],"-","Zvyšuje sílu na hodnotu 26 (+8) a poskytuje jeden útok navíc.","-","300 sur","kovové dráty a pláty","-","1 * týden","2 * rok","paže z kovových plátů","14"),
    "kok": new Recip("skill/special/alc/PPP1/sesivanci.png","Kontrolní krystal","50 MP",["Alchymista", "sp 30"],"-","Primární krystal ovládá sešívance; sekundární se vkládají do těl tvorů.","-","10 sur","křišťál či drahokam","-","4 * smena","2 * rok","průhledný drahokam s jemným leskem","19"),
    "ses": new Recip("skill/special/alc/PPP1/sesivanci.png","Sešívanec","300 + 100 MP",["Medicus", "sp 30"],"Chirurgie(OBR) vs. X","Tvor složený z více těl, ovládaný krystalem; zachovává pouze základní instinkt a poslední příkaz.","-","100 + 100 sur","tělo živého tvora + části těl + krystal","1 * vylepseni","4 * hodina","2 * rok","monstrum sešité z více částí, s krystalem pod kůží","X Chirurgie"),
    "idm": new Recip("skill/special/alc/PPP1/tetovani.png","Inkoust doplňování many","50 MP",["Alchymista", "sp 6", "sp 31"],"-","Poskytuje 3 body many v každém kole po dobu trvání efektu.","-","10 sur","modrý lotus","-","1 * den","10 * kolo","modrý inkoust","20"),
    "ipl": new Recip("skill/special/alc/PPP1/tetovani.png","Inkoust průběžné léčby","50 MP",["Alchymista", "sp 6", "sp 31"],"-","Tetované bytosti léčí 4 životy v každém kole po dobu trvání.","4/kolo","10 sur","rudý lotus","-","1 * den","10 * kolo","rudý inkoust","20"),
    "ipd": new Recip("skill/special/alc/PPP1/tetovani.png","Inkoust protekce dračímu dechu","50 MP",["Alchymista", "sp 6", "sp 31"],"-","Zajišťuje imunitu proti všem druhům dračího dechu po celou dobu trvání.","imunita","10 sur","dračí zub","-","1 * den","1 * smena","šedý inkoust","20"),
    "ipf": new Recip("skill/special/alc/PPP1/tetovani.png","Inkoust protekce fyzických zranění","80 MP",["Alchymista", "sp 6", "sp 31"],"-","Způsobí, že je tetovaný imunní vůči fyzickému zranění.","imunita","20 sur","játra baziliška","-","1 * den","10 * kolo","šedý inkoust","20"),
    "ipm": new Recip("skill/special/alc/PPP1/tetovani.png","Inkoust protekce mrazu","20 MP",["Alchymista", "sp 6", "sp 31"],"-","Zajišťuje rezistenci proti chladu, mrazu i efektům zmražení.","rezistence","10 sur","pero fénixe","-","1 * den","1 * smena","šedý inkoust","16"),
    "ipo": new Recip("skill/special/alc/PPP1/tetovani.png","Inkoust protekce ohně","20 MP",["Alchymista", "sp 6", "sp 31"],"-","Zajišťuje rezistenci vůči zraněním způsobeným ohněm a žárem; vybavení může být stále zničeno.","rezistence","10 sur","voda ledovce","-","1 * den","1 * smena","šedý inkoust","16"),
    //alc pyroman
    "kag": new Recip("skill/special/alc/PPP2/kapsulacni_gemy.png","Kapsulační gem","30 + X MP",["Alchymista", "sp 5", "sp 32"],"Výroba svitků(OBR) vs 15 + X","Drahokam fungující jako baterie many nebo nosič kouzla sesílaného opakovaně podle množství vložené many.","-","X sur","drahokam","-","1 * smena","2 * rok","drahokam se zářivými rytými drážkami","X"),
    "kon": new Recip("skill/special/alc/PPP2/konstrukty.png","Konstrukt","X MP",["Alchymista", "sp 33"],"Mechanika(OBR) vs X","Mechanický služebník tvořený kovem, keramikou či kamenem; jeho funkce závisí na konstrukci, palivu a volitelných doplňcích.","-","X sur","kovová destička + materiál","-","X * jednotka","2 * rok","výtvor s kovovými klouby a vyleptanými drahami","X Mechanika"),
    "uns": new Recip("skill/special/alc/PPP2/konstrukty.png","Univerzální nosič","5 MP",["Alchymista", "sp 33"],"-","Nosný kovový rám k uchycení zbraní a zařízení na konstrukty nebo živé nositele.","-","30 sur","kovové pruty","-","1 * den","2 * rok","kovový nástavec s uchytnými body","15"),
    "chc": new Recip("skill/special/alc/PPP2/mistr_nestabilnich_substanci.png","Chrlič","70 MP",["Alchymista", "sp 7", "sp 34"],"-","Zařízení schopné metat různé nebezpečné náplně; s plameny zraňuje a může zapálit cíl.","1k10","130 sur","kovová trubice, skleněná nádoba","-","1 * den","2 * rok","kovová trubice s hadicí a zásobníkem","16"),
    "dpl": new Recip("skill/special/alc/PPP2/mistr_nestabilnich_substanci.png","Dusivý plyn","20 MP",["Alchymista", "sp 7", "sp 34"],"-","Po rozbití zaplní prostor plynem způsobujícím udušení podle pravidel utonutí.","uduseni","20 sur","uhlí","-","1 * smena","5 * kolo","černá ampule","15"),
    "lep": new Recip("skill/special/alc/PPP2/mistr_nestabilnich_substanci.png","Leptavý plyn","40 MP",["Alchymista", "sp 7", "sp 34"],"-","Poleptá cíl za 1k10 životů a trvale snižuje Charisma o 1 za kolo expozice.","1k10 + -1 CHA/ kolo","20 sur","ocet","-","1 * smena","5 * kolo","hnědá ampule","18"),
    "mrz": new Recip("skill/special/alc/PPP2/mistr_nestabilnich_substanci.png","Mrazivý plyn","40 MP",["Alchymista", "sp 7", "sp 34"],"-","Snižuje teplotu na –100 °C; působí 1k10 zranění a může zmrazit cíl úplně.","1k10 + zmrznutí","20 sur","led","-","1 * smena","5 * kolo","modrá ampule","18"),
    "sln": new Recip("skill/special/alc/PPP2/mistr_nestabilnich_substanci.png","Slzný plyn","- MP",["Alchymista", "sp 7", "sp 34"],"-","Silně dráždí oči a nos; cíl ztrácí zrak a má nevýhodu –5 na soustředění.","oslep.","20 sur","moč","-","1 * smena","5 * kolo","oranžová ampule","12"),
    "kul": new Recip("skill/special/alc/PPP2/palne_zbrane.png","Kule","- MP",["Alchymista", "sp 35"],"-","Základní střelivo – olověné nebo kovové kuličky určené pro palné zbraně.","-","2 sur","kovové slitky","10 * kulí","1 * smena","2 * rok","malé železné kuličky","12"),
    "nab": new Recip("skill/special/alc/PPP2/palne_zbrane.png","Náboj","- MP",["Alchymista", "sp 35"],"-","Sofistikovaná munice spojená s černým prachem; používá se do turétu i zbraní.","-","2 sur","kovové slitky a černý prach","5 * nábojů","1 * smena","2 * rok","malý kovový váleček","14"),
    "prc": new Recip("skill/special/alc/PPP2/palne_zbrane.png","Černý prach","- MP",["Alchymista", "sp 7", "sp 35"],"-","Vysoce hořlavý prach pro střelbu; natlakovaný okamžitě exploduje.","exploze","30 sur","uhlí","-","1 * hodina","2 * rok","váček černého prachu","15"),
    "pis": new Recip("skill/special/alc/PPP2/palne_zbrane.png","Pistole","40 MP",["Alchymista", "sp 35"],"-","Jednoranná zbraň vhodná pro krátkou vzdálenost; malé, ale děsivé účinky.","10 dmg","100 sur","železo","-","1 * den","2 * rok","malá jednoranná pistole","15"),
    "ruc": new Recip("skill/special/alc/PPP2/palne_zbrane.png","Ručnice","60 MP",["Alchymista", "sp 35"],"-","Střelba na střední vzdálenost; rozptyl střepin zasahuje více cílů.","15 dmg","130 sur","železo","-","1 * den","2 * rok","menší puška s opěrou pod loktem","18"),
    "hkc": new Recip("skill/special/alc/PPP2/palne_zbrane.png","Hákovnice","80 MP",["Alchymista", "sp 35"],"-","Velmi přesná puška se silným zpětným rázem; musí být při střelbě zaklesnutá.","20 dmg","150 sur","železo","-","3 * den","2 * rok","dlouhá puška s hákem pod hlavní","20"),
    "pde": new Recip("skill/special/alc/PPP2/palne_zbrane.png","Polní dělo","150 MP",["Alchymista", "sp 35"],"-","Těžká zbraň na kolech určená k ničení překážek či masivních cílů.","45 dmg","250 sur","železo","-","1 * týden","2 * rok","menší dělo na dvou kolech","22"),
    "tur": new Recip("skill/special/alc/PPP2/palne_zbrane.png","Turét","200 MP",["Alchymista", "sp 35"],"-","Automatická věž s rychlou palbou až 10 výstřelů za kolo do 300 sáhů.","1k6","400 sur","ozubená kola a řetěz","-","1 * den","2 * rok","otočná třínožka s hlavní","20"),
    "hrs": new Recip("skill/special/alc/PPP2/prace_s_energii.png","Hrací skříňka","30 + X MP",["Alchymista", "sp 36","Magické předměty"],"-","Melodie dokáže odemykat nebo zamykat běžné zámky během 5 kol.","-","30 sur","kovová destička a klika","-","1 * den","1 * rok","malá kovová krabička s klikou","15"),
    "kos": new Recip("skill/special/alc/PPP2/prace_s_energii.png","Kostka štěstí","40 + X MP",["Alchymista", "sp 36","Magické předměty"],"-","Hod kostkou náhodně přehází všechny vlastnosti postavy; efekt trvá, dokud má dodatečnou manu.","-","5 sur","dřevěná kostka","-","1 * den","1 * rok","malá dřevěná hrací kostka","17"),
    "prl": new Recip("skill/special/alc/PPP2/prace_s_energii.png","Paralyzér","50 + X MP",["Alchymista", "sp 36","Magické předměty"],"ODO vs. 10","Dotykový výboj ochromí cílovou bytost na 1k6 kol při neúspěchu v ověření.","1k6","50 sur","kovový drát","-","1 * den","2 * rok","kovový obušek s hrotem","17"),
    "ppr": new Recip("skill/special/alc/PPP2/prace_s_energii.png","Plášť proměn","50 + X MP",["Alchymista", "sp 36","Magické předměty"],"-","Mění vzhled svého materiálu — barvu, vzor i tvar dle přání nositele.","-","100 sur","spona a plátno","-","3 * den","2 * rok","plátno měnící barvu i strukturu","15"),
    "rep": new Recip("skill/special/alc/PPP2/prace_s_energii.png","Replikátor","100 + X MP",["Alchymista", "sp 36","Magické předměty"],"-","Vytváří přesné kopie předmětů do velikosti B; kopie jsou lehké a mají práškový povrch.","-","200 sur","živí pavouci, čočka","-","1 * den","2 * rok","kovová krabička s objektivem","18"),
    "dev": new Recip("skill/special/alc/PPP2/sapersky_vycvik.png","Detektor výbušnin","30 + X MP",["Alchymista", "sp 37"],"-","Odhaluje třaskavé látky v okruhu 20 sáhů; reaguje sílou zvuku dle blízkosti výbušniny.","detekce","80 sur","kovová obruč, krystal","1 * minuta","1 * den","2 * rok","tyč s kovovou obručí na konci","15"),
    "dep": new Recip("skill/special/alc/PPP2/sapersky_vycvik.png","Detektor pohybu","20 MP",["Alchymista", "sp 37"],"-","Dvojice „očí“ spustí impulz při přerušení linie vidění; lze spojit s pastmi či signály.","detekce","40 sur","2× skleněná čočka a krystaly","-","2 * smena","2 * rok","dvě malé skleněné oči","15"),
    "det": new Recip("skill/special/alc/PPP2/sapersky_vycvik.png","Detonátor","10 MP",["Alchymista", "sp 37"],"-","Odpaluje nálože na dálku pomocí kliky; drát o délce 100 sáhů lze nahradit novým.","exploze","20 + 10 sur","dlouhý drát","-","1 * smena","2 * rok","krabička s namotaným drátem","15"),
    "okr": new Recip("skill/special/alc/PPP2/sapersky_vycvik.png","Odpalovací krystal","20 MP",["Alchymista", "sp 37"],"-","Dálkově aktivuje bombu přes spárovaný krystal; spojení se přeruší výbuchem.","exploze","30 sur","2 krystaly, bomba","-","1 * smena","1 * rok","bomba s vsazeným krystalem","15"),
    "nap": new Recip("skill/special/alc/PPP2/sapersky_vycvik.png","Nášlapná past","20 MP",["Alchymista", "sp 37"],"-","Exploduje při tlaku nebo jeho uvolnění; způsobí 3k6 zranění, vyšší hodnoty amputují.","3k6","30 sur","železné střepy","-","1 * hodina","2 * rok","kovová placka připravená k nastražení","13"),
    "hmo": new Recip("skill/special/alc/PPP2/strely_a_rachejtle.png","Hmoždíř","- MP",["Alchymista", "sp 38"],"Mechanika(OBR) vs 10","Kovová trubice umožňující odpalovat rachejtle, světlice a ohňostroje; nožky nastavují odpalovací úhel.","-","45 sur","kovová trubice","-","1 * smena","2 * rok","kovová trubice s opěrnými nožkami","10"),
    "ler": new Recip("skill/special/alc/PPP2/strely_a_rachejtle.png","Lehká rachejtle","25 MP",["Alchymista", "sp 38"],"Pyromancie(OBR) vs 13","Balistická rachejtle do 500 sáhů; zápalná působí 2k6/sáh a hoří 5 kol, výbušná způsobí 6k6 v epicentru.","2k6 / 6k6","60 sur","hořlavá látka / černý prach","-","1 * hodina","2 * rok","asi 30 coulů dlouhá trubička se špičatou hlavicí","13"),
    "ohn": new Recip("skill/special/alc/PPP2/strely_a_rachejtle.png","Ohňostroj","5 MP",["Alchymista", "sp 38"],"Pyromancie(OBR) vs 11","Dekorační rachejtle tvořící světelné efekty; lze spojit do sekvence odpálení.","-","15 sur","hořlavá látka","-","1 * smena","1 * kolo","drobná trubička","11"),
    "ris": new Recip("skill/special/alc/PPP2/strely_a_rachejtle.png","Řízená střela","200 MP",["Alchymista", "sp 38"],"Pyromancie(OBR) vs 15/18","Naváděná střela řízená zrcadlem; zápalná působí 5k6/sáh a hoří 10 kol, výbušná způsobí 10k6.","5k6 / 10k6","200 sur","1× zrcadlo, 2× krystal","-","3 * hodina","2 * rok","půlmetrová trubice s křidélky","18"),
    "snt": new Recip("skill/special/alc/PPP2/strely_a_rachejtle.png","Střela naváděná na terč","120 MP",["Alchymista", "sp 38"],"Pyromancie(OBR) vs 12/17","Naváděná střela sledující světelný paprsek; zápalná 4k6/sáh, výbušná 10k6 v epicentru.","4k6 / 10k6","200 sur","3× optická čočka, zrcátko","-","2 * hodina","2 * rok","půlmetrová trubice s křidélky","17"),
    "sve": new Recip("skill/special/alc/PPP2/strely_a_rachejtle.png","Světlice","5 MP",["Alchymista", "sp 38"],"Pyromancie(OBR) vs 11","Osvítí prostor 300 sáhů jako denní světlo; viditelná na mnoho mil.","-","30 sur","hořlavá látka, plátno","-","1 * smena","10 * kolo","drobná trubička vydávající jasné světlo","11"),
    "ter": new Recip("skill/special/alc/PPP2/strely_a_rachejtle.png","Těžká rachejtle","50 MP",["Alchymista", "sp 38"],"Pyromancie(OBR) vs 15","Silná rachejtle s ničivým účinkem; výbušná vytváří rozsáhlejší kráter.","-","90 sur","hořlavá látka","-","1 * smena","2 * rok","velká trubice s masivní hlavicí","15"),
    //alc theurg
    "cht": new Recip("skill/special/alc/PPP3/ozivle_pomucky.png","Chodící truhla","500 MP",["Alchymista", "sp 43"],"-","Magická truhla na mnoha nohách následující svého majitele a chránící obsah před poškozením.","-","300 sur","cestovní truhla","-","7 * den","2 * rok","dřevěná truhla s více páry malých nožek","22"),
    "lel": new Recip("skill/special/alc/PPP3/ozivle_pomucky.png","Létající lucerna","100 MP",["Alchymista", "sp 43"],"-","Levitující lucerna vydávající světlo do 12 sáhů a pohybující se dle pokynů majitele.","-","100 sur","lucerna","-","3 * den","2 * rok","malá lucerna vznášející se ve vzduchu","18"),
    "mha": new Recip("skill/special/alc/PPP3/ozivle_pomucky.png","Mluvící hlava","80 MP",["Alchymista", "sp 43"],"-","Hlavička nebo lebka opakující slyšené zvuky, hlasy a umožňující zaznamenat poznámky.","-","35 sur","lebka nebo soška","-","5 * den","2 * rok","malá hlava se světélkujícími rty","16"),
    "obu": new Recip("skill/special/alc/PPP3/ozivle_pomucky.png","Oživlý obušek","150 MP",["Alchymista", "sp 43"],"-","Měkký obušek v pytli, který po slůvku vyskočí a samostatně útočí až 6× za kolo bez zabití cíle.","1 dmg","10 sur","látkový obušek v pytli","-","1 * den","2 * rok","měkký obušek se svinutým tělem","18"),
    "zib": new Recip("skill/special/alc/PPP3/ozivle_pomucky.png","Živoucí bomba","30 MP",["Alchymista", "sp 43"],"-","Železná koule s vědomím; při zapálení reaguje emotivně a po chvíli exploduje.","2k6+4","50 sur","železná koule, zápalná šňůra","-","1 * hodina","2 * rok","železná koule s krátkou zápalnou šňůrou","15"),
    "mpz": new Recip("skill/special/alc/PPP3/portaly_a_zrcadla.png","Mimoprostorové zrcadlo","1000 MP",["Alchymista", "sp 43"],"-","Umožňuje vstup do kapsového mimoprostoru, kde čas plyne odlišně a obsah nestárne.","-","1000 sur","velké zrcadlo","-","1 * měsíc","2 * rok","vysoké zrcadlo s mlžným povrchem","28"),
    "ptl": new Recip("skill/special/alc/PPP3/portaly_a_zrcadla.png","Portál","1500 + 500 MP",["Alchymista", "sp 43"],"-","Kamenný kruh propojený s runovým panelem umožňující přesun na velké vzdálenosti.","-","1000 sur","kamenný portál + 10 krystalů","-","3 * měsíc","2 * rok","kruhový portál s vyrytou soustavou run","30"),
    "vik": new Recip("skill/special/alc/PPP3/portaly_a_zrcadla.png","Vidoucí kameny","500 + 100 MP",["Alchymista", "sp 43"],"-","Dvojice kamenů přenášející obraz a zvuk mezi místy dle síly many a vůle uživatele.","-","300 sur","skleněné koule","-","1 * měsíc","2 * rok","dvě skleněné koule s mlžnou září","26"),
    "zrd": new Recip("skill/special/alc/PPP3/portaly_a_zrcadla.png","Zrcadlo duší","200 + X MP",["Alchymista", "sp 43"],"Vůle(INT) vs X","Dokáže uvěznit duši bytosti s inteligencí 1+ a držet ji, dokud zrcadlo není zničeno.","uvěznění","100 sur","zrcadlo","-","1 * týden","2 * rok","zrcadlo temně šedé barvy bez odrazu","22"),
    "dvm": new Recip("skill/special/alc/PPP3/prace_s_vichry_many.png","Detektor vichrů many","30 MP",["Alchymista", "sp 46"],"-","Amulet ukazující směr a sílu vichrů many v okruhu několika mil; hodnoty 10–10000 m/h.","-","50 sur","kovový amulet se střelkami","-","1 * den","2 * rok","kruhový amulet se dvěma jemnými ručkami","15"),
    "mfl": new Recip("skill/special/alc/PPP3/prace_s_vichry_many.png","Manafiltr","- MP",["Alchymista", "sp 46"],"-","Filtruje volnou manu ze vzduchu do vody; vytváří vázanou manu v poměru 1/100 síly vichru.","-","50 sur","kovový trychtýř, voda","-","3 * hodina","2 * rok","kovový trychtýř s jemnou sítí","14"),
    "mgr": new Recip("skill/special/alc/PPP3/prace_s_vichry_many.png","Managenerátor","- MP",["Alchymista", "sp 46"],"-","Přístroj, který z okolních vichrů many generuje energii a dobíjí zařízení až 250 bodů many za hodinu.","-","80 sur","kovová skříň","-","1 * den","2 * rok","kovová skříň s runami a ventilačními štěrbinami","18"),
    "mat": new Recip("skill/special/alc/PPP3/prace_s_vichry_many.png","Manatransformátor","- MP",["Alchymista", "sp 46"],"-","Proměňuje volnou a vázanou manu oběma směry v poměru 10:1 a funguje jako zásobník.","-","120 sur","krystalická koule","-","1 * den","2 * rok","koule se soustavou rytých krystalů","20"),
    "act": new Recip("skill/special/alc/PPP3/talismany.png","Achátový talisman","100- MP",["Alchymista", "sp 47"],"-","Léčí drobná zranění; přiložením uzdraví 1k6+4 a odsaje 5 many.","1k6+4","X sur","achát","-","1 * den","2 * rok","drobný achátový přívěsek","17"),
    "akt": new Recip("skill/special/alc/PPP3/talismany.png","Akvamarínový talisman","365- MP",["Alchymista", "sp 47"],"-","Ochrana před vodním živlem; poloviční zranění voda/led a +5 k Plavání.","rezistence","X sur","akvamarín","-","7 * den","1 * rok","modrý šestihranný kámen","15"),
    "amt": new Recip("skill/special/alc/PPP3/talismany.png","Ametystový talisman","200- MP",["Alchymista", "sp 47"],"-","Ochrana před zloději; zloděj má při pokusu o krádež postih -5.","protekce","X sur","ametyst","-","3 * den","2 * rok","temně fialový ametyst","15"),
    "cit": new Recip("skill/special/alc/PPP3/talismany.png","Citrínový talisman","400- MP",["Alchymista", "sp 47"],"-","Uklidňuje zvěř; zvířata nenapadnou nositele, pokud jim neublíží.","protekce","X sur","citrín","-","3 * den","2 * rok","žlutý citrín s teplým leskem","15"),
    "dit": new Recip("skill/special/alc/PPP3/talismany.png","Diamantový talisman","1000- MP",["Alchymista", "sp 47"],"-","Zastavuje stárnutí; denně spotřebuje 4 many, maximálně 1000 many.","nestarnuti","X sur","diamant","-","7 * den","1 * rok","čirý diamantový fragment","17"),
    "grt": new Recip("skill/special/alc/PPP3/talismany.png","Granátový talisman","100- MP",["Alchymista", "sp 47"],"-","Ochrana proti jedům; +5 k hodu proti jedu; aktivace stojí 10 many.","protijed","X sur","granát","-","1 * den","2 * rok","tmavě červený granát","15"),
    "jat": new Recip("skill/special/alc/PPP3/talismany.png","Jaspisový talisman","365- MP",["Alchymista", "sp 47"],"-","Chrání před panikou, strachem a šílenstvím; poskytuje psychickou stabilitu.","odolnost","X sur","jaspis","-","12 * hodina","1 * rok","oranžovo-hnědý jaspis","15"),
    "krt": new Recip("skill/special/alc/PPP3/talismany.png","Křišťálový talisman","200- MP",["Alchymista", "sp 47"],"-","Posiluje soustředění, +5 k Vůli; poloviční režijní čas pro meditaci a obnovu many.","+5 vule","X sur","křišťál","-","3 * den","50 * den","čirý křišťál se světelným lomem","17"),
    "lat": new Recip("skill/special/alc/PPP3/talismany.png","Lazuritový talisman","200- MP",["Alchymista", "sp 47"],"-","Léčí popáleniny ohněm, kyselinou nebo mrazem; 1k6+4 a odsaje 5 many.","1k6+4","X sur","lazurit","-","6 * hodina","2 * rok","tmavě modrý lazurit","16"),
    "olt": new Recip("skill/special/alc/PPP3/talismany.png","Opálový talisman","400- MP",["Alchymista", "sp 47"],"-","Univerzální elementální protekce; poloviční zranění oheň/voda/vítr/země.","rezistence","X sur","opál","-","3 * den","1 * rok","duhový opál","18"),
    "rut": new Recip("skill/special/alc/PPP3/talismany.png","Rubínový talisman","1000- MP",["Alchymista", "sp 47"],"-","Zvyšuje maximální počet životů o úroveň a chrání před nemocemi.","+zivoty","X sur","rubín","-","7 * den","2 * rok","krvavě červený rubín","17"),
    "smt": new Recip("skill/special/alc/PPP3/talismany.png","Smaragdový talisman","1000- MP",["Alchymista", "sp 47"],"-","Zvyšuje maximální množství many o úroveň a posiluje duševní sílu.","+mana","X sur","smaragd","-","3 * den","2 * rok","zelený smaragd","18"),
    "tot": new Recip("skill/special/alc/PPP3/talismany.png","Topazový talisman","300- MP",["Alchymista", "sp 47"],"-","Chrání před odsátím úrovně nemrtvými; každá ochrana odsaje 50 many.","protekce","X sur","topaz","-","7 * den","2 * rok","zlatý topaz","17"),
    "kat": new Recip("skill/special/alc/PPP3/talismany.png","Krajinný talisman","X- MP",["Alchymista", "sp 47"],"-","Přizpůsobuje tělo krajinným podmínkám (hory, poušť, tundra) dle výběru.","odolnost","X sur","kámen krajiny","-","X * den","2 * rok","kámen s texturou krajiny","X"),
    "pot": new Recip("skill/special/alc/PPP3/talismany.png","Podzemní talisman","X- MP",["Alchymista", "sp 47"],"-","Přizpůsobuje tělo prostředí v hlubinách — temnota, tlak, vzduch.","odolnost","X sur","kámen podzemí","-","X * den","2 * rok","tmavý kámen s matovou strukturou","X"),
    //kou
    "mtr": new SpellA("spell.png", "Magický trik", "1 MP", ["Kouzelník", "sk 400"], 0, "Iluze ve vzduchu, zvuky, obrázky, změna chuti/barvy", 0, 1 * kolo, "ihned/záleží", "4+lvl sáhů", "1 objekt", 0),
    "bza": new SpellW("skill/special/kou/ochranna_magie.png", "Bertolduv zámek", "1+X MP", ["Kouzelník", "sk 400"], "Atletika(SIL) vs dveře+X", "Zamkne a zvyšuje odolnost dveří, oken, brány, truhly, ... i bez zámku", 0, 2 * kolo, 1 * hodina, "dotek", "1 otevíratelný objekt", "6"),
    "ble": new SpellW("skill/special/kou/divoka_magie.png", "Blesk", "1+2X MP", ["Kouzelník", "sk 400"], 0, "Výboj energie", "Xk6 magické", pul, 0, "20 sáhů", "1 tvor", "4+2X"),
    "kuk": new SpellW("skill/special/kou/magie_promen.png", "Kukátko", "2 MP", ["Kouzelník", "sk 400"], 0, "Prohlédne přes pevnou překážku", 0, 1 * kolo, 1 * minuta, "dotek", "zeď/dveře 1x1x1 sáh", "6"),
    "lev": new SpellW("skill/special/kou/vysoka_magie.png", "Levitace", "4+X MP", ["Kouzelník", "sk 400"], 0, "Levitace nad zemí předmětů/tvorů do hmotnosti 100 +20*X lb", 0, 1 * kolo, 1 * smena, "dotek", "1 tvor/předmět", "6"),
    "mst": new SpellW("skill/special/kou/divoka_magie.png", "Magická střela", "1+7*X MP", ["Kouzelník", "sk 400"], 0, "Výboj explodující energie proti magickým tvorům", "2k6 *X magické v rozsahu", 1 * kolo, 0, "100 sáhů", "mag.bystosti do 3+X*2 sáhů", "6+X*2"),
    "msi": new SpellW("skill/special/kou/ochranna_magie.png", "Magický štít", "1+XMP", ["Kouzelník", "sk 400"], 0, "Magická bariéra +5 ZO", 0, pul, "X", "dotek", "1 tvor", "6"),
    "npr": new SpellW("skill/special/kou/vysoka_magie.png", "Najdi předmět", "4 MP", ["Kouzelník", "sk 400"], 0, "Vycítí pozici hledaného předmětu", 0, 5 * kolo, 15 * kolo, "50 sáhů", "1 předmět", "6/11"),
    "nev": new SpellW("skill/special/kou/magie_promen.png", "Neviditelnost", "6 MP", ["Kouzelník", "sk 400"], 0, "Neviditelnost do vyprchání, promluvení, útoku, či náročnější akce", 0, 1 * kolo, 1 * smena, "50 sáhů", "1 tvor/předmět max C", "6"),
    "ozb": new SpellW("skill/special/kou/magie_promen.png", "Očaruj zbraň", "4 MP", ["Kouzelník", "sk 400"], 0, "Zbraň se stává magickou", 0, 2 * kolo, 1 * smena, "dotek", "1 zbraň", 6),
    "ohe": new SpellW("skill/special/kou/divoka_magie.png", "Oheň", "2 MP", ["Kouzelník", "sk 400"], 0, "Oheň magicky hořící v prostoru do zásahu živé tvory", "1-3 ohněm", 1 * kolo, 1 * smena, "10 sáhů", "-", "6"),
    "ryc": new SpellW("skill/special/kou/vitalni_magie.png", "Rychlost", "1+X MP", ["Kouzelník", "sk 400"], 0, "+1 útok/obrana +2 OČ/init/dovednosti(OBR) pohyblivost*2", 0, 1 * kolo, "X kol", "10 sáhů", "1 tvor", "6"),
    "svo": new SpellW("skill/special/kou/divoka_magie.png", "Světlo", "X MP", ["Kouzelník", "sk 400"], 0, "Drobná koule s jasným světlem vybrané barvy do 2*X sáhů", 0, 1 * kolo, 1 * hodina, "30 sáhů", "-", "6"),
    "tel": new SpellW("skill/special/kou/vysoka_magie.png", "Teleport", "4 MP", ["Kouzelník", "sk 400"], 0, "Přesun jednoho tvora do vel C max na 60 sáhů", 0, 1 * kolo, 0, "dotek", "1 tvor", "6"),
    //kou skills
    "amb": new SpellW("skill/special/kou/ochranna_magie.png", "Antimagická bariéra", "3 + X MP", ["Kouzelník", "sp 7"], 0, "Aura chrání kouzelníka dle dodané many. Cizí cílené kouzla odčerpaji svou cenu, plošné 1/4 své ceny.", 0, pul, 2 * hodina, "–", "kouzelník", "10"),
    "ber": new SpellW("skill/special/kou/divoka_magie.png", "Beranidlo", "dle cíle (viz tabulka) MP", ["Kouzelník", "sp 6"], "Sesílání kouzel (INT) vs. Atletika (SIL) cíle (pro úhyb)", "Průrazná vlna do překážky (dveře/stěna); tvory odhodí/povalí (neubližuje).", 0, 2 * kolo, 0, "10 sáhů", "1 překážka", "8"),
    "brc": new SpellW("skill/special/kou/mentalni_magie.png", "Břichomluvectví", "3 MP za 10 sáhů", ["Kouzelník", "sp 10"], "Vůle (CHAR) kouzelníka vs. Vůle (CHAR) cílů", "Vkládá zvuky/hlas do vybraného místa v dosahu; slyší je jen živí inteligentní tvorové (lze měnit zdroj přidáním 1 MP).", 0, 1 * kolo, 1 * smena, "dle dodané many", "koule o poloměru dle many", "6"),
    "ciz": new SpellW("skill/special/kou/vysoka_magie.png", "Cizí jazyk", "9 MP", ["Kouzelník", "sp 11"], 0, "Sesilatel rozumí a mluví cizí řečí (neplatí na psaný text).", 0, 2 * kolo, 1 * smena, "–", "kouzelník", "8"),
    "dlr": new SpellW("skill/special/kou/magie_promen.png", "Dlouhá ruka", "2 MP", ["Kouzelník", "sp 8"], 0, "Ruka se protáhne až na 10 sáhů (plazí se po povrchu, neumí útočit; lze brát věci, odemykat, spouštět pasti).", 0, 3 * kolo, 15 * kolo, "–", "kouzelník", "8"),
    "dou": new SpellW("skill/special/kou/vitalni_magie.png", "Dotek upíra", "5 MP", ["Kouzelník", "sp 9"], 0, "Při zásahu vysaje 1k6 životů a polovinu si kouzelník hned přidá (jen na živé).", "1k6 (polovina léčí sesilatele)", 1 * kolo, 5 * kolo, "–", "kouzelník", "10"),
    "dvo": new SpellW("skill/special/kou/mentalni_magie.png", "Dvojník", "3 MP za směnu", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Vsugeruje dokonalou mentální iluzi tvora; nehmotná, vyžaduje soustředění.", 0, 1 * kolo, 1 * smena, "100 sáhů", "kruh o poloměru 10 sáhů", "8"),
    "let": new SpellW("skill/special/kou/vysoka_magie.png", "Leť", "1 MP za 2 kola", ["Kouzelník", "sp 11"], 0, "Cíl umí létat (max ~30 sáhů/kolo), ale musí se soustředit a nemůže dělat jiné akce.", 0, 2 * kolo, "dle dodané many", "dotek", "1 tvor", "8"),
    "mgz": new SpellW("skill/special/kou/ochranna_magie.png", "Magická zbroj", "3 + X MP", ["Kouzelník", "sp 7"], 0, "Neviditelná aura zvyšuje ZO: za každé +4 MP navíc +1 k obraně (kombinovatelná se zbrojí/kouzly).", 0, pul, 1 * smena, "dotek", "1 tvor", "8"),
    "met": new SpellW("skill/special/kou/magie_promen.png", "Metamorfóza", "6 MP", ["Kouzelník", "sp 8"], 0, "Promění sesilatele v živou bytost podobné velikosti; přebírá fyzické rysy a nemagické přirozené schopnosti.", 0, 2 * kolo, 1 * smena, "40 sáhů", "kouzelník", "10"),
    "mlh": new SpellW("skill/special/kou/magie_promen.png", "Mlha", "1 MP za 10 sáhů poloměru", ["Kouzelník", "sp 8"], 0, "Hustá nejedovatá mlha, viditelnost v ní max 2 sáhy; může se vázat na místo nebo se sesilatelem.", 0, 2 * kolo, 1 * smena, "30 sáhů", "kruh o poloměru dle many", "8"),
    "mrs": new SpellW("skill/special/kou/divoka_magie.png", "Mrazivá střela", "7 MP za první, 6 MP za každou další", ["Kouzelník", "sp 6"], 0, "Ledová střela vybuchne do krystalů; více střel v kole se spojí (větší rozsah i zranění).", "2k10 (plošně)", 1 * kolo, 0, "120 sáhů", "koule o poloměru 5 sáhů (+2/s další)", "8 (+2/každá další)"),
    "nkj": new SpellW("skill/special/kou/vysoka_magie.png", "Najdi kouzla", "3 MP", ["Kouzelník", "sp 11"], 0, "Zviditelní magická rezidua a aktivní kouzla v okolí (identifikace přesná jen pro známá kouzla).", 0, 3 * kolo, 10 * kolo, "–", "magická rezidua v okruhu 30 sáhů", "8"),
    "npo": new SpellW("skill/special/kou/ochranna_magie.png", "Naruš pozornost", "4 + X MP", ["Kouzelník", "sp 7"], 0, "Bolest hlavy, pískot v uších; +5 k obtížnosti akcí vyžadujících soustředění (lze dál zvyšovat za MP navíc).", 0, pul, 1 * kolo, "40 sáhů", "1 tvor", "8"),
    "noc": new SpellW("skill/special/kou/mentalni_magie.png", "Noční můra", "4 MP", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Postihuje spánek děsy; po probuzení se léčí jen 1 Ž, opakování přidává únavu a ztráty Ž.", 0, 5 * kolo, 1 * hodina, "30 sáhů", "1 tvor", "10"),
    "ohc": new SpellW("skill/special/kou/divoka_magie.png", "Ohnivá čepel", "5 MP", ["Kouzelník", "sp 6"], 0, "Čepel planoucí magickým ohněm; každý zásah +1–3 Ž (1k6/2), může zapalovat.", "+1–3 k zásahu (1k6/2)", 1 * kolo, 10 * kolo, "dotek", "1 zbraň", "8"),
    "ohk": new SpellW("skill/special/kou/divoka_magie.png", "Ohnivá koule", "5 MP za každou kouli", ["Kouzelník", "sp 6"], 0, "Letící plamenná koule exploduje; více koulí v kole se spojí (větší rozsah i zranění), zapaluje hořlaviny.", "2k6 (plošně)", 1 * kolo, 0, "60 sáhů", "koule o poloměru 5 sáhů (+2/s další)", "10 (+2/každá další)"),
    "osr": new SpellW("skill/special/kou/ochranna_magie.png", "Ochrana před střelami", "3 + X MP", ["Kouzelník", "sp 7"], 0, "Kupole zastavuje rychlé střely; každá střela odčerpá z dodatečné many (nelze střílet ven, magie prochází).", 0, pul, 2 * hodina, "dotek", "koule kolem cíle, r=2 sáhy", "8"),
    "och": new SpellW("skill/special/kou/mentalni_magie.png", "Ochromení", "3× úroveň cíle MP", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Paralyzuje cíl (strnulý, nemůže mluvit/mrkat); vyžaduje soustředění sesilatele.", 0, 1 * kolo, 1 * smena, "30 sáhů", "1 tvor", "12"),
    "okz": new SpellW("skill/special/kou/vysoka_magie.png", "Oko zření", "8 MP", ["Kouzelník", "sp 11"], 0, "Sesilatel vidí neviditelné tvory/předměty; mají pro něj slabou zářící auru.", 0, 2 * kolo, 1 * smena, "–", "kouzelník", "10"),
    "plr": new SpellW("skill/special/kou/divoka_magie.png", "Plamenné ruce", "4 MP", ["Kouzelník", "sp 6"], 0, "Z rukou šlehají plameny (šířka ~30 coulů, dosah 2 sáhy); při útoku celé kolo 1k6 Ž a snadno zapaluje.", "1k6", 1 * kolo, 3 * kolo, "2 sáhy", "kouzelník", "8"),
    "pve": new SpellW("skill/special/kou/divoka_magie.png", "Poryv větru", "2 MP", ["Kouzelník", "sp 6"], 0, "Náhlý poryv větru (typicky nepohne >5 lb); pás 1 sáh × 10 sáhů.", 0, 1 * kolo, 1 * kolo, "50 sáhů", "pás 1×10 sáhů", "8"),
    "pos": new SpellW("skill/special/kou/vitalni_magie.png", "Posílení smyslu", "2 MP", ["Kouzelník", "sp 9"], 0, "Zvýší citlivost vybraného smyslu (zrak/sluch/čich/hmat/chuť); dává Výhodu (+5) na hody s tímto smyslem.", 0, 1 * kolo, 1 * smena, "dotek", "1 tvor", "8"),
    "pzl": new SpellW("skill/special/kou/vitalni_magie.png", "Pouto života", "3 MP za kolo", ["Kouzelník", "sp 9"], 0, "Sdílí zranění mezi cílem a sesilatelem (rovnoměrně). Vyžaduje soustředění; vyrušení/bezvědomí ruší efekt.", 0, pul, "dle dodané many", "20 sáhů", "1 tvor", "12"),
    "ptp": new SpellW("skill/special/kou/magie_promen.png", "Protoplazma", "4 MP", ["Kouzelník", "sp 8"], "Sesílání kouzel (INT) vs. Reflex", "Lepivý sliz omezuje pohyb (poloviční rychlost, Nevýhoda -5 na obratnostní akce/obranu/iniciativu/kouzlení); do velikosti C.", 0, 1 * kolo, 4 * kolo, "15 sáhů", "1 tvor", "10"),
    "prn": new SpellW("skill/special/kou/vitalni_magie.png", "Přivolej nemrtvé", "4 MP", ["Kouzelník", "sp 9"], 0, "Vábí nemrtvé v širokém okolí na vybrané místo (ignorují bojující; inteligentní s podezřením mohou odolat).", 0, 1 * kolo, 0, "100 sáhů", "kruh o poloměru 50 sáhů", "12"),
    "rkz": new SpellW("skill/special/kou/ochranna_magie.png", "Rozptyl kouzlo", "3 + X MP (X = cena rušeného kouzla)", ["Kouzelník", "sp 7"], "Sesílání kouzel (INT) vs. obtížnost rušeného kouzla", "Zruší cizí kouzlo, pokud je vloženo dost MP a padne hod přes obtížnost původního kouzla.", 0, 3 * kolo, 0, "10 sáhů", "1 kouzlo", "dle cíle"),
    "sch": new SpellW("skill/special/kou/ochranna_magie.png", "Schránka", "2 MP", ["Kouzelník", "sp 7"], 0, "Černá neprůhledná aura hermeticky chrání předmět velikosti hlávky zelí; nelze ji otevřít dřív.", 0, 1 * kolo, 1 * hodina, "dotek", "1 předmět (vel. hlávky zelí)", "10"),
    "sug": new SpellW("skill/special/kou/mentalni_magie.png", "Sugesce", "3 + úroveň cíle MP", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Vsugeruje cítění/pocit (hlad, vztek, bolest atd.).", 0, 2 * kolo, 2 * smena, "30 sáhů", "1 tvor", "10"),
    "tad": new SpellW("skill/special/kou/magie_promen.png", "Tajemné dveře (Porta Arcánum)", "5 MP", ["Kouzelník", "sp 8"], 0, "Dveře vypadají jako stěna a dočasně se chovají jako skutečná zeď; nejdou otevřít/odemknout.", 0, 1 * kolo, 10 * kolo, "10 sáhů", "1 dveře", "10"),
    "tlk": new SpellW("skill/special/kou/vysoka_magie.png", "Telekineze", "3 MP za libru", ["Kouzelník", "sp 11"], 0, "Na dálku pohybuje jedním viděným předmětem (rychlost 6 sáhů/kolo); přímé držení předmětu kouzlo nepřetlačí.", 0, 1 * kolo, 6 * kolo, "30 sáhů", "1 předmět", "8"),
    "tem": new SpellW("skill/special/kou/magie_promen.png", "Temnota", "1 MP za 2 sáhy poloměru (2× cena = viditelnost uvnitř)", ["Kouzelník", "sp 8"], 0, "Prostor uvnitř je neproniknutelně tmavý (ruší i noční vidění); lze vázat na místo nebo na sesilatele.", 0, 1 * kolo, 10 * kolo, "30 sáhů", "koule o poloměru dle many", "8"),
    "tic": new SpellW("skill/special/kou/vysoka_magie.png", "Ticho", "2 MP za sáh poloměru (2× cena = slyší se uvnitř)", ["Kouzelník", "sp 11"], 0, "V oblasti je absolutní ticho (uvnitř neslyší nic; zvenku dovnitř slyšet je). Lze navázat na sesilatele.", 0, 1 * kolo, 1 * hodina, "20 sáhů", "koule o poloměru dle many", "8"),
    "vtr": new SpellW("skill/special/kou/vitalni_magie.png", "Vitální transfer (Trans Vitális)", "1 + X MP", ["Kouzelník", "sp 9"], 0, "Sesilatel přenáší své životy do cíle (za každý MP navíc si 1 Ž odečte a cíl 1 Ž získá; max polovina vlastního maxima).", "léčí: X (za cenu vlastních Ž)", 2 * kolo, 0, "dotek", "1 tvor", "8"),
    "viz": new SpellW("skill/special/kou/mentalni_magie.png", "Vize", "3 MP za každých 5 minut", ["Kouzelník", "sp 10"], "Vůle (CHAR) vs. Vůle", "Vsugeruje obraz/scénu, kterou cíl vidí jako skutečnou (i místa, která sesilatel nezná).", 0, 2 * kolo, "dle dodané many", "100 sáhů", "1 tvor", "10"),
    "voo": new SpellW("skill/special/kou/vitalni_magie.png", "Voodoo", "5 MP (10 MP bez figurky s částí těla)", ["Kouzelník", "sp 9"], "Vůle (CHAR) vs. Vůle", "Po přípravě a úspěchu způsobuje bodnutí do figurky nesnesitelnou bolest a dočasné postihy v odpovídající části těla.", 0, "2 kola (+5 minut příprava)", 4 * kolo, "40 sáhů", "1 tvor", "12"),
    //kou lv6+ divoka
    "bsl": new SpellA("skill/special/kou/divoka_magie.png", "Bleskový šíp", "5", ["Kouzelník", "lv 6", "sp 6"], "", "Očaruje až deset projektilů, které rychle a přesně míří na cíle. Mají vyšší dostřel i přesnost a při zásahu způsobují lehké magické poškození.", "1", 1 * kolo, 1 * smena, "dotek", "10 projektilů", "12"),
    "eos": new SpellA("skill/special/kou/divoka_magie.png", "Éterické ostří", "10", ["Bojový mág", "sp 6"], "", "Zbraň získá bílé éterické ostří prostupující běžnými materiály. Ignoruje nemagické zbroje a způsobuje krvácivé rány při každém zásahu.", "1k6/ kolo", 1 * kolo, 1 * minuta, "dotek", "1 zbraň", "14"),
    "kas": new SpellA("skill/special/kou/divoka_magie.png", "Kamenná sprcha", "8 za střelu", ["Kouzelník", "lv 6", "sp 6"], "", "Sesilatel vytvoří prudkou střelu z kamenných úlomků. Každá způsobí výrazné fyzické poškození a může mířit na samostatný cíl.", "2k10", 1 * kolo, "ihned", "50 sáhů", "dle počtu střel", "14 (+3 za každou navíc)"),
    "kum": new SpellA("skill/special/kou/divoka_magie.png", "Kužel mrazu", "12", ["Bojový mág", "sp 6"], "Ověření: Reflex (OBR) vs. Sesílání (INT)", "Mrazivá vlna zasáhne oblast před mágem, zpomaluje protivníky a způsobuje silné ledové poškození. Částečný úspěch zmírňuje účinek.", "3k10", 1 * kolo, "ihned", "10 sáhů", "cíle v kuželu", "13"),
    "obe": new SpellA("skill/special/kou/divoka_magie.png", "Ohnivá bouře", "50", ["Bojový mág", "sp 6"], "", "Vysoko se objeví černý mračno, ze kterého prší spalující oheň. Mág může mrak přesouvat a zasahovat velké oblasti kontinuálním žárem.", "1k6 za sáh", 4 * kolo, 1 * smena, "100 sáhů", "mračno 10 sáhů", "21"),
    "ohs": new SpellA("skill/special/kou/divoka_magie.png", "Ohnivá stěna", "30", ["Kouzelník", "lv 6", "sp 6"], "", "Vztyčí mocnou stěnu plamenů, která pálí tvory poblíž a při průchodu způsobuje těžké popáleniny. Tvar i velikost určuje sesilatel.", "5k6", 1 * kolo, 1 * smena, "30 sáhů", "ohnivá stěna", "22"),
    "ozi": new SpellA("skill/special/kou/divoka_magie.png", "Ochrana před živlem", "10", ["Bojový mág", "sp 6"], "", "Chrání cíl před útoky zvoleného živlu. Uděluje rezistenci proti jeho poškození a zlepšuje šance překonat jeho účinky.", "", 1 * kolo, 1 * hodina, "dotek", "1 cíl", "16"),
    "raz": new SpellA("skill/special/kou/divoka_magie.png", "Rázová vlna", "2 za sáh", ["Kouzelník", "lv 6", "sp 6"], "Ověření: Sesílání (INT) vs. Atletika (SIL)", "Silný magický úder vytvoří tlakovou vlnu, která odhazuje tvory a poráží je k zemi. Zasahuje i volné předměty v prostoru.", "", pul, "ihned", "dotek", "plocha dle many", "11 (+1 za každý sáh)"),
    "ret": new SpellA("skill/special/kou/divoka_magie.png", "Řetězový blesk", "20", ["Kouzelník", "lv 6", "sp 6"], "", "Seslaný blesk přeskočí až mezi sedm tvorů v blízkosti, každého zasáhne jednou a způsobí výrazné elektrické poškození.", "5k6", pul, 1 * kolo, "20 sáhů", "až 7 tvorů", "21"),
    "sim": new SpellA("skill/special/kou/divoka_magie.png", "Síla many", "7 za hodinu", ["Kouzelník", "lv 6", "sp 6"], "", "Magický vítr tlačí předměty, tvory i překážky zvoleným směrem. Sesilatel může proud zesilovat nebo měnit jeho směr soustředěním.", "", 1 * kolo, "dle many", "dotek", "1 cíl", "16"),
    "trz": new SpellA("skill/special/kou/divoka_magie.png", "Třpytivá zář", "20", ["Kouzelník", "lv 6", "sp 6"], "Ověření: Sesílání (INT) vs. Reflex (OBR)", "Silný oslepující záblesk zasáhne velikou oblast. Ti, kteří neuspějí v obraně, jsou na několik kol oslepeni.", "", 1 * kolo, 1 * kolo, "60 sáhů", "kruh nebo výseč", "22"),
    "uha": new SpellA("skill/special/kou/divoka_magie.png", "Uhas", "5 + (1 × za 10 sáhů²)", ["Kouzelník", "lv 6", "sp 6"], "", "Chladná mlha vysaje z ohně sílu a rychle jej uhasí. Je účinná i na rozsáhlé požáry a nebrání běžnému pohybu sesilatele.", "", 1 * kolo, "dle many a rozsahu", "50 sáhů", "oblast dle many", "14"),
    "vez": new SpellA("skill/special/kou/divoka_magie.png", "Vězení", "10", ["Kouzelník", "lv 6", "sp 6"], "Ověření: Sesílání (INT) vs. Atletika (SIL)", "Okolo cíle se vytvoří ledová klec, která jej uvězní. Tvory s drtivými zbraněmi se snáz probíjí ven.", "", 1 * kolo, 4 * kolo, "100 sáhů", "1 tvor", "19"),
    "vov": new SpellA("skill/special/kou/divoka_magie.png", "Vodní vlna", "16", ["Bojový mág", "sp 6"], "Ověření: Sesílání (INT) vs. Atletika (SIL)", "Mocná masa vody udeří vpřed. Zraňuje a odhazuje napadené tvory a zanechává za sebou nestabilní bahnitý terén.", "2k6+3", 2 * kolo, 1 * kolo, "15 sáhů", "oblast 5×15 sáhů", "18"),
    "vyh": new SpellA("skill/special/kou/divoka_magie.png", "Výheň", "5 (zbraň) / 10 (zbroj)", ["Kouzelník", "lv 6", "sp 6"], "Ověření: Výdrž (ODO) vs. Sesílání (INT)", "Rozžhaví kovový předmět na extrémní teplotu. Držení způsobuje popáleniny a znemožňuje efektivní manipulaci.", "1k6", 1 * kolo, 3 * kolo, "20 sáhů", "1 kovový předmět", "15"),
    "zlb": new SpellA("skill/special/kou/divoka_magie.png", "Živlobomba", "4 za velikost", ["Kouzelník", "lv 6", "sp 6"], "Ověření: Sesílání (INT) vs. dovednost cíle", "Koule koncentrovaného živlu po zásahu exploduje a zasáhne oblast účinkem zvoleného elementu. Je velmi nestabilní.", "1k10 (+1k10 za zvětšení)", 1 * kolo, 1 * hodina, "—", "1 bomba", "12 (+3 za zvětšení)"),
    //kou lv6+ ochranna
    "abu": new SpellA("skill/special/kou/ochranna_magie.png", "Antimagická bublina", "10", ["Kouzelník", "lv 6", "sp 7"], "Ověření: Sesílání kouzel (INT) vs. Sesílání kouzel (INT) / Reflex (OBR)", "Vytvoří ochranný štít, který dokáže zrušit nebo zastavit účinky cizího kouzla či magického útoku mířeného na sesilatele.", "", "1 * pul", "1 * kolo", "dotek", "1 kouzlo", "16"),
    "gra": new SpellA("skill/special/kou/ochranna_magie.png", "Gravitační pole", "3 za sáh poloměru", ["Kouzelník", "lv 6", "sp 7"], "Ověření: Sesílání (INT) vs. Atletika (SIL)", "Neviditelné pole odpuzuje nebo přitahuje tvory v oblasti. Síla efektu je určena úspěchem ověření a vloženou manou.", "", "1 * kolo", "1 * smena", "50 sáhů", "koule dle many", "19"),
    "jiz": new SpellA("skill/special/kou/ochranna_magie.png", "Jiskřící zbroj", "2 za kolo", ["Bojový mág", "sp 7"], "", "Energetické pole jiskří kolem cíle a trestá útočníky zblízka magickým výbojem. Uživatel je tak chráněn proti blízkým útokům.", "1k6", 1 * kolo, "dle many", "dotek", "1 cíl", "16"),
    "kam": new SpellA("skill/special/kou/ochranna_magie.png", "Kamenná kůže", "2 za kolo", ["Bojový mág", "sp 7"], "", "Na těle cíle se vytvoří magická kamenná vrstva, která výrazně zvyšuje fyzickou odolnost a poskytuje rezistenci vůči zranění.", "", 1 * kolo, "dle many", "dotek", "1 tvor", "17"),
    "mgb": new SpellA("skill/special/kou/ochranna_magie.png", "Magický blok", "12", ["Bojový mág", "sp 7"], "Ověření: Atletika (SIL) vs. Sesílání (INT)", "Kolem cíle vznikne magická aura, která odráží útoky zblízka. Po úspěšném odrazu tří útoků efekt zmizí.", "", 1 * pul, 10 * kolo, "dotek", "1 tvor", "14"),
    "mok": new SpellA("skill/special/kou/ochranna_magie.png", "Malé ochranné kouzlo", "3 za hodinu", ["Kouzelník", "lv 6", "sp 7"], "", "Ochranné zaklínadlo poskytuje výhodu při vyhýbání se drobným nehodám a zvyšuje základní obranu sesilatele.", "", 1 * kolo, "dle many", "dotek", "kouzelník", "7"),
    "nvz": new SpellA("skill/special/kou/ochranna_magie.png", "Neviditelná zeď", "3 za sáh", ["Bojový mág", "sp 7"], "Ověření: Postřeh (INT) vs. Sesílání (INT), Atletika (SIL) vs. Sesílání (INT)", "Neviditelná bariéra zpevněného vzduchu blokuje pohyb. Je obtížné ji objevit i prorazit a zpomaluje akce skrz ni.", "", 1 * pul, 5 * kolo, "20 sáhů", "dle many", "19"),
    "nez": new SpellA("skill/special/kou/ochranna_magie.png", "Nezničitelnost", "15", ["Bojový mág", "sp 7"], "", "Sesilatele po omezenou dobu nezasáhne žádné zranění. Úplná ochrana trvá krátký okamžik a neguje jakýkoli útok.", "", 1 * pul, 1 * kolo, "—", "kouzelník", "21"),
    "ods": new SpellA("skill/special/kou/ochranna_magie.png", "Odpuzující štít", "10", ["Kouzelník", "lv 6", "sp 7"], "Ověření: Atletika (SIL) obránce vs. Atletika (SIL) útočníka", "Očarovaný štít zvyšuje kvalitu a při úspěšné obraně odhazuje útočníka zpět magickým impulsem.", "", 1 * kolo, 10 * kolo, "dotek", "1 štít", "15"),
    "ork": new SpellA("skill/special/kou/ochranna_magie.png", "Odraž kouzlo", "20", ["Bojový mág", "sp 7"], "Ověření: Sesílání (INT) vs. Sesílání (INT)", "Umožní odklonit cílené kouzlo a přesměrovat jeho účinek na jiné místo nebo jiný cíl v dosahu.", "", 1 * pul, 1 * kolo, "100 sáhů", "1 kouzlo", "20"),
    "ozn": new SpellA("skill/special/kou/ochranna_magie.png", "Označ", "2 za den", ["Kouzelník", "lv 6", "sp 7"], "", "Vytvoří na předmětu nebo tvorovi neviditelnou značku, kterou lze kdykoli aktivovat nebo zviditelnit na dálku.", "", 1 * kolo, "dle many", "dotek", "1 předmět nebo tvor", "12"),
    "pop": new SpellA("skill/special/kou/ochranna_magie.png", "Poplach", "1 za hodinu", ["Kouzelník", "lv 6", "sp 7"], "", "Kouzlo vytvoří ochrannou kouli, která při narušení vyvolá hlasitý zvuk. Lze zvolit, na jak velké tvory reaguje.", "", 3 * kolo, "dle many", "dotek", "kruh 5 sáhů", "12"),
    "pso": new SpellA("skill/special/kou/ochranna_magie.png", "Prostorové skoky", "20", ["Kouzelník", "lv 6", "sp 7"], "", "Chrání sesilatele před útoky krátkou teleportací na náhodné místo v okolí. Kouzlo zvládne několik přesunů.", "", 1 * kolo, 10 * kolo, "—", "kouzelník", "23"),
    "prr": new SpellA("skill/special/kou/ochranna_magie.png", "Přidej rezistenci", "10 za rezistenci", ["Bojový mág", "sp 7"], "", "Udělí tvorovi rezistenci proti zvolenému typu zranění, případně ji povýší na imunitu, pokud ji již měl.", "", 1 * kolo, 10 * kolo, "dotek", "1 tvor", "19 (+2 za každou další)"),
    "vok": new SpellA("skill/special/kou/ochranna_magie.png", "Velké ochranné kouzlo", "25 + (2× za posílení)", ["Bojový mág", "sp 7"], "", "Vytvoří ochrannou kopuli, která brání vstupu tvorům a zvyšuje obranu uvnitř. Opuštění kopule sesilatelem ji zruší.", "", 10 * kolo, 10 * hodina, "dotek", "kopule do 10 sáhů", "19 (+1 za posílení)"),
    "zkm": new SpellA("skill/special/kou/ochranna_magie.png", "Zlom kouzlo", "10", ["Kouzelník", "lv 6", "sp 7"], "Ověření: Sesílání (INT) vs. Sesílání (INT)", "Zruší kouzlo během jeho sesílání a rozptýlí jeho magickou energii, pokud sesilatel překoná protivníka.", "", 1 * pul, 1 * kolo, "100 sáhů", "1 cíl", "15"),
    //kou lv6+ mentalni
    "cis": new SpellA("skill/special/kou/mentalni_magie.png", "Cizí smysl", "5 za smysl", ["Kouzelník", "lv 6", "sp 10"], "Ověření: Vůle (CHAR) vs. Vůle (CHAR)", "Sesilatel může vnímat svět smysly jiného tvora, aniž by ztratil vlastní. Umožňuje sledovat více smyslů současně.", "", 2 * kolo, 1 * hodina, "30 sáhů", "1 tvor", "9 (+2 za každý smysl navíc)"),
    "hyp": new SpellA("skill/special/kou/mentalni_magie.png", "Hypnóza", "3 × úroveň cíle", ["Čaroděj", "sp 10"], "Ověření: Vůle (CHAR) vs. Vůle (CHAR)", "Ovládne mysl humanoida a donutí jej provádět příkazy, které mu přímo neubližují. Po skončení si nic nepamatuje.", "", 3 * kolo, 1 * smena, "5 sáhů", "1 humanoid", "19"),
    "ign": new SpellA("skill/special/kou/mentalni_magie.png", "Ignoruj", "12", ["Čaroděj", "sp 10"], "Ověření: Sesílání (INT) vs. Postřeh (INT)", "Cíl se stává pro okolí psychologicky neviditelným. Lidé jej vidí, ale nevěnují mu žádnou pozornost, dokud neudělá výraznou akci.", "", 1 * kolo, 1 * hodina, "dotek", "1 bytost", "19"),
    "nvu": new SpellA("skill/special/kou/mentalni_magie.png", "Neviditelná ústa", "4 + (1 × přehrání)", ["Kouzelník", "lv 6", "sp 10"], "", "Do předmětu se vloží krátká zvuková zpráva, která se automaticky přehraje při splnění určené aktivační podmínky.", "", 1 * kolo, 1 * rok, "3 sáhy", "1 předmět", "13"),
    "pom": new SpellA("skill/special/kou/mentalni_magie.png", "Posílej myšlenky", "10 + (2 × počet tvorů)", ["Kouzelník", "lv 6", "sp 10"], "", "Propojí mysli více tvorů do sdíleného komunikačního kruhu. Lze komunikovat na velkou vzdálenost pouze myšlenkami.", "", 1 * kolo, 1 * smena, "0.5 míle", "dle many", "19 (+1 za každého tvora)"),
    "prm": new SpellA("skill/special/kou/mentalni_magie.png", "Prozkoumej mysl", "20", ["Kouzelník", "lv 6", "sp 10"], "Ověření: Vůle (CHAR) vs. Vůle (CHAR)", "Sesilatel pronikne do vzpomínek cíle a prožije je s jeho emocemi. Cíl přehrávání také vnímá a může si uvědomit zásah do mysli.", "", 3 * kolo, 10 * kolo, "dotek", "1 tvor", "23"),
    "phl": new SpellA("skill/special/kou/mentalni_magie.png", "Přehlížej", "20 za týden", ["Čaroděj", "sp 10"], "", "Ošálí mysl tvora tak, aby ignoroval určitou osobu nebo typ bytosti. Efekt ruší přímé ublížení.", "", 1 * kolo, "dle many", "10 sáhů", "1 tvor", "21"),
    "rzz": new SpellA("skill/special/kou/mentalni_magie.png", "Rozkaz", "5", ["Kouzelník", "lv 6", "sp 10"], "Ověření: Vůle (CHAR) vs. Vůle (CHAR)", "Jednoslovný rozkaz donutí cíl splnit jednoduchý úkon, který mu přímo neuškodí. Účinek trvá velmi krátce po vydání rozkazu.", "", 1 * pul, 1 * kolo, "10 sáhů", "1 tvor", "16"),
    "sre": new SpellA("skill/special/kou/mentalni_magie.png", "Sladké řeči", "3", ["Kouzelník", "lv 6", "sp 10"], "", "Magicky posílí přesvědčivost a argumenty sesilatele, čímž výrazně usnadňuje ovlivnění postoje či rozhodnutí cíle.", "", 1 * pul, 1 * minuta, "doslech", "kouzelník", "7"),
    "slp": new SpellA("skill/special/kou/mentalni_magie.png", "Sloní paměť", "4", ["Kouzelník", "lv 6", "sp 10"], "Ověření: Postřeh (INT) vs. X", "Otiskne aktuální událost do paměti se všemi detaily nebo umožní silně oživit starou vzpomínku, pokud je nalezena.", "", 1 * pul, 1 * rok, "dotek", "1 událost", "8"),
    "uko": new SpellA("skill/special/kou/mentalni_magie.png", "Úkol", "2 × úroveň cíle", ["Kouzelník", "lv 6", "sp 10"], "Ověření: Vůle (CHAR) vs. Vůle (CHAR)", "Vnutí cíli jednoduchý příkaz až o třech větách. Lze určit podmínku spuštění. Po provedení úkolu účinek končí.", "", 1 * kolo, 1 * den, "10 sáhů", "1 tvor", "15"),
    "umy": new SpellA("skill/special/kou/mentalni_magie.png", "Uzavření mysli", "8", ["Kouzelník", "lv 6", "sp 10"], "", "Posílí duševní obranu cíle a chrání proti mentálním útokům i kouzlům ovlivňujícím mysl. Umožňuje lépe vzdorovat.", "", 1 * kolo, 1 * smena, "10 sáhů", "1 tvor", "12"),
    "vmc": new SpellA("skill/special/kou/mentalni_magie.png", "Vadaverův mentální chaos", "5 za kolo a 5 za cíl", ["Kouzelník", "lv 6", "sp 10"], "Ověření: Vůle (CHAR) vs. Vůle (CHAR)", "Naruší strukturu myšlení cíle proudem matoucích teorií. Zasáhnuté bytosti mají ztížené všechny akce po dobu trvání.", "", 1 * kolo, "dle many", "20 sáhů", "dle many", "18 (+2 za každý cíl)"),
    "zap": new SpellA("skill/special/kou/mentalni_magie.png", "Zapomeň", "8", ["Čaroděj", "sp 10"], "Ověření: Vůle (CHAR) vs. Vůle (CHAR)", "Skryje v mysli vybranou vzpomínku. Cíl ví, že něco zapomněl, ale nedokáže si to vybavit bez zásahu další magie.", "", 2 * kolo, 1 * rok, "10 sáhů", "1 tvor", "14"),
    "zmt": new SpellA("skill/special/kou/mentalni_magie.png", "Zmatení", "40", ["Čaroděj", "sp 10"], "Ověření: Vůle (CHAR) vs. Vůle (CHAR), Postřeh (INT) vs. Sesílání (INT)", "Zmate smysly všech v oblasti iluzorními obrazy a vjemy. Uspěje‑li cíl alespoň v postřehu, ví, že vjemy nejsou skutečné.", "", 1 * kolo, 10 * kolo, "50 sáhů", "kruh 20 sáhů", "22"),
    "ztr": new SpellA("skill/special/kou/mentalni_magie.png", "Ztrojení", "5 za klon", ["Kouzelník", "lv 6", "sp 10"], "Ověření: Postřeh (INT) vs. Sesílání (INT)", "Vytvoří v mysli protivníků iluzorní kopie cíle. Útočník musí správně uhodnout skutečný cíl mezi klony.", "", 1 * kolo, 10 * kolo, "100 sáhů", "1 tvor", "12 (+2 za každý klon)"),
    //kou lv6+ promen
    "mme": new SpellA("skill/special/kou/magie_promen.png", "Malá metamorfóza", "5", ["Kouzelník", "lv 6", "sp 8"], "", "Dočasně změní část těla na jinou podobu, například drápy nebo křídla. Zachovává schopnost sesílat kouzla bez omezení.", "", 1 * kolo, 1 * smena, "dotek", "1 tvor", "10"),
    "mas": new SpellA("skill/special/kou/magie_promen.png", "Maskování", "6", ["Nekromant", "sp 8"], "Ověření: Sesílání (INT) vs. Postřeh (INT)", "Nemrtvý získá dočasný živý vzhled včetně masa a kůže. Rozpoznání pravé povahy je obtížné bez magické či detailní kontroly.", "", 5 * kolo, 1 * den, "dotek", "1 tvor", "12"),
    "mvn": new SpellA("skill/special/kou/magie_promen.png", "Metamorfóza v nemrtvého", "dle typu nemrtvého", ["Nekromant", "sp 8"], "", "Promění živou bytost v jeden z nižších typů nemrtvých. Přenáší jejich schopnosti, odolnosti i slabiny, ale zachovává původní atributy.", "", 3 * kolo, 1 * hodina, "dotek", "1 tvor", "13"),
    "mlz": new SpellA("skill/special/kou/magie_promen.png", "Mlžná postava", "12", ["Nekromant", "sp 8"], "", "Cíl se změní v mlhu schopnou pronikat skrz škvíry a volně se vznášet. V mlžné podobě nemůže útočit ani manipulovat s předměty.", "", 1 * kolo, 1 * smena, "dotek", "1 tvor", "15"),
    "opn": new SpellA("skill/special/kou/magie_promen.png", "Oprav nemrtvého", "6 za opravu", ["Nekromant", "sp 8"], "", "Obnoví nemrtvému část těla či struktury a doplní mu životy. Nelze překročit jeho maximální počet životů.", "2k6", 1 * kolo, 1 * kolo, "20 sáhů", "1 nemrtvý", "13 (+2 za každou opravu navíc)"),
    "ozp": new SpellA("skill/special/kou/magie_promen.png", "Oživlé předměty", "4 za předmět", ["Kouzelník", "lv 6", "sp 8"], "", "Rozhýbe až pět předmětů, které reagují na myšlenkové pokyny. Pohyby jsou omezeny jejich tvarem a fyzickými možnostmi.", "", 1 * kolo, 1 * smena, "30 sáhů", "1–5 předmětů", "17"),
    "ppt": new SpellA("skill/special/kou/magie_promen.png", "Podpoř talent", "3 za zlepšení", ["Kouzelník", "lv 6", "sp 8"], "", "Dočasně zlepší úroveň vybrané dovednosti u tvora, pokud ji již alespoň základně ovládá. Lze stupňovat podle vložené many.", "", 1 * pul, 1 * smena, "dotek", "1 tvor", "10 (+2 za každé zlepšení)"),
    "ppm": new SpellA("skill/special/kou/magie_promen.png", "Pozměň předmět", "4", ["Kouzelník", "lv 6", "sp 8"], "", "Zvětší nebo zmenší nekouzelný předmět na dvojnásobek či desetinu velikosti. Hmotnost zůstává zachována.", "", 2 * kolo, 1 * smena, "dotek", "1 předmět", "9"),
    "prp": new SpellA("skill/special/kou/magie_promen.png", "Proměň předmět", "20 za směnu", ["Kouzelník", "lv 6", "sp 8"], "", "Vytvoří libovolný předmět z dostupného materiálu pomocí magie a vlastní vůle. Spotřebuje stejné množství surovin jako běžná výroba.", "", 1 * smena, "stále", "dotek", "1 předmět", "18"),
    "roz": new SpellA("skill/special/kou/magie_promen.png", "Rozklad", "40 za sáh³ + 10 za další", ["Kouzelník", "lv 6", "sp 8"], "", "Rozloží jakoukoli nemagickou hmotu na jemný prach. Velikost efektu určují vložená mana a okamžité soustředění sesilatele.", "", 2 * kolo, 1 * kolo, "50 sáhů", "hmota dle many", "24 (+2 za další objem)"),
    "tvr": new SpellA("skill/special/kou/magie_promen.png", "Tvaruj", "4 za sáh", ["Kouzelník", "lv 6", "sp 8"], "", "Umožňuje manipulovat a přepracovávat tvar neživé hmoty dotykem. Lze vytvářet schody, tunely nebo posouvat vodu.", "", 5 * kolo, 1 * smena, "dotek", "1 předmět nebo 1 sáh³", "16"),
    "vmt": new SpellA("skill/special/kou/magie_promen.png", "Velká metamorfóza", "5 × úroveň tvora", ["Nekromant", "sp 8"], "", "Promění tvora v jinou živou bytost bez velikostního omezení. Uděluje všechny vrozené schopnosti cílového tvora.", "", 3 * kolo, 1 * smena, "dotek", "1 tvor", "20 + úroveň tvora"),
    "vod": new SpellA("skill/special/kou/magie_promen.png", "Vodní dech", "4 za směnu", ["Kouzelník", "lv 6", "sp 8"], "", "Cíli vyrostou žábry a může dýchat pod vodou stejně snadno jako na vzduchu. Vhodné pro delší ponory.", "", 1 * kolo, "dle many", "dotek", "1 tvor", "8"),
    "zka": new SpellA("skill/special/kou/magie_promen.png", "Zkamenění", "2 × úroveň cíle", ["Kouzelník", "lv 6", "sp 8"], "Ověření: Sesílání (INT) vs. Vůle (CHAR)", "Promění tvora v kámen na omezenou dobu. Tvor je při vědomí, ale nemůže se hýbat a získá odolnost kamene.", "", 5 * kolo, 1 * smena, "10 sáhů", "1 tvor", "21"),
    "zte": new SpellA("skill/special/kou/magie_promen.png", "Změň terén", "35", ["Kouzelník", "lv 6", "sp 8"], "", "Úprava terénu v široké oblasti – mění zem na bažinu, písek nebo zpět na pevný povrch. Ovlivňuje pohyb i překážky.", "", 2 * kolo, 1 * smena, "100 sáhů", "oblast 50 sáhů", "18"),
    "zmv": new SpellA("skill/special/kou/magie_promen.png", "Změna velikosti", "10", ["Kouzelník", "lv 6", "sp 8"], "", "Změní velikost cíle včetně jeho vybavení o jednu třídu nahoru nebo dolů. Uživatelsky bezpečné a rychlé.", "", 2 * kolo, 1 * smena, "dotek", "1 cíl", "12"),
    //kou lv6+ vitalni
    "ctv": new SpellA("skill/special/kou/vitalni_magie.png", "Čtení vzpomínek", "10", ["Kouzelník", "lv 6", "sp 9"], "", "Umožní číst vzpomínky mrtvého tvora skrze jeho mozek. Sesilatel může v každém kole prozkoumat jednu vzpomínku dle zadaného tématu.", "", 3 * kolo, 10 * kolo, "dotek", "1 tvor", "19 (+1 za každý den od smrti)"),
    "dtf": new SpellA("skill/special/kou/vitalni_magie.png", "Duševní transfer", "10 × úroveň cíle", ["Nekromant", "sp 9"], "", "Nekromant přenese svou duši do čerstvě zemřelého těla a trvale jej ovládne. Získá jeho fyzické atributy, ale ztratí část vlastní identity.", "", 4 * smena, "stále", "dotek", "1 tvor", "26"),
    "hib": new SpellA("skill/special/kou/vitalni_magie.png", "Hibernace", "6", ["Nekromant", "sp 9"], "Ověření: Postřeh (INT) vs. Sesílání (INT)", "Uvede nemrtvého do hlubokého nehybného stavu bez spotřeby many. Rozpoznat aktivního nekromanta vyžaduje úspěšné ověření.", "", 2 * kolo, "stále", "dotek", "nemrtvý nebo Nekromant", "12"),
    "hnl": new SpellA("skill/special/kou/vitalni_magie.png", "Hniloba", "15", ["Kouzelník", "lv 6", "sp 9"], "", "Pomalu vysává z živé bytosti vláhu a energii, čímž způsobuje postupný rozklad. Přírodní bytosti a rostliny trpí dvojnásobně.", "1k6/ kolo", 1 * kolo, 10 * kolo, "10 sáhů", "1 tvor", "21"),
    "koz": new SpellA("skill/special/kou/vitalni_magie.png", "Kostěná zbroj", "3 + X", ["Nekromant", "sp 9"], "", "Z kostí se kolem sesilatele vytvoří živá zbroj s vlastními životy. Poskytuje silnou ochranu, ale má slabinu vůči posvěcení a stříbru.", "", 1 * kolo, 1 * smena, "dotek", "Nekromant", "16"),
    "nak": new SpellA("skill/special/kou/vitalni_magie.png", "Nakrm nemrtvého", "4 za zvýšení", ["Nekromant", "sp 9"], "", "Posílí nemrtvého obětováním životů sesilatele. Každé zvýšení stojí 4 many a 1 život a přidá +1 k vybranému atributu.", "", 1 * kolo, 1 * hodina, "dotek", "nemrtví", "14 (+2 za každé zvýšení)"),
    "nrj": new SpellA("skill/special/kou/vitalni_magie.png", "Nekrotický rej", "30", ["Kouzelník", "lv 6", "sp 9"], "Ověření: Výdrž (ODO) vs. Sesílání (INT)", "Vlny nekrotické energie zraňují živé tvory a krátce je paralyzují. Nemrtvé naopak léčí podle zranění způsobeného živým.", "4k6", 2 * kolo, 1 * kolo, "kolem sesilatele 10 sáhů", "všichni živí v dosahu", "26"),
    "one": new SpellA("skill/special/kou/vitalni_magie.png", "Oživ neživého", "dle úrovně a typu", ["Nekromant", "sp 9"], "", "Oživí hmotného nemrtvého a poskytne mu příkazy na dálku. Udržení nemrtvého vyžaduje denní platbu many podle jeho úrovně.", "", 1 * smena, "stále", "dotek", "1 nemrtvý", "12 (+1 za každou úroveň)"),
    "pra": new SpellA("skill/special/kou/vitalni_magie.png", "Pokročilá reanimace", "dle úrovně a typu", ["Nekromant", "sp 9"], "", "Oživí nehmotného nemrtvého nebo vyšší nemrtvé podle oběti. Přenáší jejich typické schopnosti i vrozené vlastnosti.", "", 1 * smena, "stále", "dotek", "1 nemrtvý", "17 (+1 za každou úroveň)"),
    "pov": new SpellA("skill/special/kou/vitalni_magie.png", "Poslední výkřik", "9 za zakvílení", ["Kouzelník", "lv 6", "sp 9"], "Ověření: Sesílání (INT) vs. Vůle (CHAR)", "Napodobí smrtící křik bánší a zasáhne všechny živé tvory v okolí. Neúspěšné cíle jsou vyděšené a prchají.", "1k6+3", 1 * kolo, 1 * kolo, "10 sáhů", "živí v oblasti", "16 (+2 za každé zakvílení)"),
    "pni": new SpellA("skill/special/kou/vitalni_magie.png", "Pouto nesmrtelnosti", "veškerá dostupná", ["Nekromant", "sp 9"], "", "Nekromant vloží část své duše do vitálu. Pokud zemře, tělo se obnoví po 24 hodinách. Cena je trvalá ztráta části síly.", "", 12 * hodina, "trvale", "dotek", "Nekromant", "26"),
    "pzi": new SpellA("skill/special/kou/vitalni_magie.png", "Přežij", "7", ["Kouzelník", "lv 6", "sp 9"], "", "Posune hranici smrti o 10 životů a zrychlí zotavování z bezvědomí. Pod hranicí nuly obnovuje zranění pomalu a stabilně.", "", 3 * kolo, 1 * den, "dotek", "1 živý cíl", "15"),
    "spa": new SpellA("skill/special/kou/vitalni_magie.png", "Spáry mrtvých", "4 za kolo", ["Nekromant", "sp 9"], "Ověření: Sesílání (INT) vs. Atletika (SIL)", "Ze země vyrazí přízračné pařáty, které drží tvory v oblasti. Každé kolo se mohou pokusit uniknout pastí.", "", 2 * kolo, "dle many", "50 sáhů", "okruh 5 sáhů", "12 (+2 za každé kolo)"),
    "spn": new SpellA("skill/special/kou/vitalni_magie.png", "Spoutej nemrtvého", "3 + (2 × úroveň nemrtvého)", ["Nekromant", "sp 9"], "Ověření: Vůle (CHAR) vs. Vyšší moc", "Napadne mysl nemrtvého a ovládne jej, pokud sesilatel překoná jeho nadpřirozený odpor. Dlouhodobé ovládání stojí další manu.", "", 1 * kolo, 1 * den, "30 sáhů", "1 nemrtvý", "14"),
    "vsl": new SpellA("skill/special/kou/vitalni_magie.png", "Vytvoř slabinu", "2 × úroveň cíle za slabinu", ["Kouzelník", "lv 6", "sp 9"], "Ověření: Sesílání (INT) vs. Výdrž (ODO)", "Sesilatel určí typ zranění, kterému bude cíl po dobu trvání více podléhat. Lze přidat více slabin za vyšší obtížnost.", "", 1 * kolo, 3 * kolo, "10 sáhů", "1 tvor", "20 (+2 za každou další)"),
    "zak": new SpellA("skill/special/kou/vitalni_magie.png", "Zastav krvácení", "5 za krvácení", ["Kouzelník", "lv 6", "sp 9"], "", "Rána se okamžitě uzavře a krvácení přestane. Každé použití odstraní jeden stav krvácení z cílové živé bytosti.", "", 1 * pul, 1 * kolo, "30 sáhů", "1 živá bytost", "10 (+2 za každé další)"),
    //kou lv6+ vysoka
    "bzr": new SpellA("skill/special/kou/vysoka_magie.png", "Barbogovo zrcadlo minulosti", "70", ["Kouzelník", "lv 6", "sp 11"], "", "Umožní nahlédnout do minulých událostí na místě seslání. Sesilatel vidí minulost jako obraz a může tak odhalit i dávné děje.", "", 1 * smena, "viz popis", "dle many", "1 místo", "22"),
    "cpv": new SpellA("skill/special/kou/vysoka_magie.png", "Chůze po vodě", "3 za směnu", ["Kouzelník", "lv 6", "sp 11"], "", "Sesilatel nebo cíl může chodit po vodní hladině či jiných nestabilních površích. Pohyb je pomalejší, ale bezpečný.", "", 1 * kolo, "dle many", "dotek", "1 tvor", "12"),
    "idp": new SpellA("skill/special/kou/vysoka_magie.png", "Identifikuj předmět", "10 (15)", ["Kouzelník", "lv 6", "sp 11"], "", "Získá základní i doplňující informace o předmětu podle vložené many – jeho magii, účinky, povahu a možné použití.", "", 5 * kolo, 1 * kolo, "dotek", "1 předmět", "19 (24)"),
    "jsn": new SpellA("skill/special/kou/vysoka_magie.png", "Jasnozřivost", "3 za 50 sáhů", ["Kouzelník", "lv 6", "sp 11"], "", "Sesilatel pozoruje vzdálené místo svým vnitřním zrakem. Vnímá obraz, zvuk i pachy, jen s omezenou ostrostí.", "", 5 * kolo, 1 * minuta, "dle many", "kruh 15 sáhů", "14"),
    "mpu": new SpellA("skill/special/kou/vysoka_magie.png", "Mimoprostorový úkryt", "25", ["Čaroděj", "sp 11"], "", "Sesilatel zmizí z reality a vstoupí do mimoprostoru, kde přečká nebezpečí. Po vypršení efektu se vrátí na původní místo.", "", 1 * pul, 1 * smena, "—", "kouzelník", "21"),
    "mos": new SpellA("skill/special/kou/vysoka_magie.png", "Most", "5 za 10 sáhů", ["Kouzelník", "lv 6", "sp 11"], "", "Vytvoří pevnou magickou cestu libovolného tvaru, která unese i těžké zátěže. Může zmizet na povel sesilatele.", "", 3 * kolo, 1 * smena, "10 sáhů", "dle many", "15"),
    "myo": new SpellA("skill/special/kou/vysoka_magie.png", "Mystický oř", "15 (20)", ["Kouzelník", "lv 6", "sp 11"], "", "Vyvolá magického koně napojeného na sesilatelovu mysl. Může běžet i po vodě a nedovolí jezdci spadnout.", "", 3 * kolo, 1 * den, "5 sáhů", "1 oř", "19"),
    "nsv": new SpellA("skill/special/kou/vysoka_magie.png", "Navigační světélko", "2 za směnu", ["Kouzelník", "lv 6", "sp 11"], "", "Magické světélko sleduje nejčastější stopy v okolí a vede družinu správným směrem. Ignoruje stopy spojenců.", "", 1 * kolo, "dle many", "10 sáhů", "1 světélko", "14"),
    "nvr": new SpellA("skill/special/kou/vysoka_magie.png", "Návrat", "10 za tvora", ["Čaroděj", "sp 11"], "", "Připraví přenosovou značku. Po aktivaci během hodiny teleportuje všechny označené tvory zpět na místo seslání.", "", 10 * kolo, 1 * hodina, "dotek", "dle many", "12 (+2 za každého tvora navíc)"),
    "por": new SpellA("skill/special/kou/vysoka_magie.png", "Portál", "8 + (2 × počet mil)", ["Čaroděj", "sp 11"], "", "Vytvoří jednosměrné spojení dvou míst. Portál trvá omezenou dobu a umožňuje průchod tvorům až do velikosti C.", "", 10 * kolo, 10 * kolo, "5 sáhů", "kruh 2 sáhy", "23"),
    "poc": new SpellA("skill/special/kou/vysoka_magie.png", "Portálová čepel", "7", ["Čaroděj", "sp 11"], "", "Zbraň zasáhne cíl a okamžitě jej náhodně teleportuje v okolí podle výsledku Pána jeskyně. Velmi rušivé v boji.", "", 1 * kolo, 10 * kolo, "dotek", "1 zbraň", "17"),
    "pof": new SpellA("skill/special/kou/vysoka_magie.png", "Pouto osudu", "80", ["Čaroděj", "sp 11"], "", "Propojí osudy sesilatele a cíle. Sesilatel se může k cíli přenést pomocí přivolávacího předmětu. Něco stojí udržování pouta.", "", 10 * kolo, "do použití", "dotek", "1 tvor", "19"),
    "ppp": new SpellA("skill/special/kou/vysoka_magie.png", "Přivolej předmět", "7", ["Čaroděj", "sp 11"], "", "Připraví předmět tak, aby se po vyslovení hesla rozletěl zpět k sesilateli. Létá rychlostí levitace i proti odporu.", "", 10 * kolo, 1 * den, "dotek", "1 předmět", "13"),
    "ryb": new SpellA("skill/special/kou/vysoka_magie.png", "Rychlost blesku", "30", ["Čaroděj", "sp 11"], "Ověření: Atletika (SIL) vs. 7", "Extrémně zrychlí čas pro sesilatele. Umožní pět pohybových akcí, ale omezuje interakci s okolní hmotou.", "", 1 * pul, 1 * kolo, "dotek", "kouzelník", "20"),
    "tkr": new SpellA("skill/special/kou/vysoka_magie.png", "Telekinetický rej", "4 (8) za kolo", ["Kouzelník", "lv 6", "sp 11"], "Ověření: Reflex (OBR) vs. 12", "Pohybuje a víří předměty do hmotnosti 20 liber, případně vytváří ničivou telekinetickou bouři v oblasti.", "2k6/ kolo", 1 * kolo, "dle many", "30 sáhů", "kruh 5 sáhů", "17"),
    "zil": new SpellA("skill/special/kou/vysoka_magie.png", "Živá iluze", "5 za sáh rozměru", ["Čaroděj", "sp 11"], "", "Vytvoří pevnou, ale křehkou hmotnou iluzi předmětu nebo tvora. Může mít cyklický pohyb nebo být řízena soustředěním.", "", 3 * kolo, 1 * smena, "50 sáhů", "dle many", "17 (+1 za každý sáh, +5 za pohyb)"),
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
    "op1": new TrickA("skill/special/zlo/odstraneni_pasti.png", "Odstranění pastí", "1 min až 1 směna", ["Zloděj", "sp 11"], "U.Železného klíče(OBR) vs X", "Odstranění nemagických pastí", 0),
    "oza": new TrickA("skill/special/zlo/otevirani_zamku.png", "Otevírání zámků", "", ["Zloděj", "sp 11"], "U.Železného klíče(OBR) vs X", "Zloděj.vybavení, nebo -5 => odemkne / zamkne", 0),
    "pad": new TrickA("skill/special/zlo/padelani.png", "Padělání", "", ["Zloděj", "sp 11"], "U.Železného klíče(OBR) vs X", "Dokonalý/částečný padělek, bez vybavení X*2, psaní pro dokumenty", 0),
    //zlo lv6+
    "man": new TrickA("skill/presvedcovani.png", "Manipulace", "jednorázově", ["Zloděj", "sp 16"], "Přesvědčování (CHAR) vs. Vůle (CHAR)", "Zloděj psychicky tlačí na cíl, aby během rozhovoru nevědomky vyzradil chráněné informace. Při použití násilí získává výhodu.", ""),
    "psp": new TrickA("skill/hazardni_hry.png", "Podstrčení předmětu", "jednorázově", ["Zloděj", "sp 16"], "Hazardní hry (OBR) vs. Postřeh (INT)", "Nenápadně podstrčí falešný či cinknutý předmět do kapsy jiného tvora. Lze provést i v davu nebo při náhodném nárazu.", ""),
    "han": new TrickA("skill/odhad_ceny.png", "Handlování", "neomezeně", ["Zloděj", "sp 17"], "Odhad ceny (INT) vs. X", "Umožní přesně odhadnout skutečnou cenu předmětu a jednat o ceně se značnou výhodou. Lze zjišťovat původ a kvalitu věcí.", ""),
    "ukp": new TrickA("skill/vybirani_kapes.png", "Ukrytí předmětu", "neomezeně", ["Zloděj", "sp 17"], "Vybírání kapes (OBR) vs. Postřeh (INT)", "Skryje předmět na těle nebo v oděvu tak, že jej neodhalí ani běžná prohlídka. Velké předměty dávají nevýhodu, speciální výbava výhodu.", ""),
    "dmk": new TrickA("skill/special/zlo/rvaci.png", "Dokonalá muška", "neomezeně", ["Zloděj", "sp 25", "sp 10"], "Umění rváčů (OBR) vs. Reflex (OBR)", "Rychlé intuitivní míření kuší zvyšuje přesnost a umožňuje zasáhnout i v náročných podmínkách. Umožňuje získat výhodu k útoku.", "Výhoda +5 k útoku"),
    "otr": new TrickA("skill/special/zlo/rvaci.png", "Otřesení", "jednorázově", ["Zloděj", "sp 25", "sp 10"], "Umění rváčů (OBR) vs. Výdrž (ODO)", "Silný úder do hlavy při útoku vyvolá dezorientaci nepřítele. V případě zásahu a úspěšného ověření je cíl na 1 kolo vyřazen z akcí.", "Cíl je otřesen na 1 kolo"),
    "pzs": new TrickA("skill/special/zlo/rvaci.png", "Přesný zásah", "jednorázově", ["Zloděj", "sp 25", "sp 10"], "Umění rváčů (OBR) vs. Reflex (OBR)", "Zloděj najde slabinu ve zbroji a využije ji k přesnému útoku. Útok ignoruje zbroj, štít i bonusy cílů z obrany.", "Ignoruje zbroj a obranu"),
    "inf": new TrickA("skill/special/zlo/promeny.png", "Infiltrace", "neomezeně", ["Zloděj", "sp 26", "sp 8"], "Umění skrývání (OBR) vs. X", "Pečlivým průzkumem objektu odhalí rutinu stráží, přístupové cesty a slabiny. Při infiltraci poskytuje výrazné výhody.", "Výhoda +5 při použití znalostí"),
    "psn": new TrickA("skill/special/zlo/promeny.png", "Pán stínů", "neomezeně", ["Zloděj", "sp 26", "sp 8"], "Umění skrývání (OBR) vs. Postřeh (INT)", "Zloděj se okamžitě skryje ve stínech či kouři. Pokud cíl neuspěje v postřehu, je pro něj téměř neviditelný a získává výhody jako neviditelný protivník.", "cíl má nevýhodu proti skrývajícímu se zloději"),
    "uut": new TrickA("skill/special/zlo/promeny.png", "Utajený útok", "neomezeně", ["Zloděj", "sp 26", "sp 8"], "Umění skrývání (OBR) vs. Postřeh (INT)", "Zloděj může zaútočit nepozorovaně, aniž by prozradil svou pozici. Pokud cíl neuspěje v ověření, útok nesleduje a zloděj zůstává skryt.", "útok neprozradí pozici útočníka"),
    "hlf": new TrickA("skill/special/zlo/PPP1/umeni_prepadu.png", "Hlavounova finta", "jednorázově", ["Zloděj", "sp 28"], "Umění přepadů (OBR) vs. Reflex (OBR)", "Zloděj oklame nepřítele klamným pohybem a vyrazí mu dech. Cíl ztratí jistotu a po dobu jednoho kola má nevýhodu na všechny akce.", "cíl má 1 kolo nevýhodu ke všem akcím"),
    "ktr": new TrickA("skill/special/zlo/PPP1/umeni_prepadu.png", "Kontrolovaná trajektorie", "neomezeně", ["Zloděj", "sp 28"], "Umění přepadů (OBR) vs. Reflex (OBR)", "Zloděj upraví dráhu projektilu a zasáhne i nepřítele v krytu. Útok ignoruje bonusy poskytované krytem nebo spřátelenou postavou.", "ignoruje kryt a riziko zásahu spojence"),
    "php": new TrickA("skill/special/zlo/PPP1/umeni_prepadu.png", "Prohození pozic", "neomezeně", ["Zloděj", "sp 28"], "Umění přepadů (OBR) vs. Reflex (OBR)", "Zloděj se v jediném pohybu vymění s nepřítelem na bojišti. Získá tak výhodnější pozici pro útok nebo únik z obklíčení.", "výměna pozic s cílem při úspěchu"),
    "flx": new TrickA("skill/special/zlo/PPP2/mistrostvi_kociciho_pohybu.png", "Flexibilita", "neomezeně", ["Zloděj", "sp 37", "sp 6"], "Umění kočičího pohybu (OBR) vs. Reflex (OBR)", "Zloděj se během obrany prohne či uhne nepředvídatelným způsobem. Při úspěchu získává výhodu k obraně, při neúspěchu nevýhodu.", "výhoda +5 k obraně, při neúspěchu nevýhoda"),
    "par": new TrickA("skill/special/zlo/PPP2/mistrostvi_kociciho_pohybu.png", "Parkur", "neomezeně", ["Zloděj", "sp 37", "sp 6"], "Umění kočičího pohybu (OBR) vs. X", "Umožňuje překonat obtížný terén bez zpomalení a pohybovat se po překážkách s lehkostí. Vhodné v boji i při útěku.", "odstranění postihů za obtížný terén"),
    "uvy": new TrickA("skill/special/zlo/PPP2/mistrostvi_kociciho_pohybu.png", "Útok z výšky", "neomezeně", ["Zloděj", "sp 37", "sp 6"], "Umění kočičího pohybu (OBR) vs. Reflex (OBR)", "Zloděj skočí ze zvýšené pozice na cíl a povalí ho k zemi. Způsobí mu zranění jako při pádu a znehybní ho na krátký čas.", "cíl je povalen a utrpí zranění podle výšky"),
    "hrm": new TrickA("skill/special/zlo/PPP3/mistrovstvi_promen.png", "Hraní mrtvého", "jednorázově", ["Zloděj", "sp 42", "sp 7"], "Umění proměn (CHAR) vs. Postřeh (INT)", "Zloděj předstírá smrt dokonale realistickým způsobem, včetně krve. Pokud protivník neuspěje v postřehu, přestane jej považovat za hrozbu.", "cíl ignoruje zloděje jako hrozbu"),
    "mak": new TrickA("skill/special/zlo/PPP3/mistrovstvi_promen.png", "Makety", "jednorázově", ["Zloděj", "sp 42", "sp 7"], "Umění proměn (CHAR) vs. Postřeh (INT)", "Zloděj vytvoří maketu postavy, aby odvedl pozornost. Při úspěšném oklamání ji cíl považuje na dálku za skutečnou osobu.", "cíl považuje maketu za skutečnou postavu"),
    "flt": new TrickA("skill/special/zlo/PPP3/mistrovstvi_promen.png", "Falešné tváře", "neomezeně", ["Zloděj", "sp 42", "sp 7"], "Umění proměn (CHAR) vs. Postřeh (INT)", "Zloděj vytvoří masku, která jej na 1 hodinu věrohodně promění v vybranou osobu. Cíle jej pokládají za originál, pokud neuspějí v postřehu.", "získává výhodu proti sociálním trikům"),
    "odn": new TrickA("skill/special/zlo/PPP3/mistrovstvi_sarmu.png", "Odhad nepřítele", "jednorázově", ["Zloděj", "sp 43", "sp 9"], "Umění šarmu (CHAR) vs. Vůle (CHAR)", "Dlouhým rozhovorem odhalí skryté motivy, touhy a slabiny cíle. Umožňuje nabídnout přesnou pobídku a získat silný vliv.", "výhoda +5 k přesvědčování cíle"),
    "osj": new TrickA("skill/special/zlo/PPP3/mistrovstvi_sarmu.png", "Ostrý jazyk", "jednorázově", ["Zloděj", "sp 43", "sp 9"], "Umění šarmu (CHAR) vs. Vůle (CHAR)", "Zloděj provokací zasáhne cíl na citlivém místě. Cíl reaguje emocemi a musí svůj příští útok zaměřit na vybranou osobu.", "cíl musí útočit na určený cíl"),
    "sls": new TrickA("skill/special/zlo/PPP3/mistrovstvi_sarmu.png", "Sladká slova", "jednorázově", ["Zloděj", "sp 43", "sp 9"], "Umění šarmu (CHAR) vs. Vůle (CHAR)", "Zloděj pronese šokující nebo přesvědčivé tvrzení, které paralyzuje mysl cíle. Cíl nezvládne v následujícím kole provést žádnou akci.", "cíl nemůže 1 kolo vykonat akci"),
    "pko": new TrickA("skill/special/zlo/PPP2/umeni_neferoveho_boje.png", "Podkopnutí", "jednorázově", ["Zloděj", "sp 39"], "Umění neférového boje (OBR) vs. Reflex (OBR)", "Zloděj vyvede nepřítele z rovnováhy rychlým podkopnutím. Pokud uspěje, cíl spadne na zem a přichází o všechny akce v kole.", "cíl je povalen a ztrácí akce"),
    "sbn": new TrickA("skill/special/zlo/PPP2/umeni_neferoveho_boje.png", "Souboj na zemi", "neomezeně", ["Zloděj", "sp 39"], "Umění neférového boje (OBR) vs. Výdrž (ODO)", "Zloděj srazí cíl do držení na zemi. Oba mohou pouze útočit nebo se bránit, ale protivník má nevýhodu k útoku i obraně.", "cíl má nevýhodu k ÚČ a OČ"),
    "uds": new TrickA("skill/special/zlo/PPP2/umeni_neferoveho_boje.png", "Útok do slabin", "jednorázově", ["Zloděj", "sp 39"], "Umění neférového boje (OBR) vs. Výdrž (ODO)", "Rychlý úder do citlivého místa způsobí silnou bolest a naruší rovnováhu nepřítele. Zpomaluje jeho pohyb a omezuje akce.", "cíl zpomalen na 3 kola (pohyblivost na polovinu)"),
    "npa": new TrickA("skill/special/zlo/PPP2/mistrovstvi_zelezneho_klice.png", "Nastražení pasti", "neomezeně", ["Zloděj", "sp 38", "sp 11"], "Umění železného klíče (OBR) vs. X", "Zloděj dokáže vyrobit a skrýt různé pasti, mechanické i magické. Úspěšné nastražení umožní překvapit protivníky a zpomalit je nebo zranit.", "efekt dle typu pasti – zpomalení, zranění, nevýhody"),
    "omz": new TrickA("skill/special/zlo/PPP2/mistrovstvi_zelezneho_klice.png", "Otevírání magických zámků", "neomezeně", ["Zloděj", "sp 38", "sp 11"], "Umění železného klíče (OBR) vs. X", "Zloděj dokáže deaktivovat a otevřít magické zámky, runy a ochranné systémy. Použití bez magického klíče způsobuje nevýhodu.", "při neúspěchu riziko spuštění pasti"),
    "pdc": new TrickA("skill/special/zlo/PPP2/mistrovstvi_zelezneho_klice.png", "Padělání cenností", "neomezeně", ["Zloděj", "sp 38", "sp 11"], "Umění železného klíče (OBR) vs. Postřeh (INT)", "Vytvoří vysoce kvalitní padělky cenností nebo mincí. Experti mohou padělek odhalit jen s obtížemi. Výroba trvá celý den.", "cíle mají nevýhodu při rozpoznávání padělku"),
    "drz": new TrickA("skill/special/zlo/PPP3/umeni_boje_s_plastem.png", "Držení", "neomezeně", ["Zloděj", "sp 46"], "Umění boje s pláštěm (OBR) vs. Atletika (SIL)", "Zloděj zachytí protivníka pláštěm a zcela omezí jeho pohyb. Cíl nemůže používat pohybové akce a má nevýhodu k většině úkonů.", "cíl znehybněn, nevýhoda k akcím"),
    "osl": new TrickA("skill/special/zlo/PPP3/umeni_boje_s_plastem.png", "Oslepení pláštěm", "jednorázově", ["Zloděj", "sp 46"], "Umění boje s pláštěm (OBR) vs. Reflex (OBR)", "Zloděj hodí plášť protivníkovi přes hlavu a na čas jej oslepí. Cíl má potíže útočit i bránit se, dokud se z pláště nevyprostí.", "cíl oslepen (nevýhoda k ÚČ i OČ)"),
    "svu": new TrickA("skill/special/zlo/PPP3/umeni_boje_s_plastem.png", "Svedení útoku", "jednorázově", ["Zloděj", "sp 46"], "Umění boje s pláštěm (OBR) vs. Reflex (OBR)", "Zloděj vychýlí protivníkovu zbraň pláštěm a nechá útok minout. Funguje i proti přírodním zbraním jako pařáty nebo zuby.", "útok je zcela vychýlen – miss"),
    //kle
    "svc": new TrickA("spell.png", "Svěcení", "1 BP, 1 minuta", ["Klerik", "sk 600"], 0, "Klerik vytvoří až 1l svěcené vody, nebo posvětí 1 zbraň", 0),
    "zvo": new TrickA("spell.png", "Zvolání", "-", ["Klerik", "sk 600"], 0, "Zvolá o pomoc svého boha, ", 0),
    "lru": new SpellA("spell.png", "Léčivé ruce", "3 BP", ["Klerik", "sk 600"], 0, "Přiložením rukou léčí", "1k6 léčení", 1 * kolo, 0, "dotek", "1 tvor", "6"),
    "oci": new SpellA("spell.png", "Očištění", "3 MP", ["Klerik", "sk 600"], 0, "Poorci jídla zbaví jedů a nákaz", 0, 10 * kolo, 0, "dotek", "1 porce jídla / 1l pití", "6"),
    "svi": new SpellA("spell.png", "Štít víry", "1+2*X MP", ["Klerik", "sk 600"], 0, "+5 ZO vybraným tvorům v rozsahu", 0, 0, "X kol", 0, "tvorové do 2 sáhů", "6"),
    "umo": new SpellA("spell.png", "Úder moci", "5 BP", ["Klerik", "sk 600"], 0, "Mentální útok", "1k10 psychycké", 1 * kolo, 0, "20 sáhů", "1 tvor", "6"),
    "uot": new SpellA("spell.png", "Uzdrav otravu", "X MP", ["Klerik", "sk 600"], 0, "Ruší otravu a jedy s nebezpečností X-", 0, 3 * kolo, 0, "dotek", "1 tvor", "6"),
    "hvi": new SpellA("spell.png", "Hlas víry", "2 BP", ["Klerik", "lv 2", "sk 600"], 0, "Zesílí hlas 3×, umožňuje přehlušit dav; +3 k CHAR zastrašování", 0, 1 * kolo, 1 * smena, "-", "klerik", "8"),
    "ksp": new SpellA("spell.png", "Klidný spánek", "4 BP", ["Klerik", "lv 2", "sk 600"], 0, "Zajistí klidný spánek bez nočních můr; cíl se probudí odpočatý a uzdraví o +2 Ž navíc", 0, 1 * kolo, 8 * hodina, "dotek", "1 tvor", "8"),
    "kps": new SpellA("spell.png", "Kopí pravého světla", "3 BP", ["Klerik", "lv 2", "sk 600"], 0, "Vyšle paprsek světla zraňující nemrtvé, neviděné a nadpozemské bytosti", "1k6+2", 1 * kolo, 0, "100 sáhů", "tvorové v cestě", "8"),
    "opt": new SpellA("spell.png", "Ochrana před temnotou", "4 BP", ["Klerik", "lv 2", "sk 600"], 0, "Nemrtví, nevidění a nadpřirozené bytosti mají vůči cíli Nevýhodu (-5); chrání před kletbami a posedlostí", 0, 1 * kolo, 10 * kolo, "dotek", "1 tvor", "8"),
    "poz": new SpellA("spell.png", "Požehnání zdaru", "3 BP", ["Klerik", "lv 2", "sk 600"], 0, "Cíl získá Výhodu (+5) k dalšímu hodu v následujících 24 h", 0, 2 * kolo, 1 * kolo, "dotek", "1 tvor", "8"),
    "vnk": new SpellA("spell.png", "Vnuknutí", "5 BP", ["Klerik", "lv 2", "sk 600"], 0, "Odešle emocionální poselství s obrazem, dorazí okamžitě; funguje i ve spánku", 0, 0, 0, "kdekoliv", "1 tvor", "8"),
    //kle skills
    "aop": new SpellA("skill/special/kle/zehnani_aurami.png", "Aura ocelové pěsti", "6 + 2*X BP", ["Klerik", "sp 11"], 0, "+2 k útoku pro všechny spojence v dosahu aury", 0, 1 * kolo, 3 * kolo, "-", "koule 5 sáhů, všichni tvorové", "8"),
    "apt": new SpellA("skill/special/kle/zehnani_aurami.png", "Aura proti temnotě", "6 + 2*X BP", ["Klerik", "sp 11"], 0, "Do aury nemohou vstoupit nemrtví, nevidění, posedlí a nadpřirozené bytosti; chrání také proti zastrašení", 0, 1 * kolo, 3 * kolo, "-", "koule 5 sáhů, všichni tvorové", "8"),
    "ass": new SpellA("skill/special/kle/zehnani_aurami.png", "Aura svatého štítu", "6 + 2*X BP", ["Klerik", "sp 11"], 0, "+2 k obraně pro všechny spojence uvnitř aury", 0, 1 * kolo, 3 * kolo, "-", "koule 5 sáhů, všichni tvorové", "8"),
    "doz": new SpellA("skill/special/kle/svate_pravdy.png", "Doznání", "3 BP", ["Klerik", "sp 10"], "Vůle(CHA) vs Výdrž(ODO)", "Sníží ODO i CHAR cíle o 1 na 1 směnu; může vést k vynucenému přiznání", 0, 1 * kolo, 1 * smena, "dotek", "1 tvor", "12"),
    "fpr": new SpellA("skill/special/kle/svate_pravdy.png", "Falešné přátelství", "3 + úroveň cíle BP", ["Klerik", "sp 10"], "Vůle(CHA) vs Vůle(CHA)", "Cíl považuje klerika za přítele, pomáhá mu, neudělá ale nic životu nebezpečného", 0, 2 * kolo, 1 * hodina, "10 sáhů", "1 tvor", "12"),
    "lau": new SpellA("skill/special/kle/zehnani_aurami.png", "Léčivá aura", "10 BP", ["Klerik", "sp 11"], 0, "Uzdraví spojence v dosahu za 1k10 životů", "1k10", 1 * kolo, 0, "-", "koule 5 sáhů, všichni tvorové", "8"),
    "nte": new SpellA("skill/special/kle/demonologie.png", "Najdi temnotu", "3 BP", ["Klerik", "sp 8"], 0, "Umožní vidět aury temných bytostí, prokletých předmětů a neviděných", 0, 3 * kolo, 10 * kolo, "klerik", "všichni temní tvorové v dosahu", "8"),
    "npt": new SpellA("skill/special/kle/milosrdenstvi.png", "Napravení těla", "10 BP", ["Klerik", "sp 9"], 0, "Léčí zlomeniny, šlachy, cévy, bubínek; vyléčí 2k6 životů", "2k6", 2 * kolo, 0, "dotek", "1 tvor", "12"),
    "okl": new SpellA("skill/special/kle/demonologie.png", "Odstraň kletbu", "13 BP", ["Klerik", "sp 8"], "Vůle(CHA) vs X", "Odstraní kletbu z osoby, místa či předmětu", 0, 10 * kolo, 0, "dotek", "1 cíl", "12"),
    "op2": new SpellA("skill/special/kle/milosrdenstvi.png", "Odstraň paralýzu", "5 BP", ["Klerik", "sp 9"], 0, "Odstraní ne‑fyzickou paralýzu (strach, kouzla, kletby)", 0, 3 * kolo, 0, "dotek", "1 tvor", "12"),
    "odt": new SpellA("skill/special/kle/demonologie.png", "Odvrácení temnoty", "3 BP", ["Klerik", "sp 8"], "Vůle(CHA) vs Moc monstra", "Odvrací nemrtvé, neviděné a nadpřirozené bytosti; prchají 24 hodin", 0, 2 * kolo, 0, "-", "koule 5 sáhů, temní tvorové", "10"),
    "osa": new SpellA("skill/special/kle/demonologie.png", "Ošálení temnoty", "4 BP", ["Klerik", "sp 8"], 0, "Klerik je pro temné bytosti neviditelný a neslyšitelný; ruší se útokem nebo prosbou", 0, 1 * kolo, 1 * smena, "klerik", "1 tvor", "8"),
    "pbo": new SpellA("skill/special/kle/bozi_patroni.png", "Posel bojovník", "2 + X BP", ["Klerik", "sp 7"], 0, "Přivolá bojového posla se 30 Ž; X bodů rozdělí do útoku/obrany", 0, 1 * kolo, 3 * kolo, "20 sáhů", "posel", "10"),
    "pro": new SpellA("skill/special/kle/bozi_patroni.png", "Posel rovnováhy", "12 BP", ["Klerik", "sp 7"], "Vůle(CHA) vs 14", "Posel vysává manu kouzelníků (1k10/ kolo)", "1k10 many", 2 * kolo, 6 * kolo, "30 sáhů", "1 cíl", "10"),
    "pst": new SpellA("skill/special/kle/bozi_patroni.png", "Posel stezky", "5 BP", ["Klerik", "sp 7"], 0, "Posel ukazuje směr hledanému místu, drží se max 10 sáhů od klerika", 0, 5 * kolo, 1 * hodina, "-", "posel", "8"),
    "pum": new SpellA("skill/special/kle/bozi_patroni.png", "Posel umlčení", "12 BP", ["Klerik", "sp 7"], 0, "Narušuje prosby ostatních; při zjevení určuje hodnotu postihu 1k10", 0, 2 * kolo, 6 * kolo, "30 sáhů", "cílová postava", "12"),
    "szb": new SpellA("skill/special/kle/bojovniku_viry.png", "Svatá zbroj", "3 BP", ["Klerik", "sp 6"], 0, "Pohltí veškeré zranění z jednoho útoku v daném kole", 0, 0, 0, "klerik", "klerik", "8"),
    "udz": new SpellA("skill/special/kle/milosrdenstvi.png", "Udržení života", "3 BP", ["Klerik", "sp 9"], 0, "Na 10 kol zastaví účinky jedů, krvácení a kleteb u umírajícího tvora", 0, 1 * kolo, 10 * kolo, "10 sáhů", "1 tvor", "8"),
    "uts": new SpellA("skill/special/kle/bojovniku_viry.png", "Útok štěstěny", "2 BP", ["Klerik", "sp 6"], 0, "Umožní hodit útok 2× a vzít lepší výsledek", 0, 0, 1 * kolo, "-", "klerik", "8"),
    "une": new SpellA("skill/special/kle/milosrdenstvi.png", "Uzdrav nemocného", "5 BP", ["Klerik", "sp 9"], 0, "Léčí běžné nemoci a symptomy; vážné nemoci pouze potlačí na 24 hodin", 0, 3 * kolo, 0, "dotek", "1 tvor", "10"),
    "vip": new SpellA("skill/special/kle/svate_pravdy.png", "Vidění pravdy", "3 BP", ["Klerik", "sp 10"], "Vůle(CHA) vs Vůle(CHA)", "Odhalí lháře — nemůže při přímém pohledu lhát", 0, 1 * kolo, 3 * kolo, "-", "klerik", "11"),
    "vru": new SpellA("skill/special/kle/bojovniku_viry.png", "Vrácení úderu", "4 BP", ["Klerik", "sp 6"], 0, "Útočník utrpí polovinu životů, které způsobil klerikovi", 0, 0, 1 * kolo, "-", "klerik", "10"),
    "zpm": new SpellA("skill/special/kle/svate_pravdy.png", "Zapomnění", "8 BP", ["Klerik", "sp 10"], "Vůle(CHA) vs Vůle(CHA)", "Vymaže vzpomínky cíle na poslední hodinu", 0, 3 * kolo, 0, "dotek", "1 tvor", "10"),
    "zzr": new SpellA("skill/special/kle/bojovniku_viry.png", "Zesil zranění", "2 BP", ["Klerik", "sp 6"], 0, "Zranění způsobené klerikem je v tomto kole dvojnásobné", 0, 0, 1 * kolo, "-", "klerik", "10"),
    //kle lv6+
    "bos": new SpellA("skill/special/kle/PPP0/strazce_mysteria.png", "Beregondovo osvícení", "10", ["Klerik", "sp 21"], "", "Chrání cílovou bytost před následky zranění způsobených nemrtvými či upíry – nevede ke ztrátě úrovně ani proměně v nemrtvého.", "", 1 * kolo, 10 * kolo, "dotek", "1 bytost", "14"),
    "mez": new SpellA("skill/special/kle/PPP0/strazce_mysteria.png", "Mezisvět", "30", ["Klerik", "sp 21"], "", "Cíl je přenesen mezi světy, nemůže útočit, kouzlit ani komunikovat a není možné jej jakkoli zranit. Po skončení se objeví na místě seslání.", "", 1 * kolo, 20 * kolo, "dotek", "1 bytost", "18"),
    "ziv": new SpellA("skill/special/kle/PPP0/strazce_mysteria.png", "Znamení života", "20", ["Klerik", "sp 21"], "", "Cíl dostane božské znamení. Jakmile klesne na Hranici smrti, je okamžitě navrácen do vědomí s 1 životem a efekt zmizí.", "", 1 * kolo, 1 * den, "dotek", "1 bytost", "20"),
    "vhn": new SpellA("skill/special/kle/PPP0/strazce_mysteria.png", "Vyhnání", "7 × X", ["Klerik", "sp 21"], "Vůle (CHAR) vs. Vůle (CHAR)", "Cíl je vyhnán do meziprostoru, kde nemůže jednat ani být zraněn. Neuspěje-li v ověření, je okamžitě přesunut a zanechá éterickou stopu.", "panika při pohledu na stopu", 2 * kolo, "X kol", "10 sáhů", "1 bytost", "18"),
    "anz": new SpellA("skill/special/kle/PPP1/paladinsky_vycvik.png", "Andělská zbroj", "5 + úroveň Klerika", ["Klerik", "sp 29"], "", "Klerika obklopí sférická zbroj, která v každém kole pohlcuje 5 životů utrženého zranění bez ohledu na jeho typ.", "", 1 * kolo, "úroveň klerika kol", "Klerik", "Klerik", "12"),
    "kna": new SpellA("skill/special/kle/PPP1/paladinsky_vycvik.png", "Kladivo na čarodějnice", "8 + úroveň Klerika", ["Klerik", "sp 29"], "", "Klerik přivolá éterické kladivo 8/+5/+3. Nemrtvé, démony a nadpozemské bytosti zraňuje navíc o 1k6 životů.", "1k6 bonusového zranění", 1 * kolo, "úroveň klerika kol", "Klerik", "zbraň Klerika", "15"),
    "pob": new SpellA("skill/special/kle/PPP1/paladinsky_vycvik.png", "Podlom obranu", "3", ["Klerik", "sp 29"], "", "Cíl si hází na obranu dvakrát a použije horší výsledek, což výrazně zvyšuje šanci prorazit jeho obranu.", "nevýhoda k obraně (nižší z dvou hodů)", 1 * kolo, 1 * kolo, "10 sáhů", "1 tvor", "15"),
    "pvt": new SpellA("skill/special/kle/PPP1/paladinsky_vycvik.png", "Požehnej vlastnostem", "3", ["Klerik", "sp 29"], "", "Klerik dočasně zvýší opravu jednoho svého atributu o 1 bod. Lze seslat i během útoku či obrany bez zdržení.", "", 1 * kolo, 10 * kolo, "Klerik", "Klerik", "6"),
    "fal": new SpellA("skill/special/kle/PPP1/inkvizitorsky_vycvik", "Falešná smrt", "15 + úroveň cíle", ["Klerik", "sp 27"], "Vůle (CHAR) vs. Vůle (CHAR) Klerika", "Cíl upadne do stavu klinické smrti, nekrvácí a neprojevují se na něm jedy. Jakékoliv zranění efekt po 2 kolech zruší.", "ochromení bez akcí", 3 * kolo, 1 * hodina, "15 sáhů", "1 tvor", "21"),
    "zad": new SpellA("skill/special/kle/PPP1/inkvizitorsky_vycvik", "Zadrž protivníka", "10 + úroveň tvora", ["Klerik", "sp 27"], "Vůle (CHAR) Klerika vs. Vůle (CHAR) cíle", "Cíl je ochromen a nemůže se hýbat ani mluvit. Útoky na něj se počítají jako na bezbranný cíl. Může se každý tah pokusit odpor zlomit.", "ochromení", 1 * kolo, 5 * kolo, "25 sáhů", "1 tvor", "21"),
    "zde": new SpellA("skill/special/kle/PPP1/inkvizitorsky_vycvik", "Zastavení dění", "12", ["Klerik", "sp 27"], "Vůle (CHAR) Klerika vs. Vůle (CHAR) cíle", "Klerik získá okamžitou iniciativu. Všichni tvorové v dosahu musí přerušit konání a obrátit pozornost ke Klerikovi, pokud neuspějí v ověření.", "kompetentní přerušení akcí", 1 * kolo, 1 * kolo, "kruh o poloměru úrovně Klerika sáhů", "všichni tvorové v dosahu", "15"),
    "zmm": new SpellA("skill/special/kle/PPP1/inkvizitorsky_vycvik", "Zmatení mysli", "12", ["Klerik", "sp 27"], "Vůle (CHAR) vs. Vůle (CHAR) Klerika", "Cíl je uveden do hlubokého duševního chaosu. Náhodné chování: útěk, strnutí či útok na náhodný cíl dle hodu 1k6.", "náhodné chování (útěk / nečinnost / útok)", 1 * kolo, 3 * kolo, "5 sáhů", "1 tvor", "15"),
    "cpp": new SpellA("skill/special/kle/PPP2/exorcismus.png", "Chraň před posednutím", "3 × X", ["Klerik", "sp 8", "sp 34"], "", "Chrání až X tvorů před posednutím a ovládnutím démony. Obvykle se sesílá před vymítáním, aby démon nepřeskočil na jinou oběť.", "imunita vůči posednutí", 1 * kolo, 1 * hodina, "20 sáhů", "X tvorů", "12"),
    "odd": new SpellA("skill/special/kle/PPP2/exorcismus.png", "Odhal démona", "10", ["Klerik", "sp 8", "sp 34"], "", "Zviditelní éterickou podobu nadpozemské bytosti v těle cíle a umožní určit její sílu. Zároveň určí úroveň Vyšší moci démona.", "odhalení nadpozemské bytosti", 1 * kolo, 1 * hodina, "6 sáhů", "1 tvor", "Vyšší moc démona"),
    "ukt": new SpellA("skill/special/kle/PPP2/exorcismus.png", "Ukaž temnotu", "5", ["Klerik", "sp 8", "sp 34"], "", "Zviditelní všechny neviděné, nemrtvé a nadpozemské tvory v dosahu. Efekt je podobný prosbě Najdi temnotu, neodhaluje bytosti v hostiteli.", "zviditelnění temných tvorů", 2 * kolo, 10 * kolo, "koule o poloměru 5 sáhů", "všichni temní tvorové", "12"),
    "vyd": new SpellA("skill/special/kle/PPP2/exorcismus.png", "Vyžeň démona", "5 + 3×", ["Klerik", "sp 8", "sp 34"], "Vůle (CHAR) vs. X", "Klerik vloží potřebnou přízeň dle úrovně Vyšší moci démona. Pokud uspěje v ověření, demon je vyhnán z těla oběti a opustí sféru.", "exorcismus – vyhnání démona", "počet minut odpovídající Vyšší moci", "ihned", "dotek", "posedlá bytost", "Prosby (CHAR) vs X"),
    "pbd": new SpellA("skill/special/kle/PPP2/jazyk_prastarych.png", "Posel bdělosti", "20", ["Klerik", "sp 7", "sp 35"], "", "Klerik vyvolá neviditelného strážce, který hlídá místo až po 1 měsíc za úroveň a mentálně varuje Klerika při ohrožení.", "monitoring místa, varování", 5 * kolo, "úroveň exorcisty měsíců", "5 mil", "hlídané místo", "15"),
    "pdo": new SpellA("skill/special/kle/PPP2/jazyk_prastarych.png", "Posel domény", "30", ["Klerik", "sp 7", "sp 35"], "", "Vyvolá Posla manifestujícího moc božské domény. Efekt se může projevit jako zranění, jev či útok v rozsáhlém prostoru 1k6 životů/sáh.", "1k6 životů za sáh na všechny v oblasti", 3 * kolo, 5 * kolo, "100 sáhů", "kruh o poloměru 30 sáhů", "18"),
    "pol": new SpellA("skill/special/kle/PPP2/jazyk_prastarych.png", "Posel lovec", "15", ["Klerik", "sp 7", "sp 35"], "", "Posel stopuje bytost, která ukradla vzpomínky či úroveň. Dovede Klerika k pachateli a může jej napadnout. Po poražení se vzpomínky vrátí oběti.", "navrácení vzpomínek při porážce cíle", 1 * kolo, 1 * hodina, "—", "1 tvor", "18"),
    "pep": new SpellA("skill/special/kle/PPP2/jazyk_prastarych.png", "Posel pečeti", "8 + 2 za každé další kolo", ["Klerik", "sp 7", "sp 35"], "Vůle (CHAR) vs. Vůle (CHAR) Klerika", "Vyvolá neviditelnou světelnou bariéru chránící vybrané území. Kdo neuspěje v ověření, propadne panice a nedokáže bariérou projít.", "panika znemožňující průchod", 1 * kolo, "úroveň exorcisty měsíců", "30 sáhů", "kruh 1 sáh za úroveň", "10"),
    "bop": new SpellA("skill/special/kle/PPP3/zazraky.png", "Božská pomoc", "30", ["Klerik", "sp 46"], "", "Cíl získá výhodu +5 k útoku, obraně i záchranným hodům. Získá také dočasných 10 + úroveň Klerika životů, které mohou přesáhnout maximum.", "výhoda +5, dočasné životy", 1 * kolo, "úroveň kněze kol", "dotek", "1 bytost", "18"),
    "fig": new SpellA("skill/special/kle/PPP3/zazraky.png", "Figiho zásah osudu", "36", ["Klerik", "sp 46"], "", "Klerik může třikrát během trvání nahradit hod jakékoli Dovednosti, Útoku či Obrany vybraným číslem. Umožňuje měnit výsledek osudu.", "až 3 přepsání hodů", 4 * kolo, 1 * smena, "dotek", "Kněz", "20"),
    "vrc": new SpellA("skill/special/kle/PPP3/zazraky.png", "Vrať čas", "50", ["Klerik", "sp 46"], "", "Vrátí čas v místě o zhruba 6 kol zpět. Klerik a tvorové mimo oblast si pamatují původní průběh událostí, ostatní vše prožijí znovu.", "časový návrat 6 kol", 1 * kolo, "ihned", "100 sáhů", "kruh o poloměru 100 sáhů", "30"),
    "zal": new SpellA("skill/special/kle/PPP3/zazraky.png", "Zachraň život", "40", ["Klerik", "sp 46"], "", "Klerik vyprosí oživení mrtvého, je-li tělo zachováno. Obtížnost roste o 1 za každých 10 minut. Oživený má 1 život. Oba ztrácí EXP na předchozí úroveň.", "oživení mrtvého", 1 * kolo, "ihned", "dotek", "1 bytost", "22"),
    "aur": new Recip("skill/special/kle/PPP3/vycvik_lazaretnich_lecitelu.png", "Lék svatého Aurélia", "30", ["Klerik", "sp 45"], "", "Silný protijed a lék proti sněti, do hodiny neutralizuje otravu a vyléčí 3k6 životů.", "neutralizace otravy, léčení 3k6", "30", "hrst léčivých bylin, pálenka", "1× týdně", 1 * smena, 1 * hodina, "pozření", "10"),
    "jan": new Recip("skill/special/kle/PPP3/vycvik_lazaretnich_lecitelu.png", "Lék svatého Jana", "60", ["Klerik", "sp 45"], "", "Zázračný posilující lék, okamžitě vyléčí 5k6+6 životů a zastaví všechna krvácení.", "léčení 5k6+6, zastavení krvácení", "60", "hrst léčivých bylin, víno", "1× týdně", 4 * smena, "ihned", "pozření", "15"),
    "mau": new Recip("skill/special/kle/PPP3/vycvik_lazaretnich_lecitelu.png", "Lék svatého Maura", "30", ["Klerik", "sp 45"], "", "Okamžitě potlačí bolest a odstraní postihy způsobené bolestí bez ospalosti či otupělosti. Účinek trvá 3 hodiny.", "odstranění bolesti a postihů", "30", "bezinky, voda", "1× denně", 1 * smena, 3 * hodina, "pozření", "15"),
    "nub": new Recip("skill/special/kle/PPP3/vycvik_lazaretnich_lecitelu.png", "Lék svatého Núbia", "30", ["Klerik", "sp 45"], "", "Hojí popáleniny a poleptání, vrací ztracené životy odpovídající zranění. U nových ran regeneruje kůži do týdne.", "hojení popálenin, léčení dle způsobeného zranění", "30", "měsíček lékařský, voda", "1× denně", 10 * kolo, "ihned", "polití", "9"),
    "mer": new Recip("skill/special/kle/PPP3/vycvik_lazaretnich_lecitelu.png", "Mast svaté Meredith", "15", ["Klerik", "sp 45"], "", "Léčí omrzliny a regeneruje tkáň. Vrací životy dle způsobeného zranění. Modřiny mizí během minuty.", "léčení omrzlin a modřin", "15", "dubová kůra, sádlo", "1× denně", 1 * smena, "ihned", "potření", "12"),

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
