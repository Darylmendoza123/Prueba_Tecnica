from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

class RoleMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({'detail': 'No autenticado'}, status=401)

        # Ejemplo: restringir acceso a usuarios estándar
        if request.path.startswith('/api/usuarios/admin/') and not request.user.is_staff:
            return JsonResponse({'detail': 'No autorizado'}, status=403)
