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


def topicContent(request):
    userId = json.loads(request.GET['updates'])['value']
    try :
        topics = Topics.objects.filter(user_id = userId)

    except Topics.DoesNotExist:
        topics = None

    results = [ob.as_json() for ob in topics]
    return HttpResponse(json.dumps(results), content_type="application/json")

def getTopicMap(request):
    topicId = json.loads(request.GET['updates'])['value']

    try :
        topicMap = TopicMap.objects.get(topic_id=topicId)

    except TopicMap.DoesNotExist:
        topicMap = TopicMap()

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


  #   return HttpResponse(json.dumps({
  #
  #   "level" : 10,
  #   "PanelData" : [
  #     {
  #       "heading" : "Linear Regression",
  #       "type" : "data/image",
  #       "data" : "Regression is a parametric technique used to predict continuous (dependent) variable given a set of independent variables.Ordinary Least Square (OLS) technique tries to reduce the sum of squared errors ∑[Actual(y) - Predicted(y')]²/2n by finding the best possible value of regression coefficients (β0, β1, etc).There are other techniques such as Generalized Least Square, Percentage Least Square, Total Least Squares, Least absolute deviation",
  #       "position" : 1,
  #       "Links" : ["https://www.w3schools.com", "https://stackoverflow.com/questions/34338440/how-to-redirect-to-an-external-url-in-angular2"],
  #       "child" : {
  #         "level" : 9,
  #         "PanelData" :
  #         [
  #           {
  #             "heading" : "Batch Gradient Descent",
  #             "Links" : ["11111111354546456645656jfdlkfjdlkfjdklfjdfkldsjfkdlsfjsdkflsjflksfjsklfjsdfsjfjlksfjskldfjsdlk4", "2"],
  #             "type" : "data/image",
  #             "data" : " BGD is not a good approach for large data set as it runs on whole training set. In SGD first randomize training set. Then, for updation of every parameter we use only one training example in every iteration to compute the gradient of cost function. Not accurate",
  #             "position" : 1,
  #             "child" : {
  #               "level" : 9,
  #               "PanelData" :
  #               [
  #                 {
  #                   "heading" : "Decision Tree Regressor",
  #                   "Links" : ["1", "2"],
  #                   "type" : "data/image",
  #                   "data" : "This is Non Linear, Non-Continuous model.Splits the data space into multiple regions and for a region predicted dependent variable is the average of the dependent variable of all the data samples within that region.",
  #                   "position" : 1
  #                 }
  #               ]
  #             }
  #           },
  #           {
  #             "heading" : "MiniBatch Gradient Descent",
  #             "Links" : [],
  #             "type" : "data/image",
  #             "data" : "In mini batch algorithm rather than using the complete data set, in every iteration we use a set of 'm' training examples called batch to compute the gradient of the cost function.",
  #             "position" : 1
  #           }
  #         ]
  #       }
  #     },
  #     {
  #       "heading" : "Image Processing",
  #       "Links" : [],
  #       "type" : "data/image",
  #       "data" : "what is Image Processing",
  #       "position" : 2,
  #       "child" : {
  #         "level" : 9,
  #         "PanelData" :
  #         [
  #           {
  #             "heading" : "OpenCV",
  #             "Links" : [],
  #             "type" : "data/image",
  #             "data" : "what is OpenCV",
  #             "position" : 1
  #           }
  #         ]
  #       }
  #     },{
  #       "heading" : "K-Means",
  #       "type" : "data/image",
  #       "data" : "what do u mean by Kmeans",
  #       "position" : 3
  #     }
  #   ]
  # }), content_type="application/json")


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
    pass