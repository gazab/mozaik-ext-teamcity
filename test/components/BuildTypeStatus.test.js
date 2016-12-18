import test                 from 'ava'
import React                from 'react'
import { shallow }          from 'enzyme'
import BuildTypeStatus      from '../../src/components/BuildTypeStatus'

const sampleBuildType     = 'mozaik-ext-teamcity'
const sampleLayout        = 'bold'

test('should return correct api request', t => {
    t.deepEqual(BuildTypeStatus.getApiRequest({
        buildtypeid:      sampleBuildType,
        layout:           sampleLayout
    }), {
        id:     `teamcity.buildtype.${sampleBuildType}`,
        params: {
            buildtypeid: sampleBuildType,
            layout:      sampleLayout
        }
    })
})
