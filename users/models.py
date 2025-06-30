
from django.contrib.auth.models import AbstractUser
from django.db import models

class UsuarioPersonalizado(AbstractUser):
    telefono = models.CharField(max_length=15, blank=True, null=True)
    
    
    rol = models.CharField(
        max_length=10,
        choices=[('admin', 'Administrador'), ('usuario', 'Usuario')],
        default='usuario',
        
    )
    def is_admin(self):
  
        return self.rol == 'admin' or self.is_superuser
    