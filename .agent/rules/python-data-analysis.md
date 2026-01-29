# Python Data Analysis Rules

## Environment & Dependencies
-   **Virtual Env**: Always use a virtual environment (`venv`, `poetry`, or `conda`).
-   **Dependencies**: explicit versions in `requirements.txt` or `pyproject.toml`.

## Code Structure
-   **Notebooks vs Scripts**:
    -   Use **Jupyter Notebooks (.ipynb)** for exploration, visualization, and storytelling.
    -   Refactor into **Python Scripts (.py)** for production pipelines, reusable modules, and automation.
-   **Modularization**: Move repeated functions into a generic `utils.py` or separate modules.

## Coding Standards
-   **Type Hinting**: Use type hints (`def process_data(df: pd.DataFrame) -> pd.Series:`) for clarity.
-   **Vectorization**: Avoid loops (for-loops) when working with Pandas/NumPy. Use vectorized operations (`apply`, `map`, vector math) for performance.
-   **Docstrings**: All functions must have docstrings (Google or NumPy style) explaining inputs and outputs.
-   **Linting**: Use `black` for formatting and `flake8` or `ruff` for linting.

## Data Handling
-   **Immutability**: Avoid modifying DataFrames in place (`inplace=True`) unless necessary for memory constraints. Prefer method chaining.
-   **Paths**: Use `pathlib` instead of string manipulation for file paths.
-   **Secrets**: Never hardcode credentials. Use `.env` files and `python-dotenv`.

## Visualization
-   Label all axes, add titles, and use legends.
-   Use colorblind-friendly palettes (e.g., Seaborn `colorblind` style).
