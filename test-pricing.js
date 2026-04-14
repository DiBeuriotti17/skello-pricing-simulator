#!/usr/bin/env node
/**
 * Skello Pricing Grid — Automated Tests
 * Reproduces the pricing engine from index.html and validates against expected values.
 */

// ── Grids (copy from index.html) ──
const GRID_FR = [
    [5,39,69,19,49,59,89,20],[10,49,89,29,69,79,119,30],[20,79,129,39,89,119,169,40],
    [30,109,169,49,109,159,219,50],[40,139,209,59,129,199,269,60],[50,169,249,69,149,239,319,70],
    [60,199,289,79,169,279,369,80],[70,229,329,89,189,319,419,90],[80,259,369,99,209,359,469,100],
    [90,289,409,109,229,399,519,110],[100,319,449,119,249,439,569,120],[120,379,529,139,289,519,669,140],
    [140,439,609,159,329,599,769,160],[160,499,689,179,369,679,869,180],[180,559,769,199,409,759,969,200],
    [200,619,849,219,449,839,1069,220],[250,770,1050,270,550,1040,1320,270],[300,920,1250,320,650,1240,1570,320],
    [350,1070,1450,370,750,1440,1820,370],[400,1220,1650,420,850,1640,2070,420],
    [450,1370,1850,470,950,1840,2320,470],[500,1520,2050,520,1050,2040,2570,520],
    [600,1820,2450,620,1250,2440,3070,620],[700,2120,2850,720,1450,2840,3570,720],
    [800,2420,3250,820,1650,3240,4070,820],[900,2720,3650,920,1850,3640,4570,920],
    [1000,3020,4050,1020,2050,4040,5070,1020],[1100,3320,4450,1120,2250,4440,5570,1120],
    [1200,3620,4850,1220,2450,4840,6070,1220],[1300,3920,5250,1320,2650,5240,6570,1320],
    [1400,4220,5650,1420,2850,5640,7070,1420],[1500,4520,6050,1520,3050,6040,7570,1520],
    [1600,4820,6450,1620,3250,6440,8070,1620],[1700,5120,6850,1720,3450,6840,8570,1720],
    [1800,5420,7250,1820,3650,7240,9070,1820],[1900,5720,7650,1920,3850,7640,9570,1920],
    [2000,6020,8050,2020,4050,8040,10070,2020],[2500,7520,10050,2520,5050,10040,12570,2520],
    [3000,9020,12050,3020,6050,12040,15070,3020],[3500,10520,14050,3520,7050,14040,17570,3520],
    [4000,12020,16050,4020,8050,16040,20070,4020],[4500,13520,18050,4520,9050,18040,22570,4520],
    [5000,15020,20050,5020,10050,20040,25070,5020],[6000,18020,24050,6020,12050,24040,30070,6020],
    [7000,21020,28050,7020,14050,28040,35070,7020],[8000,24020,32050,8020,16050,32040,40070,8020],
    [9000,27020,36050,9020,18050,36040,45070,9020],[10000,30020,40050,10020,20050,40040,50070,10020],
    [Infinity,33020,44050,11020,22050,41040,54070,11020]
];

