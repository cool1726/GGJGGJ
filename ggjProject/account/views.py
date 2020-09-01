from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from .models import Profile
from home.models import Post
from django.views.generic.edit import CreateView, DeleteView

from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.
"""회원가입을 위한 함수입니다. 로그인 함수는 추후 구현 예정입니다. """
def signup(request):
    if request.method == "POST":
        if request.POST['password'] == request.POST['passwordCheck']:
            try:
                user = User.objects.get(username=request.POST['username'])
                return render(request, "signup.html", {'error': 'Username has already been taken'})
            except:
                user = User.objects.create_user(
                    email = request.POST['email'], username=request.POST['username'], password=request.POST['password']) 
                name = request.POST['name']
                phoneNumber = request.POST['phoneNumber']
                profile = Profile(user=user, name=name, phoneNumber=phoneNumber)
                profile.save()
                auth.login(request, user)
                return redirect('/')
        else:
            return render(request, "signup.html", {'error':'Passwords must match'})
    else:
        return render(request, "signup.html")

"""팔로우 함수에서 상속받아 사용했습니다. """
class BaseView(View):
    @staticmethod
    def response(data = {}, message = '', status = 200):
        result = {
            'data' : data,
            'message' : message,
        }
        return JsonResponse(result, status = status)

"""팔로우 추가 기능을 구현한 함수입니다. """
class RelationCreateView(BaseView):
    def post(self, request):
        try:
            user_id = request.POST.get('id', '')
        except ValueError:
            return self.response(message = '잘못된 요청입니다.', status = 400)
        
        try:
            relation = FollowRelation.objects.get(follower = request.user)
        except FollowRelation.DoesNotExist:
            relation = FollowRelation.objects.create(follower = request.user)
        
        try:
            if user_id == request.user.id:
                raise IntegrityError
            relation.followee.add(user_id)
            relation.save()
        except IntegrityError:
            return self.response(message = '잘못된 요청입니다.', status = 400)
        
        return self.response({})
        
"""팔로우 삭제 기능을 구현한 함수입니다. """
class RelationDeleteView(BaseView):
    def post(self, request):
        try:
            user_id = request.POST.get('id', '')
        except ValueError:
            return self.response(message = "잘못된 요청입니다.", status = 400)

        try:
            relation = FollowRelation.objects.get(follower = request.user)
        except FollowRelation.DoesNotExist:
            return self.response(message = "잘못된 요청입니다.", status = 400)
        
        try:
            if user_id == request.user.id:
                raise IntegrityError
            relation.followee.remove(user_id)
            relation.save()
        except IntegrityError:
            return self.response(message = "잘못된 요청입니다.", status = 400)
        
        return self.response({})


