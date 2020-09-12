from django.urls import path
from .views import home, new, delete, update, PostLike, postScrap, create
urlpatterns = [
    path('', home, name="back_home"),
    path('back_new', new, name='back_new'),
    path('back_create', create, name = 'back_create'),
    path('back_delete/<int:post_id>', delete, name='back_delete'),
    path('back_update/<int:post_id>', update, name='back_update'),
    path("back_postLike/<int:post_id>", PostLike.as_view(), name= 'back_postLike'),
    path("back_postScrap/<int:post_id>", postScrap.as_view(), name= 'back_postScrap'),
]