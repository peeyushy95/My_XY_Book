from django.db import models
from django.contrib.postgres.fields import JSONField
# Create your models here.

class UsersInfo(models.Model):
    mail = models.CharField(max_length = 50)
    name = models.CharField(max_length = 50)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
      db_table = "users"

class Topics(models.Model):
    user = models.ForeignKey(UsersInfo, on_delete=models.CASCADE)
    topicId = models.AutoField(primary_key=True)
    desc = models.TextField()

    class Meta:
      db_table = "topics"

    def as_json(self):
        return dict(
            userId=self.user_id,
            topicId=self.pk,
            desc=self.desc,
        )

class TopicMap(models.Model):
    topic = models.ForeignKey(Topics, on_delete=models.CASCADE)
    mapDetails = JSONField()
    mapId = models.AutoField(primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table="topicMap"

    def as_json(self):
        return dict(
            mapId=self.mapId,
            topicId=self.topic_id,
            mapDetails=self.mapDetails,
        )