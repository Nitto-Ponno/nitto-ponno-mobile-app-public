// config.js
// production | staging | local

export const ENV = "production";
export const version = "1.0.0";

/*

* .abb file create
cd android && ./gradlew bundleRelease && cd ..

* Xcode open
xed -b ios

* .apk file create
cd android && ./gradlew assembleRelease && cd ..

*/

const CONFIG = {
  production: {
    PUBLISHABLE_KEY: "pk_live_51Rno6sR1chO4uT8zyeunmRgbY2Ne3ps7j8bRhvovyQCVtwE2BSmu4lRVhTDsOkSkJSmQvouSkqk8adO2oSlql9vi00T8SmOFZU",
    WEB_CLIENT_ID: "596070014453-t0ihbklarpuvtaqam39qj8n53l2nkhn6.apps.googleusercontent.com",
    IOS_CLIENT_ID: "596070014453-s5th5ek66v2hl4i19491kb9odmvnit1d.apps.googleusercontent.com",
    ENDPOINT: "https://api.quickskill.ai/api",
    RECAPTCHA_SITE_KEY: "6LdPUK0rAAAAAKgpWjOGvb0UitIvZ0VEMk09qx05",
    FRONTEND_BASEURL: "https://www.quickskill.ai",
  },
  staging: {
    PUBLISHABLE_KEY: "pk_test_51RniirQ065b0TAvF7BAMQdHE11jlOXQLvws87SCNvk4BF7NLU1h6hNeHy7zkpWHr7vYDA1I1YeCykI6zhnx2L8ls00In8MzJ8X",
    WEB_CLIENT_ID: "596070014453-t0ihbklarpuvtaqam39qj8n53l2nkhn6.apps.googleusercontent.com",
    IOS_CLIENT_ID: "596070014453-s5th5ek66v2hl4i19491kb9odmvnit1d.apps.googleusercontent.com",
    ENDPOINT: "https://staging-api.quickskill.ai/api",
    RECAPTCHA_SITE_KEY: "6LeeIKwrAAAAADQ53mNuIxEIJfFzqT1Bf9U_UgOV",
    FRONTEND_BASEURL: "https://staging.quickskill.ai",
  },
  local: {
    PUBLISHABLE_KEY: "pk_test_51NFVeHEKUOzwIx683L2xMmFkit8rUIgoHD6HbR1V9B7f8XMiUXv1ReGRuHsr256st9uut55uQi26jXS741iZB4uE00i46elMQ8",
    WEB_CLIENT_ID: "596070014453-t0ihbklarpuvtaqam39qj8n53l2nkhn6.apps.googleusercontent.com",
    IOS_CLIENT_ID: "596070014453-s5th5ek66v2hl4i19491kb9odmvnit1d.apps.googleusercontent.com",
    ENDPOINT: "http://172.20.20.3:5000/api",
    RECAPTCHA_SITE_KEY: "6LeeIKwrAAAAADQ53mNuIxEIJfFzqT1Bf9U_UgOV",
    FRONTEND_BASEURL: "https://www.quickskill.ai",
  },
};

export default CONFIG[ENV];
