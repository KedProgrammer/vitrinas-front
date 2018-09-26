module.exports = {
  pluginOptions: {
    s3Deploy: {
      region: 'sa-east-1',
      bucket: 'sistema-integral.com',
      assetPath: 'dist',
      deployPath: '/',
      pwa: true,
      pwaFiles: 'service-worker.js',
      enableCloudfront: false,
      uploadConcurrency: 5
    }
  }
}
