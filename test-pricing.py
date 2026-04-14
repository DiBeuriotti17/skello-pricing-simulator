#!/usr/bin/env python3
"""
Skello Pricing Grid — Automated Tests
Reproduces the pricing engine from index.html and validates against expected values.
"""
import math, sys

INF = float('inf')

GRID_FR = [
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
    [INF,33020,44050,11020,22050,41040,54070,11020]
]

GRID_ESIT = [
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
    [INF,22020,33040,11020,22040,31030,43050,11020]
]

COL = {'planning_standard':1,'planning_max':2,'badgeuse_standard':3,'badgeuse_max':4,'duo_standard':5,'duo_max':6,'rh_expert':7}
WS_PRICE = 40

def lookup_price(employees, pack_key, catalog):
    grid = GRID_ESIT if catalog in ('ES','IT') else GRID_FR
    col = COL.get(pack_key)
    if col is None: return 0
    for row in grid:
        if employees <= row[0]: return row[col]
    return grid[-1][col]

def calc_total(employees, pack, option='none', catalog='FR', freq='monthly', discount=0, workspaces=1):
    pack_price = lookup_price(employees, pack, catalog)
    option_price = lookup_price(employees, 'rh_expert', catalog) if option == 'rh_expert' else 0
    ws_total = WS_PRICE * workspaces
    subtotal = pack_price + option_price + ws_total
    if freq == 'yearly':
        subtotal = round(subtotal * 0.9)
    disc_amt = round(subtotal * discount / 100)
    total = subtotal - disc_amt
    return {'pack': pack_price, 'option': option_price, 'ws': ws_total, 'total': total}

passed = 0
failed = 0

def test(name, config, expected):
    global passed, failed
    r = calc_total(**config)
    if r['total'] == expected:
        passed += 1
        print(f"  \u2705 {name} \u2192 {r['total']} \u20AC")
    else:
        failed += 1
        print(f"  \u274C {name} \u2192 got {r['total']} \u20AC, expected {expected} \u20AC")
        print(f"     detail: pack={r['pack']} option={r['option']} ws={r['ws']}")

print('\n\u2550'*46)
print('  SKELLO PRICING GRID \u2014 TEST SUITE')
print('\u2550'*46 + '\n')

# ── 1. Basic lookups ──
print('\u2500\u2500 1. Basic lookups (FR, monthly, no discount, 1 ws) \u2500\u2500')
test('5 emp, Duo Standard, FR',       dict(employees=5,  pack='duo_standard', catalog='FR'), 59+40)
test('1 emp, Planning Standard, FR',   dict(employees=1,  pack='planning_standard', catalog='FR'), 39+40)
test('20 emp, Duo Standard, FR',       dict(employees=20, pack='duo_standard', catalog='FR'), 119+40)
test('20 emp, Duo Max, FR',            dict(employees=20, pack='duo_max', catalog='FR'), 169+40)
test('100 emp, Planning Max, FR',      dict(employees=100,pack='planning_max', catalog='FR'), 449+40)
test('500 emp, Duo Standard, FR',      dict(employees=500,pack='duo_standard', catalog='FR'), 2040+40)
test('1000 emp, Duo Max, FR',          dict(employees=1000,pack='duo_max', catalog='FR'), 5070+40)
test('10000 emp, Planning Std, FR',    dict(employees=10000,pack='planning_standard', catalog='FR'), 30020+40)

# ── 2. Bracket boundaries ──
print('\n\u2500\u2500 2. Bracket boundaries (FR) \u2500\u2500')
test('6 emp \u2192 bracket \u226410, Duo Std',    dict(employees=6,  pack='duo_standard', catalog='FR'), 79+40)
test('11 emp \u2192 bracket \u226420, Duo Std',   dict(employees=11, pack='duo_standard', catalog='FR'), 119+40)
test('21 emp \u2192 bracket \u226430, Duo Std',   dict(employees=21, pack='duo_standard', catalog='FR'), 159+40)
test('99 emp \u2192 bracket \u2264100, Duo Max',  dict(employees=99, pack='duo_max', catalog='FR'), 569+40)
test('101 emp \u2192 bracket \u2264120, Duo Max', dict(employees=101,pack='duo_max', catalog='FR'), 669+40)
test('501 emp \u2192 bracket \u2264600, Plan Std', dict(employees=501,pack='planning_standard', catalog='FR'), 1820+40)

