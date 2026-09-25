from pathlib import Path
import pymupdf


root = Path(__file__).resolve().parent
source = root / "iitr_se_2509200_certificate.pdf"
output = root / "assets" / "iitr_se_2509200_certificate.png"

if not source.exists():
    raise FileNotFoundError(f"Certificate PDF not found: {source}")

output.parent.mkdir(exist_ok=True)
document = pymupdf.open(source)
if not document.page_count:
    raise ValueError("Certificate PDF does not contain a page")

page = document[0]
pixmap = page.get_pixmap(matrix=pymupdf.Matrix(3, 3), alpha=False)
pixmap.save(output)
document.close()
print(f"Rendered first certificate page to {output}")