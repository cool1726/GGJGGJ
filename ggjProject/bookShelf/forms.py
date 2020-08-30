from django import forms
from .models import BookShelf
class BookShelfUpdate(forms.ModelForm):
    class Meta:
        model = BookShelf
        fields = ['bookShelfTitle']
        