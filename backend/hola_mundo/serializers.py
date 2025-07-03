from hola_mundo.models import Usuario
from rest_framework import serializers

class UsuarioSerializer(serializers.Serializer):
    rut = serializers.CharField()
    nombre = serializers.CharField()
    class Meta:
        model = Usuario
        fields = ['nombre']
