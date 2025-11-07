from django.urls import path
from .views import EstablishmentsView, TagsView, CategoriesView

urlpatterns = [
    path("tags/", TagsView.as_view(), name="get_tags"), # GET
    path("categories/", CategoriesView.as_view(), name="get_categories"), # GET
    path("establishments/", EstablishmentsView.as_view(), name='retrieve_establishments') # GET | POST
]