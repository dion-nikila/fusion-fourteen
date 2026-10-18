from pathlib import Path
import shutil
root=Path(__file__).resolve().parent
shutil.copytree(root/'dist',root/'docs',dirs_exist_ok=True)
(root/'docs'/'.nojekyll').touch()
print('GitHub Pages files updated.')
