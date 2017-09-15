from django.shortcuts import render
from django.http import HttpResponse
from api.models import UsersInfo
from oauth2client import client, crypt
import urllib.request
import json
# Create your views here.
import json

def loginUser(request):
    if request.method == "POST":
        x = UsersInfo()
        x.name ='Peeyush1'
        x.mail='dsd'
        #x.save()
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print (body)


    token = json.loads(request.GET['updates'])['value']
    googleApiResponse = urllib.request.urlopen("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+ token).read()
    resJSON = json.loads(googleApiResponse)
    try:
        idinfo = client.verify_id_token(token, None)

        # Or, if multiple clients access the backend server:
        #idinfo = client.verify_id_token(token, None)
        #if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
        #    raise crypt.AppIdentityError("Unrecognized client.")

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise crypt.AppIdentityError("Wrong issuer.")

        # If auth request is from a G Suite domain:
        #if idinfo['hd'] != GSUITE_DOMAIN_NAME:
        #    raise crypt.AppIdentityError("Wrong hosted domain.")
    except crypt.AppIdentityError:
        raise crypt.AppIdentityError("Wrong issuer.")

    return HttpResponse(json.dumps({'email': resJSON['email'],'id': 'number','username' : resJSON['name']}), content_type="application/json")
