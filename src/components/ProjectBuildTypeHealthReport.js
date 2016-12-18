import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars


class ProjectBuildTypeHealthReport extends Component {
    render() {
        const { builds, cap } = this.props

        let healthBuilds = this.props.builds.slice(0, Math.min(cap, builds.length))
        let failedBuilds = 0
        healthBuilds.forEach(function (build) {
            if(build.status =='FAILURE') {
                failedBuilds++
            }
        })

        let healthReport = 'Build stability: No recent builds failed.'
        if(failedBuilds > 0) {
            healthReport = `Build stability: ${failedBuilds} out of the last ${healthBuilds.length} builds failed.`
        }
        

        if (builds.length === 0) {
            return <td className="table__cell">n/a</td>
        }

        return <td className="table__cell">{healthReport}</td>
    }
}

ProjectBuildTypeHealthReport.propTypes = {
    builds: PropTypes.array,
    buildtype: PropTypes.object.isRequired,
    cap: PropTypes.number.isRequired
}


export default ProjectBuildTypeHealthReport
