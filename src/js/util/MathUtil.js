
export const MathUtil = {
    randomRange: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    lerp: (v0, v1, t) => v0*(1-t)+v1*t
}