const GRID_ESIT = [
    [5,29,49,19,39,49,69,20],[10,39,69,29,59,59,89,30],[20,59,99,39,79,89,129,40],
    [30,79,129,49,99,119,169,50],[40,99,159,59,119,149,209,60],[50,119,189,69,139,179,249,70],
    [60,139,219,79,159,209,289,80],[70,159,249,89,179,239,329,90],[80,179,279,99,199,269,369,100],
    [90,199,309,109,219,299,409,110],[100,219,339,119,239,329,449,120],[120,259,399,139,279,389,529,140],
    [140,299,459,159,319,449,609,160],[160,339,519,179,359,509,689,180],[180,379,579,199,399,569,769,200],
    [200,419,639,219,439,629,849,220],[250,520,790,270,540,780,1050,270],[300,620,940,320,640,930,1250,320],
    [350,720,1090,370,740,1080,1450,370],[400,820,1240,420,840,1230,1650,420],
    [450,920,1390,470,940,1380,1850,470],[500,1020,1540,520,1040,1530,2050,520],
    [600,1220,1840,620,1240,1830,2450,620],[700,1420,2140,720,1440,2130,2850,720],
    [800,1620,2440,820,1640,2430,3250,820],[900,1820,2740,920,1840,2730,3650,920],
    [1000,2020,3040,1020,2040,3030,4050,1020],[1100,2220,3340,1120,2240,3330,4450,1120],
    [1200,2420,3640,1220,2440,3630,4850,1220],[1300,2620,3940,1320,2640,3930,5250,1320],
    [1400,2820,4240,1420,2840,4230,5650,1420],[1500,3020,4540,1520,3040,4530,6050,1520],
    [1600,3220,4840,1620,3240,4830,6450,1620],[1700,3420,5140,1720,3440,5130,6850,1720],
    [1800,3620,5440,1820,3640,5430,7250,1820],[1900,3820,5740,1920,3840,5730,7650,1920],
    [2000,4020,6040,2020,4040,6030,8050,2020],[2500,5020,7540,2520,5040,7530,10050,2520],
    [3000,6020,9040,3020,6040,9030,12050,3020],[3500,7020,10540,3520,7040,10530,14050,3520],
    [4000,8020,12040,4020,8040,12030,16050,4020],[4500,9020,13540,4520,9040,13530,18050,4520],
    [5000,10020,15040,5020,10040,15030,20050,5020],[6000,12020,18040,6020,12040,18030,24050,6020],
    [7000,14020,21040,7020,14040,21030,28050,7020],[8000,16020,24040,8020,16040,24030,32050,8020],
    [9000,18020,27040,9020,18040,27030,36050,9020],[10000,20020,30040,10020,20040,30030,40050,10020],
    [Infinity,22020,33040,11020,22040,31030,43050,11020]
];

const COL = { planning_standard:1, planning_max:2, badgeuse_standard:3, badgeuse_max:4, duo_standard:5, duo_max:6, rh_expert:7 };
const WS_PRICE = 40;

// ── Engine (identical to index.html) ──
function lookupPrice(employees, packKey, catalog) {
    const grid = (catalog === 'ES' || catalog === 'IT') ? GRID_ESIT : GRID_FR;
    const col = COL[packKey];
    if (col === undefined) return 0;
    for (const row of grid) {
        if (employees <= row[0]) return row[col];
    }
    return grid[grid.length - 1][col];
}

function calcTotal({ employees, pack, option = 'none', catalog = 'FR', freq = 'monthly', discount = 0, workspaces = 1 }) {
    const packPrice = lookupPrice(employees, pack, catalog);
    const optionPrice = option === 'rh_expert' ? lookupPrice(employees, 'rh_expert', catalog) : 0;
    const wsTotal = WS_PRICE * workspaces;
    let subtotal = packPrice + optionPrice + wsTotal;
    if (freq === 'yearly') subtotal = Math.round(subtotal * 0.9);
    const discAmt = Math.round(subtotal * discount / 100);
    const total = subtotal - discAmt;
    return { packPrice, optionPrice, wsTotal, subtotal: packPrice + optionPrice + wsTotal, total };
}

// ── Tests ──
let passed = 0, failed = 0;

function test(name, config, expected) {
    const result = calcTotal(config);
    const ok = result.total === expected;
    if (ok) {
        passed++;
        console.log(`  ✅ ${name} → ${result.total} €`);
    } else {
        failed++;
        console.log(`  ❌ ${name} → got ${result.total} €, expected ${expected} €`);
        console.log(`     detail: pack=${result.packPrice} option=${result.optionPrice} ws=${result.wsTotal}`);
    }
}

console.log('\n══════════════════════════════════════════');
console.log('  SKELLO PRICING GRID — TEST SUITE');
console.log('══════════════════════════════════════════\n');

// ─────────────────────────────────────────
// 1. BASIC LOOKUPS — FR Grid, exact bracket boundaries
// ─────────────────────────────────────────
console.log('── 1. Basic lookups (FR, monthly, no discount, 1 ws) ──');

test('5 emp, Duo Standard, FR',
    { employees: 5, pack: 'duo_standard', catalog: 'FR' },
    59 + 40);  // pack=59, ws=40

