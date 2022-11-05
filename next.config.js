/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withPlugins([
  withTM,
  withSvgr
])
