import request from 'superagent';
import config  from './config';
import Promise from 'bluebird';
import chalk   from 'chalk';
import fs      from 'fs';
require('superagent-bluebird-promise');


const viewBuildTypes = [
    'lastBuild',
    'lastFailedBuild',
    'lastSuccessfulBuild'
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
        jobs() {
            return buildRequest('/api/json?tree=jobs[name,lastBuild[number,building,timestamp,result]]&pretty=true')
                .then(res => res.body.jobs)
            ;
        },

        buildtype(params) {
            return buildRequest(`/app/rest/builds?locator=buildType:${ params.buildtypeid }&fields=build(id,buildTypeId,number,status,branchName,startDate,finishDate,queuedDate,href,running-info)`)
                .then(res => res.body.build)
            ;
        },

        jobBuild(params) {
            return buildRequest(`/job/${ params.job }/${ params.buildNumber }/api/json?pretty=true`)
                .then(res => res.body)
            ;
        },

        view(params) {
            return buildRequest(`/view/${ params.view }/api/json?pretty=true&depth=1`)
                .then(res => {
                    const view   = res.body;
                    const builds = [];

                    // Fetch builds details
                    view.jobs.forEach(job => {
                        viewBuildTypes.forEach(buildType => {
                            if (job[buildType]) {
                                builds.push(
                                    apiMethods.jobBuild({
                                        job:         job.name,
                                        buildNumber: job[buildType].number
                                    })
                                    .then(build => {
                                        job[buildType] = build;
                                    })
                                );
                            }
                        });
                    });

                    return Promise.all(builds)
                        .then(() => view)
                    ;
                })
            ;
        }
    };

    return apiMethods;
};


export default client;
