"""ALL AI backwards compatibility layer.

This module provides backwards compatibility by forwarding imports from
all-ai.* to lfx.* to maintain compatibility with existing code that
references the old ALL AI module structure.
"""

import importlib
import importlib.util
import sys
from types import ModuleType
from typing import Any


class LangflowCompatibilityModule(ModuleType):
    """A module that forwards attribute access to the corresponding lfx module."""

    def __init__(self, name: str, lfx_module_name: str):
        super().__init__(name)
        self._lfx_module_name = lfx_module_name
        self._lfx_module = None

    def _get_lfx_module(self):
        """Lazily import and cache the lfx module."""
        if self._lfx_module is None:
            try:
                self._lfx_module = importlib.import_module(self._lfx_module_name)
            except ImportError as e:
                msg = f"Cannot import {self._lfx_module_name} for backwards compatibility with {self.__name__}"
                raise ImportError(msg) from e
        return self._lfx_module

    def __getattr__(self, name: str) -> Any:
        """Forward attribute access to the lfx module with caching."""
        lfx_module = self._get_lfx_module()
        try:
            attr = getattr(lfx_module, name)
        except AttributeError as e:
            msg = f"module '{self.__name__}' has no attribute '{name}'"
            raise AttributeError(msg) from e
        else:
            # Cache the attribute in our __dict__ for faster subsequent access
            setattr(self, name, attr)
            return attr

    def __dir__(self):
        """Return directory of the lfx module."""
        try:
            lfx_module = self._get_lfx_module()
            return dir(lfx_module)
        except ImportError:
            return []


