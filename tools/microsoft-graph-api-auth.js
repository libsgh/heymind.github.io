const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge, chrome=1" />
    <title>Microsoft Graph API Auth</title>
    <link href='https://fonts.loli.net/icon?family=Material+Icons' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
<body>
    <nav>
        <div class="nav-wrapper">
            <a href="#" class="brand-logo center">Microsoft Graph API Auth</a>
        </div>
    </nav>

    <div class="container">

        <div class="card">
            <div class="card-content">
                <span class="card-title">Prerequisite</span>
                <ol>
                    <li>
                        <p>Open <a
                                href="https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade">https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade</a>
                            to register a new app.</p>
                        <p>This tool requires that the <code>redirect_uri</code> = <code><span
                                    id="location"></span></code></p>
                    </li>
                    <li>
                        <p>Switch to <code>Certificates &amp; secrets</code> tab, create a <code>client secret</code> ,
                            copy
                            and paste it to the input box below.</p>
                    </li>
                    <li>
                        <p>Switch to <code>API permissions</code> tab, add permissions you need.</p>
                        <p>For OneDrive Index purpose, select following permssions: <code>offline_access</code>,
                            <code>Files.Read</code>, <code>Files.Read.All</code> .</p>
                        <p>&nbsp;</p>
                    </li>

                </ol>
            </div>
        </div>

        <form class="card" action="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" method="GET">
            <div class="card-content">
                <span class="card-title">4. Authorize for code</span>
                <div class="input-field">
                    <input placeholder="client_id" name="client_id" type="text">
                    <label for="client_id">Client ID</label>
                </div>
                <div class="input-field">
                    <input placeholder="offline_access," name="scope" type="text"
                        value="offline_access Files.Read Files.Read.All">
                    <label for="scope">Scope</label>
                </div>
                <div class="input-field">
                    <input placeholder="Placeholder" name="redirect_uri" type="text">
                    <label for="redirect_uri">Redirect Uri</label>
                </div>
                <input name="response_type" type="text" hidden value="code">
            </div>
            <div class="card-action">
                <input type="submit" value="Authorize" class="waves-effect waves-teal btn-flat" />
            </div>
        </form>

        <form class="card" action="https://t1.netrss.cf/api/public/onedrive/exchangeToken" method="POST">
            <div class="card-content">
                <span class="card-title">5. Exchange Access Token</span>
                <div class="input-field">
                    <input placeholder="client_id" name="client_id" type="text">
                    <label for="client_id">Client ID</label>
                </div>
                <div class="input-field">
                    <input placeholder="client_secret" name="client_secret" type="text">
                    <label for="client_secret">Client Secret</label>
                </div>
                <div class="input-field">
                    <input placeholder="code" name="code" type="text">
                    <label for="scope">Code</label>
                </div>
                <div class="input-field">
                    <input placeholder="Placeholder" name="redirect_uri" type="text">
                    <label for="redirect_uri">Redirect Uri</label>
                </div>
            </div>
            <input name="grant_type" type="text" hidden value="authorization_code">
            <div class="card-action">
                <input type="submit" value="Get Token" class="waves-effect waves-teal btn-flat" />
            </div>
        </form>


        <form class="card" action="https://t1.netrss.cf/api/public/onedrive/refreshToken" method="POST">
            <div class="card-content">
                <span class="card-title">Refresh Token</span>
                <div class="input-field">
                    <input placeholder="client_id" name="client_id" type="text">
                    <label for="client_id">Client ID</label>
                </div>
                <div class="input-field">
                    <input placeholder="client_secret" name="client_secret" type="text">
                    <label for="client_secret">Client Secret</label>
                </div>
                <div class="input-field">
                    <input placeholder="refresh_token" name="refresh_token" type="text">
                    <label for="refresh_token">Refresh Token</label>
                </div>
                <div class="input-field">
                    <input placeholder="Placeholder" name="redirect_uri" type="text">
                    <label for="redirect_uri">Redirect Uri</label>
                </div>
            </div>
            <input name="grant_type" type="text" hidden value="refresh_token">
            <div class="card-action">
                <input type="submit" value="Get Token" class="waves-effect waves-teal btn-flat" />
            </div>
        </form>


    </div>


  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <style>
        .card-title {
            padding-bottom: 1 rem;
        }
    </style>
    <script>
        function syncField(name, value) {
            if (!value) value = localStorage.getItem(name);
            if (value)
                document.querySelectorAll('input[name='+name+']').forEach(ii => ii.value = value);
            document.querySelectorAll('input[name='+name+']').forEach((i) => i.onchange = (e) => {
                localStorage.setItem(name, e.target.value);
                document
                    .querySelectorAll('input[name='+name+']').forEach(ii => ii.value = e.target.value)
            });
        }
        window.onload = function () {

            syncField("client_id");
            syncField("redirect_uri",  window.location.protocol + "//" + window.location.host + window.location.pathname);
            document.querySelector("#location").textContent = window.location.protocol + "//" + window.location.host + window.location.pathname;


            const params = (new URL(document.location)).searchParams;
            let code = params.get("code");
            if (code) {
                alert('Got Code '+code+'');
                document.querySelector("input[name=code]").value = code;
            }
        }
    </script>
</body>

</html>`

async function handleRequest(request) {
    return new Response(html, {
        headers: {
            "content-type": "text/html;charset=UTF-8",
        },
    })
}

addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event.request))
})
