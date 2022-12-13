const ctx = document.getElementById('canvas').getContext('2d');

const platforms = [
    new Platform(ctx, 1450, 240),
    new Platform(ctx, 1505, 240),
    new Platform(ctx, 1560, 240),
    new Platform(ctx, 1705, 160),

    new Platform(ctx, 4450, 240),
    new Platform(ctx, 4505, 240),
    new Platform(ctx, 4560, 240),

    new Platform(ctx, 6450, 240),
    new Platform(ctx, 6505, 240),
    new Platform(ctx, 6560, 240),
    new Platform(ctx, 6705, 160),

    new Platform(ctx, 8450, 240),
    new Platform(ctx, 8605, 160),
    new Platform(ctx, 8660, 160),
    new Platform(ctx, 8715, 160),
]

const powers = [
    new Powers(ctx, 1712, 125, 35, 'bulletsIcon'),
    new Powers(ctx, 4400, 335, 35, 'bulletsIcon'),
    new Powers(ctx, 4517, 215, 25, 'alfajor'),



]

const powerBullets = [
    {
        type: 'default',
        strength: 20,
        width: 25,
    },
    {
        type: 'alfajor',
        strength: 50,
        width: 20,
    },
    {
        type: 'ddl',
        strength: 50,
        width: 20,
    },
    {
        type: 'chori',
        strength: 100,
        width: 30,
    },
]