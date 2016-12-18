import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import ProjectBuildType                         from './ProjectBuildType'

class ProjectBuildTypes extends Component {
    render() {
        const { buildtypes } = this.props

        return (
            <table className="table">
                <thead>
                    <tr className="table__row table__row--head">
                        <th className="table__cell table__cell--head" />
                        <th className="table__cell table__cell--head">build type</th>
                        <th className="table__cell table__cell--head">health</th>
                        <th className="table__cell table__cell--head">last success</th>
                        <th className="table__cell table__cell--head">last fail</th>
                        <th className="table__cell table__cell--head">last duration</th>
                    </tr>
                </thead>
                {buildtypes.map(buildtype => (
                    <ProjectBuildType key={buildtype.name} buildtype={buildtype} />
                ))}
            </table>
        )
    }
}

ProjectBuildTypes.propTypes = {
    buildtypes: PropTypes.array.isRequired
}


export default ProjectBuildTypes
