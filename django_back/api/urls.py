from django.conf.urls import url
from api import views

urlpatterns = [
    url(r'^login$', views.loginUser),
    url(r'^topics$', views.topicContent),
    url(r'^createTopic$', views.createTopic),
    url(r'^deleteTopics$', views.deleteTopics),

]