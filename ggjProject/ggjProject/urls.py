"""ggjProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
import account.views
import home.views
import bookShelf.views

"""앞에 back_이 붙어있는 거는 front가 만들 url과 구분하기 위함입니다. 추후 url을 분리할 예정입니다. """
app_name = 'post'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('', include('account.urls')),
    path('', include('bookShelf.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
""" path('back_new/', home.views.new, name='back_new'), 
    path('back_create/', home.views.create, name='back_create'), 함수 오류 IntegrityError NOT NULL constraint failed: home_post.bookShelfID"""