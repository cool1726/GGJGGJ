from django.db import models
from django.conf import settings
from home.models import Post
# Create your models here.
"""
BookShelf모델입니다. 바뀐 이름은 카톡으로 보낸 메모 확인해주세요.!
"""
class BookShelf(models.Model):
    username = models.CharField(max_length=10)
    postID = models.ManyToManyField(Post, related_name = 'post', blank = True)
    bookShelfTitle = models.CharField(max_length=250, null=True)

    class Meta:
        ordering = ('bookShelfTitle',)
        verbose_name = 'bookShelfTitle'
        verbose_name_plural = 'bookShelfTitles'
    
    def __str__(self):
        return str(self.bookShelfTitle)