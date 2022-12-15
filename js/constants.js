const ctx = document.getElementById("canvas").getContext("2d");

const platforms = [
    new Platform(ctx, 1450, 240),
    new Platform(ctx, 1505, 240),
    new Platform(ctx, 1560, 240),
    new Platform(ctx, 1705, 160),

    new Platform(ctx, 4450, 240),
    new Platform(ctx, 4505, 240),
    new Platform(ctx, 4560, 240),

    new Platform(ctx, 7450, 240),
    new Platform(ctx, 7505, 240),
    new Platform(ctx, 7560, 240),
    new Platform(ctx, 7705, 160),

    new Platform(ctx, 11450, 240),
    new Platform(ctx, 11605, 160),
    new Platform(ctx, 11660, 160),
    new Platform(ctx, 11715, 160),

    new Platform(ctx, 14450, 240),
    new Platform(ctx, 14505, 240),
    new Platform(ctx, 14560, 240),

    new Platform(ctx, 16450, 240),
    new Platform(ctx, 16505, 185),
    new Platform(ctx, 16560, 130),

    new Platform(ctx, 20450, 240),
    new Platform(ctx, 20505, 195),
    new Platform(ctx, 20560, 240),

    new Platform(ctx, 23450, 240),
    new Platform(ctx, 23505, 240),
    new Platform(ctx, 23560, 240),
    new Platform(ctx, 23560, 240),
    new Platform(ctx, 23560, 240),

    new Platform(ctx, 25450, 240),
    new Platform(ctx, 25505, 185),
    new Platform(ctx, 25560, 130),
    new Platform(ctx, 25560, 185),
    new Platform(ctx, 25560, 240),
];

const powers = [
    new Powers(ctx, 1712, 125, 35, "bulletsIcon"),
    new Powers(ctx, 4400, 335, 35, "bulletsIcon"),
    new Powers(ctx, 4517, 215, 25, "alfajor"),
    new Powers(ctx, 7513, 205, 35, "bulletsIcon"),
    new Powers(ctx, 7717, 125, 30, "mate"),
    new Powers(ctx, 11726, 125, 25, "ddl"),
    new Powers(ctx, 14516, 215, 30, "chori"),
    new Powers(ctx, 16465, 215, 30, "mate"),
    new Powers(ctx, 16575, 125, 30, "chori"),
    new Powers(ctx, 20512, 180, 45, "messi"),
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
