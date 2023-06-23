export const environment = {
  production: false,
  environment: "PRODUCTION",
  showEnvironment: true,
  loginApiUrl: "https://emislogin.tnschools.gov.in/emis_login/api/ATSLlogin",
  telemetryContext: {
    authToken: '',
    batchSize: 10,
    channel: "mozhigal",
    pdata: { // Optional. Producer of the event
      id: "languagelab.portal", // Required. unique id assigned to that component
      pid: "languagelab.portal.portal", // Optional. In case the component is distributed, then which instance of that component
      ver: "0.0.3"// Optional. version number of the build
    },
    host: "https://telemetry-dev.theall.ai",
    env: "languagelab.portal", // Required. Unique environment where the event has occured.
    apislug: '/v1/mysql/',
    endpoint: 'telemetry'
  }
};
