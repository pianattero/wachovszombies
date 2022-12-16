const ctx = document.getElementById("canvas").getContext("2d");

const platforms = [
    new Platform(ctx, 1450, 240),
    new Platform(ctx, 1505, 240),
    new Platform(ctx, 1560, 240),
    new Platform(ctx, 1705, 160),

    new Platform(ctx, 2500, 240),
    new Platform(ctx, 3000, 240),
    new Platform(ctx, 3500, 240),

    new Platform(ctx, 4450, 240),
    new Platform(ctx, 4505, 240),
    new Platform(ctx, 4560, 240),

    new Platform(ctx, 5500, 240),
    new Platform(ctx, 6000, 240),
    new Platform(ctx, 6500, 240),

    new Platform(ctx, 7450, 240),
    new Platform(ctx, 7505, 240),
    new Platform(ctx, 7560, 240),
    new Platform(ctx, 7705, 160),

    new Platform(ctx, 8500, 240),
    new Platform(ctx, 9000, 240),
    new Platform(ctx, 9500, 240),
    new Platform(ctx, 10000, 240),
    new Platform(ctx, 10500, 240),

    new Platform(ctx, 11450, 240),
    new Platform(ctx, 11605, 160),
    new Platform(ctx, 11660, 160),
    new Platform(ctx, 11715, 160),

    new Platform(ctx, 12500, 240),
    new Platform(ctx, 13000, 240),
    new Platform(ctx, 13500, 240),

    new Platform(ctx, 14450, 240),
    new Platform(ctx, 14505, 240),
    new Platform(ctx, 14560, 240),

    new Platform(ctx, 16450, 240),
    new Platform(ctx, 16505, 185),
    new Platform(ctx, 16560, 130),

    new Platform(ctx, 17500, 240),
    new Platform(ctx, 18000, 240),
    new Platform(ctx, 18500, 240),
    new Platform(ctx, 19000, 240),
    new Platform(ctx, 19500, 240),

    new Platform(ctx, 20450, 240),
    new Platform(ctx, 20505, 195),
    new Platform(ctx, 20560, 240),

    new Platform(ctx, 21500, 240),
    new Platform(ctx, 22000, 240),
    new Platform(ctx, 22500, 240),
    new Platform(ctx, 23000, 240),

    new Platform(ctx, 23450, 240),
    new Platform(ctx, 23505, 240),
    new Platform(ctx, 23560, 240),
    new Platform(ctx, 23615, 240),
    new Platform(ctx, 23670, 240),
    new Platform(ctx, 23725, 240),
    new Platform(ctx, 23780, 240),

    new Platform(ctx, 24500, 240),
    new Platform(ctx, 25000, 240),

    new Platform(ctx, 25450, 240),
    new Platform(ctx, 25505, 185),
    new Platform(ctx, 25560, 130),
    new Platform(ctx, 25615, 185),
    new Platform(ctx, 25670, 240),

    new Platform(ctx, 26500, 240),
    new Platform(ctx, 27000, 240),
    new Platform(ctx, 27500, 240),

    new Platform(ctx, 28500, 240),
    new Platform(ctx, 28555, 240),
    new Platform(ctx, 28610, 240),

    new Platform(ctx, 29500, 240),
    new Platform(ctx, 30000, 240),
    new Platform(ctx, 30500, 240),

    new Platform(ctx, 31500, 240),
    new Platform(ctx, 31555, 240),
    new Platform(ctx, 31610, 240),
];

const powers = [
    new Powers(ctx, 1712, 125, 35, "bulletsIcon"),
    new Powers(ctx, 6010, 205, 35, "bulletsIcon"),
    new Powers(ctx, 4517, 215, 25, "alfajor"),
    new Powers(ctx, 8508, 205, 35, "bulletsIcon"),
    new Powers(ctx, 7717, 125, 30, "mate"),
    new Powers(ctx, 11726, 125, 25, "ddl"),
    new Powers(ctx, 14516, 215, 30, "chori"),
    new Powers(ctx, 16465, 215, 30, "mate"),
    new Powers(ctx, 16573, 115, 30, "chori"),
    new Powers(ctx, 17508, 205, 35, "bulletsIcon"),
    new Powers(ctx, 19508, 205, 35, "bulletsIcon"),
    new Powers(ctx, 20509, 160, 45, "messi"),
    new Powers(ctx, 21512, 215, 25, "alfajor"),
    new Powers(ctx, 22013, 215, 25, "mate"),
    new Powers(ctx, 22512, 205, 25, "ddl"),
    new Powers(ctx, 23013, 215, 25, "mate"),
    new Powers(ctx, 23515, 205, 30, "chori"),
    new Powers(ctx, 23624, 205, 45, "messi"),
    new Powers(ctx, 23735, 205, 30, "chori"),
    new Powers(ctx, 25458, 205, 35, "bulletsIcon"),
    new Powers(ctx, 25572, 105, 30, "mate"),
    new Powers(ctx, 25678, 205, 35, "bulletsIcon"),
    new Powers(ctx, 28512, 205, 30, "mate"),
    new Powers(ctx, 28622, 205, 30, "chori"),
    new Powers(ctx, 30012, 205, 30, "mate"),
    new Powers(ctx, 31565, 205, 35, "bulletsIcon"),




    

];

const powerBullets = [
    {
        type: "default",
        strength: 20,
        width: 25,
    },
    {
        type: "alfajor",
        strength: 50,
        width: 20,
    },
    {
        type: "ddl",
        strength: 50,
        width: 20,
    },
    {
        type: "chori",
        strength: 100,
        width: 30,
    },
];
