from django.urls import path
from django.conf.urls import url
from .views import home, new, delete, update, PostLike, postScrap, create, scrap, follow
urlpatterns = [
    url(r'^$', home, name="home"),
    path('scrap', scrap, name="scrap"),
    path('follow', follow, name="follow"),
    path('back_new', new, name='new'),
    path('back_create', create, name = 'back_create'),
    path('back_delete/<int:post_id>', delete, name='back_delete'),
    path('back_update/<int:post_id>', update, name='back_update'),
    path("back_postLike/<int:post_id>", PostLike.as_view(), name= 'back_postLike'),
    path("back_postScrap/<int:post_id>", postScrap.as_view(), name= 'back_postScrap'),
]