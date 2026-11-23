# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: APIReReouteContinue.spec.js >> end to End flow test
- Location: tests\APIReReouteContinue.spec.js:4:1

# Error details

```
Error: browserContext.close: Test ended.
Browser logs:

<launching> C:\Users\Satyabrata Sahoo\AppData\Local\ms-playwright\firefox-1572\firefox\firefox.exe -no-remote -wait-for-browser -foreground -profile C:\Users\SATYAB~1\AppData\Local\Temp\playwright_firefoxdev_profile-LoKSAL -juggler-pipe -silent
<launched> pid=27096
[pid=27096][err] JavaScript warning: resource://services-settings/Utils.sys.mjs, line 125: unreachable code after return statement
[pid=27096][out] 
[pid=27096][out] Juggler listening to the pipe
[pid=27096][out] console.error: "Warning: unrecognized command line flag" "-foreground"
[pid=27096][err] JavaScript error: chrome://juggler/content/Helper.js, line 82: NS_ERROR_FAILURE: Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIWebProgress.removeProgressListener]
```