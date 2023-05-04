/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains : ['styles.redditmedia.com', 'b.thumbs.redditmedia.com', 'a.thumbs.redditmedia.com', 'external-preview.redd.it']
  }
}

module.exports = nextConfig
