import test                 from 'ava'
import React                from 'react'
import { shallow }          from 'enzyme'
import Project              from '../../src/components/Project'

const sampleProjectId     = 'mozaik-ext-teamcity'

test('should return correct api request', t => {
    t.deepEqual(Project.getApiRequest({
        projectid:      sampleProjectId
    }), {
        id:     `teamcity.project.${sampleProjectId}`,
        params: {
            projectid: sampleProjectId
        }
    })
})
