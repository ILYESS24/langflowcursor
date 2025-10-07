from fastapi_pagination import Page

from all-ai.helpers.base_model import BaseModel
from all-ai.services.database.models.flow.model import Flow
from all-ai.services.database.models.folder.model import FolderRead


class FolderWithPaginatedFlows(BaseModel):
    folder: FolderRead
    flows: Page[Flow]
