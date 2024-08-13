import os
import base64
from pathlib import Path
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM
from PIL import Image, ImageDraw, ImageFont

def generate_image(pref_code='28000', title='総人口'):
    # Set up paths
    current_dir = Path.cwd()
    svg_path = current_dir / 'public' / 'ogp' / 'prefectures' / '01000.svg'
    font_path = current_dir / 'public' / 'fonts' / 'NotoSansJP-Bold.ttf'

    # Read font file
    try:
        with open(font_path, 'rb') as f:
            font_base64 = base64.b64encode(f.read()).decode('utf-8')
    except IOError as e:
        print(f"Failed to read font file: {e}")
        return None

    # Read and modify SVG file
    try:
        with open(svg_path, 'r', encoding='utf-8') as f:
            svg_content = f.read()

        # Modify SVG for specific prefecture
        pref_code_short = pref_code[:2]
        svg_content = svg_content.replace(
            f'data-code="{pref_code_short}"',
            f'data-code="{pref_code_short}" fill="blue"'
        )

        # Add title and other elements to SVG
        svg_content = f'''
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <style type="text/css">
                    @font-face {{
                        font-family: 'Noto Sans JP';
                        src: url(data:font/truetype;charset=utf-8;base64,{font_base64}) format('truetype');
                        font-weight: bold;
                        font-style: normal;
                    }}
                </style>
            </defs>
            <rect width="1200" height="630" fill="#f0f0f0" fill-opacity="0.7"/>
            {svg_content}
            <rect x="10" y="10" width="1180" height="610" fill="none" stroke="#00bfff" stroke-width="20"/>
            <text x="100" y="200" font-family="'Noto Sans JP', Arial, sans-serif" font-size="90" font-weight="bold" fill="#778899">{title}</text>
            <text x="100" y="560" font-family="Arial" font-size="50" fill="#c0c0c0">statistics-japan.com</text>
        </svg>
        '''

        # Save modified SVG to a temporary file
        temp_svg_path = current_dir / 'temp.svg'
        with open(temp_svg_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        # Convert SVG to PNG
        drawing = svg2rlg(str(temp_svg_path))
        png_path = current_dir / 'output.png'
        renderPM.drawToFile(drawing, str(png_path), fmt="PNG")

        # Resize the image to 1200x630
        img = Image.open(png_path)
        img = img.resize((1200, 630), Image.LANCZOS)
        img.save(png_path)

        print(f"Image saved to {png_path}")

        # Remove temporary SVG file
        os.remove(temp_svg_path)

    except Exception as e:
        print(f"Error generating image: {e}")
        return None

if __name__ == "__main__":
    generate_image()