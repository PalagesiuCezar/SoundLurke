from rest_framework import permissions

class IsClient(permissions.BasePermission):
    message = 'You are not allowed here because you are not a Client'

    def has_permission(self,request,view):
        return bool(request.user and request.user.user_type is 1)
# 
class IsArtist(permissions.BasePermission):
    message = 'You are not allowed here because you are not an Artist'

    def has_permission(self,request,view):
        return bool(request.user and request.user.user_type is 2)
            
class IsOrganizer(permissions.BasePermission):
    message = 'You are not allowed here because you are not an Organizer'

    def has_permission(self,request,view):
        return bool(request.user and request.user.user_type is 3)

class IsAuthenticated(permissions.BasePermission):
    message = 'You are not authenticated please log in or register'

    def has_permission(self,request,view):
        return bool(request.user and request.user.is_authenticated)