import rest_framework_filters as filters

from Accounts.models import User


class UserFilter(filters.FilterSet):

    class Meta:
        model = User
        fields = {
            'first_name': '__all__',
            'last_name': '__all__',
            'email': '__all__',
            'user_type': '__all__',
        }