# ── 3. ES/IT grid ──
print('\n\u2500\u2500 3. ES/IT grid \u2500\u2500')
test('20 emp, Duo Std, ES',   dict(employees=20, pack='duo_standard', catalog='ES'), 89+40)
test('20 emp, Duo Std, IT',   dict(employees=20, pack='duo_standard', catalog='IT'), 89+40)
test('100 emp, Duo Max, ES',  dict(employees=100,pack='duo_max', catalog='ES'), 449+40)
test('500 emp, Plan Max, IT', dict(employees=500,pack='planning_max', catalog='IT'), 1540+40)

# ── 4. With RH Expert ──
print('\n\u2500\u2500 4. With RH Expert option \u2500\u2500')
test('20 emp, Duo Std + RH, FR',    dict(employees=20, pack='duo_standard', option='rh_expert', catalog='FR'), 119+40+40)
test('100 emp, Plan Max + RH, FR',  dict(employees=100,pack='planning_max', option='rh_expert', catalog='FR'), 449+120+40)
test('50 emp, Badge Std + RH, ES',  dict(employees=50, pack='badgeuse_standard', option='rh_expert', catalog='ES'), 69+70+40)

# ── 5. Multiple workspaces ──
print('\n\u2500\u2500 5. Multiple workspaces \u2500\u2500')
test('20 emp, Duo Std, 3 ws, FR',  dict(employees=20, pack='duo_standard', catalog='FR', workspaces=3), 119+120)
test('50 emp, Duo Max, 5 ws, FR',  dict(employees=50, pack='duo_max', catalog='FR', workspaces=5), 319+200)

# ── 6. Yearly (-10%) ──
print('\n\u2500\u2500 6. Yearly frequency (-10%) \u2500\u2500')
test('20 emp, Duo Std, yearly, FR',  dict(employees=20, pack='duo_standard', catalog='FR', freq='yearly'), round((119+40)*0.9))
test('100 emp, Duo Max, yearly, FR', dict(employees=100,pack='duo_max', catalog='FR', freq='yearly'), round((569+40)*0.9))

# ── 7. Discount ──
print('\n\u2500\u2500 7. Discount \u2500\u2500')
test('20 emp, Duo Std, 10% disc',     dict(employees=20, pack='duo_standard', catalog='FR', discount=10), 159-round(159*10/100))
test('100 emp, Duo Max, 15% disc',    dict(employees=100,pack='duo_max', catalog='FR', discount=15), 609-round(609*15/100))

sub_y = round((239+40)*0.9)
test('50 emp, Duo Std, yearly+20% disc', dict(employees=50, pack='duo_standard', catalog='FR', freq='yearly', discount=20), sub_y - round(sub_y*20/100))

# ── 8. Notion reference cases ──
print('\n\u2500\u2500 8. Notion reference cases \u2500\u2500')
test('NOTION #1: 20 emp, Duo Std, FR, monthly', dict(employees=20, pack='duo_standard', catalog='FR'), 159)
test('NOTION #2: 160 emp, Duo Max, FR, monthly', dict(employees=160,pack='duo_max', catalog='FR'), 909)

# ── 9. Full combo ──
print('\n\u2500\u2500 9. Full combo tests \u2500\u2500')
raw1 = 1069 + 220 + 160
sub1 = round(raw1 * 0.9)
exp1 = sub1 - round(sub1 * 5 / 100)
test('200 emp, Duo Max+RH, 4ws, yearly, 5%disc, FR',
     dict(employees=200, pack='duo_max', option='rh_expert', catalog='FR', workspaces=4, freq='yearly', discount=5), exp1)

raw2 = 1020 + 520 + 80
exp2 = raw2 - round(raw2 * 25 / 100)
test('500 emp, Plan Std+RH, 2ws, monthly, 25%disc, ES',
     dict(employees=500, pack='planning_standard', option='rh_expert', catalog='ES', workspaces=2, discount=25), exp2)

# ── 10. Edge cases ──
print('\n\u2500\u2500 10. Edge cases \u2500\u2500')
test('1 emp (minimum), Badge Std, FR',       dict(employees=1,    pack='badgeuse_standard', catalog='FR'), 19+40)
test('10001 emp (overflow), Duo Std, FR',     dict(employees=10001,pack='duo_standard', catalog='FR'), 41040+40)
test('0% discount = no change',               dict(employees=20, pack='duo_standard', catalog='FR', discount=0), 159)
test('100% discount = 0',                     dict(employees=20, pack='duo_standard', catalog='FR', discount=100), 0)

print('\n' + '\u2550'*46)
print(f'  RESULTS: {passed} passed, {failed} failed')
print('\u2550'*46 + '\n')

sys.exit(1 if failed else 0)
