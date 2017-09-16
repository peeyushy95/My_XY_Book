from django.conf.urls import url
from myBookBackend import views

urlpatterns = [
    url(r'^y$', views.HomePageView.as_view()),
    url(r'^x$', views.myView),
    
]