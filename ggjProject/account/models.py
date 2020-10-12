from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from home.models import Post
from bookShelf.models import BookShelf

# Create your models here.
"""
기존과 바뀐 이름은 카톡으로 보낸 메모 확인해주세요.!
장고 기본 제공 함수에서는 전화번호 같은 걸 쓸 수 없어 일대 다 관계를 이용해 유저 확장한 포트폴리오모델입니다. 
"""
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.TextField(max_length=10)
    phoneNumber = models.TextField(max_length=20)
    postID = models.ManyToManyField(Post, related_name= 'myPost')
    scrap = models.ManyToManyField(Post, related_name = 'myScarp', blank=True)
    bookShelf = models.ManyToManyField(BookShelf, related_name='myBookShelf', blank = True)

    def __str__(self):
        return str(self.user)
"""
팔로우 모델입니다. 
"""
class FollowRelation(models.Model):
    follower = models.OneToOneField(User, related_name = 'follower', on_delete = models.CASCADE)
    followee = models.ManyToManyField(User, related_name = 'followee')