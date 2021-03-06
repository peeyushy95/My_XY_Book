from django.shortcuts import render
from django.http import HttpResponse
from api.models import UsersInfo, Topics, TopicMap, TopicBook
from oauth2client import client, crypt
from django.core import serializers
import urllib.request
import json
# Create your views here.
import json


def deleteTopics(request):
    body_unicode = request.body.decode('utf-8')
    request_body = json.loads(body_unicode)

    #user_id = request_body[0]['userId']

    for topic in request_body :
        db_topic = Topics()
        db_topic.user_id = topic['userId']
        db_topic.desc = topic['desc']
        db_topic.topicId = topic['topicId']
        db_topic.delete()

    return HttpResponse(json.dumps({ 'deleted': 'true'}), content_type="application/json")


def createTopic(request):
    body_unicode = request.body.decode('utf-8')
    request_body = json.loads(body_unicode)

    topic = Topics()
    topic.user_id = request_body['userId']
    topic.desc = request_body['desc']
    topic.save()

    return HttpResponse(json.dumps(topic.as_json()),content_type="application/json")

def updateTopicMap(request):
    body_unicode = request.body.decode('utf-8')
    request_body = json.loads(body_unicode)
    topicMap = TopicMap.objects.get(mapId=request_body['mapId'])
    topicMap.mapDetails=request_body['mapDetails']
    topicMap.save()
    return HttpResponse(json.dumps({'done':True}), content_type="application/json")

def topicContent(request):
    userId = json.loads(request.GET['updates'])['value']
    try :
        topics = Topics.objects.filter(user_id = userId)

    except Topics.DoesNotExist:
        topics = None

    results = [ob.as_json() for ob in topics]
    return HttpResponse(json.dumps(results), content_type="application/json")

def getTopicMap(request):
    userId = json.loads(dict(request.GET.lists())['updates'][0])['value']
    topicId = json.loads(dict(request.GET.lists())['updates'][1])['value']

    try :
        topicMap = TopicMap.objects.get(topic_id=topicId)

    except TopicMap.DoesNotExist:
        topicMap = TopicMap()
        topicMap.topic_id = topicId
        topicMap.mapDetails = {'data':[]};
        topicMap.save()

    return HttpResponse(json.dumps(topicMap.as_json()), content_type="application/json")

def topicData(request):
    userId = json.loads(dict(request.GET.lists())['updates'][0])['value']
    topicId = json.loads(dict(request.GET.lists())['updates'][1])['value']

    try:
        book = TopicBook.objects.filter(topic_id= topicId)

    except TopicBook.DoesNotExist:
        book = TopicBook()

    results = [ob.as_json() for ob in book]
    return HttpResponse(json.dumps(results), content_type="application/json")


def loginUser(request):
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

    #Fetch id from User table else create
    try :
        user =  UsersInfo.objects.get(mail = resJSON['email'])

    except UsersInfo.DoesNotExist:

        newUser = UsersInfo()
        newUser.name = resJSON['name']
        newUser.mail= resJSON['email']
        newUser.save()
        user = UsersInfo.objects.get(mail=newUser.mail)

    return HttpResponse(json.dumps({'email': user.mail,'id': user.id,'username' : user.name}), content_type="application/json")

def createPost(request):
    body_unicode = request.body.decode('utf-8')
    request_body = json.loads(body_unicode)

    post = TopicBook()
    post.heading = request_body['heading']
    post.topic_id = request_body['topicId']
    post.data = request_body['postData']
    post.save()
    return HttpResponse(json.dumps(post.as_json()),content_type="application/json")
