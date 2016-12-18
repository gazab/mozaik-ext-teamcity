const convict = require('convict')

const config = convict({
    teamcity: {
        baseUrl: {
            doc:     'The TeamCity API base url.',
            default: null,
            format:  String,
            env:     'TEAMCITY_API_BASE_URL'
        },
        basicAuthUser: {
            doc:     'The TeamCity API basic http auth user.',
            default: null,
            format:  String,
            env:     'TEAMCITY_API_BASIC_AUTH_USER'
        },
        basicAuthPassword: {
            doc:     'The TeamCity API basic http auth password.',
            default: null,
            format:  String,
            env:     'TEAMCITY_API_BASIC_AUTH_PASSWORD'
        }
    }
})


module.exports = config
