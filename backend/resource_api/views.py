from django.shortcuts import render
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EstablishmentSerializer

from .models import Categories, Tags, Establishments


class TagsView(APIView):
    def get(self, request):
        tags = Tags.objects.all()
        result = [{'id': tag.id, 'name': tag.name} for tag in tags]
        return Response(result)
    
class CategoriesView(APIView):
    def get(self, request):
        categories = Categories.objects.all()
        result = [{'id': category.id, 'name': category.name} for category in categories]
        return Response(result)

class EstablishmentsView(APIView):
    # Filter Note: [field_name]__[function]=[query]
    # Full list of queries here: https://docs.djangoproject.com/en/5.2/ref/models/querysets/#field-lookups
    # .filter() <- QuerySet <- All records matching condition
    # .get() <- Single Object <- Error if 0 or >1 objects found
    # .exclude() <- QuerySet <- All records not matching condition

    def get(self, request):
        search_term = request.query_params.get('search', '').strip()
        establishments = Establishments.objects.all()

        if search_term:
            establishments = establishments.filter(
                Q(name__icontains=search_term) |
                Q(mission_statement__icontains=search_term) |
                Q(email__icontains=search_term) |
                Q(website__icontains=search_term) |
                Q(description__icontains=search_term)
            ) 
            serializer = EstablishmentSerializer(establishments, many=True)
            return Response(serializer.data)
        return Response()
    
    def post(self, request):
        search_term = request.data.get('search', '').strip()
        categories = request.data.get('categories', [])
        tags = request.data.get('tags', [])

        if not search_term and not categories and not tags:
            return Response()

        establishments = Establishments.objects.all()

        if search_term:
            establishments = establishments.filter(
                Q(name__icontains=search_term) |
                Q(mission_statement__icontains=search_term) |
                Q(email__icontains=search_term) |
                Q(website__icontains=search_term) |
                Q(description__icontains=search_term)
            ) 
        
        if categories:
            query = Q()
            for selected_category in categories:
                query |= Q(establishmentcategories__category__name=selected_category) # EstablishmentCategories -> category -> name ==? selectedName
            establishments = establishments.filter(query).distinct()
        
        if tags:
            query = Q()
            for selected_tag in tags:
                query |= Q(establishmenttags__tag__name=selected_tag) # EstablishmentTags -> establishment -> name ==? selectedName
            establishments = establishments.filter(query).distinct()
        
        serializer = EstablishmentSerializer(establishments, many=True)
        return Response(serializer.data)