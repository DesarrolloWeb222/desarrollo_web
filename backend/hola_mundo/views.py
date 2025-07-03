from django.shortcuts import render
from hola_mundo.models import Usuario

def index(request):
    template_name = "index.html"
    context = {}
    usu = Usuario.objects.get(rut='19')
    context['nombre'] = usu
    return render(request,  template_name, context)


