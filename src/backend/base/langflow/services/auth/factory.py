from typing_extensions import override

from all-ai.services.auth.service import AuthService
from all-ai.services.factory import ServiceFactory


class AuthServiceFactory(ServiceFactory):
    name = "auth_service"

    def __init__(self) -> None:
        super().__init__(AuthService)

    @override
    def create(self, settings_service):
        return AuthService(settings_service)
