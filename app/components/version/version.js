'use strict';

angular.module('app.version', [
  'app.version.interpolate-filter',
  'app.version.version-directive'
])

.value('version', appConfig.version);
