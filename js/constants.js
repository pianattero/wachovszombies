const ctx = document.getElementById('canvas').getContext('2d');

const platforms = [
    new Platform(ctx, 300, 240),
]

const powers = [
    new Powers(ctx, 308, 200, 'bulletsIcon')
]