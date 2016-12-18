import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import moment                          from 'moment'


class BuildTypeStatusPreviousBuild extends Component {
    render() {
        const { build } = this.props

        return (
            <div className="teamcity__buildtype-status__previous">
                previous status (#{build.number}) was&nbsp;
                {build.status}&nbsp;
                {moment(build.finishDate).fromNow()}
            </div>
        )
    }
}

BuildTypeStatusPreviousBuild.displayName = 'BuildTypeStatusPreviousBuild'

BuildTypeStatusPreviousBuild.propTypes = {
    build: PropTypes.shape({
        number:    PropTypes.number.isRequired,
        result:    PropTypes.string.isRequired,
        finishDate: PropTypes.number.isRequired
    }).isRequired
}


export default BuildTypeStatusPreviousBuild
