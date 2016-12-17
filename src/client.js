const request = require('superagent');
const config = require('./config');
const Promise = require('bluebird');
const chalk = require('chalk');

const projectBuildStatusTypes = [
    'lastBuild',
    'failure',
    'success'
];


/**
 * Configures and returns TeamCity client.
 *
 * @param {Mozaik} mozaik
 * @returns {Object}
 */
const client = mozaik => {

    mozaik.loadApiConfig(config);
    
    function buildRequest(path) {
        const url = config.get('teamcity.baseUrl') + '/httpAuth' + path;
        let req = request.get(url);

        mozaik.logger.info(chalk.yellow(`[teamcity] fetching from ${ url }`));

        return req
            .auth(
                config.get('teamcity.basicAuthUser'),
                config.get('teamcity.basicAuthPassword')
            )
            .set('Accept', 'application/json')
            .promise()
            .catch(error => {
                mozaik.logger.error(chalk.red(`[teamcity] ${ error.error }`));
                throw error;
            })
        ;
    }

    const apiMethods = {
        buildtype(params) {
            return buildRequest(`/app/rest/builds?locator=buildType:${ params.buildtypeid }&fields=build(id,buildTypeId,number,status,branchName,startDate,finishDate,queuedDate,href,statusText)`)
                .then(res => res.body.build)
            ;
        },

        buildtypebuild(params) {
            var statusFilter = ""
            if(params.statustype != "lastBuild")
                statusFilter = ",status:" + params.statustype;
            
            return buildRequest(`/app/rest/builds?locator=buildType:${ params.buildtypeid }${ statusFilter }&fields=build(id,buildTypeId,number,status,branchName,startDate,finishDate,queuedDate,href,statusText)`)
                .then(res => res.body)
            ;
        },

        project(params) {
            return buildRequest(`/app/rest/projects/id:${ params.projectid }`)
                .then(res => {
                    const project = res.body;
                    const builds = [];
                    
                    // Fetch builds details
                    project.buildTypes.buildType.forEach(buildType => {
                        projectBuildStatusTypes.forEach(statusType => {
                            builds.push(
                                apiMethods.buildtypebuild({
                                    buildtypeid: buildType.id,
                                    statustype: statusType
                                })
                                .then(build => {
                                    buildType[statusType] = build;
                                })
                            );
                        });
                    });

                    return Promise.all(builds)
                        .then(() => project)
                    ;
                })
            ;
        }
    };

    return apiMethods;
};


module.exports = client;