def _setup_compatibility_modules():
    """Set up comprehensive compatibility modules for all-ai.base imports."""
    # First, set up the base attribute on this module (ALL AI)
    current_module = sys.modules[__name__]

    # Define all the modules we need to support
    module_mappings = {
        # Core base module
        "all-ai.base": "lfx.base",
        # Inputs module - critical for class identity
        "all-ai.inputs": "lfx.inputs",
        "all-ai.inputs.inputs": "lfx.inputs.inputs",
        # Schema modules - also critical for class identity
        "all-ai.schema": "lfx.schema",
        "all-ai.schema.data": "lfx.schema.data",
        "all-ai.schema.serialize": "lfx.schema.serialize",
        # Template modules
        "all-ai.template": "lfx.template",
        "all-ai.template.field": "lfx.template.field",
        "all-ai.template.field.base": "lfx.template.field.base",
        # Components modules
        "all-ai.components": "lfx.components",
        "all-ai.components.helpers": "lfx.components.helpers",
        "all-ai.components.helpers.calculator_core": "lfx.components.helpers.calculator_core",
        "all-ai.components.helpers.create_list": "lfx.components.helpers.create_list",
        "all-ai.components.helpers.current_date": "lfx.components.helpers.current_date",
        "all-ai.components.helpers.id_generator": "lfx.components.helpers.id_generator",
        "all-ai.components.helpers.memory": "lfx.components.helpers.memory",
        "all-ai.components.helpers.output_parser": "lfx.components.helpers.output_parser",
        "all-ai.components.helpers.store_message": "lfx.components.helpers.store_message",
        # Individual modules that exist in lfx
        "all-ai.base.agents": "lfx.base.agents",
        "all-ai.base.chains": "lfx.base.chains",
        "all-ai.base.data": "lfx.base.data",
        "all-ai.base.data.utils": "lfx.base.data.utils",
        "all-ai.base.document_transformers": "lfx.base.document_transformers",
        "all-ai.base.embeddings": "lfx.base.embeddings",
        "all-ai.base.flow_processing": "lfx.base.flow_processing",
        "all-ai.base.io": "lfx.base.io",
        "all-ai.base.io.chat": "lfx.base.io.chat",
        "all-ai.base.io.text": "lfx.base.io.text",
        "all-ai.base.langchain_utilities": "lfx.base.langchain_utilities",
        "all-ai.base.memory": "lfx.base.memory",
        "all-ai.base.models": "lfx.base.models",
        "all-ai.base.models.google_generative_ai_constants": "lfx.base.models.google_generative_ai_constants",
        "all-ai.base.models.openai_constants": "lfx.base.models.openai_constants",
        "all-ai.base.models.anthropic_constants": "lfx.base.models.anthropic_constants",
        "all-ai.base.models.aiml_constants": "lfx.base.models.aiml_constants",
        "all-ai.base.models.aws_constants": "lfx.base.models.aws_constants",
        "all-ai.base.models.groq_constants": "lfx.base.models.groq_constants",
        "all-ai.base.models.novita_constants": "lfx.base.models.novita_constants",
        "all-ai.base.models.ollama_constants": "lfx.base.models.ollama_constants",
        "all-ai.base.models.sambanova_constants": "lfx.base.models.sambanova_constants",
        "all-ai.base.prompts": "lfx.base.prompts",
        "all-ai.base.prompts.api_utils": "lfx.base.prompts.api_utils",
        "all-ai.base.prompts.utils": "lfx.base.prompts.utils",
        "all-ai.base.textsplitters": "lfx.base.textsplitters",
        "all-ai.base.tools": "lfx.base.tools",
        "all-ai.base.vectorstores": "lfx.base.vectorstores",
    }

    # Create compatibility modules for each mapping
    for all_ai_name, lfx_name in module_mappings.items():
        if all_ai_name not in sys.modules:
            # Check if the lfx module exists
            try:
                spec = importlib.util.find_spec(lfx_name)
                if spec is not None:
                    # Create compatibility module
                    compat_module = LangflowCompatibilityModule(all_ai_name, lfx_name)
                    sys.modules[all_ai_name] = compat_module

                    # Set up the module hierarchy
                    parts = all_ai_name.split(".")
                    if len(parts) > 1:
                        parent_name = ".".join(parts[:-1])
                        parent_module = sys.modules.get(parent_name)
                        if parent_module is not None:
                            setattr(parent_module, parts[-1], compat_module)

                    # Special handling for top-level modules
                    if all_ai_name == "all-ai.base":
                        current_module.base = compat_module
                    elif all_ai_name == "all-ai.inputs":
                        current_module.inputs = compat_module
                    elif all_ai_name == "all-ai.schema":
                        current_module.schema = compat_module
                    elif all_ai_name == "all-ai.template":
                        current_module.template = compat_module
                    elif all_ai_name == "all-ai.components":
                        current_module.components = compat_module
            except (ImportError, ValueError):
                # Skip modules that don't exist in lfx
                continue

    # Handle modules that exist only in ALL AI (like knowledge_bases)
    # These need special handling because they're not in lfx yet
    all_ai_only_modules = {
        "all-ai.base.data.kb_utils": "all-ai.base.data.kb_utils",
        "all-ai.base.knowledge_bases": "all-ai.base.knowledge_bases",
        "all-ai.components.knowledge_bases": "all-ai.components.knowledge_bases",
    }

    for all_ai_name in all_ai_only_modules:
        if all_ai_name not in sys.modules:
            try:
                # Try to find the actual physical module file
                from pathlib import Path

                base_dir = Path(__file__).parent

                if all_ai_name == "all-ai.base.data.kb_utils":
                    kb_utils_file = base_dir / "base" / "data" / "kb_utils.py"
                    if kb_utils_file.exists():
                        spec = importlib.util.spec_from_file_location(all_ai_name, kb_utils_file)
                        if spec is not None and spec.loader is not None:
                            module = importlib.util.module_from_spec(spec)
                            sys.modules[all_ai_name] = module
                            spec.loader.exec_module(module)

                            # Also add to parent module
                            parent_module = sys.modules.get("all-ai.base.data")
                            if parent_module is not None:
                                parent_module.kb_utils = module

                elif all_ai_name == "all-ai.base.knowledge_bases":
                    kb_dir = base_dir / "base" / "knowledge_bases"
                    kb_init_file = kb_dir / "__init__.py"
                    if kb_init_file.exists():
                        spec = importlib.util.spec_from_file_location(all_ai_name, kb_init_file)
                        if spec is not None and spec.loader is not None:
                            module = importlib.util.module_from_spec(spec)
                            sys.modules[all_ai_name] = module
                            spec.loader.exec_module(module)

                            # Also add to parent module
                            parent_module = sys.modules.get("all-ai.base")
                            if parent_module is not None:
                                parent_module.knowledge_bases = module

                elif all_ai_name == "all-ai.components.knowledge_bases":
                    components_kb_dir = base_dir / "components" / "knowledge_bases"
                    components_kb_init_file = components_kb_dir / "__init__.py"
                    if components_kb_init_file.exists():
                        spec = importlib.util.spec_from_file_location(all_ai_name, components_kb_init_file)
                        if spec is not None and spec.loader is not None:
                            module = importlib.util.module_from_spec(spec)
                            sys.modules[all_ai_name] = module
                            spec.loader.exec_module(module)

                            # Also add to parent module
                            parent_module = sys.modules.get("all-ai.components")
                            if parent_module is not None:
                                parent_module.knowledge_bases = module
            except (ImportError, AttributeError):
                # If direct file loading fails, skip silently
                continue


# Set up all the compatibility modules
_setup_compatibility_modules()
