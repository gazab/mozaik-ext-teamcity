import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import moment                          from 'moment';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
const { BarChart }                     = Mozaik.Component;


class BuildTypeBuildsHistogram extends Component {
    constructor(props) {
        super(props);

        this.state = { builds: [] };
    }

    getApiRequest() {
        const { buildtypeid } = this.props;

        return {
            id:     `teamcity.buildtype.${buildtypeid}`,
            params: { buildtypeid }
        };
    }

    onApiData(builds) {
        const { cap } = this.props;

        this.setState({ builds: builds.slice(0, cap).reverse() });
    }

    render() {
        const { buildtypeid }    = this.props;
        const { builds } = this.state;

        // converts to format required by BarChart component
        const data = builds.map(build => ({
            x:      build.id,
            y:      moment.duration(moment(build.finishDate).diff(moment(build.startDate))) / 1000 / 60, // calculate build duration
            result: build.status ? build.status.toLowerCase() : 'unknown'
        }));

        const barChartOptions = {
            mode:            'stacked',
            xLegend:         'build number',
            xLegendPosition: 'right',
            yLegend:         'duration (minutes)',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        d => `result--${ d.result }`
        };

        return (
            <div>
                <div className="widget__header">
                    TeamCity <span className="widget__header__subject">{buildtypeid}</span> builds
                    <i className="fa fa-tasks"/>
                </div>
                <div className="widget__body">
                    <BarChart data={[{ data: data }]} options={barChartOptions}/>
                </div>
            </div>
        );
    }
}

BuildTypeBuildsHistogram.displayName = 'BuildTypeBuildsHistogram';

BuildTypeBuildsHistogram.propTypes = {
    buildtypeid: PropTypes.string.isRequired,
    cap: PropTypes.number.isRequired
};

BuildTypeBuildsHistogram.defaultProps = {
    cap: 50
};

reactMixin(BuildTypeBuildsHistogram.prototype, ListenerMixin);
reactMixin(BuildTypeBuildsHistogram.prototype, Mozaik.Mixin.ApiConsumer);

export { BuildTypeBuildsHistogram as default };
