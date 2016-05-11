# Mozaïk TeamCity widgets

[![License][license-image]][license-url]
[![Travis CI][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependencies][gemnasium-image]][gemnasium-url]
[![Coverage Status][coverage-image]][coverage-url]
![widget count][widget-count-image]

## TeamCity Client Configuration

In order to use the Mozaïk TeamCity widgets, you must configure its **client**.

### parameters

key                 | env key                         | required | description             | notes
--------------------|---------------------------------|----------|-------------------------|-----------------------------------------------
`baseUrl`           | TEAMCITY_API_BASE_URL            | yes      | *TeamCity base url*      |
`basicAuthUser`     | TEAMCITY_API_BASIC_AUTH_USER     | yes      | *TeamCity auth user*     |
`basicAuthPassword` | TEAMCITY_API_BASIC_AUTH_PASSWORD | yes      | *TeamCity auth password* |

### usage

```javascript
{
  //…
  api: {
    teamcity: {
      baseUrl: 'https://my-teamcity.ci',
        basicAuthUser:     'user',
        basicAuthPassword: 'password'
    }
  }
}
```



## TeamCity Build Type Builds

![jenkins job builds](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.job_builds.png)

> Show TeamCity build type builds.

### parameters

key                | required | description
-------------------|----------|---------------
`buildtypeid`      | yes      | *TeamCity build type identifier*                |
`title`            | no       | *Widget title (`TeamCity job builds` if none provided)*

### usage

```javascript
{
  type: 'teamcity.build_type_builds',
  buildtypeid: 'my-build-type-id',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## TeamCity Job Builds Histogram

![TeamCity job builds histogram](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.job_builds_histogram.png)

> Show TeamCity job builds histogram.

### parameters

key            | required | description
---------------|----------|-------------------------------------------------|
`buildtypeid`  | yes      | *TeamCity build type identifier*                |
`title`        | no       | *widget title (view name used if none provided)*|
`cap`          | no       | *number of builds to show*                      |

### usage

```javascript
{
  type: 'teamcity.build_type_builds_histogram',
  buildtypeid: 'my-buildtype-id',
  columns: 2, rows: 1, x: 0, y: 0
}
```



## TeamCity Build Type Status

![TeamCity job status](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.job_status.png)

![TeamCity job status bold](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.job_status_bold.png)

> Display build type current build status.

### parameters

key            | required |description                                      | notes
---------------|----------|-------------------------------------------------|-----------------------------------------
`buildtypeid`  | yes      | *TeamCity build type identifier*                |     |
`layout`       | no       | *widget layout* (none for default or 'bold')    | 
`title`        | no       | *widget title (view name used if none provided)*|

### usage

```javascript
{
  type: 'teamcity.build_type_status', buildtypeid: 'my-buildtype-id',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## TeamCity View

![TeamCity view](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.view.png)

> List view jobs

### parameters

key     | required | description
--------|----------|---------------
`view`  | yes      | *TeamCity view identifier*
`title` | no       | *widget title (view name used if none provided)*

### usage

```javascript
{
    type: 'teamcity.view', view: 'dev-env',
    columns: 2, rows: 1, x: 0, y: 0
}
```


[license-image]: https://img.shields.io/github/license/plouc/mozaik-ext-jenkins.svg?style=flat-square
[license-url]: https://github.com/plouc/mozaik-ext-jenkins/blob/master/LICENSE.md
[travis-image]: https://img.shields.io/travis/plouc/mozaik-ext-jenkins.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/mozaik-ext-jenkins
[npm-image]: https://img.shields.io/npm/v/mozaik-ext-jenkins.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mozaik-ext-jenkins
[gemnasium-image]: https://img.shields.io/gemnasium/plouc/mozaik-ext-jenkins.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/plouc/mozaik-ext-jenkins
[coverage-image]: https://img.shields.io/coveralls/plouc/mozaik-ext-jenkins.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/plouc/mozaik-ext-jenkins
[widget-count-image]: https://img.shields.io/badge/widgets-x4-green.svg?style=flat-square
