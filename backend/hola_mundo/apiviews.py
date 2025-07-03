from rest_framework.views import APIView
from rest_framework.response import Response
from hola_mundo.serializers import UsuarioSerializer
from hola_mundo.models import Usuario

class UsuariosView(APIView):
    def get(self, request, format=None):
        query_set = Usuario.objects.all()
        serializer = UsuarioSerializer(query_set, many = True)
        return Response(serializer.data)
    
class UsuarioView(APIView):
    def get(self, request, rut):
        query_set = Usuario.objects.get(rut=rut)
        serializer = UsuarioSerializer(query_set)
        return Response(serializer.data)
