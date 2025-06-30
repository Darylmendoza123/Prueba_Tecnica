import csv
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from .models import UsuarioPersonalizado
from .serializers import UsuarioSerializer

# Clase de paginación
class PaginaUsuarios(PageNumberPagination):
    page_size = 5

# Crear usuario - solo superusuario
class CrearUsuario(generics.CreateAPIView):
    queryset = UsuarioPersonalizado.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

# Listar usuarios - cualquier usuario autenticado
class ListarUsuarios(generics.ListAPIView):
    queryset = UsuarioPersonalizado.objects.all().order_by('id')  
    serializer_class = UsuarioSerializer
    pagination_class = PaginaUsuarios
    permission_classes = [IsAuthenticated]

# Detalles, editar y eliminar usuario - solo superusuario
class DetalleUsuario(generics.RetrieveUpdateDestroyAPIView):
    queryset = UsuarioPersonalizado.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

# Exportar usuarios a CSV - cualquier usuario autenticado
class ExportarUsuariosCSV(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="usuarios.csv"'
        writer = csv.writer(response)
        writer.writerow(['ID', 'Username', 'Email', 'Teléfono'])

        usuarios = UsuarioPersonalizado.objects.all().order_by('id')
        for usuario in usuarios:
            writer.writerow([usuario.id, usuario.username, usuario.email, usuario.telefono])

        return response
