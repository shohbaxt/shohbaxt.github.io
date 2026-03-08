// One-time script to get a Spotify refresh token
// Step 1: Run this script — it prints a URL
// Step 2: Open the URL, authorize
// Step 3: You'll be redirected to shohbaxt.github.io/now-playing?code=XXXXX
// Step 4: Copy the "code" value from the URL and run:
//         node scripts/get-refresh-token.js PASTE_CODE_HERE

const CLIENT_ID = "fceeb93b54a14acb927d2ee44845e679";
const REDIRECT_URI = "https://shohbaxt.github.io/now-playing";
const SCOPES = "user-library-read user-read-recently-played";

const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_SECRET) {
  console.log("Set SPOTIFY_CLIENT_SECRET environment variable first:");
  console.log('  PowerShell:   $env:SPOTIFY_CLIENT_SECRET="your_secret_here"');
  console.log("  Bash:         export SPOTIFY_CLIENT_SECRET=your_secret_here");
  process.exit(1);
}

const code = process.argv[2];

if (!code) {
  // Step 1: Print auth URL
  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  }).toString()}`;

  console.log("\n1. Open this URL in your browser:\n");
  console.log(authUrl);
  console.log("\n2. Authorize the app.");
  console.log("3. You'll be redirected to shohbaxt.github.io/now-playing?code=XXXXX");
  console.log("4. Copy the 'code' value from the URL bar (everything after ?code=)");
  console.log("5. Run again with the code:\n");
  console.log('   node scripts/get-refresh-token.js "PASTE_CODE_HERE"\n');
} else {
  // Step 2: Exchange code for refresh token
  (async () => {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await res.json();

    if (data.refresh_token) {
      console.log("\nSuccess! Your refresh token:\n");
      console.log(data.refresh_token);
      console.log("\nAdd this as a GitHub secret named SPOTIFY_REFRESH_TOKEN");
    } else {
      console.error("\nError:", data);
    }
  })();
}
