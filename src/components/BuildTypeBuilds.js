import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import BuildTypeBuild                  from './BuildTypeBuild';

class BuildTypeBuilds extends Component {
    static getApiRequest({buildtypid}) {
        
        return {
            id:     `teamcity.buildtype.${buildtypeid}`,
            params: { buildtypeid }
        };
    }

    render() {
        const { title, apiData: builds }  = this.props;

        return (
            <div>
                <div className="widget__header">
                    {title}
                    <span className="widget__header__count">
                        {builds.length}
                    </span>
                    <i className="fa fa-tasks" />
                </div>
                <div className="widget__body">
                    {builds.map(build => (
                        <BuildTypeBuild key={build.number} build={build} />
                    ))}
                </div>
            </div>
        );
    }
}

BuildTypeBuilds.displayName = 'BuildTypeBuilds';

BuildTypeBuilds.propTypes = {
    title: PropTypes.string.isRequired,
    buildtypeid:   PropTypes.string.isRequired,
    apiData: PropTypes.array,
};

BuildTypeBuilds.defaultProps = {
    title: 'TeamCity build type builds',
    apiData: [],
};

export default BuildTypeBuilds;
