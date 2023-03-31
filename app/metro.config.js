/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path')
const rootDir = __dirname;
const packageDirs = [path.resolve(__dirname, '../packages/core')]
const watchFolders = [...packageDirs, path.resolve(__dirname, '../node_modules')]

const extraNodeModules = []
for (const packageDir of packageDirs) {
  const pak = require(path.join(packageDir, 'package.json'))
  const modules = Object.keys({
    ...pak.peerDependencies,
    ...pak.devDependencies,
  })
  // extraExclusionlist.push(...modules.map((m) => path.join(packageDir, 'node_modules', m)))

  modules.reduce((acc, name) => {
    acc[name] = path.join(__dirname, 'node_modules', name)
    return acc
  }, extraNodeModules)
}
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      ...extraNodeModules,
      '@aries-bifold/core': `${rootDir}/packages/core`,
    }
  },
  watchFolders
};
