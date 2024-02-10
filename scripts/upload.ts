const { exec } = require('child_process');

require('dotenv').config();

(() => {
  exec(
    `kintone-plugin-uploader dist/plugin-dev.zip --base-url ${process.env.KINTONE_URL} --basic-auth-username ${process.env.BASIC_AUTH_USERNAME} \
    --basic-auth-password ${process.env.BASIC_AUTH_PASSWORD} --username ${process.env.LOGIN_NAME} --password ${process.env.LOGIN_PASS} --watch --waiting-dialog-ms 3000`
  );
})();
