const ctx = document.getElementById('canvas').getContext('2d');

const platforms = [
    new Platform(ctx, 450, 240),
    new Platform(ctx, 505, 240),
    new Platform(ctx, 560, 240),

    new Platform(ctx, 2450, 240),
    new Platform(ctx, 2505, 240),
    new Platform(ctx, 2560, 240),
    new Platform(ctx, 2705, 160),
]

const powers = [
    new Powers(ctx, 510, 200, 'bulletsIcon'),
    new Powers(ctx, 2710, 120, 'bulletsIcon'),
]

const powerBullets = [
    {
        type: 'default',
        strength: 20,
        width: 20,
    },
    {
        type: 'ddl',
        strength: 50,
        width: 30,
    },
    {
        type: 'chori',
        strength: 100,
        width: 20,
    },
]