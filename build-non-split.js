const rewire = require('rewire')
const defaults = rewire('react-scripts/scripts/build.js')
let config = defaults.__get__('config')

config.optimization.splitChunks = {
	cacheGroups: {
		default: false
	}
}
config.resolve.fallback= { "punycode": false }

config.optimization.runtimeChunk = false
config.output.filename = 'static/js/[name].js'
config.plugins['5'].options.filename = 'static/css/[name].css'
config.plugins['5'].options.moduleFilename = () => 'static/css/main.css'
