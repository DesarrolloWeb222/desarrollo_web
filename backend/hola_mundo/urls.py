from django.contrib import admin
from hola_mundo import views
from hola_mundo.apiviews import UsuariosView, UsuarioView
from django.urls import include, path

urlpatterns = [
    path('', views.index, name='index_holamundo'),

    # URL Para las apiview
    # GETS
    path('get/usuarios', UsuariosView.as_view()),
    path('get/usuario/<rut>', UsuarioView.as_view()),

    #POSTS
   

]
