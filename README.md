# Mozaïk TeamCity widgets

Based on https://github.com/plouc/mozaik-ext-jenkins

[![License][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
![widget count][widget-count-image]

## TeamCity Client Configuration

In order to use the Mozaïk TeamCity widgets, you must configure its **client**.

### parameters

key                 | env key                          | required | description              | notes
--------------------|----------------------------------|----------|--------------------------|-----------------------------------------------
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

![TeamCity build type builds](https://raw.githubusercontent.com/gazab/mozaik-ext-teamcity/master/preview/teamcity.build_type_builds.png)

> Show TeamCity build type builds.

### parameters

key                | required | description
-------------------|----------|---------------
`buildtypeid`      | yes      | *TeamCity build type identifier*                |
`title`            | no       | *Widget title (`TeamCity build type builds` if none provided)*

### usage

```javascript
{
  type: 'teamcity.build_type_builds',
  buildtypeid: 'my-build-type-id',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## TeamCity Build Type Builds Histogram

![TeamCity build type builds histogram](https://raw.githubusercontent.com/gazab/mozaik-ext-teamcity/master/preview/teamcity.build_type_builds_histogram.png)

> Show TeamCity build type builds histogram.

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

![TeamCity build type status](https://raw.githubusercontent.com/gazab/mozaik-ext-teamcity/master/preview/teamcity.build_type_status.png)

![TeamCity build type status bold](https://raw.githubusercontent.com/gazab/mozaik-ext-teamcity/master/preview/teamcity.build_type_status_bold.png)

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



## TeamCity Project

![TeamCity project](https://raw.githubusercontent.com/gazab/mozaik-ext-teamcity/master/preview/teamcity.project.png)

> List project build types

### parameters

key          | required | description
-------------|----------|---------------
`projectid`  | yes      | *TeamCity project identifier*
`title`      | no       | *widget title (view name used if none provided)*

### usage

```javascript
{
    type: 'teamcity.project',
    projectid: 'my-project-id',
    columns: 2, rows: 1, x: 0, y: 0
}
```


[license-image]: https://img.shields.io/github/license/gazab/mozaik-ext-teamcity.svg?style=flat-square
[license-url]: https://github.com/gazab/mozaik-ext-teamcity/blob/master/LICENSE.md
[npm-image]: https://img.shields.io/npm/v/mozaik-ext-teamcity.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mozaik-ext-teamcity
[widget-count-image]: https://img.shields.io/badge/widgets-x4-green.svg?style=flat-square