test('1 emp, Planning Standard, FR',
    { employees: 1, pack: 'planning_standard', catalog: 'FR' },
    39 + 40);  // bracket ≤5: pack=39

test('20 emp, Duo Standard, FR',
    { employees: 20, pack: 'duo_standard', catalog: 'FR' },
    119 + 40);  // pack=119, ws=40

test('20 emp, Duo Max, FR',
    { employees: 20, pack: 'duo_max', catalog: 'FR' },
    169 + 40);  // pack=169

test('100 emp, Planning Max, FR',
    { employees: 100, pack: 'planning_max', catalog: 'FR' },
    449 + 40);

test('500 emp, Duo Standard, FR',
    { employees: 500, pack: 'duo_standard', catalog: 'FR' },
    2040 + 40);

test('1000 emp, Duo Max, FR',
    { employees: 1000, pack: 'duo_max', catalog: 'FR' },
    5070 + 40);

test('10000 emp, Planning Standard, FR',
    { employees: 10000, pack: 'planning_standard', catalog: 'FR' },
    30020 + 40);

// ─────────────────────────────────────────
// 2. BRACKET BOUNDARY (employees between brackets → round UP)
// ─────────────────────────────────────────
console.log('\n── 2. Bracket boundaries (FR) ──');

test('6 emp → bracket ≤10, Duo Std',
    { employees: 6, pack: 'duo_standard', catalog: 'FR' },
    79 + 40);  // falls in ≤10 bracket

test('11 emp → bracket ≤20, Duo Std',
    { employees: 11, pack: 'duo_standard', catalog: 'FR' },
    119 + 40);

test('21 emp → bracket ≤30, Duo Std',
    { employees: 21, pack: 'duo_standard', catalog: 'FR' },
    159 + 40);

test('99 emp → bracket ≤100, Duo Max',
    { employees: 99, pack: 'duo_max', catalog: 'FR' },
    569 + 40);

test('101 emp → bracket ≤120, Duo Max',
    { employees: 101, pack: 'duo_max', catalog: 'FR' },
    669 + 40);

test('501 emp → bracket ≤600, Planning Std',
    { employees: 501, pack: 'planning_standard', catalog: 'FR' },
    1820 + 40);

// ─────────────────────────────────────────
// 3. ES/IT GRID
// ─────────────────────────────────────────
console.log('\n── 3. ES/IT grid ──');

test('20 emp, Duo Standard, ES',
    { employees: 20, pack: 'duo_standard', catalog: 'ES' },
    89 + 40);

test('20 emp, Duo Standard, IT',
    { employees: 20, pack: 'duo_standard', catalog: 'IT' },
    89 + 40);

test('100 emp, Duo Max, ES',
    { employees: 100, pack: 'duo_max', catalog: 'ES' },
    449 + 40);

test('500 emp, Planning Max, IT',
    { employees: 500, pack: 'planning_max', catalog: 'IT' },
    1540 + 40);

// ─────────────────────────────────────────
// 4. WITH OPTIONS (RH Expert)
// ─────────────────────────────────────────
console.log('\n── 4. With RH Expert option ──');

test('20 emp, Duo Std + RH Expert, FR',
    { employees: 20, pack: 'duo_standard', option: 'rh_expert', catalog: 'FR' },
    119 + 40 + 40);  // duo=119, rh=40, ws=40

test('100 emp, Planning Max + RH Expert, FR',
    { employees: 100, pack: 'planning_max', option: 'rh_expert', catalog: 'FR' },
    449 + 120 + 40);

test('50 emp, Badgeuse Std + RH Expert, ES',
    { employees: 50, pack: 'badgeuse_standard', option: 'rh_expert', catalog: 'ES' },
    69 + 70 + 40);

// ─────────────────────────────────────────
// 5. MULTIPLE WORKSPACES
// ─────────────────────────────────────────
console.log('\n── 5. Multiple workspaces ──');

test('20 emp, Duo Std, 3 ws, FR',
    { employees: 20, pack: 'duo_standard', catalog: 'FR', workspaces: 3 },
    119 + 120);  // 3 × 40 = 120

test('50 emp, Duo Max, 5 ws, FR',
    { employees: 50, pack: 'duo_max', catalog: 'FR', workspaces: 5 },
    319 + 200);

