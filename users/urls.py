from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CrearUsuario, ListarUsuarios, DetalleUsuario, ExportarUsuariosCSV

urlpatterns = [
    path('usuarios/crear/', CrearUsuario.as_view(), name='crear_usuario'),
    path('usuarios/listar/', ListarUsuarios.as_view(), name='listar_usuarios'),
    path('usuarios/<int:pk>/', DetalleUsuario.as_view(), name='detalle_usuario'),
    path('usuarios/exportar-csv/', ExportarUsuariosCSV.as_view(), name='exportar_csv'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]