from all-ai.services.base import Service
from all-ai.services.factory import ServiceFactory
from all-ai.services.job_queue.service import JobQueueService


class JobQueueServiceFactory(ServiceFactory):
    def __init__(self):
        super().__init__(JobQueueService)

    def create(self) -> Service:
        return JobQueueService()
