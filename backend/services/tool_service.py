from repositories.tool_repository import ToolRepository

class ToolService:
    def __init__(self, repository: ToolRepository):
        self.repository = repository

    def increment_tool_stars(self, tool_id: int):
        tool = self.repository.get_by_id(tool_id)
        if not tool:
            return None
        
        current_stars = tool.get("stars") or 0
        new_stars = current_stars + 1
        
        self.repository.update_stars(tool_id, new_stars)
        return new_stars