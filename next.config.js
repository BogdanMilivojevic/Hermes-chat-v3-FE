/** @type {import('next').NextConfig} */
const dotenv = require('dotenv')

dotenv.config()


const path = require('path')
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        API_URL: process.env.API_URL,
    },
}

module.exports = nextConfig
