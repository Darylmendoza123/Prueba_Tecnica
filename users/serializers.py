from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import UsuarioPersonalizado

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UsuarioPersonalizado
        fields = ['id', 'username', 'email', 'telefono', 'password']

    def create(self, validated_data):
        usuario = UsuarioPersonalizado.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            telefono=validated_data.get('telefono', ''),
            password=validated_data['password']
        )
        return usuario

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get('username')
        try:
            # Permitir inicio de sesión con correo electrónico
            user = UsuarioPersonalizado.objects.get(email=username)
            attrs['username'] = user.username
        except UsuarioPersonalizado.DoesNotExist:
            pass
        return super().validate(attrs)