var actionCards = [
    //production cards
    {'name': 'Giant Space Mirror', 'cost': 17, 'action': {'production': {'energy': 3}}},
    {'name': 'Geothermal Power', 'cost': 11, 'action': {'production': {'energy': 2}}},
    {'name': 'Strip Mine', 'cost': 25, 'action': {'production': {'steel': 2, 'titanium': 1, 'energy': -2}, 'status': {'oxygen': 2}}},
    {'name': 'Deep Well Heating', 'cost': 13, 'action': {'production': {'energy': 1}, 'status': {'temperature': 1}}},
    {'name': 'Peroxide Power', 'cost': 7, 'action': {'production': {'money': -1, 'energy': 2}}},
    {'name': 'Rad-Chem Factory', 'cost': 8, 'action': {'production': {'energy': -1}, 'tr': 2}},
    {'name': 'Power Plant', 'cost': 4, 'action': {'production': {'energy': 1}}},
    {'name': 'Adapted Lichen', 'cost': 9, 'action': {'production': {'plant': 1}}},
    {'name': 'Carbonate Processing', 'cost': 6, 'action': {'production': {'energy': -1, 'heat': 3}}},
    {'name': 'Micro-Mills', 'cost': 3, 'action': {'production': {'heat': 1}}},
    {'name': 'Magnetic Field Dome', 'cost': 5, 'action': {'production': {'plant': 1, 'energy': -2}, 'tr': 1}},
    {'name': 'Import of Advanced GHG', 'cost': 9, 'action': {'production': {'heat': 2}}},
    {'name': 'Nuclear Power', 'cost': 10, 'action': {'production': {'money': -2, 'energy': 3}}},
    {'name': 'Soletta', 'cost': 35, 'action': {'production': {'heat': 7}}},
    {'name': 'Magnetic Field Generators', 'cost': 20, 'action': {'production': {'plant': 2, 'energy': -4}, 'tr': 3}},
    {'name': 'Fueled Generators', 'cost': 1, 'action': {'production': {'money': -1, 'energy': 1}}},
    {'name': 'GHG Factories', 'cost': 11, 'action': {'production': {'energy': -1, 'heat': 4}}},
    {'name': 'Lunar Beam', 'cost': 13, 'action': {'production': {'money': -2, 'energy': 2, 'heat': 2}}},
    {'name': 'Industrial Microbes', 'cost': 12, 'action': {'production': {'steel': 1, 'energy': 1}}},
    //bank cards
    {'name': 'Release of Inert Gas', 'cost': 14, 'action': {'tr': 2}},
    {'name': 'Imported GHG', 'cost': 7, 'action': {'bank': {'energy': }}},
    {'name': '', 'cost': , 'action': {'bank': {'energy': }}},
    //tile cards
    {'name': 'Black Polar Dust', 'cost': 15, 'action': {'production': {'money': -2, 'heat': 3}, 'tile': {'ocean': 1}}},

    //return to
    {'name': 'Power Grid', 'cost': 18, 'action': {'production': {'heat': }}},
    {'name': 'Artificial Photosynthesis', 'cost': 12, 'action': {'production': {'energy': 2}}},
];
//name
//cost
//action
    //production (money, steel, titanium, plant, energy, heat)
    //status (oxygen, temperature etc.)
    //tr
    //tile (ocean)
