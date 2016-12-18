import test                 from 'ava'
import React                from 'react'
import { shallow }          from 'enzyme'
import BuildTypeBuilds      from '../../src/components/BuildTypeBuilds'

const sampleBuildType     = 'mozaik-ext-teamcity'

test('should return correct api request', t => {
    t.deepEqual(BuildTypeBuilds.getApiRequest({
        buildtypeid:      sampleBuildType
    }), {
        id:     `teamcity.buildtype.${sampleBuildType}`,
        params: {
            buildtypeid: sampleBuildType
        }
    })
})
