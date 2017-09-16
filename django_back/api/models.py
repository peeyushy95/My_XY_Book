from django.db import models

# Create your models here.

class UsersInfo(models.Model):
    mail = models.CharField(max_length = 50)
    name = models.CharField(max_length = 50)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
      db_table = "usersInfo"