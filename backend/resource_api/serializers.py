from rest_framework import serializers
from .models import Establishments

class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishments
        fields = ['name', 'mission_statement', 'phone_number', 'email', 'website', 'location', 'hours_of_service', 'description']