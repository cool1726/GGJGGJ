from django.urls import path
from .views import newBookShelf, deleteBookShelf, updateBookShelf, createBookShelf, myPage
urlpatterns = [
    path('back_myPage/', myPage, name='back_myPage'),
    path('back_newBookShelf/', newBookShelf, name='back_newBookShelf'),
    path('back_deleteBookShelf/<int:bookShelf_id>', deleteBookShelf, name='back_deleteBookShelf'),
    path('back_updateBookShelf/<int:bookShelf_id>', updateBookShelf, name='back_updateBookShelf'),
    path('back_createBookShelf/', createBookShelf, name='back_createBookShelf'),
]