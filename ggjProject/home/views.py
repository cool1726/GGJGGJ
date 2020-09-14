from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponseForbidden, HttpResponseRedirect, HttpResponse
from urllib.parse import urlparse
from django.views.generic.base import View
from .models import Post, Book
from django.utils import timezone
from bookShelf.models import BookShelf
from .forms import PostUpdate
from django.contrib.auth.models import User
from django.views.generic.edit import UpdateView, CreateView
import json

# Create your views here.
"""post들이 나옵니다.back_home.html로 이동"""
def home(request):
    posts = Post.objects.all()
    return render(request, 'home.html', {'posts': posts})

"""back_new.html로 이동"""
def new(request):
    bookShelves = BookShelf.objects.all()
    return render(request, 'back_new.html', {'bookShelves': bookShelves})

"""
post create 함수
"""
def create(request):
    bookShelves = BookShelf.objects.all()
    bookInfo = json.loads(request.POST.get('bookInfo'))
    books = Book.objects.all()
    flag = 0
    posts = Post.objects.all()
    post = Post()
    for i in books:
        if i.ISBN == bookInfo['isbn']:
            flag = i
            break
    if flag==0:
        book = Book()
        book.bookName = bookInfo['title'] #title
        book.ISBN = bookInfo['isbn'] #isbn
        book.writer = bookInfo['authors'][0] #authors
        book.bookCover = bookInfo['thumbnail'] #thumbnail
        book.description = bookInfo['contents'] #contents
        book.publisher = bookInfo['publisher'] #publisher
        book.save()
        post.bookID = book.id
    else: 
        post.bookID = flag.id
    post.username = request.user
    post.bookShelfID = request.POST.get('bookShelfID')
    post.title =  request.POST.get('title')
    post.body = request.POST.get('body')
    post.postDate = timezone.datetime.now()
    post.postCover = request.FILES['postCover']
    post.save()
    return render(request,'back_myPage.html',{'bookShelves': bookShelves, 'posts': posts})

"""post삭제할 수 있는 함수"""
def delete(request, post_id):
    Post.objects.get(id=post_id).delete()
    return redirect('/')

"""post수정하는 함수"""
def update(request, post_id):
    post = get_object_or_404(Post,pk=post_id)
    bookShelves = BookShelf.objects.all()
    posts = Post.objects.all()

    if request.method =='POST':
        form = PostUpdate(request.POST, request.FILES, instance=post)
        if form.is_valid():
            print(form.cleaned_data)
            post.title = form.cleaned_data['title']
            post.bookShelfID = form.cleaned_data['bookShelfID']
            post.body = form.cleaned_data['body']
            post.pub_date=timezone.datetime.now()
            post.postCover = form.cleaned_data['postCover']
            post.save()
            return render(request,'back_myPage.html',{'bookShelves': bookShelves, 'posts': posts})
    else:
        form = PostUpdate(instance = post)
    return render(request,'back_update.html', {'form':form})

"""좋아요 기능 구현한 함수"""
class PostLike(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden()
        else:
            if 'post_id' in kwargs:
                post_id = kwargs['post_id']
                post = Post.objects.get(pk=post_id)
                user = request.user
                if user in post.like.all():
                    post.like.remove(user)
                else:
                    post.like.add(user)
            referer_url = request.META.get('HTTP_REFERER')
            path = urlparse(referer_url).path
            return HttpResponseRedirect(path)

"""스크랩 기능 구현한 함수"""
class postScrap(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden()
        else:
            if 'post_id' in kwargs:
                post_id = kwargs['post_id']
                post = Post.objects.get(pk=post_id)
                user = request.user
                if user in post.scrap.all():
                    post.scrap.remove(user)
                else :
                    post.scrap.add(user)
            referer_url = request.META.get('HTTP_REFERER')
            path = urlparse(referer_url).path
            return HttpResponseRedirect(path)