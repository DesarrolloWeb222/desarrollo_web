from django.db import models

class Usuario(models.Model):
    rut = models.CharField(max_length=9, primary_key=True)
    nombre = models.CharField(max_length=25)

    def __str__(self):
        return f"{self.rut} - {self.nombre}"