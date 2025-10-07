# Backwards compatibility module for all-ai.schema.graph
# This module redirects imports to the new lfx.schema.graph module

from lfx.schema.graph import InputValue, Tweaks

__all__ = ["InputValue", "Tweaks"]
