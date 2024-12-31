module.exports = {
  devServer: {
        proxy: 'http://homeassistant.local:8123/',
        changeOrigin: true
    }
}
