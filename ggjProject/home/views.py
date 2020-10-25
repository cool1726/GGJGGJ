from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponseForbidden, HttpResponseRedirect, HttpResponse
from urllib.parse import urlparse
from django.views.generic.base import View
from .models import Post, Book
from account.models import Profile
from django.utils import timezone
from bookShelf.models import BookShelf
from .forms import PostUpdate
from django.contrib.auth.models import User
from django.views.generic.edit import UpdateView, CreateView
import json
import sys

# Create your views here.
"""post들이 나옵니다.back_home.html로 이동"""
def home(request):
    posts = Post.objects.all()
    return render(request, 'home_sidebar.html', {'posts': posts})

"""back_new.html로 이동"""
def new(request):
    return render(request, 'new.html', {'bookShelves': request.user.profile.bookShelf.all})

"""
post create 함수
"""
def create(request): #책장에 post 추가해줘야합니다. 책장이 bookShelfID 로 넘어옴. 저 넘어본 id를 가지고 책장.postid.add
    bookShelves = BookShelf.objects.all()
    title = request.POST.get('booktitle')
    isbn = request.POST.get('isbn')
    authors = request.POST.get('authors')
    thumbnail = request.POST.get('thumbnail')
    publisher = request.POST.get('publisher')
    contents = request.POST.get('contents')

    books = Book.objects.all()
    flag = 0
    posts = Post.objects.all()
    post = Post()
    for i in books:
        if i.ISBN == isbn:
            flag = i
            break
    if flag==0:
        book = Book()
        book.bookName = title
        book.ISBN = isbn
        book.writer = authors
        book.bookCover = thumbnail
        book.description = contents
        book.publisher = publisher
        book.save()
        post.bookID = book
    else: 
        post.bookID = flag
    post.username = request.user
    bookshelfID = request.POST.get('bookShelfID') 
    post.bookShelfID = bookshelfID
    post.title =  request.POST.get('title')
    post.body = request.POST.get('body')
    post.postDate = timezone.datetime.now()
    post.postCover = request.FILES.get('postCover', None)
    post.postCover2 = request.POST.get('postCover2', None)
    # if len(post.postCover2) == 0:
    #      if not bool(post.postCover.name) :  
    #         return render(request, "new.html", {'error':'사진을 업로드 해주세요.', 'bookShelves': bookShelves})
    # else:
    post.save()
    
    bookShelf = bookShelves.get(id = bookshelfID)
    bookShelf.postID.add(post.id)
    request.user.profile.postID.add(post.id)
    return redirect('/')
    # return render(request,'home_sidebar.html',{'bookShelves': bookShelves, 'posts': posts})

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
                if post in user.profile.scrap.all():
                    user.profile.scrap.remove(post)
                    post.scrap.remove(user)
                else :
                    user.profile.scrap.add(post)
                    post.scrap.add(user)
            referer_url = request.META.get('HTTP_REFERER')
            path = urlparse(referer_url).path
            return HttpResponseRedirect(path)