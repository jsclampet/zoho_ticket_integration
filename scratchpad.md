# Requirements
- Prereqs:
- - SDP+ cloud login (username & password)
- - Access token

## Acquiring tokens

Authorization (Zoho)

-Define the scope (ex: SDPOnDemand.requests.CREATE)
-Register your app with Zoho dev console (https://api-console.zoho.com/)
-Send get request to Obtain authorization code through
-Using a code, send get request to retrieve refresh & access tokens
-Use refresh token for post request to get access tokens

Get Requests (ManageEngine):
- 




______________________

Sources:

Prereqs
- https://www.manageengine.com/products/service-desk/sdpod-v3-api/getting-started/prerequisite.html
  
Scopes
- https://www.manageengine.com/products/service-desk/sdpod-v3-api/getting-started/oauth-2.0.html#scopes

Register your app
- https://www.manageengine.com/products/service-desk/sdpod-v3-api/getting-started/oauth-2.0.html#register-your-application

Authorization Request
- https://www.manageengine.com/products/service-desk/sdpod-v3-api/getting-started/oauth-2.0.html#authorization-request

Generate Tokens
- https://www.manageengine.com/products/service-desk/sdpod-v3-api/getting-started/oauth-2.0.html#generate-access-token-and-refresh-token 

Example API Request
-  https://sdpondemand.manageengine.com/api/v3/requests 

Add Request
- https://www.manageengine.com/products/service-desk/sdpod-v3-api/requests/request.html#add-request 


