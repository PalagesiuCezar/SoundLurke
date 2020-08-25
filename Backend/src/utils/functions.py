from typing import Dict,Any


def exclude_fields(builtin: Dict[str, Any], exclude=None) -> Dict[str, Any]:

    return {k: v for k, v in builtin.items() if k not in exclude}