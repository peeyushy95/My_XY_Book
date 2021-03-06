from django.conf.urls import url,include
from django.contrib import admin

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include('myBookBackend.urls')),
    url(r'^', include('api.urls')),
]


# faaltu
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)