import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import Mozaik                          from 'mozaik/ui'
const { BarChart }                    = Mozaik

class BuildTypeBuildsHistogram extends Component {

    static getApiRequest({buildtypeid}) {
        return {
            id:     `teamcity.buildtype.${buildtypeid}`,
            params: { buildtypeid }
        }
    }

    render() {
        const { cap, apiData: { builds } } = this.props

        const cappedBuilds = builds.slice(0, cap).reverse()

        // converts to format required by BarChart component
        const data = cappedBuilds.map(build => ({
            x:      build.id,
            y:      moment.duration(moment(build.finishDate).diff(moment(build.startDate))) / 1000 / 60, // calculate build duration
            result: build.status ? build.status.toLowerCase() : 'unknown'
        }))

        const barChartOptions = {
            mode:            'stacked',
            xLegend:         'build number',
            xLegendPosition: 'right',
            yLegend:         'duration (minutes)',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        d => `result--${ d.result }`
        }

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
        )
    }
}

BuildTypeBuildsHistogram.propTypes = {
    buildtypeid: PropTypes.string.isRequired,
    cap: PropTypes.number.isRequired,
    apiData: PropTypes.array,
}

BuildTypeBuildsHistogram.defaultProps = {
    cap: 50,
    apiData: [],
}

export default BuildTypeBuildsHistogram