// ─────────────────────────────────────────
// 6. YEARLY FREQUENCY (-10%)
// ─────────────────────────────────────────
console.log('\n── 6. Yearly frequency (-10%) ──');

test('20 emp, Duo Std, yearly, FR',
    { employees: 20, pack: 'duo_standard', catalog: 'FR', freq: 'yearly' },
    Math.round((119 + 40) * 0.9));  // 143

test('100 emp, Duo Max, yearly, FR',
    { employees: 100, pack: 'duo_max', catalog: 'FR', freq: 'yearly' },
    Math.round((569 + 40) * 0.9));  // 548

// ─────────────────────────────────────────
// 7. DISCOUNT
// ─────────────────────────────────────────
console.log('\n── 7. Discount ──');

test('20 emp, Duo Std, 10% disc, FR',
    { employees: 20, pack: 'duo_standard', catalog: 'FR', discount: 10 },
    159 - Math.round(159 * 10 / 100));  // 159 - 16 = 143

test('100 emp, Duo Max, 15% disc, FR',
    { employees: 100, pack: 'duo_max', catalog: 'FR', discount: 15 },
    609 - Math.round(609 * 15 / 100));

test('50 emp, Duo Std, yearly + 20% disc, FR',
    { employees: 50, pack: 'duo_standard', catalog: 'FR', freq: 'yearly', discount: 20 },
    (() => {
        let sub = Math.round((239 + 40) * 0.9); // 251
        return sub - Math.round(sub * 20 / 100);  // 251 - 50 = 201
    })());

// ─────────────────────────────────────────
// 8. PREVIOUS SESSION TEST CASES (from Notion)
// ─────────────────────────────────────────
console.log('\n── 8. Notion reference cases ──');

// Case 1: 20 emp, Duo Standard, FR, monthly, 0% disc, 1 ws → 159 €
test('NOTION #1: 20 emp, Duo Std, FR, monthly',
    { employees: 20, pack: 'duo_standard', catalog: 'FR' },
    159);

// Case 2: 160 emp, Duo Max, FR, monthly, 0% disc, 1 ws → 909 €
test('NOTION #2: 160 emp, Duo Max, FR, monthly',
    { employees: 160, pack: 'duo_max', catalog: 'FR' },
    909);

// ─────────────────────────────────────────
// 9. COMBO: options + workspaces + yearly + discount
// ─────────────────────────────────────────
console.log('\n── 9. Full combo tests ──');

test('200 emp, Duo Max + RH, 4 ws, yearly, 5% disc, FR',
    { employees: 200, pack: 'duo_max', option: 'rh_expert', catalog: 'FR', workspaces: 4, freq: 'yearly', discount: 5 },
    (() => {
        const raw = 1069 + 220 + 160; // duo_max=1069, rh=220, 4×40=160
        let sub = Math.round(raw * 0.9);
        return sub - Math.round(sub * 5 / 100);
    })());

test('500 emp, Planning Std + RH, 2 ws, monthly, 25% disc, ES',
    { employees: 500, pack: 'planning_standard', option: 'rh_expert', catalog: 'ES', workspaces: 2, discount: 25 },
    (() => {
        const raw = 1020 + 520 + 80;
        return raw - Math.round(raw * 25 / 100);
    })());

// ─────────────────────────────────────────
// 10. EDGE CASES
// ─────────────────────────────────────────
console.log('\n── 10. Edge cases ──');

test('1 emp (minimum), Badgeuse Std, FR',
    { employees: 1, pack: 'badgeuse_standard', catalog: 'FR' },
    19 + 40);

test('10001 emp (beyond grid → Infinity row), Duo Std, FR',
    { employees: 10001, pack: 'duo_standard', catalog: 'FR' },
    41040 + 40);

test('0% discount = no change',
    { employees: 20, pack: 'duo_standard', catalog: 'FR', discount: 0 },
    159);

test('100% discount = 0',
    { employees: 20, pack: 'duo_standard', catalog: 'FR', discount: 100 },
    0);

// ── Summary ──
console.log('\n══════════════════════════════════════════');
console.log(`  RESULTS: ${passed} passed, ${failed} failed`);
console.log('══════════════════════════════════════════\n');

process.exit(failed > 0 ? 1 : 0);
