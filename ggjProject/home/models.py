from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User

# post
"""
POST모델입니다. 기존과 바뀐 이름은 카톡으로 보낸 메모 확인해주세요.!
"""
class Post(models.Model):
    username = models.CharField(max_length=10)
    bookID = models.BigIntegerField()
    bookShelfID = models.BigIntegerField()
    title = models.CharField(max_length=1000)
    body = models.TextField()
    postDate = models.DateTimeField('date published')
    postCover = models.ImageField(upload_to='images/postCover/')

    like = models.ManyToManyField(User, related_name='like_post', blank=True)
    scrap = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.title

class Book(models.Model):
    bookName = models.CharField(max_length=100)
    ISBN = models.TextField()
    writer = models.CharField(max_length=100)
    bookCover = models.ImageField(upload_to='images/bookCover/')
    description = models.CharField(max_length=5000)
    publisher = models.CharField(max_length=100)

    def __str__(self):
        return self.bookName




    

