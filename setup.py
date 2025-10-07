from setuptools import setup, find_packages

setup(
    name="langflow",
    version="1.6.0",
    description="Langflow - AI Workflow Builder",
    packages=find_packages(where="src/backend/base"),
    package_dir={"": "src/backend/base"},
    python_requires=">=3.10,<3.13",
    install_requires=[
        "fastapi>=0.111.0",
        "uvicorn[standard]>=0.29.0",
        "sqlmodel>=0.0.18",
        "pydantic-settings>=2.2.1",
        "python-dotenv>=1.0.1",
        "python-multipart>=0.0.9",
        "jinja2>=3.1.4",
        "python-jose[cryptography]>=3.3.0",
        "passlib[bcrypt]>=1.7.4",
        "alembic>=1.13.1",
        "psycopg2-binary>=2.9.9",
        "sqlalchemy>=2.0.43",
        "pydantic>=2.11.10",
        "starlette>=0.37.2",
        "typer>=0.19.2",
        "rich>=14.1.0",
        "click>=8.3.0",
    ],
    entry_points={
        "console_scripts": [
            "langflow=langflow.__main__:main",
        ],
    },
)
