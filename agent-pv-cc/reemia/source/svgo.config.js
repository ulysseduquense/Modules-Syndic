module.exports = { multipass: true, floatPrecision: 3,
  plugins: [{ name: "preset-default", params: { overrides: { mergePaths: false, convertShapeToPath: false, moveGroupAttrsToElems: false, collapseGroups: false, convertPathData: { floatPrecision: 3, transformPrecision: 5 } } } }] };
