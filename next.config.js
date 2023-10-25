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
    images : {
        domains : [ 'localhost' ] 
    }
}

module.exports = nextConfig
